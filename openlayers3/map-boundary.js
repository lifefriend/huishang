/**
 * init map.
 */
var boundaryurl = 'assets/data/json/1.json';
var boundaryurl2 = 'assets/data/json/2.json';
var boundaryurl3 = 'assets/data/json/3.json';

var map = new ol.Map({
    interactions: ol.interaction.defaults({ doubleClickZoom: true ,pinchRotate:false}),
    layers: [],
    target: 'map',
    view: new ol.View({
        center: center,
        projection: 'EPSG:4326',
        zoom: 10,
        minZoom: 2,
        maxZoom: 18
    })
});

var boundarylayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: boundaryurl,
        crossOrigin: 'anonymous',
        format: new ol.format.EsriJSON()
    })
});
var createStyle = new ol.style.Style({
    fill: new ol.style.Fill({
        color: 'rgba(255, 255, 255, 0.5)'
    }),
    stroke: new ol.style.Stroke({
        color: '#818181',
        width: 2
    })
});

var boundarylayer2 = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: boundaryurl2,
        crossOrigin: 'anonymous',
        format: new ol.format.EsriJSON()
    })
});
var createStyle2 = new ol.style.Style({
    fill: new ol.style.Fill({
        color: 'rgba(255, 255, 255, 0)'
    }),
    stroke: new ol.style.Stroke({
        color: '#a0a0a0',
        width: 3
    })
});

var boundarylayer3 = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: boundaryurl2,
        crossOrigin: 'anonymous',
        format: new ol.format.EsriJSON()
    })
});
var createStyle3 = new ol.style.Style({
    fill: new ol.style.Fill({
        color: 'rgba(255, 255, 255, 0)'
    }),
    stroke: new ol.style.Stroke({
        color: '#bdbdbd',
        width: 5
    })
});

var boundarylayer4 = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: boundaryurl2,
        crossOrigin: 'anonymous',
        format: new ol.format.EsriJSON()
    })
});
var createStyle4 = new ol.style.Style({
    fill: new ol.style.Fill({
        color: 'rgba(255, 255, 255, 0)'
    }),
    stroke: new ol.style.Stroke({
        color: '#e3e3e3',
        width: 8
    })
});

var boundarylayer5 = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: boundaryurl2,
        crossOrigin: 'anonymous',
        format: new ol.format.EsriJSON()
    })
});
var createStyle5 = new ol.style.Style({
    fill: new ol.style.Fill({
        color: 'rgba(255, 255, 255, 0)'
    }),
    stroke: new ol.style.Stroke({
        color: '#f7f7f7',
        width: 11
    })
});

var boundarylayer6 = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: boundaryurl3,
        crossOrigin: 'anonymous',
        format: new ol.format.EsriJSON()
    }),
    style: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0)'
        }),
        stroke: new ol.style.Stroke({
            color: '#FE0000',
            width: 4
        })
    })
});

addClusterPoint(boundarylayer5.getSource(), createStyle5);
addClusterPoint(boundarylayer4.getSource(), createStyle4);
addClusterPoint(boundarylayer3.getSource(), createStyle3);
addClusterPoint(boundarylayer2.getSource(), createStyle2);
addClusterPoint(boundarylayer.getSource(), createStyle);

function addClusterPoint(source, style) {
    var tmpLayer = new ol.layer.Image({
        id: "cid_" + Math.random(),
        opacity: 0.95,
        maxzoom: 1224,
        minzoom: 0.0001
    });
    map.addLayer(tmpLayer);
    var vimage = new ol.source.ImageVector({
        source: source,
    });
    vimage.setStyle(style);
    tmpLayer.setSource(null);
    tmpLayer.setSource(vimage);
}