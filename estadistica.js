// Variables globales Diego

//Variables globales Francisco


// Funciones generales
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
    
    // Activa la sección correspondiente
    document.getElementById(id).classList.add("activa");
    
    // Remueve el resaltado previo de todos los enlaces del sidebar
    const enlaces = document.querySelectorAll('.sidebar-menu label');
    enlaces.forEach(enlace => enlace.classList.remove('active'));
    
    // Encuentra el enlace que disparó la acción y lo resalta
    const enlaceActivo = Array.from(enlaces).find(enlace => enlace.getAttribute('onclick').includes(`'${id}'`));
    if(enlaceActivo) {
        enlaceActivo.classList.add('active');
    }
}


mostrarSeccion("media");


//Funciones Francisco

//Funciones Diego