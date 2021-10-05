(function () {
    'use strict';

    function comparable(str) {
        return str ? str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() : '';
    }

    function isFunction(functionToCheck) {
        return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
    }

    function extend() {
        for (var i = 1; i < arguments.length; i++) {
            for (var key in arguments[i]) {
                if (arguments[i].hasOwnProperty(key)) {
                    var value = arguments[i][key];
                    if (value && value.constructor === Object) {
                        arguments[0][key] = arguments[0][key] || {};
                        extend(arguments[0][key], value);
                    } else {
                        arguments[0][key] = value;
                    }
                }
            }
        }
        return arguments[0];
    }

    function setXHRDefaultSettings(options) {
        var defaults = {
            method: 'GET',
            headers: {},
            async: true,
            cors: false,
            withCredentials: false,
            csrfNameSelector: 'meta[name="csrf-name"]',
            csrfTokenSelector: 'meta[name="csrf-token"]'
        };
        var settings = extend({}, defaults, options);
        if (!settings.cors && !settings.headers['X-Requested-With']) {
            settings.headers['X-Requested-With'] = 'XMLHttpRequest';
        }
        if (settings.method.toUpperCase() === 'POST' && (settings.contentType === null || settings.contentType === undefined)) {
            settings.contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
        }
        return settings;
    }

    function getValueFromSelector(selector) {
        if (selector) {
            if (isFunction(selector)) {
                return selector();
            } else {
                var el = document.querySelector(selector);
                if (el) {
                    return el.content || el.value;
                }
            }
        }
    }

    function setCsrfToken(settings) {
        var tokenName = getValueFromSelector(settings.csrfNameSelector),
            tokenValue = getValueFromSelector(settings.csrfTokenSelector);
        if (tokenName && tokenValue) {
            settings.headers[tokenName] = tokenValue;
        }
    }
    window.CartoUtils = {};
    window.CartoUtils.comparable = comparable;
    window.CartoUtils.extend = extend;
    window.CartoUtils.xhr = function (options) {
        var settings = setXHRDefaultSettings(options);
        var req = new XMLHttpRequest();
        if (settings.withCredentials && 'withCredentials' in req) {
            req.withCredentials = true;
        }
        setCsrfToken(settings);
        req.open(settings.method, settings.url, settings.async);
        if (settings.contentType) {
            req.setRequestHeader('Content-Type', settings.contentType);
        }
        setCsrfToken(settings);
        for (var header in settings.headers) {
            if (settings.headers.hasOwnProperty(header)) {
                req.setRequestHeader(header, settings.headers[header]);
            }
        }
        req.onreadystatechange = function readyState() {
            if (req.readyState === 4) {
                if (req.status >= 200 && req.status < 300 || req.status === 304) {
                    var responseBody = req.responseText;
                    if (settings.json) {
                        responseBody = JSON.parse(responseBody);
                    }
                    if (isFunction(settings.success)) {
                        settings.success(responseBody, req, req.status);
                    }
                } else if (isFunction(settings.error)) {
                    settings.error(req, req.status);
                }
            }
        };
        var data = settings.data || null;
        req.send(data);
    };
})();
(function () {
    'use strict';
    var TypeElement = {
        MARKER: 'MARKER',
        POLYGON: 'POLYGONE'
    };
    var TRADUCTIONS = {};

    function Lieu(d) {
        var _this, element, data = d;

        function build(map) {
            if (this.type === TypeElement.MARKER) {
                var ccIcon;
                if (this.picto) {
                    var ccIcon = L.icon({
                        iconUrl: this.picto,
                        iconAnchor: [10, 30],
                        shadowUrl: '/extensions/lieu/images/marker-shadow.png',
                        shadowAnchor: [12, 41]
                    });
                } else {
                    ccIcon = L.divIcon({
                        className: "",
                        iconAnchor: [10, 30],
                        html: `<span class="carto__marker"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 71.95 97.71" width="30" height="30"><path d="M48.855 0C29.021 0 12.883 16.138 12.883 35.974c0 5.174 1.059 10.114 3.146 14.684 8.994 19.681 26.238 40.46 31.31 46.359a2.003 2.003 0 003.034 0c5.07-5.898 22.314-26.676 31.311-46.359 2.088-4.57 3.146-9.51 3.146-14.684C84.828 16.138 68.69 0 48.855 0zm0 54.659c-10.303 0-18.686-8.383-18.686-18.686 0-10.304 8.383-18.687 18.686-18.687s18.686 8.383 18.686 18.687c.001 10.303-8.382 18.686-18.686 18.686z"/></svg></span>`
                    })
                }
                element = L.marker(this.coordinates, {
                    icon: ccIcon,
                    title: this.title
                });
            } else if (this.type === TypeElement.POLYGON) {
                element = L.polygon(this.coordinates, {
                    color: this.color
                });
            }
            if (element) {
                element.on('click', function (e) {
                    L.DomEvent.stopPropagation(e);
                    map.getMap().fire('map:lieuclicked', _this);
                });
            }
        }

        function visible(map) {
            return map.getMap().hasLayer(element);
        }

        function add(map) {
            element.addTo(map.getMap());
        }

        function remove() {
            element.remove();
        }
        _this = {
            code: data.code,
            title: data.title,
            categories: data.categories,
            type: data.type,
            coordinates: data.coordinates,
            color: data.color || '#ff00ff',
            picto: data.urlpicto,
            build: build,
            visible: visible,
            add: add,
            remove: remove
        };
        return _this;
    }

    function Search(searchwords, lieux, map) {
        var currentFocus, input = null,
            searchElm = null,
            searchZoneElm = null,
            resetBtnElm, openListBtnElm;
        var ACTIVE_CLASSNAME = 'search-autocomplete-active',
            ITEMS_CLASSNAME = 'search-autocomplete-items',
            ITEM_CLASSNAME = 'search-autocomplete-item';

        function closeAllLists(elmnt) {
            var elmList = searchElm.querySelectorAll('.' + ITEMS_CLASSNAME);
            if (elmList) {
                [].forEach.call(elmList, function (elm) {
                    if (elmnt !== elm && elmnt !== input) {
                        elm.parentNode.removeChild(elm);
                    }
                });
            }
        }

        function addActive(divListElm) {
            if (!divListElm) {
                return false;
            }
            divListElm.forEach(function (divElm) {
                divElm.classList.remove(ACTIVE_CLASSNAME);
            });
            if (currentFocus >= divListElm.length) {
                currentFocus = 0;
            }
            if (currentFocus < 0) {
                currentFocus = divListElm.length - 1;
            }
            divListElm[currentFocus].classList.add(ACTIVE_CLASSNAME);
        }

        function selectMatch(divElm) {
            var selection;
            if (divElm) {
                var inputElm = divElm.querySelector('input');
                input.value = inputElm.value;
                var lieuxSelected = inputElm.getAttribute('data-lieux');
                selection = lieuxSelected.split(',');
                resetBtnElm.classList.remove('hide');
                openListBtnElm.classList.add('hide');
            } else {
                input.value = '';
                selection = [];
                resetBtnElm.classList.add('hide');
                openListBtnElm.classList.remove('hide');
            }
            map.fire('map:resetfiltres');
            closeAllLists(null);
            [].forEach.call(lieux, function (lieu) {
                map.fire('map:togglelieu', {
                    lieu: lieu,
                    selection: selection
                });
            });
            map.fire('map:fitbounds');
        }

        function displayMatches(val, openlist) {
            var itemsElm = L.DomUtil.create('div', ITEMS_CLASSNAME, searchElm);
            itemsElm.classList.add(ITEMS_CLASSNAME + '-element');
            if (searchwords) {
                searchwords.forEach(function (searchword) {
                    var lib = searchword.libelle;
                    var idxVal = -1;
                    if (!openlist) {
                        var comparableLib = CartoUtils.comparable(lib);
                        var comparableVal = CartoUtils.comparable(val);
                        idxVal = comparableLib.indexOf(comparableVal);
                    }
                    if (openlist || val.length >= 3 && idxVal > -1) {
                        var itemElm = L.DomUtil.create('div', ITEM_CLASSNAME, itemsElm);
                        itemElm.innerHTML += lib.substr(0, idxVal);
                        itemElm.innerHTML += '<strong>' + lib.substring(idxVal, idxVal + val.length) + '</strong>';
                        itemElm.innerHTML += lib.substring(idxVal + val.length);
                        var hiddenElm = L.DomUtil.create('input', 'hidden', itemElm);
                        hiddenElm.type = 'hidden';
                        hiddenElm.value = lib;
                        hiddenElm.setAttribute('data-lieux', searchword.lieux);
                        itemElm.addEventListener('click', function () {
                            selectMatch(this);
                        });
                    }
                });
            }
        }

        function init() {
            searchZoneElm = L.DomUtil.create('div', 'search__zone');
            var actionElm = L.DomUtil.create('div', 'action', searchZoneElm);
            actionElm.classList.add('search__zone-action');
            var paneToggleBtnElm = L.DomUtil.create('button', 'pane-toggle', actionElm);
            paneToggleBtnElm.type = 'button';
            paneToggleBtnElm.value = '';
            paneToggleBtnElm.classList.add('open-list');
            paneToggleBtnElm.addEventListener('click', function () {
                map.fire('map:togglesearchzone');
                map.fire('map:togglefiltres');
            });
            searchElm = L.DomUtil.create('div', 'search', searchZoneElm);
            input = L.DomUtil.create('input', 'search__input', searchElm);
            input.type = 'text';
            input.placeholder = TRADUCTIONS.RECHERCHE_PAR_NOM;
            input.addEventListener('input', function () {
                var val = this.value;
                closeAllLists(null);
                if (!val) {
                    selectMatch();
                    return false;
                }
                currentFocus = -1;
                displayMatches(val);
            });
            input.addEventListener('keydown', function (e) {
                var divListElm = searchElm.querySelectorAll('.' + ITEMS_CLASSNAME + ' div');
                if (divListElm && divListElm.length > 0) {
                    if (e.keyCode === 40) {
                        currentFocus++;
                        addActive(divListElm);
                    } else if (e.keyCode === 38) {
                        currentFocus--;
                        addActive(divListElm);
                    } else if (e.keyCode === 13) {
                        e.preventDefault();
                        if (currentFocus > -1) {
                            if (divListElm) {
                                divListElm[currentFocus].click();
                            }
                        }
                    }
                }
            });
            resetBtnElm = L.DomUtil.create('button', 'reset hide', actionElm);
            resetBtnElm.type = 'button';
            resetBtnElm.value = '';
            openListBtnElm = L.DomUtil.create('button', 'search__zone-action-button', actionElm);
            openListBtnElm.type = 'button';
            openListBtnElm.value = '';
            resetBtnElm.addEventListener('click', function () {
                input.value = '';
                selectMatch();
            });
            openListBtnElm.addEventListener('click', function () {
                displayMatches('', true);
            });
        }
        init();
        return searchZoneElm;
    }

    function Categorie(d) {
        var _this = this,
            data = d;

        function build(container, map) {
            var idCbx = 'cc-filtre-cbx' + data.code;
            var categLi = L.DomUtil.create('li', '', container);
            categLi.classList.add('filtres__categ-element');
            var categCbx = L.DomUtil.create('input', 'cbx-categorie', categLi);
            categCbx.type = 'checkbox';
            categCbx.id = idCbx;
            categCbx.name = data.code;
            categCbx.addEventListener('click', function () {
                _this.checked = this.checked;
                map.getMap().fire('map:categclicked');
            }, false);
            var categLabel = L.DomUtil.create('label', '', categLi);
            categLabel.setAttribute('for', idCbx);
            categLabel.innerText = this.label;
            categLabel.classList.add('filtres__categ-label', 'label-checkbox');
        }
        _this = {
            code: data.code,
            label: data.label,
            lieux: data.lieux,
            checked: false,
            build: build
        };
        return _this;
    }

    function Groupe(d) {
        var data = d;

        function openList(categorieListe) {
            categorieListe.style.height = 'auto';
            categorieListe.style.display = 'inline-block';
        }

        function closeList(categorieListe) {
            categorieListe.style.height = '0';
            categorieListe.style.display = 'none';
        }

        function build(container, map) {
            var categorieDiv = L.DomUtil.create('div', 'filtres__categ closed ' + data.code, container);
            var title = L.DomUtil.create('h5', '', categorieDiv);
            title.classList.add('filtres__categ-title');
            title.innerText = data.label;
            var categorieListe = L.DomUtil.create('div', 'filtres__categ-liste', categorieDiv);
            closeList(categorieListe);
            var categorieUl = L.DomUtil.create('ul', 'filtres__categ-liste-items', categorieListe);
            var categories = [];
            [].forEach.call(data.categories || [], function (datacategorie) {
                var categorie = new Categorie(datacategorie);
                categorie.build(categorieUl, map);
                categories.push(categorie);
            });
            var fn = function (e) {
                e.preventDefault();
                if (categorieDiv.classList.contains('closed')) {
                    categorieDiv.classList.remove('closed');
                    openList(categorieListe);
                    var height = categorieListe.clientHeight;
                    closeList(categorieListe);
                    setTimeout(function () {
                        categorieListe.style.height = height;
                    }, 50);
                    categorieListe.style.display = 'inline-block';
                } else {
                    categorieDiv.classList.add('closed');
                    categorieListe.style.height = '0';
                    setTimeout(function () {
                        categorieListe.style.display = 'none';
                    }, 500);
                }
            };
            title.addEventListener('click', fn, false);
            title.addEventListener('touchend', fn, false);
            return categories;
        }
        return {
            build: build
        };
    }

    function LieuMap() {
        var _obj = this,
            map = null,
            infosficheControl, filtresControl, searchControl, categories = [],
            lieux = [],
            searchwords = [],
            centerPosition = [45, 0],
            initialzoom = 6,
            codefiche;

        function loadDataFromInput() {
            var centerLatitudeElm = document.getElementById('map-centerlatitude'),
                centerLongitudeElm = document.getElementById('map-centerlongitude'),
                initialZoomElm = document.getElementById('map-initialzoom'),
                codeficheElm = document.getElementById('map-codefiche');
            if (centerLatitudeElm && centerLongitudeElm) {
                var latitude = centerLatitudeElm.value,
                    longitude = centerLongitudeElm.value;
                if (latitude && longitude) {
                    centerPosition = [parseFloat(latitude), parseFloat(longitude)];
                }
            }
            if (initialZoomElm && initialZoomElm.value) {
                initialzoom = parseInt(initialZoomElm.value, 10);
            }
            if (codeficheElm && codeficheElm.value) {
                codefiche = codeficheElm.value;
            }
        }

        function displayInfosFiche(infosFiche) {
            if (!infosficheControl) {
                L.control.infosfiche = function (opts) {
                    infosficheControl = new L.Control.Infosfiche(opts);
                    infosficheControl.infos = infosFiche;
                    return infosficheControl;
                };
                L.control.infosfiche().addTo(map);
            } else {
                infosficheControl.update(infosFiche);
            }
        }

        function lieuClicked(data) {
            if (!infosficheControl || infosficheControl.infos.code !== data.code) {
                CartoUtils.xhr({
                    url: '/cartographie/fiche?code=' + data.code,
                    method: 'GET',
                    withCredentials: false,
                    json: true,
                    success: function (datafiche) {
                        if (datafiche) {
                            displayInfosFiche(datafiche);
                        } else {
                            console.error('erreur au chargement des données');
                        }
                    },
                    error: function () {
                        console.error('erreur au chargement des données');
                    }
                });
            }
        }

        function categClicked() {
            var checkedCateg = categories.filter(function (c) {
                return c.checked;
            });
            [].forEach.call(lieux, function (lieu) {
                map.fire('map:togglelieu', {
                    lieu: lieu,
                    checkedCateg: checkedCateg
                });
            });
            map.fire('map:fitbounds');
        }

        function toggleLieu(data) {
            var lieu = data.lieu,
                lieuOnMap = lieu.visible(_obj);
            if (data.checkedCateg) {
                var checkedCateg = data.checkedCateg;
                if (checkedCateg.length === 0) {
                    if (!lieuOnMap) {
                        lieu.add(_obj);
                    }
                } else {
                    var filtered = checkedCateg.filter(function (c) {
                        return lieu.categories.indexOf(c.code) > -1;
                    });
                    if (filtered.length > 0 && !lieuOnMap) {
                        lieu.add(_obj);
                    } else if (filtered.length === 0 && lieuOnMap) {
                        lieu.remove();
                    }
                }
            } else if (data.selection) {
                var selection = data.selection;
                if (selection.length > 0) {
                    var selected = selection.indexOf(lieu.code) > -1;
                    if (selected && !lieuOnMap) {
                        lieu.add(_obj);
                    } else if (!selected && lieuOnMap) {
                        lieu.remove();
                    }
                } else if (!lieuOnMap) {
                    lieu.add(_obj);
                }
            }
        }

        function fitBounds() {
            var selection = [],
                bounds = [];
            lieux.forEach(function (lieu) {
                if (lieu.visible(_obj)) {
                    selection.push(lieu);
                    bounds.push(lieu.coordinates);
                }
            });
            if (selection.length === 1) {
                map.fitBounds(bounds);
                var selected = selection[0];
                map.fire('map:lieuclicked', selected);
            } else if (selection.length > 1) {
                map.fitBounds(bounds, {
                    padding: [400, 0]
                });
                hideInfosFiche();
            } else {
                hideInfosFiche();
            }
        }

        function toggleSearchZone() {
            if (searchControl) {
                var container = searchControl.getContainer();
                if (container.classList.contains('closed')) {
                    container.classList.remove('closed');
                } else {
                    container.classList.add('closed');
                }
            }
        }

        function toggleFiltres() {
            if (filtresControl) {
                var container = filtresControl.getContainer();
                if (container.classList.contains('hide')) {
                    container.classList.remove('hide');
                } else {
                    container.classList.add('hide');
                }
            }
        }

        function resetFiltres() {
            if (filtresControl) {
                var container = filtresControl.getContainer();
                var cbxCategorieElmList = container.querySelectorAll('input[type=checkbox].cbx-categorie');
                if (cbxCategorieElmList) {
                    [].forEach.call(cbxCategorieElmList, function (cbxCategorieElm) {
                        cbxCategorieElm.checked = false;
                    });
                }
            }
        }

        function hideInfosFiche() {
            if (infosficheControl) {
                infosficheControl.remove();
                infosficheControl = null;
            }
        }

        function initMap() {
            map = L.map('map', {
                zoomControl: false
            }).on('map:lieuclicked', lieuClicked, false).on('map:categclicked', categClicked, false).on('map:togglelieu', toggleLieu, false).on('map:fitbounds', fitBounds, false).on('map:togglesearchzone', toggleSearchZone, false).on('map:togglefiltres', toggleFiltres, false).on('map:resetfiltres', resetFiltres, false).on('click', hideInfosFiche, false).setView(centerPosition, initialzoom);
            var osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                maxZoom: 19
            });
            map.addLayer(osmLayer);
            L.control.zoom({
                position: 'bottomright'
            }).addTo(map);
            L.Control.Infosfiche = L.Control.extend({
                options: {
                    position: 'topright'
                },
                infos: {},
                onAdd: function () {
                    this._div = L.DomUtil.create('div', 'panel panel__infosfiche');
                    return this._updateContent(this.infos);
                },
                update: function (infosFiche) {
                    if (this.infos.code !== infosFiche.code) {
                        this.infos = infosFiche;
                        this._div.innerHTML = '';
                        return this._updateContent(infosFiche);
                    }
                },
                _updateContent: function (infosFiche) {
                    var wrapper = L.DomUtil.create('div', 'wrapper__panel wrapper__panel-infosfiche', this._div);
                    var closeElm = L.DomUtil.create('div', 'close__panel', wrapper);
                    var closeBtnElm = L.DomUtil.create('button', 'close__button', closeElm);
                    closeBtnElm.type = 'button';
                    closeBtnElm.addEventListener('click', hideInfosFiche, false);
                    var titleElm = L.DomUtil.create('h3', '', wrapper);
                    titleElm.innerText = infosFiche.title;
                    titleElm.classList.add('infosfiche-title');
                    if (infosFiche.picture) {
                        var imageElm = L.DomUtil.create('img', '', wrapper);
                        imageElm.classList.add('infosfiche-img');
                        imageElm.src = infosFiche.picture;
                        imageElm.alt = infosFiche.title;
                        imageElm.title = infosFiche.title;
                    }
                    this._createContentElm(wrapper, infosFiche);
                    this._createLinkedDocsElm(wrapper, infosFiche);
                    L.DomEvent.disableClickPropagation(wrapper);
                    L.DomEvent.disableScrollPropagation(wrapper);
                    return this._div;
                },
                _createContentElm: function (wrapper, infosFiche) {
                    var contentElm = L.DomUtil.create('div', 'infosfiche__content', wrapper);
                    var adresseLinkElm = L.DomUtil.create('p', 'adresse', contentElm);
                    adresseLinkElm.innerHTML = infosFiche.adresse + '<br>' +
                        infosFiche.codePostal + ' ' + infosFiche.ville;
                    if (infosFiche.acces && infosFiche.acces.length > 0) {
                        var accesDlElm = L.DomUtil.create('dl', 'acces', contentElm);
                        infosFiche.acces.forEach(function (acces) {
                            var accesDtElm = L.DomUtil.create('dt', '', accesDlElm);
                            accesDtElm.innerHTML = acces.message;
                            var accesDdElm = L.DomUtil.create('dd', '', accesDlElm);
                            accesDdElm.innerHTML = acces.infos;
                        });
                    }
                    if (infosFiche.listeCategories && infosFiche.listeCategories.length > 0) {
                        infosFiche.listeCategories.forEach(function (categorie) {
                            var categorieElm = L.DomUtil.create('div', 'liste-categorie', contentElm);
                            var categorieTermeElm = L.DomUtil.create('span', 'liste-categorie__terme', categorieElm);
                            categorieTermeElm.innerHTML = categorie.titre + ' : ';
                            var categorieDefElm = L.DomUtil.create('span', '', categorieElm);
                            categorieDefElm.innerHTML = categorie.libelles.join(', ');
                        });
                    }
                    if (infosFiche.url) {
                        var moreLinkElm = L.DomUtil.create('a', 'button', contentElm);
                        moreLinkElm.innerHTML = TRADUCTIONS.LIRE_FICHE_COMPLETE;
                        moreLinkElm.href = infosFiche.url;
                        moreLinkElm.target = '_blank';
                        moreLinkElm.classList.add('infosfiche-link');
                    }
                },
                _createLinkedDocsElm: function (wrapper, infosFiche) {
                    if (infosFiche.linkedDocuments && infosFiche.linkedDocuments.length > 0) {
                        var containerLinkedDocsElm = L.DomUtil.create('div', 'linkeddocs__container', wrapper);
                        var titleLinkedDocsElm = L.DomUtil.create('span', 'linkeddocs__title', containerLinkedDocsElm);
                        titleLinkedDocsElm.innerText = TRADUCTIONS.FICHES_LIEES;
                        var linkedDocumentsElm = L.DomUtil.create('ul', 'linkeddocs__container-list', containerLinkedDocsElm);
                        infosFiche.linkedDocuments.forEach(function (linkedDocument) {
                            var linkedDocumentElm = L.DomUtil.create('li', 'linkeddocs__container-list-item', linkedDocumentsElm);
                            linkedDocumentElm.classList.add('linkeddocs__container-element')
                            var docElm = L.DomUtil.create('a', '', linkedDocumentElm);
                            docElm.innerText = linkedDocument.title;
                            docElm.href = linkedDocument.url;
                            docElm.target = '_blank';
                        });
                    }
                }
            });
            L.Control.Search = L.Control.extend({
                options: {
                    position: 'topleft'
                },
                datagroupes: {},
                currentFocus: null,
                onAdd: function () {
                    var _this = this;
                    _this._div = L.DomUtil.create('div', 'panel panel__search');
                    var wrapperElm = L.DomUtil.create('div', 'wrapper__panel wrapper__panel-search', this._div);
                    var headerElm = L.DomUtil.create('div', 'header__zone', wrapperElm);
                    this._createLogoElm(headerElm);
                    this._createTitleElm(headerElm);
                    var searchZone = new Search(searchwords, lieux, map);
                    wrapperElm.appendChild(searchZone);
                    L.DomEvent.disableClickPropagation(this._div);
                    L.DomEvent.disableScrollPropagation(this._div);
                    return this._div;
                },
                _createLogoElm: function (headerElm) {
                    var logoElm = document.getElementById('map-logo');
                    if (logoElm) {
                        var logoCloneElm = logoElm.cloneNode(true);
                        logoCloneElm.removeAttribute('id');
                        logoCloneElm.classList.add('carto__logo');
                        headerElm.appendChild(logoCloneElm);
                    }
                },
                _createTitleElm: function (headerElm) {
                    var cartoTitle = TRADUCTIONS.CARTOGRAPHIE_TITLE;
                    var nomSiteElm = document.getElementById('map-nomSite');
                    if (!cartoTitle && nomSiteElm) {
                        cartoTitle = nomSiteElm.value;
                    }
                    var titleElm = L.DomUtil.create('h1', 'carto-title', headerElm);
                    titleElm.innerText = cartoTitle;
                }
            });
            L.Control.Filtres = L.Control.extend({
                options: {
                    position: 'topleft'
                },
                onAdd: function () {
                    var _this = this;
                    _this._div = L.DomUtil.create('div', 'panel panel__filters');
                    var wrapper = L.DomUtil.create('div', 'wrapper__panel panel__filters-list', this._div);
                    var filtres = L.DomUtil.create('div', 'filtres', wrapper);
                    [].forEach.call(this.options.datagroupes, function (datagroupe) {
                        var groupe = new Groupe(datagroupe);
                        var addedCategories = groupe.build(filtres, _obj);
                        categories = categories.concat(addedCategories);
                    });
                    L.DomEvent.disableClickPropagation(this._div);
                    L.DomEvent.disableScrollPropagation(this._div);
                    return this._div;
                }
            });
        }

        function initSearchControl() {
            L.control.search = function (opts) {
                searchControl = new L.Control.Search(opts);
                return searchControl;
            };
            L.control.search().addTo(map);
        }

        function loadGroupesCategories(datagroupes) {
            L.control.filtres = function (opts) {
                var options = CartoUtils.extend({}, {
                    datagroupes: datagroupes
                }, opts);
                filtresControl = new L.Control.Filtres(options);
                return filtresControl;
            };
            L.control.filtres().addTo(map);
        }

        function loadTraduction() {
            CartoUtils.xhr({
                url: '/cartographie/trad',
                method: 'GET',
                withCredentials: false,
                json: true,
                success: function (data) {
                    if (data) {
                        TRADUCTIONS = data;
                    } else {
                        console.error('erreur au chargement des traductions');
                    }
                },
                error: function () {
                    console.error('erreur au chargement des traductions');
                }
            });
        }

        function loadLieux(datalieux) {
            [].forEach.call(datalieux, function (datalieu) {
                var lieu = new Lieu(datalieu);
                lieu.build(_obj);
                lieux.push(lieu);
                if (!codefiche || codefiche === lieu.code) {
                    lieu.add(_obj);
                }
            });
            map.fire('map:fitbounds');
        }

        function loadData() {
            CartoUtils.xhr({
                url: '/cartographie/data',
                method: 'GET',
                withCredentials: false,
                json: true,
                success: function (data) {
                    if (data) {
                        if (data.lieux) {
                            loadLieux(data.lieux);
                        }
                        if (data.searchwords) {
                            searchwords = data.searchwords;
                            initSearchControl();
                        }
                        if (data.groupescategories) {
                            loadGroupesCategories(data.groupescategories);
                        }
                    } else {
                        console.error('erreur au chargement des données');
                    }
                },
                error: function () {
                    console.error('erreur au chargement des données');
                }
            });
        }
        (function init() {
            loadDataFromInput();
            initMap();
            loadTraduction();
            loadData();
        })();
        _obj = {
            getMap: function () {
                return map;
            }
        };
        return _obj;
    }
    new LieuMap();
})();
