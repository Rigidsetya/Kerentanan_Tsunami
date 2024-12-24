var map = L.map('map').setView([-7.911428999231596, 110.3297865139886], 12);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 11,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// control that shows area info on hover
// const info = L.control();

// info.onAdd = function (map) {
//     this._div = L.DomUtil.create('map', 'info');
//     this.update();
//     return this._div;
// };

// info.update = function (props) {
//     const contents = props ? `<b>${props.WADMKC}</b><br />${props.Suhu} °C <sup>2</sup>` : 'Hover over an area';
//     this._div.innerHTML = `<h4>Kab.Sumbawa LST</h4>${contents}`;
// };

// info.addTo(map);


// get color depending on vektor value
function getColor(d) {
    return d > 5 ? 'rgb(255, 0, 0)' :
        d > 4 ? 'rgb(255, 0, 0)' :
        d > 3 ? 'rgb(255, 128, 0)' :
        d > 2 ? 'rgb(255, 255, 0)' :
        d > 1 ? 'rgb(56, 168, 0)' : 'rgb(76, 230, 0)';
}

function style(feature) {
    return {
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7,
        fillColor: getColor(feature.properties.Keterangan)
    };
}

function highlightFeature(e) {
    const layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    layer.bringToFront();

    info.update(layer.feature.properties.Keterangan);
}

function resetHighlight(e) {
    const layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });
    info.update();
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

const legend = L.control({ position: 'topright' });

legend.onAdd = function (map) {
    const div = L.DomUtil.create('div', 'info legend');
    const grades = ["Sangat Rendah", "Rendah", "Sedang", "Tinggi", "Sangat Tinggi"];
    const labels = [];

    for (let i = 0; i < grades.length; i++) {
        const color = getColor(i + 1);
        labels.push(`<i style="background:${color}"></i> ${grades[i]}`);
    }

    div.innerHTML = labels.join('<br>');
    return div;
};

legend.addTo(map);




function popUp(f,l){
    var out = [];
    if (f.properties){
        // for(key in f.properties){
            
        // }
        out.push("Provinsi: " + f.properties.WADMPR);
        out.push("Kabupaten: " + f.properties.WADMKK);
        out.push("Kecamatan: " + f.properties.WADMKC);
        
    }
    l.bindPopup(out.join("<br />"));
}
// var TWI = "/assets/LST.png",
//     imageBounds = [[-7.1969, 110.4336], [-6.9455, 110.308]];
//     L.imageOverlay(TWI, imageBounds).addTo(map);
// var jsonTest = new L.GeoJSON.AJAX(["../assets/geojson/Admin_Kab.Sumbawa.geojson"],{onEachFeature:popUp, style: style}).addTo(map);
var jsonTest = new L.GeoJSON.AJAX(["/assets/geojson/Kerentanan_Tsunami_Bantul_NEW.geojson"],{onEachFeature:popUp, style: style}).addTo(map);