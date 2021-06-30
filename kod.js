let ord = "";
let betydelse = "";
let exempelmening = "";
let etymologi = "";
let ordlista;
laddaOrd();

function laddaOrd() {
   let xhttp = new XMLHttpRequest();
   xhttp.onerror = function() {
      
   };
   xhttp.onreadystatechange = function() {
      if(this.readyState == 4) {
         if(this.status == 200) {
            var nu = new Date().getTime();
            var startDag = new Date("30 jun 2021").getTime();
            var index = (Math.floor((nu / 1000 / 60 / 60 / 24) - (startDag / 1000 / 60 / 60 / 24)));
            ordlista = JSON.parse(xhttp.responseText).ord;
            while(index >= ordlista.length) {
				   index -= ordlista.length;
				   console.log(index);
			   }
			   ord = ordlista[index].namn.replace(/<script>/i, "VARNING");
			   betydelse = ordlista[index].betydelse.replace(/<script>/i, "VARNING");
		   	exempelmening = ordlista[index].exempelmening.replace(/<script>/i, "VARNING");
			   etymologi = ordlista[index].etymologi.replace(/<script>/i, "VARNING");
            
            innehall("ord", ord.charAt(0).toUpperCase() + ord.substring(1));
            innehall("rubrikbet", "Vad betyder <output class='kursiv'>" + ord + "</output>?");
            innehall("rubrikanv", "Hur skulle man kunna använda ordet <output class='kursiv'>" + ord + "</output>?");
            innehall("rubrikety", "Varifrån kommer ordet <output class='kursiv'>" + ord + "</output>?");
            
            innehall("betydelse", betydelse);
            innehall("anvandning", exempelmening);
            innehall("etymologi", etymologi);
            
            document.title = "Dagens ord – " + ord;
            
            if(ordlista[index].lank !== undefined) {
               document.getElementById("lank").href = ordlista[index].lank;
            }
            else {
               document.getElementById("lank").href = "https://www.svenska.se/tre/?sok=" + ord + "&pz=1";
            }
            
            if(ordlista[index].uttal !== undefined) {
               document.getElementById("rubrikutt").style.display = "block";
               document.getElementById("uttal").style.display = "block";
               document.getElementById("rubrikutt").innerHTML = "Hur uttalar man <output class='kursiv'>" + ord + "</output>?";
               document.getElementById("uttal").innerHTML = ordlista[index].uttal;
            }
            
            if(ordlista[index].extra !== undefined) {
               for(let ind = 0; ind > extra.length; ind++) {
                  if(ordlista[index].extra[ind].atgard === "innehall") {
                     innehall(ordlista[index].extra[ind].id, ordlista[index].extra[ind].innehall.replace(/<script>/i, "VARNING"));
                  }
                  else if(ordlista[index].extra[ind].atgard === "stil") {
                     document.getElementById(ordlista[index].extra[ind].id).style = document.getElementById(ordlista[index].extra[ind].id).style + ordlista[index].extra[ind].innehall + ";";
                  }
               }
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
            innehall("lank", "")
         }
      }
   };
   xhttp.open("GET", "https://raw.githubusercontent.com/dagensord/dagensord.github.io/master/ordlista.json", true);
   xhttp.send();
}


function innehall(komponent, innehall) {
   document.getElementById(komponent).innerHTML = innehall;
}
