let ord = "";
let betydelse = "";
let exempelmening = "";
let etymologi = "";
let ordlista;
laddaOrd();

function laddaOrd() {
   let xhttp = new XMLHttpRequest();
   xhttp.onerror = function() {
      
   }
   xhttp.onreadystatechange = function() {
      if(this.readyState == 4 && this.status == 200) {
         var nu = new Date().getTime();
         var startDag = new Date("3 jun 2020").getTime();
         var index = (Math.floor((nu / 1000 / 60 / 60 / 24) - (startDag / 1000 / 60 / 60 / 24)));
         ordlista = JSON.parse(xhttp.responseText).ord;
         ord = ordlista[index].namn.replace(/<script/i, "output");
         betydelse = ordlista[index].betydelse.replace(/<script/i, "output");
         exempelmening = ordlista[index].exempelmening.replace(/<script/i, "output");
         etymologi = ordlista[index].etymologi.replace(/<script/i, "output");
         
         innehall("ord", ord.charAt(0).toUpperCase() + ord.substring(1));
         innehall("rubrikbet", "Vad betyder <output class='kursiv'>" + ord + "</output>?");
         innehall("rubrikanv", "Hur skulle man kunna använda ordet <output class='kursiv'>" + ord + "</output>?");
         innehall("rubrikety", "Varifrån kommer ordet <output class='kursiv'>" + ord + "</output>?");
         
         innehall("betydelse", betydelse);
         innehall("anvandning", exempelmening);
         innehall("etymologi", etymologi);
         
         if(ordlista[index].lank !== undefined) {
            document.getElementById("lank").href = ordlista[index].lank;
         }
         else {
            document.getElementById("lank").href = "https://www.svenska.se/tre/?sok=" + ord + "&pz=1";
         }
         
      }
      else  {
         innehall("ord", "Fel");
         innehall("rubrikbet", "Ajdå!");
         innehall("betydelse", "Ett fel uppstod när orden skulle läsas in. Försök att läsa in sidan igen. Om felet kvarstår kan du behöva kontakta sidans ägare.");
         innehall("rubrikety", "");
         
         innehall("rubrikanv", "");
         innehall("anvandning", "");
         innehall("etymologi", "");
      }
   }
   xhttp.open("GET", "https://raw.githubusercontent.com/dagensord/dagensord.github.io/master/ordlista.json", true);
   xhttp.send();
}


function innehall(komponent, innehall) {
   document.getElementById(komponent).innerHTML = innehall;
}