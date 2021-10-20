var map = L.map('mapid').setView([48.9572, 2.3404], 11);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | <a href="https://www.univ-paris13.fr/">Université Sorbonne Paris Nord</a>'
}).addTo(map);

// LES CAMPUS


var campVilletaneuse = L.marker([48.9572, 2.3404]).bindPopup('<img src="assets/img/Paris-13.jpg" alt="Photo du campus de l\'Université Sorbonne Paris Nord"><h3>Campus de Villetaneuse</h3><div class="description"><p>L\'université Sorbonne Paris Nord est l\'une des universités qui ont succédé à la Sorbonne après l\'éclatement de l\'université de Paris en treize universités autonomes en 1968.<br><br>Successivement nommée « Université Paris-XIII », « Université Paris-Nord », « Université Paris-XIII-Paris-Nord », puis « Université Paris-XIII » (nom adopté en 2014), elle a connu plusieurs appellations au cours de cette moitié de siècle.<br><br>Elle est rebaptisée « Université Sorbonne-Paris-Nord » le 1er janvier 2020.</p></div>').openPopup(); // Campus de Villetaneuse

var campSaintDenis = L.marker([48.9389648, 2.3547714]).bindPopup('<img src="assets/img/saint-denis.png" alt="Campus de Saint-Denis"><h3>Campus de Saint-Denis</h3><div class="description"><p>À la place actuelle de l\'’IUT de Saint Denis se trouvait la Caserne des Suisses, construite en 1756 par Charles Axel Guillaumot. En 1969, 213 ans après sa construction, la Caserne a été démolie pour construire l’IUT Saint Denis Grande Caserne, qui deviendra à la suite IUT de Saint Denis II puis IUT de Saint Denis. Le fronton de la Caserne des Suisses a été classé aux monuments historiques en 1988 et se trouve toujours à l’IUT.</p></div>').openPopup(); // Campus de Saint-Denis

var campBobigny = L.marker([48.91409, 2.41941]).bindPopup('<h3>Campus de Bobigny</h3>').openPopup(); // Campus de Bobigny

var campArgenteuil = L.marker([48.94601, 2.25457]).bindPopup('<img src="assets/img/argenteuil.png" alt="Bâtiment d\'Argenteuil"><h3>Campus d\'Argenteuil</h3><div class="description"><p>Le bâtiment du campus d’Argenteuil était un commissariat. À noter qu’entre 1979 et 1993, l’université Sorbonne Paris Nord disposait déjà d’une antenne Argenteuillaise. Jean François Méla, ancien Président de l’université ne souhaitant plus que l’université soit éclatée, a décidé de fermer cette antenne en 1993. C’est en 2011 que cette antenne de l’université dans le Val-d’Oise est de nouveau ouverte.</p></div>').openPopup().addTo(map); // Campus d'Argenteuil

var campPlaineStDenis = L.marker([48.91200518277618, 2.3613174983764798]).bindPopup('<img src="assets/img/halle-montjoie.jpg" alt="La Halle Montjoie""><h3>La Halle Montjoie</h3><div class="description"><p>La halle Montjoie n’a pas toujours été une implantation universitaire. D’abord usine de construction de métro de l’entreprise Jeumont Schneider, puis friche industrielle, elle a été reconvertie dans les années 90 par l’architecte Renée Gailhoustet. Cette halle est devenue tour à tour un immeuble de bureau puis un campus de l’université Sorbonne Paris Nord. C’est en 2003 que la halle ouvre aux étudiants et change de nom pour devenir halle Montjoie, en référence au quartier de la ZAC Montjoie qui l’entoure.</p></div>').openPopup(); // La Halle Monjoie


// LES OEUVRES D'ART

var artBancs = L.marker([48.95819, 2.34041]).bindPopup('<img src="assets/img/les-bancs.jpg" alt="Les bancs"><h3>Les bancs</h3><div class="description"><p>L\’artiste néerlandais Jan Snoeck, déjà auteur des Rochers décrits ci-dessus, a réalisé l’œuvre du 1% artistique de la deuxième phase de construction du campus de Villetaneuse en 1982.<br><br>En béton et colorés, ils accueillent régulièrement les étudiants qui viennent s\’y asseoir, ce qui répond à l\’objectif de l’artiste qui souhaitait créer un espace d\’échange et de convivialité.</p></div>').openPopup(); // Les bancs

