var hst = 'https://samizdat.blob.core.windows.net/storage/';
if (window.location.hostname == 'localhost') {
  hst = './scratch/'
};

var selCont = '<select>'
winOrder.forEach(function(e) {
  selCont += '<option value="' + e + '">' + partyNames[e]['NAZEV_STRK'] + '</option>'
});
selCont += '</select>'
$('#select').html(selCont)

function getColor(party, y13, y17) {
  var val = y17 - y13

  var col;
  if (val <= breaks[party][0]) { col = 'rgba(215,48,39, 0.7)' } else
  if (val <= breaks[party][1]) { col = 'rgba(252,141,89, 0.7)' } else
  if (val <= breaks[party][2]) { col = 'rgba(254,224,144, 0.7)' } else // nula
  if (val <= breaks[party][3]) { col = 'rgba(224,243,248, 0.7)' } else
  if (val <= breaks[party][4]) { col = 'rgba(145,191,219), 0.7' } else
  if (val > breaks[party][4]) { col = 'rgba(69,117,180, 0.7)' } else
    {col = "white"}

  var style = new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: "lightgray",
      width: 0.7
    }),
    fill: new ol.style.Fill({
      color: col
    })
  })
  return style;
};

function makeTooltip(party, evt) {
  for (var key in evt) {
    if (key.startsWith('r_')) {
      data[parseInt(key.replace('r_', ''))] = evt[key]
    }
  }

  var rozdil = evt['R17_' + party] - evt['R13_' + party];

  var blabol = '<b>' + (evt['NAZ_ZKR_MOaMC'] || evt['NAZ_OBEC']) + '</b>, okres ' + evt['NAZ_LAU1'] + '<br>'
  if (isNaN(rozdil)){
    return;
  }
  else if (rozdil >= 0) {
    blabol += 'Strana ' + partyNames[party]['ZKRATKAK8'] + ' zde <span style="color: #4575b4;">získala ' + (Math.round(rozdil * 100) / 100) + ' p. b.</span> (PSP 2013: ' + evt['R13_' + party] + ' %, PSP 2017: ' + evt['R17_' + party] + ' %)'
  } else {
    blabol += 'Strana ' + partyNames[party]['ZKRATKAK8'] + ' zde <span style="color: #d73027;">ztratila ' + Math.abs((Math.round(rozdil * 100) / 100)) + ' p. b.</span> (PSP 2013: ' + evt['R13_' + party] + ' %, PSP 2017: ' + evt['R17_' + party] + ' %)'
  };

  document.getElementById('tooltip').innerHTML = blabol
};

var tilegrid = ol.tilegrid.createXYZ({tileSize: 512, maxZoom: 12});

var background = new ol.layer.Tile({
  source: new ol.source.OSM({
    url: 'https://interaktivni.rozhlas.cz/tiles/ton_b1/{z}/{x}/{y}.png',
    attributions: [
      new ol.Attribution({ html: 'obrazový podkres <a target="_blank" href="http://stamen.com">Stamen</a>, <a target="_blank" href="https://samizdat.cz">Samizdat</a>, data <a target="_blank" href="https://www.czso.cz/csu/czso/uchazeci-o-zamestnani-dosazitelni-a-podil-nezamestnanych-osob-podle-obci">ČSÚ</a>'})
    ]
  })
})

var labels = new ol.layer.Tile({
  source: new ol.source.OSM({
    url: 'https://interaktivni.rozhlas.cz/tiles/ton_l1/{z}/{x}/{y}.png',
    maxZoom: 11
  })
})

function drawMap(party) {
  $('#map').empty()
  var layer = new ol.layer.VectorTile({
    source: new ol.source.VectorTile({
      format: new ol.format.MVT(),
      tileGrid: tilegrid,
      tilePixelRatio: 8,
      url: hst + 'prez18-k1-tiles/{z}/{x}/{y}.pbf'
    }),
    style: function(feature) {
      return getColor(party, feature.get('R13_' + party), feature.get('R17_' + party))
    }
  });

  var initZoom;

  if (window.innerWidth < 768) {
    initZoom = 6;
    document.getElementById('tooltip').innerHTML = 'Kliknutím vyberte obec.'
  } else {
    initZoom = 7;
  }

  var map = new ol.Map({
    interactions: ol.interaction.defaults({mouseWheelZoom:false}),
    target: 'map',
    view: new ol.View({
      center: ol.proj.transform([15.3350758, 49.7417517], 'EPSG:4326', 'EPSG:3857'), //Číhošť
      zoom: initZoom,
      minZoom: 6,
      maxZoom: 11
    })
  });

  map.addLayer(background);
  map.addLayer(layer);
  map.addLayer(labels);

  map.on('pointermove', function(evt) {
    if (evt.dragging) {
      return;
    }
    var pixel = map.getEventPixel(evt.originalEvent);
    if (map.hasFeatureAtPixel(pixel)){
      map.forEachFeatureAtPixel(pixel, function(feature, layer) {
        makeTooltip(party, feature.c);
      });
    } else {
      document.getElementById('tooltip').innerHTML = 'Najetím vyberte obec.'
    }
  });

  //mobil
  map.on('singleclick', function(evt) {
    var pixel = map.getEventPixel(evt.originalEvent);
    if (map.hasFeatureAtPixel(pixel)){
      map.forEachFeatureAtPixel(pixel, function(feature, layer) {
        makeTooltip(party, feature.c);
      });
    } else {
      document.getElementById('tooltip').innerHTML = 'Kliknutím vyberte obec.'
    }
  });

var form = document.getElementById("frm-geocode");
var geocoder = null;
var geocodeMarker = null;
form.onsubmit = function(event) {
  event.preventDefault();
  var text = document.getElementById("inp-geocode").value;
  if (text == '') {
    map.getView().setCenter(ol.proj.transform([15.3350758, 49.7417517], 'EPSG:4326', 'EPSG:3857'))
    map.getView().setZoom(8)
  } else {
    $.get( "https://api.mapy.cz/geocode?query=" + text, function(data) {
      if (typeof $(data).find('item').attr('x') == 'undefined') {
        alert("Bohužel, danou adresu nebylo možné najít");
        return;
      }
      var x = parseFloat($(data).find('item').attr('x'))
      var y = parseFloat($(data).find('item').attr('y'))
      map.getView().setCenter(ol.proj.transform([x, y], 'EPSG:4326', 'EPSG:3857'))
      map.getView().setZoom(12)
    }, 'xml');
  } 
};
};

drawMap(768)

$('#select').on('change', function() {
  drawMap(parseInt($(this).find(":selected").val()));
});

