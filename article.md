title: "Koho volili vaši sousedi? Prohlédněte si nejpodrobnější mapu výsledků druhého kola prezidentské volby"
perex: "Miloš Zeman zvítězil, zdaleka ale neovládl všechny kraje. Detailnější pohled na volební mapu ukazuje pestrý obrázek: Jiří Drahoš bodoval na Liberecku, Zlínsku, Pardubicku či Českobudějovicku. A jak to dopadlo u vás?"
authors: ["Jan Cibulka", "Petr Kočí"]
published: "27. ledna 2018"
coverimg: https://dev.datarozhlas.cz/prez18-okrsky2/media/mapa.jpg
coverimg_note: "Foto <a href='#'>ČTK</a>"
styles: ["https://cdnjs.cloudflare.com/ajax/libs/openlayers/4.6.4/ol.css"]
libraries: ["https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js", "https://ft-polyfill-service.herokuapp.com/v2/polyfill.min.js?features=Object.values,String.prototype.startsWith", "https://cdnjs.cloudflare.com/ajax/libs/openlayers/4.6.4/ol-debug.js"]
options: "noheader, nopic" #wide, noheader (+nopic)
---


<wide>
<div id="mapdiv">
	<div id="select"></div>
	<div id="tooltip">Myší vyberte obec.<br>&nbsp;</div>
	<div id="map" class="map"></div>
	 <form action="?" id='frm-geocode'>
	  <label for="inp-geocode">Najít adresu</label>
	  <div class="inputs">
	    <input type="text" id="inp-geocode" placeholder="Bruntál">
	    <input type="submit" value="Najít">
	  </div>
	</form>
</div>
</wide>

A jak vypadá mapa České republiky, když do ní za každý hlas v prezidentských volbách nakreslíme jednu tečku? Červené tečky představují hlasy z druhého kola pro Miloše Zemana, modré pro Jiřího Drahoše. Velké bílé plochy jsou vojenské újezdy, kde se nevolí.

<img src="https://dev.datarozhlas.cz/prez18-okrsky2/media/out.png" style="max-width: 100%">