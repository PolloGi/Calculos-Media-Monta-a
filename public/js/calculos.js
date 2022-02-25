const tablaCoordenadas = document.getElementById("tablaUno");
let filaTabla1 = 0;
let filaTabla2 = 0;
let puntoDeRuta = 0;
let tramoDeRuta = 1;
let otp = true;
let pp = true;
let puntos = [];
function agregarPunto(){
    document.getElementById('botonAgregarDato').innerHTML = 'Agregar otro punto';
    let filaNueva = `
    <div class="row mt-3">
    <div class="col-1">
        <input class="form-control form-control-sm" onfocusout="esValidoTexto(this)" onchange="guardarValor(this.value)" id="punto${puntoDeRuta}" type="text">
    </div>
    <div class="col-3">
        <input class="form-control form-control-sm" onfocusout="esValidoTexto(this)" id="nombre${filaTabla1}" type="text">
    </div>
    <div class="col-2">
        <input class="form-control form-control-sm" onfocusout="esValidoAltura(this)" id="altitud${filaTabla1}" type="number">
    </div>
    <div class="col-3">
        <div class="row">
            <div class="col">
                <input class="form-control form-control-sm" onfocusout="esValidoGrados(this)" placeholder="Latitud" id="latituddDD${filaTabla1}" type="number">
            </div>
            <div class="col">
                <input class="form-control form-control-sm" onfocusout="esValidoGrados(this)" placeholder="Longitud" id="longitudDD${filaTabla1}" type="number">
            </div>
        </div>
    </div>
    <div class="col-3">
        <div class="row">
            <div class="col">
                <input class="form-control form-control-sm" placeholder="Longitud" id="latitudDDM${filaTabla1}" type="text">
            </div>
            <div class="col">
                <input class="form-control form-control-sm" placeholder="Longitud" id="longitudDDM${filaTabla1}" type="text">
            </div>
        </div>
    </div>
</div>
    `;
    if (pp) {
        tablaCoordenadas.insertAdjacentHTML("beforeend", filaNueva)
        document.getElementById('botonCalcularGrados').classList.remove("d-none");
        document.getElementById('botonPuntoDeRuta').classList.remove("d-none");
        filaTabla1 = filaTabla1+1;
        puntoDeRuta = puntoDeRuta +1;
        tramoDeRuta = 1;
        pp = false;
    }
    else{
        if (validacionPuntos()&& validacionTramos()) {
            document.getElementById(`punto`)
            tablaCoordenadas.insertAdjacentHTML("beforeend", filaNueva)
            filaTabla1 = filaTabla1+1;
            puntoDeRuta = puntoDeRuta +1;
            tramoDeRuta = 1;
            document.getElementById('botonCalcularGrados').classList.remove("d-none");
            document.getElementById('botonPuntoDeRuta').classList.remove("d-none");
        }
    }
    
};
function agregarTramoDeRuta(){
    let ultimoPunto = document.getElementById(`punto${puntoDeRuta-1}`).value;
    let filaNueva = `<div class="row mt-3">
    <div class="col-1">
        <input class="form-control form-control-sm tramo" onfocusout="esValidoTexto(this)" id="tramo${tramoDeRuta}" value="${ultimoPunto} .${tramoDeRuta}" type="text">
    </div>
    <div class="col-3">
        <input class="form-control form-control-sm tramo" onfocusout="esValidoTexto(this)" id="nombre${filaTabla1}" type="text">
    </div>
    <div class="col-2">
        <input class="form-control form-control-sm tramo" onfocusout="esValidoAltura(this)" id="altitud${filaTabla1}" type="number">
    </div>
    <div class="col-3">
        <div class="row">
            <div class="col">
                <input class="form-control form-control-sm tramo" onfocusout="esValidoGrados(this)" placeholder="Latitud" id="latituddDD${filaTabla1}" type="number">
            </div>
            <div class="col">
                <input class="form-control form-control-sm tramo" onfocusout="esValidoGrados(this)" placeholder="Longitud" id="longitudDD${filaTabla1}" type="number">
            </div>
        </div>
    </div>
    <div class="col-3">
        <div class="row">
            <div class="col">
                <input class="form-control form-control-sm tramo" placeholder="Longitud" id="latitudDDM${filaTabla1}" type="text">
            </div>
            <div class="col">
                <input class="form-control form-control-sm tramo" placeholder="Longitud" id="longitudDDM${filaTabla1}" type="text">
            </div>
        </div>
    </div>
</div>`;
if (validacionPuntos()&&validacionTramos()) {
    tablaCoordenadas.insertAdjacentHTML("beforeend", filaNueva);
    guardarValor(`${ultimoPunto} .${tramoDeRuta}`);
    filaTabla1 = filaTabla1+1;
    tramoDeRuta = tramoDeRuta+1;
}
};

