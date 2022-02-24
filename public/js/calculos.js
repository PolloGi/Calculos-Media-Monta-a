const tablaCoordenadas = document.getElementById("tablaUno");
let filaTabla1 = 0;
function agregarDato(){
    document.getElementById('botonAgregarDato').innerHTML = 'Agregar otro dato';
    let filaNueva = `
    <div class="row mt-3">
    <div class="col-1">
        <input class="form-control form-control-sm" onfocusout="validacionUnidad(this)" id="punto${filaTabla1}" type="text">
    </div>
    <div class="col-3">
        <input class="form-control form-control-sm" onfocusout="validacionUnidad(this)" id="nombre${filaTabla1}" type="text">
    </div>
    <div class="col-2">
        <input class="form-control form-control-sm" onfocusout="validacionUnidad(this)" id="altitud${filaTabla1}" type="text">
    </div>
    <div class="col-3">
        <div class="row">
            <div class="col">
                <input class="form-control form-control-sm" onfocusout="validacionGrados(this)" placeholder="Latitud" id="latituddDD${filaTabla1}" type="number">
            </div>
            <div class="col">
                <input class="form-control form-control-sm" onfocusout="validacionGrados(this)" placeholder="Longitud" id="longitudDD${filaTabla1}" type="number">
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
    //tablaCoordenadas.innerHTML= tablaCoordenadas.innerHTML+filaNueva;
    tablaCoordenadas.insertAdjacentHTML("beforeend", filaNueva)
    filaTabla1 = filaTabla1+1;
    document.getElementById('botonCalcularGrados').classList.remove("d-none");
};
function validacionUnidad(a){
    if (a.value == '') {
        a.classList.add('is-invalid');
    }
    else{
        a.classList.remove('is-invalid');
    }
}
function validacionGrados(a){
    console.log(Number(a.value));
    if(Number(a.value) > 365 || Number(a.value)<=0 && a.value == ''){
        a.classList.add('is-invalid');
    }
    else{
        a.classList.remove('is-invalid');
    }
}
function validaDatosTabla1(){
    let validacion = true;
    for(let i=0; i<filaTabla1; i++){
        let puntos = document.getElementById("punto"+i);
        let nombresDeReferencia = document.getElementById(`nombre${i}`);
        let altitud = document.getElementById(`altitud${i}`);
        let latituddDD = document.getElementById(`latituddDD${i}`);
        let longitudDD = document.getElementById(`longitudDD${i}`);
        validacionUnidad(puntos);
        validacionUnidad(nombresDeReferencia);
        validacionUnidad(altitud);
        validacionGrados(latituddDD);
        validacionGrados(longitudDD);
        latituddDDValor = Number(latituddDD.value);
        longitudDDValor = Number(longitudDD.value);
        validacion = puntos.value!='' && nombresDeReferencia.value!='' && altitud.value!='' && latituddDD.value!='' && longitudDD.value!='' && typeof latituddDDValor == 'number' && typeof longitudDDValor == 'number';
        return validacion;
    }
}
function calcularDDM(){
    for(let i=0; i<filaTabla1; i++){
        let latituddDD = document.getElementById(`latituddDD${i}`);
        let longitudDD = document.getElementById(`longitudDD${i}`);
        let latitudDDM = document.getElementById(`latitudDDM${i}`);
        let longitudDDM = document.getElementById(`longitudDDM${i}`);
        let latituddDDValor = Number(latituddDD.value);
        let longitudDDValor =  Number(longitudDD.value);
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