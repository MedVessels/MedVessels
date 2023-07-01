//Camada Portos
var portos = {
	"type": "FeatureCollection",
	"name": "Portos",
	"crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
	"features": [
	{ "type": "Feature", "properties": { "id": 1, "Nome": "Lisboa", "TotFretes": 13 }, "geometry": { "type": "Point", "coordinates": [ -9.242197253433176, 38.695380774032472 ] } },
	{ "type": "Feature", "properties": { "id": 2, "Nome": "Tunísia", "TotFretes": 1 }, "geometry": { "type": "Point", "coordinates": [ 10.304249695235058, 36.805112857699399 ] } },
	{ "type": "Feature", "properties": { "id": 3, "Nome": "Sicília", "TotFretes": 1 }, "geometry": { "type": "Point", "coordinates": [ 15.147467358686669, 36.86103924945327 ] } },
	{ "type": "Feature", "properties": { "id": 4, "Nome": "Hyères", "TotFretes": 1 }, "geometry": { "type": "Point", "coordinates": [ 6.15914632498149, 43.08241667033348 ] } },
	{ "type": "Feature", "properties": { "id": 5, "Nome": "Civitavecchia", "TotFretes": 1 }, "geometry": { "type": "Point", "coordinates": [ 11.771618460298964, 42.104331351410266 ] } },
	{ "type": "Feature", "properties": { "id": 6, "Nome": "Córsega", "TotFretes": 1 }, "geometry": { "type": "Point", "coordinates": [ 8.760153517743181, 42.563418182374264 ] } },
	{ "type": "Feature", "properties": { "id": 7, "Nome": "Génova", "TotFretes": 2 }, "geometry": { "type": "Point", "coordinates": [ 8.918817197291972, 44.398743391347203 ] } },
	{ "type": "Feature", "properties": { "id": 8, "Nome": "La Spezia", "TotFretes": 1 }, "geometry": { "type": "Point", "coordinates": [ 9.909678952254103, 44.071509380305571 ] } },
	{ "type": "Feature", "properties": { "id": 9, "Nome": "Porto Pisano", "TotFretes": 7 }, "geometry": { "type": "Point", "coordinates": [ 10.2816615253092, 43.680844140362083 ] } },
	{ "type": "Feature", "properties": { "id": 9, "Nome": "Pisa", "TotFretes": 7 }, "geometry": { "type": "Point", "coordinates": [ 10.268612409699587, 43.676866698822785 ] } }
	]
	}
	

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
var Portos = L.geoJSON(portos, {
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
		onEachFeature: function (feature,layer) {
			layer.bindPopup(feature.properties.Nome+'</p>'+'Total de fretes: '+feature.properties.TotFretes)
		}

}).addTo(map);

// Ajustar a exibição do mapa para se ajustar à camada de portos
map.fitBounds(Portos.getBounds());

  





