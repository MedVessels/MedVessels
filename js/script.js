var map = L.map('map').setView([40, -0.09], 6);

//L.tileLayer.grayscale('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
//	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
//}).addTo(map);

var GrayScale = L.tileLayer.grayscale('https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: US National Park Service',
	maxZoom: 8
});

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

var CartoDB_DarkMatterNoLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 20
});

var GeoportailFrance_orthos = L.tileLayer('https://wxs.ign.fr/{apikey}/geoportail/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE={style}&TILEMATRIXSET=PM&FORMAT={format}&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}', {
	attribution: '<a target="_blank" href="https://www.geoportail.gouv.fr/">Geoportail France</a>',
	bounds: [[-75, -180], [81, 180]],
	minZoom: 2,
	maxZoom: 20,
	apikey: 'choisirgeoportail',
	format: 'image/jpeg',
	style: 'normal'
}).addTo(map);

//Layer control
var baseLayers = {
  "Grayscale":GrayScale,
  "Satélite": Esri_WorldImagery,
  "Modo Escuro": CartoDB_DarkMatterNoLabels,
  "Ortofoto": GeoportailFrance_orthos
};

L.control.layers(baseLayers).addTo(map);
// adicionar a camada portos
var addPortos = L.geoJSON(portos,{
	pointToLayer: function (feature, latlng) {
	return L.circleMarker(latlng, {
		radius: 5,
		fillColor: "red",
		color: "#000",
		weight: 1,
		opacity: 1,
		fillOpacity: 0.8
		});
		},
	}).addTo(map);

  