var artRochers = L.marker([48.95471, 2.34116]).bindPopup('<img src="assets/img/rochers.jpg" alt="Les rochers"><h3>Les rochers</h3><div class="description"><p>L\’artiste néerlandais Jan Snoeck a réalisé l\’œuvre “Les Rochers” dans le cadre du 1% artistique du campus de Villetaneuse.<br><br>Implantés devant le restaurant du Crous “l\’Arlequin”, cette œuvre de l’artiste néerlandais Jan Snoeck, composée de plusieurs rochers était à l’époque colorée, dans des tonalités vives (rouge, jaune…). Après plusieurs années, l\’œuvre a été repeinte en blanc et continue d’accueillir régulièrement des étudiants qui s\’y retrouvent pour échanger, rendant ainsi hommage à l\’intention de l\’artiste.</p></div>').openPopup(); // Les rochers

var artColonne = L.marker([48.95574, 2.3409]).bindPopup('<img src="assets/img/colonne.jpg" alt="La colonne de Carlos Cruz-Diez"><h3>La colonne</h3><div class="description"><p>L’artiste vénézuélien Carlos Cruz-Diez a réalisé “La Colonne chromointerférente” au titre du 1% artistique du campus de Villetaneuse.<br><br>Située dans le patio de l’UFR LLSHS, elle a été érigée en 1971. Adepte de l’art optique, ou Op Art, qui revendique « la prise de conscience de l’instabilité du réel », l’artiste a proposé une œuvre chromointerférente jouant en permanence avec les couleurs et les illusions d’optique.<br><br>Un système de petite cage qui se déplace de haut en bas grâce à un système électrique provoque des interférences de couleurs qui varient selon l’endroit où se trouve le spectateur.</p></div>').openPopup(); // La colonne de Carlos Cruz-Diez

var artInterstellaires = L.marker([48.95733, 2.33918]).bindPopup('<img src="assets/img/mires-interstellaires.jpg" alt="Les mires Interstellaires"><h3>Les mires Interstellaires</h3><div class="description"><p>L’artiste italien Adalberto Mecarelli a installé “les mires Interstellaires” dans le cadre du 1% artistique du campus de Villetaneuse.<br><br>Par un système de réflexion entre les œuvres, un miroir placé au sommet de la mire en face de l’Institut Galilée réfléchit un faisceau de lumière solaire au centre de la phrase inscrite sur la façade de l’Institut Galilée « Eppur sur muove ».<br><br>Ce phénomène se produit une seule fois par an : le 20 juin à midi pile, jour anniversaire du procès à l’issue duquel Galilée fut condamné à abjurer ses théories par l’Église catholique.</p></div>').openPopup(); // Les mires Interstellaires

var artIllustration = L.marker([48.91347, 2.4188]).bindPopup('<img src="assets/img/tour-illustration.jpg" alt="La Tour de l\'Illustration"><h3>La Tour de l\'Illustration</h3><div class="description"><p>Bâtiment classé au patrimoine dont l’architecture est un témoignage de la période industrielle, a été éclairée toutes les nuits pendant de nombreuses années. Cet éclairage et sa forme lui ont valu un surnom : le phare. Les besoins en eau d’une imprimerie étant énormes, ce “phare” faisait aussi office de château d’eau.</p></div>').openPopup(); // La Tour de l'Illustration

var artSante = L.marker([48.91289, 2.42036]).bindPopup('<img src="assets/img/sante.jpg" alt="Le mot "sante""><h3>Le mot "santé"</h3><div class="description"><p>L’artiste Pierre Di Siullo a réalisé l’œuvre du 1% artistique du campus de Bobigny. À cette occasion, il a créé le mot “Santé”, qui a été accroché sur le campus au niveau de l’entrée rue Marcel Cachin.<br><br>Entrée historique de l’UFR SMBH Léonard de Vinci au 74 avenue Marcel Cachin à Bobigny. On peut voir au premier plan le mot “Santé”, oeuvre de l’artiste Pierre Di Sciullo au titre du 1% artistique réalisé en 1997. En arrière-plan on aperçoit la tour de l’Illustration avant l’installation de l’horloge.</p></div>').openPopup() // Le mot santé

