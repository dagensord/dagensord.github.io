let xhttp = new XMLHttpRequest();
   xhttp.onerror = function() {
      
   }
   xhttp.onreadystatechange = function() {
      if(this.readyState == 4 && this.status == 200) {
         let ordlista = JSON.parse(xhttp.responseText).ord;
         document.getElementById("antal").innerHTML = ordlista.length;
      }
   }
xhttp.open("GET", "https://raw.githubusercontent.com/dagensord/dagensord.github.io/master/ordlista.json", true);
   xhttp.send();