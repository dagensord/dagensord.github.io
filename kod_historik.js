laddaOrd();
let ordlista;
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
            let listInnehall = "";
            ordlista = JSON.parse(xhttp.responseText).ord;
	    let antalOrd = ordlista.length > 50 ? 50 : ordlista.length;
            while(index >= ordlista.length) {
				   index -= ordlista.length;
				   console.log(index);
			   }
			   for(let ind = 0; ind < index + 1; ind++) {
			      listInnehall = listInnehall + "<div class='ordlank' id='ord" + ind + "'><output class='fet'>" + ordlista[ind].namn.charAt(0).toUpperCase() + ordlista[ind].namn.substring(1) + "</output> <output class='kursiv dolj'>" + ordlista[ind].betydelse.substring(0, 50) + "</output></div>";
			   }
			   listInnehall = listInnehall.replace(/<script>/i, "VARNING");
			   innehall("lista", listInnehall);
			   ordNummer(index, false);
			   
			   for(let ind = 0; ind < index + 1; ind++) {
			      document.getElementById("ord" + ind).addEventListener("click", function inkapsling() { ordNummer(ind, true); });
			   }
         }
      }
   };	
   xhttp.open("GET", "https://raw.githubusercontent.com/dagensord/dagensord.github.io/master/ordlista.json", true);
   xhttp.send();
}

function ordNummer(index, rullning) {

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
            else {
               document.getElementById("rubrikutt").style.display = "none";
               document.getElementById("uttal").style.display = "none";
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
            var startDag = new Date("30 jun 2021").getTime();
            var dennaDag = new Date(startDag + (index * 1000 * 60 * 60 * 24));
            let vecka = ["söndag", "måndag", "tisdag", "onsdag", "torsdag", "fredag", "lördag"];
            let manad = ["januari", "februari", "mars", "april", "maj", "juni", "juli", "augusti", "september", "oktober", "november", "december"];
            
            innehall("nar", "Dagens ord " + vecka[dennaDag.getDay()] + "en den " + dennaDag.getDate() + " " + manad[dennaDag.getMonth()]);
            
            if(window.innerWidth <= 700 && rullning) {
               window.scrollTo(0, document.getElementsByClassName("bok")[0].offsetHeight);
            }
   }
            

function innehall(komponent, innehall) {
   document.getElementById(komponent).innerHTML = innehall;
}