function agregarTramoPunto(valor1, valor2){
    let tablaTiempos = document.getElementById('tablaDos');
    let filaNueva = `
    <div class="row mt-3">
    <div class="col-1">
    <input class="form-control form-control-sm" value="${valor1} - ${valor2}" type="text" id="tramo${filaTabla2}">
</div>
<div class="col-1">
    <input class="form-control form-control-sm" onchange="calculoRumbo(this)" type="text" id="azimut${filaTabla2}">
</div>
<div class="col">
    <input class="form-control form-control-sm" type="text" id="rumbo${filaTabla2}">
</div>
<div class="col">
    <input class="form-control form-control-sm" type="text" id="distanciPlana${filaTabla2}">
</div>
<div class="col">
    <input class="form-control form-control-sm" type="text" id="desnivel${filaTabla2}">
</div>
<div class="col">
    <input class="form-control form-control-sm" type="text" id="distancia${filaTabla2}">
</div>
<div class="col">
    <input class="form-control form-control-sm" type="text" id="pendiente${filaTabla2}">
</div>
<div class="col">
    <input class="form-control form-control-sm" type="text" id="velocidad${filaTabla2}">
</div>
<div class="col">
    <input class="form-control form-control-sm" type="text" id="tiempoAprox${filaTabla2}">
</div>
 </div>`;
    //let valorPunto = document.getElementById('punto${puntoDeRuta}').value
if (puntos.length>=2) {
    tablaTiempos.insertAdjacentHTML("beforeend", filaNueva);
    filaTabla2 = filaTabla2 +1;
}
}
function guardarAlturas(a){
    alturas.push(a);
    console.log(alturas);
}
function guardarValor(a){
    puntos.push(a);
    agregarTramoPunto(puntos[puntos.length-2], puntos[puntos.length-1]);   
}
//validaciones
function esValidoTexto(a){
    if (a.value == '') {
        datoInvalido(a);
        return false;
    }
    else{
        datoValido(a);
        return true;
    }
}
function esValidoGrados(a){
    if(Number(a.value) > 360 || Number(a.value)<=0 || a.value == ''){
        datoInvalido(a);
        return false;
    }
    else{
        datoValido(a);
        return true;
    }
}
function esValidoAltura(a){
    if(Number(a.value) > 8848.86 || Number(a.value)<0 || a.value == ''){
        datoInvalido(a);
        return false;
    }
    else{
        if (a.value>4000) {
            easterEggAltura();
        }
        datoValido(a);
        return true;
    }
}
function validacionDatosDDM(){
    let respuestaValidacion = true;
    validacionAltitud();
    validacionNombres();
    validacionPuntos();
    validacionTramos();
    validacionGrados();
    respuestaValidacion = validacionAltitud()&&validacionNombres()&&validacionPuntos()&&validacionTramos()&&validacionGrados()&&respuestaValidacion;
    console.log(`el resultado general de la validacion es ${respuestaValidacion}`);
    return respuestaValidacion
}
function validacionNombres(){
    let respuestaValidacion = true;
    for (let index = 0; index < filaTabla1; index++) {
        let nombreReferencia = document.getElementById(`nombre${index}`)
            respuestaValidacion = esValidoTexto(nombreReferencia)&&respuestaValidacion;
            
            
    }
    return respuestaValidacion;
}
function validacionAltitud(){
    let respuestaValidacion = true;
    for (let index = 0; index < filaTabla1; index++) {
        let altitud = document.getElementById(`altitud${index}`)
            respuestaValidacion = esValidoAltura(altitud)&&respuestaValidacion;        
    }
    return respuestaValidacion;
}
function validacionDistanciaPlana(){
    let respuestaValidacion = true;
    for (let index = 0; index < filaTabla2; index++) {
        let distanciaPlana = document.getElementById(`distanciPlana${index}`);
        respuestaValidacion = esValidoTexto(distanciaPlana.value);
    }
}
function validacionPuntos(){
    let respuestaValidacion = true;
    for (let index = 0; index < puntoDeRuta; index++) {
        let punto = document.getElementById(`punto${index}`)
            respuestaValidacion = esValidoTexto(punto)&&respuestaValidacion;   
    }
    return respuestaValidacion;
}
function validacionTramos(){
    let respuestaValidacion = true;
    if (tramoDeRuta!=1) {
        for (let index = 1; index < tramoDeRuta; index++) {
            let punto = document.getElementById(`tramo${index}`)
                respuestaValidacion = esValidoTexto(punto)&&respuestaValidacion;   
        }
        return respuestaValidacion;
    }
    else{
        return true
    }
}
function validacionGrados(){
    let respuestaValidacion = true;
    for (let index = 0; index < filaTabla1; index++) {
        let gradosLonDD = document.getElementById(`longitudDD${index}`);
        let gradosLatDD = document.getElementById(`latituddDD${index}`);
        respuestaValidacion = esValidoGrados(gradosLonDD)&&esValidoGrados(gradosLatDD)&&respuestaValidacion;   
    }
    return respuestaValidacion;
}
//datos agregar o quitar clase validacion
function datoInvalido(a){
    a.classList.add('is-invalid');
}
function datoValido(a){
    a.classList.remove('is-invalid');
}

