let costoTotal = 0;
let totalEnProductos = 0;

//Arreglo global 
let datos = [];

let element = document.getElementById("totalPrecio");
element.innerHTML="Total en precio";

let txtNombr = document.getElementById("Name");
//txtNombr.value = "Leche Semidescremada";
let txtNumber = document.getElementById("Number");

         
let precioTotal = document.getElementById("precioTotal");
/*let campos = document.getElementsByClassName("campo");
campos[0].value = " ";
console.log(campos[0].value0);
console.log(campos);

for(let i=0; i<campos.length; i++){
    campos[i].style.border = "red thin solid";
}

let spans = document.getElementsByTagName("span");

for(let i=0; i<spans.length; i++){
    console.log(spans[i].textContent);
}*/

let tabla = document.getElementById("tablaListaCompras");
let cuerpoTabla = tabla.getElementsByTagName("tbody");
/*cuerpoTabla[0].innerHTML =
`<tr>
<th scope="row">1</th>
<td>${txtNombre.value}</td>
<td>${txt.Number}</td>
<td>$23.00</td>
</tr>`;*/

function validarNombre() {
    if (txtNombr.value.length < 3 ){
        return false;
    }
    return true;
}

function validarCantidad() {
    if(txtNumber.value.length==0){
        return false;
    }
    if(isNaN(txtNumber.value)){
        return false;
    }
    if(parseFloat(txtNumber.value) <=0){
        return false;
    }
    return true;
    
}

let agregar = document.getElementById("btnAgregar");

let contador = 0;



agregar.addEventListener("click", (event)=>{
    event.preventDefault();
    if((! validarNombre()) || (! validarCantidad())){
        let lista = "";
        
        if(!validarNombre()){
            console.log(txtNombr.style.border);
            txtNombr.style.border = "red thin solid";
            lista += "<li>Se debe escribir un nombre válido</li>"
        }

        if(!validarCantidad()){
            console.log(txtNumber.style.border);
            txtNumber.style.border = "red thin solid";
            lista += "<li>Se debe escribir un número válido</li>"
        }
        
        document.getElementById("alertaValidacionesTexto").innerHTML=`Los campos deben ser llenados correctamente
        <ul>
        ${lista}
        </ul>
        `;
        document.getElementById("alertValidaciones").style.display="block";


        setTimeout(
            function () {
                document.getElementById("alertValidaciones").style.display="none";
            }, 5000
        );
        return false;
    }
    txtNombr.style.border = "";
    txtNumber.style.border = "";
    document.getElementById("alertValidaciones").style.display="none";
   contador++;
   document.getElementById("contadorProductos").innerHTML=contador;
   localStorage.setItem("contadorProductos",contador);
   let precio =(Math.floor((Math.random() * 50)*100))/100;
   let cantidad = parseFloat(txtNumber.value);
   totalEnProductos += (cantidad < 1)? Math.ceil(cantidad) : parseInt(cantidad);
   document.getElementById("productosTotal").innerHTML = totalEnProductos;
   localStorage.setItem("productosTotal",totalEnProductos);
   costoTotal+= (precio * cantidad);
   precioTotal.innerHTML = `$ ${costoTotal.toFixed(2)}`;
   localStorage.setItem("precioTotal",costoTotal.toFixed(2));
  //JSON 
   let element = `{"id": ${contador}, 
   "nombre": "${txtNombr.value}", 
   "cantidad": ${txtNumber.value}, 
   "precio": ${precio}
  }`;

  datos.push(JSON.parse(element));
  localStorage.setItem("elementosTabla", JSON.stringify(datos));
  console.log(datos);

   let tmp = `<tr>
   <th scope="row">${contador}</th>
   <td>${txtNombr.value}</td>
   <td>${txtNumber.value}</td>
   <td>${precio}</td>
   </tr>`;
   cuerpoTabla[0].innerHTML += tmp;
   txtNumber.value="";
   txtNombr.value="";
   txtNombr.focus();
}); //Le pone una oreja a este evento

txtNombr.addEventListener("blur", (event)=>{
    event.target.value = event.target.value.trim();
}
);

txtNumber.addEventListener("blur", (event)=>{
    event.target.value = event.target.value.trim();
}
);

window.addEventListener("load", function() {
    if(localStorage.getItem("contadorProductos")!= null){
        contador= parseInt(localStorage.getItem("contadorProductos"));
      document.getElementById("contadorProductos").innerHTML=contador;

    }
  
    if(localStorage.getItem("productosTotal")!=null){
        totalEnProductos = parseInt(localStorage.getItem("productosTotal"));
        document.getElementById("productosTotal").innerHTML = totalEnProductos;

    }
    
    if(localStorage.getItem("precioTotal")!=null){
        costoTotal = parseFloat(localStorage.getItem("precioTotal"));
        precioTotal.innerHTML = costoTotal;
    }

    if(localStorage.getItem("elementosTabla")!=null){
        datos = JSON.parse(localStorage.getItem("elementosTabla"));
        datos.forEach(element =>{
            cuerpoTabla[0].innerHTML+= `<tr>
            <th scope="row">${element.id}</th>
            <td>${element.nombre}</td>
            <td>${element.cantidad}</td>
            <td>${element.precio}</td>
            </tr>`;
        });
    }
});