var artSculpture = L.marker([48.939, 2.35453]).bindPopup('<img src="assets/img/sculpture-iut.jpg" alt="La sculpture de l\'IUT de Saint-Denis""><h3>La sculpture de l\'IUT de Saint-Denis</h3><div class="description"><p>L’artiste cubain Augustin Cardenas a réalisé une statue dans le cadre du 1% artistique du campus de l’IUT de Saint-Denis. À découvrir dans le jardin !</p></div>').openPopup(); // La sculpture de l'IUT de Saint-Denis

var cities = L.layerGroup([campVilletaneuse,campBobigny,campArgenteuil,campSaintDenis,campPlaineStDenis,artBancs,artRochers,artColonne,artInterstellaires,artIllustration,artSante,artSculpture]).addTo(map);

coords = [
        [48.9572, 2.3404],
        [48.9389648, 2.3547714],
        [48.91409, 2.41941],
        [48.94601, 2.25457],
        [48.95819, 2.34041],
        [48.95471, 2.34116],
        [48.95574, 2.34095],
        [48.95733, 2.33918],
        [48.91347, 2.4188],
        [48.91289, 2.42036],
        [48.939, 2.35453],
        [48.91200518277618, 2.3613174983764798]
    ];

let l = coords.length;

var villeta = document.querySelector('#villetaneuse');
var argenteuil = document.querySelector('#argenteuil');
var bobigny = document.querySelector('#bobigny');
var saintDenis = document.querySelector('#saint-denis');
var bancs = document.querySelector('#bancs');
var rochers = document.querySelector('#rochers');
var colonne = document.querySelector('#colonne');
var mires = document.querySelector('#mires');
var tourIllustration = document.querySelector('#tourIllustration');
var sante = document.querySelector('#sante');
var sculpture = document.querySelector('#sculpture');
var halleMontjoie = document.querySelector('#plaine-sd');



sites = [villeta, saintDenis, bobigny, argenteuil, bancs, rochers, colonne, mires, tourIllustration, sante, sculpture, halleMontjoie];



