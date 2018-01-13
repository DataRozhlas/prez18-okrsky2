title: "Data z mobilů:<br>Praha se denně nafoukne o polovinu, v centru jsou návštěvníci v převaze"
perex: "Skoro 140 tisíc lidí přijede do Prahy každý den za prací. Míří hlavně do kancelářských budov a do centra města. S nimi pak dorazí i přes půl milionu návštěvníků. Ukázala to analýza dat o pohybu mobilních telefonů, kterou si nyní město nechává zpracovat."
authors: ["Jan Cibulka", "Petr Kočí"]
published: "21. dubna 2017"
coverimg: https://interaktivni.rozhlas.cz/brexit/media/cover.jpg
coverimg_note: "Foto <a href='#'>ČTK</a>"
styles: ["https://cdnjs.cloudflare.com/ajax/libs/openlayers/4.6.4/ol.css"]
libraries: ["https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js", "https://ft-polyfill-service.herokuapp.com/v2/polyfill.min.js?features=Object.values,String.prototype.startsWith", "https://cdnjs.cloudflare.com/ajax/libs/openlayers/4.6.4/ol-debug.js"]
options: "noheader" #wide, noheader (+nopic)
---
<left>
	<p>
	<b>KAREL HYNEK MÁCHA</b>
	</p><p>
	Karel Hynek Mácha (16. listopadu 1810 Praha-Malá Strana[1] – 6. listopadu 1836 Litoměřice[2]) byl český básník a prozaik, představitel českého romantismu a zakladatel moderní české poezie. Proslavil se jak svým životem, tak dílem, jemuž dominuje Máj (1836).
	</p>
</left>

Během dne se lidé v Praze soustřeďují v okolí administrativních center a obchodů, po poledni se tak nejvíc zahustí okolí Andělu, centrum Prahy (Vodičkova ulice a Petrské náměstí) a Brumlovka nedaleko Budějovické. Na poslední jmenované adrese sídlí řada velkých korporací, mezi nimi i Microsoft nebo ČEZ. Pro srovnání, na zmíněných místech je ve „špičce“ okolo šesti stovek osob na jeden hektar, průměr Prahy je 25 obyvatel na [hektar](https://cs.wikipedia.org/wiki/Hektar) (Václavské náměstí má rozlohu asi 4 hektary).

<wide>
<div id="mapdiv">
	<div id="select"></div>
	<div id="tooltip">Myší vyberte obec.</div>
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


## Data na prodej
<right>
	<p>
	<b>KAREL HYNEK MÁCHA</b>
	</p><p>
	Karel Hynek Mácha (16. listopadu 1810 Praha-Malá Strana[1] – 6. listopadu 1836 Litoměřice[2]) byl český básník a prozaik, představitel českého romantismu a zakladatel moderní české poezie. Proslavil se jak svým životem, tak dílem, jemuž dominuje Máj (1836).
	</p>
</right>

I pokud netelefonujeme nebo neposíláme SMS, telefon pravidelně komunikuje s vysílači v síti mobilního operátora. Z dat o síle signálu a použité anténě je možné odvodit, kde se přibližně telefon nachází a jak dlouhou dobu na místě strávil.

Mobilní operátor má [zákonnou povinnost](https://www.zakonyprolidi.cz/cs/2005-127/zneni-20160919#p97-3) takové informace uchovávat, a to půl roku do minulosti, přistupovat k nim ale mohou jen bezpečnostní složky, typicky policie nebo rozvědka.

Operátoři ale obdobné informace mohou anonymizovat (tedy zbavit identifikace konkrétního uživatele) a agregovat, tedy spojit informace o jednotlivcích do jakýchsi skupin. Výsledná obecná čísla pak přeprodávají dál, například marketingovým firmám či dopravním analytikům. Zpětně z nich nejde dovodit, kde se pohybuje každý jednotlivec, dávají ale určitý přehled o obecném chování obyvatel nějakého místa.