//calculos
function CalculoDDM(){
    if (validacionDatosDDM()) {
        for (let index = 0; index < filaTabla1; index++) {
            let latitudDDM = document.getElementById(`latitudDDM${index}`);
            let longitudDDM = document.getElementById(`longitudDDM${index}`);
            let latituddDDValor = Number(document.getElementById(`latituddDD${index}`).value);
            let longitudDDValor =  Number(document.getElementById(`longitudDD${index}`).value);
            gradosLat = Math.trunc(latituddDDValor);
            minutosRestanteLat = (latituddDDValor - gradosLat)*60;
            minutosLat = Math.trunc(minutosRestanteLat)
            segundosLat = ((minutosRestanteLat - minutosLat)*60).toFixed(3);
            gradosLon = Math.trunc(longitudDDValor);
            minutosRestanteLon = (longitudDDValor - gradosLon)*60;
            minutosLon = Math.trunc(minutosRestanteLon)
            segundosLon = ((minutosRestanteLon - minutosLon)*60).toFixed(3);
            //paint
            console.log(`${gradosLat}° ${minutosLat}' ${segundosLat}",  ${gradosLon}° ${minutosLon}' ${segundosLon}"`);
            latitudDDM.value = `${gradosLat}° ${minutosLat}' ${segundosLat}"`;
            longitudDDM.value = `${gradosLon}° ${minutosLon}' ${segundosLon}"`;
        }
    }
    else{
        for (let index = 0; index < filaTabla1; index++) {
            let latitudDDM = document.getElementById(`latitudDDM${index}`);
            let longitudDDM = document.getElementById(`longitudDDM${index}`);
            latitudDDM.value = '';
            longitudDDM.value = '';
        }
    }
}
function calcularDDM(){
    for(let i=0; i<filaTabla1; i++){
        let puntos = document.getElementById("punto"+i);
        let nombresDeReferencia = document.getElementById(`nombre${i}`);
        let altitud = document.getElementById(`altitud${i}`);
        let latituddDD = document.getElementById(`latituddDD${i}`);
        let longitudDD = document.getElementById(`longitudDD${i}`);
        let latitudDDM = document.getElementById(`latitudDDM${i}`);
        let longitudDDM = document.getElementById(`longitudDDM${i}`);
        let latituddDDValor = Number(latituddDD.value);
        let longitudDDValor =  Number(longitudDD.value);
        if(validacionUnidad(puntos)&&validacionUnidad(nombresDeReferencia)&&validacionUnidad(altitud)){
            if(validaDatosTabla1() && latituddDDValor<=365 && latituddDDValor>0 && longitudDDValor<=365 && longitudDDValor>0){
                gradosLat = Math.trunc(latituddDDValor);
                minutosRestanteLat = (latituddDDValor - gradosLat)*60;
                minutosLat = Math.trunc(minutosRestanteLat)
                segundosLat = ((minutosRestanteLat - minutosLat)*60).toFixed(3);
                gradosLon = Math.trunc(longitudDDValor);
                minutosRestanteLon = (longitudDDValor - gradosLon)*60;
                minutosLon = Math.trunc(minutosRestanteLon)
                segundosLon = ((minutosRestanteLon - minutosLon)*60).toFixed(3);
                //paint
                latitudDDM.value = `${gradosLat}° ${minutosLat}' ${segundosLat}"`;
                longitudDDM.value = `${gradosLon}° ${minutosLon}' ${segundosLon}"`;
            }
            else{
                validacionGrados(latituddDD);
                validacionGrados(longitudDD);
            }
        }
    }
}
function calculoTiempo(){
    calculoDesnivel();
    calculoPendiente();
    calculoDistanciaReal();
    let tiempoAcum = 0;
    for (let index = 0; index < filaTabla2; index++) {
        let distancia = document.getElementById(`distancia${index}`);
        let pendiente = document.getElementById(`pendiente${index}`);
        let desnivel = document.getElementById(`desnivel${index}`);
        let tiempo = document.getElementById(`tiempoAprox${index}`);
        let velocidad = document.getElementById(`velocidad${index}`);
        let tiempoTotal = document.getElementById(`tiempoTotal${index}`);

        if (Number(desnivel.value)>0) {
            if (Number(pendiente.value)*100<15) {
                let horas = 3000/Number(distancia.value);
                let minutosc = horas-Math.trunc(horas);
                let minutos = minutosc*60;
                tiempo.value = `${Math.trunc(horas)}:${minutos.toFixed(0)}`
                velocidad.value = "3 km/h"
                tiempoAcum = horas + tiempoAcum;
                
            }
            else{
                let horas = 2000/Number(distancia.value);
                let minutosc = horas-Math.trunc(horas);
                let minutos = minutosc*60;
                tiempo.value = `${Math.trunc(horas)}:${minutos.toFixed(0)}`
                velocidad.value = "2 km/h"
            }
        }
        else{
            if (Number(pendiente.value)*100<15) {
                let horas = 4000/Number(distancia.value);
                let minutosc = horas-Math.trunc(horas);
                let minutos = minutosc*60;
                tiempo.value = `${Math.trunc(horas)}:${minutos.toFixed(0)}`
                velocidad.value = "4 km/h"
            }
            else{
                let horas = 300/Number(distancia.value);
                let minutosc = horas-Math.trunc(horas);
                let minutos = minutosc*60;
                tiempo.value = `${Math.trunc(horas)}:${minutos.toFixed(0)}`
                velocidad.value = "300 m/h"
            }
        }
        tiempoTotal.value = tiempoAcum
    }

}
function extraDiez(){
    let tiempoTotal = document.getElementById(`tiempoTotal${index}`);
    tiempoTotal.value = tiempoTotal*1.10;
}
function calculoPendiente(){
    for (let index = 0; index < filaTabla2; index++) {
        let pendiente = document.getElementById(`pendiente${index}`);
        let desnivel = document.getElementById(`desnivel${index}`);
        let distancia = document.getElementById(`distanciPlana${index}`);
        if (esValidoTexto(distancia)) {
            pendiente.value = desnivel.value/distancia.value; 
        }
             
    }
}
function calculoDesnivel(){
    let alturas = [];
    for (let index = 0; index < filaTabla1; index++) {
        let altitud = document.getElementById(`altitud${index}`);
        alturas.push(altitud.value);
    } 
    for (let index = 0; index < filaTabla2; index++) {
        let desnivel = document.getElementById(`desnivel${index}`);
        desnivel.value = alturas [index+1] - alturas[index];        
    }
}
function calculoDistanciaReal(){
    for (let index = 0; index < filaTabla2; index++) {
        let pendiente = document.getElementById(`distanciPlana${index}`);
        let desnivel = document.getElementById(`desnivel${index}`);
        let distancia = document.getElementById(`distancia${index}`);
        distancia.value = Math.sqrt(Math.pow(Math.abs(Number(pendiente.value)),2)+Math.pow(Math.abs(Number(desnivel.value)),2)).toFixed(2);              
    }
}
function calculoRumbo(a){
    let idAz = a.id;
    let fila = idAz.charAt(idAz.length-1);
    let grados = Number(a.value);
    let y, x, n;
    let rumbo = document.getElementById(`rumbo${fila}`);
    if (esValidoGrados(a)){
        if (grados == 0 || grados == 90|| grados == 180|| grados == 270|| grados == 360) {
            if (grados == 90) { 
                rumbo.value = "E";
            }
            if (grados == 180) { 
                rumbo.value = "S";
            }
            if (grados == 270) { 
                rumbo.value = "O";
            }
            if (grados == 360 || grados == 0) { 
                rumbo.value = "N";
            }
        }
        else{
            if (grados<90 || grados>270) {
                y = "N";
                if (grados<90) {
                    x = "E";
                    n = grados;
                    console.log(`${y}${n}°${x}`);
                    rumbo.value = `${y}${n}°${x}`;
                }
                else{
                    x = "O";
                    n = 365 - grados;
                    console.log(`${y}${n}°${x}`);
                    rumbo.value = `${y}${n}°${x}`;
                }
            }
            else{
                y = "S";
                if (grados<180) {
                    x = "E";
                    n = 180 - grados;
                    console.log(`${y}${n}°${x}`);
                    rumbo.value = `${y}${n}°${x}`;
                }
                else{
                    x = "O";
                    n = grados - 180;
                    console.log(`${y}${n}°${x}`);
                    rumbo.value = `${y}${n}°${x}`;
                }
            }
        }
        
    }
    
}

function easterEggAltura(){
    if (otp) {
        alert("¡Wow!, suerte en alta montaña");
        otp = false;
    }
    
}