for (let i = 0; i < l; i++) {

    // Zoom in / fly to

    sites[i].addEventListener("click", () => {
        map.flyTo(coords[i], 18);
    })

}



	//sample data values for populate map
	var data = [
		{"loc":[48.9572, 2.3404], "title":"Campus de Villetaneuse", "popup": '<img src="assets/img/Paris-13.jpg" alt="Photo du campus de l\'Université Sorbonne Paris Nord"><h3>Campus de Villetaneuse</h3><div class="description"><p>L\'université Sorbonne Paris Nord est l\'une des universités qui ont succédé à la Sorbonne après l\'éclatement de l\'université de Paris en treize universités autonomes en 1968.<br><br>Successivement nommée « Université Paris-XIII », « Université Paris-Nord », « Université Paris-XIII-Paris-Nord », puis « Université Paris-XIII » (nom adopté en 2014), elle a connu plusieurs appellations au cours de cette moitié de siècle.<br><br>Elle est rebaptisée « Université Sorbonne-Paris-Nord » le 1er janvier 2020.</p></div>' },
		{"loc":[48.9389648, 2.3547714], "title":"Campus de Saint-Denis", "popup" : '<img src="assets/img/saint-denis.png" alt="Campus de Saint-Denis"><h3>Campus de Saint-Denis</h3><div class="description"><p>À la place actuelle de l\'’IUT de Saint Denis se trouvait la Caserne des Suisses, construite en 1756 par Charles Axel Guillaumot. En 1969, 213 ans après sa construction, la Caserne a été démolie pour construire l’IUT Saint Denis Grande Caserne, qui deviendra à la suite IUT de Saint Denis II puis IUT de Saint Denis. Le fronton de la Caserne des Suisses a été classé aux monuments historiques en 1988 et se trouve toujours à l’IUT.</p></div>'},
		{"loc":[48.91409, 2.41941], "title":"Campus de Bobigny", "popup": '<h3>Campus de Bobigny</h3>'},
		{"loc":[48.94601, 2.25457], "title":"Campus d'Argenteuil", "popup":'<img src="assets/img/argenteuil.png" alt="Bâtiment d\'Argenteuil"><h3>Campus d\'Argenteuil</h3><div class="description"><p>Le bâtiment du campus d’Argenteuil était un commissariat. À noter qu’entre 1979 et 1993, l’université Sorbonne Paris Nord disposait déjà d’une antenne Argenteuillaise. Jean François Méla, ancien Président de l’université ne souhaitant plus que l’université soit éclatée, a décidé de fermer cette antenne en 1993. C’est en 2011 que cette antenne de l’université dans le Val-d’Oise est de nouveau ouverte.</p></div>'},
		{"loc":[48.91200518277618, 2.3613174983764798], "title":"Campus de la Plaine-Saint-Denis", "popup" : '<img src="assets/img/halle-montjoie.jpg" alt="La Halle Montjoie""><h3>La Halle Montjoie</h3><div class="description"><p>La halle Montjoie n’a pas toujours été une implantation universitaire. D’abord usine de construction de métro de l’entreprise Jeumont Schneider, puis friche industrielle, elle a été reconvertie dans les années 90 par l’architecte Renée Gailhoustet. Cette halle est devenue tour à tour un immeuble de bureau puis un campus de l’université Sorbonne Paris Nord. C’est en 2003 que la halle ouvre aux étudiants et change de nom pour devenir halle Montjoie, en référence au quartier de la ZAC Montjoie qui l’entoure.</p></div>'},
		{"loc":[48.95819, 2.34041], "title":"Les bancs", "popup" : '<img src="assets/img/les-bancs.jpg" alt="Les bancs"><h3>Les bancs</h3><div class="description"><p>L\’artiste néerlandais Jan Snoeck, déjà auteur des Rochers décrits ci-dessus, a réalisé l’œuvre du 1% artistique de la deuxième phase de construction du campus de Villetaneuse en 1982.<br><br>En béton et colorés, ils accueillent régulièrement les étudiants qui viennent s\’y asseoir, ce qui répond à l\’objectif de l’artiste qui souhaitait créer un espace d\’échange et de convivialité.</p></div>'},
		{"loc":[48.95471, 2.34116], "title":"Les rochers", "popup": '<img src="assets/img/rochers.jpg" alt="Les rochers"><h3>Les rochers</h3><div class="description"><p>L\’artiste néerlandais Jan Snoeck a réalisé l\’œuvre “Les Rochers” dans le cadre du 1% artistique du campus de Villetaneuse.<br><br>Implantés devant le restaurant du Crous “l\’Arlequin”, cette œuvre de l’artiste néerlandais Jan Snoeck, composée de plusieurs rochers était à l’époque colorée, dans des tonalités vives (rouge, jaune…). Après plusieurs années, l\’œuvre a été repeinte en blanc et continue d’accueillir régulièrement des étudiants qui s\’y retrouvent pour échanger, rendant ainsi hommage à l\’intention de l\’artiste.</p></div>'},	
		{"loc":[48.95574, 2.3409], "title":"La colonne de Carlos Cruz-Diez", "popup":'<img src="assets/img/colonne.jpg" alt="La colonne de Carlos Cruz-Diez"><h3>La colonne</h3><div class="description"><p>L’artiste vénézuélien Carlos Cruz-Diez a réalisé “La Colonne chromointerférente” au titre du 1% artistique du campus de Villetaneuse.<br><br>Située dans le patio de l’UFR LLSHS, elle a été érigée en 1971. Adepte de l’art optique, ou Op Art, qui revendique « la prise de conscience de l’instabilité du réel », l’artiste a proposé une œuvre chromointerférente jouant en permanence avec les couleurs et les illusions d’optique.<br><br>Un système de petite cage qui se déplace de haut en bas grâce à un système électrique provoque des interférences de couleurs qui varient selon l’endroit où se trouve le spectateur.</p></div>'},
		{"loc":[48.95733, 2.33918], "title":"Les mires Interstellaires","popup": '<img src="assets/img/mires-interstellaires.jpg" alt="Les mires Interstellaires"><h3>Les mires Interstellaires</h3><div class="description"><p>L’artiste italien Adalberto Mecarelli a installé “les mires Interstellaires” dans le cadre du 1% artistique du campus de Villetaneuse.<br><br>Par un système de réflexion entre les œuvres, un miroir placé au sommet de la mire en face de l’Institut Galilée réfléchit un faisceau de lumière solaire au centre de la phrase inscrite sur la façade de l’Institut Galilée « Eppur sur muove ».<br><br>Ce phénomène se produit une seule fois par an : le 20 juin à midi pile, jour anniversaire du procès à l’issue duquel Galilée fut condamné à abjurer ses théories par l’Église catholique.</p></div>' },
		{"loc":[48.91347, 2.4188], "title":"La Tour de l'Illustration", "popup": '<img src="assets/img/tour-illustration.jpg" alt="La Tour de l\'Illustration"><h3>La Tour de l\'Illustration</h3><div class="description"><p>Bâtiment classé au patrimoine dont l’architecture est un témoignage de la période industrielle, a été éclairée toutes les nuits pendant de nombreuses années. Cet éclairage et sa forme lui ont valu un surnom : le phare. Les besoins en eau d’une imprimerie étant énormes, ce “phare” faisait aussi office de château d’eau.</p></div>'},
		{"loc":[48.91289, 2.42036], "title":"Le mot santé", "popup": '<img src="assets/img/sante.jpg" alt="Le mot "sante""><h3>Le mot "santé"</h3><div class="description"><p>L’artiste Pierre Di Siullo a réalisé l’œuvre du 1% artistique du campus de Bobigny. À cette occasion, il a créé le mot “Santé”, qui a été accroché sur le campus au niveau de l’entrée rue Marcel Cachin.<br><br>Entrée historique de l’UFR SMBH Léonard de Vinci au 74 avenue Marcel Cachin à Bobigny. On peut voir au premier plan le mot “Santé”, oeuvre de l’artiste Pierre Di Sciullo au titre du 1% artistique réalisé en 1997. En arrière-plan on aperçoit la tour de l’Illustration avant l’installation de l’horloge.</p></div>'},
		{"loc":[48.939, 2.35453], "title":"La sculpture de l'IUT de Saint-Denis", "popup" : '<img src="assets/img/sculpture-iut.jpg" alt="La sculpture de l\'IUT de Saint-Denis""><h3>La sculpture de l\'IUT de Saint-Denis</h3><div class="description"><p>L’artiste cubain Augustin Cardenas a réalisé une statue dans le cadre du 1% artistique du campus de l’IUT de Saint-Denis. À découvrir dans le jardin !</p></div>'}
	];





//	BARRE DE RECHERCHE

	var markersLayer = L.layerGroup();	//layer contain searched elements
	map.addLayer(markersLayer);

	var controlSearch = new L.Control.Search({layer: markersLayer, initial: false, position:'topright'});

	map.addControl( controlSearch );

	////////////populate map with markers from sample data

	for(i in data) {
		var title = data[i].title,	//value searched
			loc = data[i].loc,		//position found
            popup = data[i].popup,
			marker = new L.Marker(new L.latLng(loc), {title: title}, {popup: popup} );//se property searched
		marker.bindPopup(popup);
		markersLayer.addLayer(marker);
	}

	$('#textsearch').on('keyup', function(e) {

		controlSearch.searchText( e.target.value );

	});



// POUR PLACER LA BARRE DE RECHERCHE DANS LE MENU

var searchBarPosition = document.querySelector('.leaflet-right');

var searchbar = searchBarPosition.childNodes;

var menu = document.querySelector('.menu-title-container');

for (var i = 0; i < searchbar.length; i++) {
    menu.appendChild(searchbar[i]);
};