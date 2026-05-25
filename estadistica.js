// Variables globales


// Funciones

function ocultarSecciones(){
    document.getElementById("media").classList.remove("activa");
    document.getElementById("mediana").classList.remove("activa");
    document.getElementById("moda").classList.remove("activa");
    document.getElementById("porcentaje").classList.remove("activa");
    document.getElementById("tendencia").classList.remove("activa");
    document.getElementById("interpretacion-de-graficos").classList.remove("activa");
    document.getElementById("analisis-de-datos").classList.remove("activa");
    document.getElementById("deteccion-basica-de-anomalias").classList.remove("activa");
    document.getElementById("repaso").classList.remove("activa");
}

function mostrarSeccion(id){
    ocultarSecciones();
    document.getElementById(id).classList.add("activa");
}

mostrarSeccion("media");