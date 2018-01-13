var hst = 'https://samizdat.blob.core.windows.net/storage/';
if (window.location.hostname == 'localhost') {
  hst = './scratch/'
};

var isFirefox = typeof InstallTrigger !== 'undefined';
var isIE = /*@cc_on!@*/false || !!document.documentMode;
var isEdge = !isIE && !!window.StyleMedia;

var cands = {
  'HLASY_01': 'Topolánek',
  'HLASY_02': 'Horáček',
  'HLASY_03': 'Fischer',
  'HLASY_04': 'Hynek',
  'HLASY_05': 'Hannig',
  'HLASY_06': 'Kulhánek',
  'HLASY_07': 'Zeman',
  'HLASY_08': 'Hilšer',
  'HLASY_09': 'Drahoš'
};

var candsCols = {
  'HLASY_01': 'rgba(31,120,180, .7)',
  'HLASY_02': 'rgba(166,206,227, .7)',
  'HLASY_03': 'rgba(178,223,138, .7)',
  'HLASY_04': 'rgba(51,160,44, .7)',
  'HLASY_05': 'rgba(177,89,40, .7)',
  'HLASY_06': 'rgba(255,127,0, .7)',
  'HLASY_07': 'rgba(227,26,28, .7)',
  'HLASY_08': 'rgba(251,154,153, .7)',
  'HLASY_09': 'rgba(152,78,163, .7)'
};

var selCont = '<select><option value="HL_OKRS">Vítězové v okrscích</option>' 
            + '<option value="UCAST">Účast</option>'
Object.keys(cands).forEach(function(e) {
  selCont += '<option value="' + e + '">' + cands[e] + '</option>'
});
selCont += '</select>'
$('#select').html(selCont)

function orderWinners(props) {
  var out = {};
  Object.keys(props).forEach(function(key) {
    if (cands.hasOwnProperty(key)) {
      out[key] = props[key];
    };
  });
  return Object.keys(out).sort(function(a, b) {
    return out[b] - out[a]
  });
};

function getColor(props, party) {
  var col;
  if (party == 'HL_OKRS') {
    var win = orderWinners(props);
    col = candsCols[win[0]] || 'rgba(242,240,247, 1';
  } else if (party == 'UCAST') {
    var val = props['PL_HL_CELK'] / props['VOL_SEZNAM']
    if (val <= breaks[party][0]) { col = 'rgba(242,240,247, 0.7)' } else
    if (val <= breaks[party][1]) { col = 'rgba(203,201,226, 0.7)' } else
    if (val <= breaks[party][2]) { col = 'rgba(158,154,200, 0.7)' } else
    if (val <= breaks[party][3]) { col = 'rgba(117,107,177, 0.7)' } else
    if (val > breaks[party][3]) { col = 'rgba(84,39,143, 0.7)' } else
      {col = 'rgba(242,240,247, 1'}
  } else {
    var val = props[party] / props['PL_HL_CELK']
    if (val <= breaks[party][0]) { col = 'rgba(254,240,217, 0.7)' } else
    if (val <= breaks[party][1]) { col = 'rgba(253,204,138, 0.7)' } else
    if (val <= breaks[party][2]) { col = 'rgba(252,141,89, 0.7)' } else
    if (val <= breaks[party][3]) { col = 'rgba(215,48,31, 0.7)' } else
    if (val > breaks[party][3]) { col = 'rgba(215,48,31, 0.7)' } else
      {col = 'rgba(242,240,247, 1'}
  }  
 
  var style = new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: "lightgray",
      width: 0.3
    }),
    fill: new ol.style.Fill({
      color: col
    })
  })
  return style;
};

function makeTooltip(party, evt) {
  var blabol = '<b>Okrsek č. ' + evt['Cislo'] + ', ' + (evt['mc'] || evt['obec']) + '</b>, okres ' + evt['okres'] + '<br>'
  if (typeof evt['PL_HL_CELK'] == 'undefined') {
    blabol += 'Ve vojenských újezdech volby neprobíhají.'
  } else if (party == 'UCAST') {
    blabol += 'Účast zde byla ' + Math.round((evt['PL_HL_CELK'] / evt['VOL_SEZNAM']) * 1000 ) / 10 + ' %.'
  } else if (party == 'HL_OKRS') {
    var win = orderWinners(evt);
    for (var key in win) {
      console.log(win[key])
      blabol += '<b><span style="color: ' + candsCols[win[key]].replace('.7', '1') + ';">' + cands[win[key]] + '</span></b> (' + evt[win[key]] + ' hl., ' 
      + Math.round((evt[win[key]] / evt['PL_HL_CELK']) * 1000 ) / 10 + ' %); '
    }
  } else {
    blabol += cands[party] + ' zde získal ' + Math.round((evt[party] / evt['PL_HL_CELK']) * 1000 ) / 10 + ' % hlasů (z celkem ' 
    + evt['PL_HL_CELK'] + ').'
  }
  document.getElementById('tooltip').innerHTML = blabol
};

var tilegrid = ol.tilegrid.createXYZ({tileSize: 512, maxZoom: 15});

var background = new ol.layer.Tile({
  source: new ol.source.TileImage({
    url: 'https://interaktivni.rozhlas.cz/tiles/ton_b1/{z}/{x}/{y}.png',
    attributions: [
      new ol.Attribution({ html: 'obrazový podkres <a target="_blank" href="http://stamen.com">Stamen</a>, <a target="_blank" href="https://samizdat.cz">Samizdat</a>, data <a target="_blank" href="https://www.czso.cz/csu/czso/uchazeci-o-zamestnani-dosazitelni-a-podil-nezamestnanych-osob-podle-obci">ČSÚ</a>'})
    ]
  })
})

var labels = new ol.layer.Tile({
  source: new ol.source.TileImage({
    url: 'https://interaktivni.rozhlas.cz/tiles/ton_l1/{z}/{x}/{y}.png',
    maxZoom: 15
   })
})

function drawMap(party) {
  $('#map').empty()
  var layer = new ol.layer.VectorTile({
    source: new ol.source.VectorTile({
      format: new ol.format.MVT(),
      tileGrid: tilegrid,
      tilePixelRatio: 8,
      url: hst + 'prez18-r1-tiles/{z}/{x}/{y}.pbf'
    }),
    style: function(feature) {
      return getColor(feature.properties_, party)
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
      maxZoom: 15
    })
  });

  map.addLayer(background);
  map.addLayer(layer);
  map.addLayer(labels);

  if (!(isEdge | isFirefox | isIE)) {
    map.on('pointermove', function(evt) {
      if (evt.dragging) {
        return;
      }
      var pixel = map.getEventPixel(evt.originalEvent);
      if (map.hasFeatureAtPixel(pixel)){
        map.forEachFeatureAtPixel(pixel, function(feature, layer) {
          makeTooltip(party, feature.properties_);
        });
      } else {
        document.getElementById('tooltip').innerHTML = 'Myší vyberte obec.'
      }
    });
  };

  //mobil
  map.on('singleclick', function(evt) {
    var pixel = map.getEventPixel(evt.originalEvent);
    if (map.hasFeatureAtPixel(pixel)){
      map.forEachFeatureAtPixel(pixel, function(feature, layer) {
        makeTooltip(party, feature.properties_);
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

drawMap('HL_OKRS')

$('#select').on('change', function() {
  drawMap($(this).find(":selected").val());
});

