// Variables globales


// Funciones generales

// Filtro estricto que impide escribir letras o símbolos de texto en las fórmulas del porcentaje
    const filtrarSoloNumeros = (evento) => {
        const input = evento.target;
        // Elimina al instante cualquier carácter que no sea un número, punto o coma
        let valorFiltrado = input.value.replace(/[^0-9.,]/g, '');
        
        // Controla que el usuario no intente colocar más de un separador decimal
        const partes = valorFiltrado.split(/[.,]/);
        if (partes.length > 2) {
            valorFiltrado = partes[0] + '.' + partes.slice(1).join('');
        }
        
        input.value = valorFiltrado;
    };

function validarEntradaMediana(campo){

    campo.value = campo.value.replace(
        /[^0-9,\.\n\-]/g,
        ""
    );

}

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

// Funciones Francisco

// Calculadora 1: calcular parte

window.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // CALCULADORA 1 % : CALCULAR PARTE 
    // ==========================================
    const inputPorcentaje = document.getElementById('txt-porcentaje');
    const inputTotal = document.getElementById('txt-total');
    const botonCalcular = document.getElementById('btn-calcular');

    inputPorcentaje.addEventListener('input', filtrarSoloNumeros);
    inputTotal.addEventListener('input', filtrarSoloNumeros);

    botonCalcular.addEventListener('click', () => {
        const valorPorcentaje = inputPorcentaje.value.replace(',', '.');
        const valorTotal = inputTotal.value.replace(',', '.');
        const pct = parseFloat(valorPorcentaje);
        const tot = parseFloat(valorTotal);

        botonCalcular.classList.remove('exito', 'error');

        if (!isNaN(pct) && !isNaN(tot)) {
            const operacion = (pct * tot) / 100;
            const resultadoFinal = Number.isInteger(operacion) ? operacion : operacion.toFixed(2);
            botonCalcular.textContent = resultadoFinal;
            botonCalcular.classList.add('exito');
        } else {
            botonCalcular.textContent = "Error";
            botonCalcular.classList.add('error');
        }
    });

    const restaurarEstadoBoton = () => {
        botonCalcular.textContent = "Calcular";
        botonCalcular.classList.remove('exito', 'error');
    };
    inputPorcentaje.addEventListener('input', restaurarEstadoBoton);
    inputTotal.addEventListener('input', restaurarEstadoBoton);


    // ==========================================
    // CALCULADORA 2 %: CALCULAR PORCENTAJE
    // ==========================================
    const inputPartePct = document.getElementById('txt-parte-pct');
    const inputTotalPct = document.getElementById('txt-total-pct');
    const botonCalcularPct = document.getElementById('btn-calcular-pct');

    inputPartePct.addEventListener('input', filtrarSoloNumeros);
    inputTotalPct.addEventListener('input', filtrarSoloNumeros);

    botonCalcularPct.addEventListener('click', () => {
        const valorParte = inputPartePct.value.replace(',', '.');
        const valorTotal = inputTotalPct.value.replace(',', '.');
        const parte = parseFloat(valorParte);
        const total = parseFloat(valorTotal);

        botonCalcularPct.classList.remove('exito', 'error');

        if (!isNaN(parte) && !isNaN(total) && total !== 0) {
            const operacion = (parte * 100) / total;
            const resultadoFinal = Number.isInteger(operacion) ? operacion : operacion.toFixed(2);
            botonCalcularPct.textContent = resultadoFinal + "%";
            botonCalcularPct.classList.add('exito');
        } else {
            botonCalcularPct.textContent = "Error";
            botonCalcularPct.classList.add('error');
        }
    });

    const restaurarBotonPct = () => {
        botonCalcularPct.textContent = "Calcular";
        botonCalcularPct.classList.remove('exito', 'error');
    };
    inputPartePct.addEventListener('input', restaurarBotonPct);
    inputTotalPct.addEventListener('input', restaurarBotonPct);


    // ==========================================
    // CALCULADORA 3 %: CALCULAR TOTAL
    // ==========================================
    const inputParteTot = document.getElementById('txt-parte-tot');
    const inputPorcentajeTot = document.getElementById('txt-porcentaje-tot');
    const botonCalcularTot = document.getElementById('btn-calcular-tot');

    inputParteTot.addEventListener('input', filtrarSoloNumeros);
    inputPorcentajeTot.addEventListener('input', filtrarSoloNumeros);

    botonCalcularTot.addEventListener('click', () => {
        const valorParte = inputParteTot.value.replace(',', '.');
        const valorPorcentaje = inputPorcentajeTot.value.replace(',', '.');
        const parte = parseFloat(valorParte);
        const porcentaje = parseFloat(valorPorcentaje);

        botonCalcularTot.classList.remove('exito', 'error');

        if (!isNaN(parte) && !isNaN(porcentaje) && porcentaje !== 0) {
            const operacion = (parte * 100) / porcentaje;
            const resultadoFinal = Number.isInteger(operacion) ? operacion : operacion.toFixed(2);
            botonCalcularTot.textContent = resultadoFinal;
            botonCalcularTot.classList.add('exito');
        } else {
            botonCalcularTot.textContent = "Error";
            botonCalcularTot.classList.add('error');
        }
    });

    const restaurarBotonTot = () => {
        botonCalcularTot.textContent = "Calcular";
        botonCalcularTot.classList.remove('exito', 'error');
    };
    inputParteTot.addEventListener('input', restaurarBotonTot);
    inputPorcentajeTot.addEventListener('input', restaurarBotonTot);

});

// CALCULADORA MEDIANA

function calcularMediana(){

    document.getElementById("error-mediana").textContent = "";
    document.getElementById("datos-ordenados").textContent = "";
    document.getElementById("formula-mediana").innerHTML = "";

    let texto =
        document.getElementById("datos-mediana").value.trim();

    let datos = texto
        .split("\n")
        .map(dato => dato.trim())
        .filter(dato => dato !== "")
        .map(dato => Number(dato.replace(",", ".")))
        .filter(dato => !isNaN(dato));

    if(datos.length < 2){

        document.getElementById("error-mediana").textContent =
            "Error: ingrese al menos dos datos.";

        return;
    }

    datos.sort((a, b) => a - b);

    let n = datos.length;

    let tipoCantidad =
        (n % 2 === 0) ? "par" : "impar";

    document.getElementById("datos-ordenados").innerHTML =
        "<strong>Cantidad de datos:</strong> "
        + n
        + " ("
        + tipoCantidad
        + ")<br><br>"
        + "<strong>Datos ordenados:</strong><br>"
        + datos.join("<br>");

    let formulaGeneral = "";
    let formulaDatos = "";
    let resultado = "";

    if(n % 2 !== 0){

        let posicion =
            (n + 1) / 2;

        resultado =
            datos[posicion - 1];

        formulaGeneral =
            "\\tilde{x}=x_{\\left(\\frac{n+1}{2}\\right)}";

        formulaDatos =
            "x_{\\left(\\frac{"
            + n
            + "+1}{2}\\right)}"
            + "=x_{("
            + posicion
            + ")}";

    }
    else{

        let posicion1 =
            n / 2;

        let posicion2 =
            posicion1 + 1;

        let valor1 =
            datos[posicion1 - 1];

        let valor2 =
            datos[posicion2 - 1];

        resultado =
            (valor1 + valor2) / 2;

        formulaGeneral =
            "\\tilde{x}=\\frac{x_{\\left(\\frac{n}{2}\\right)}+x_{\\left(\\frac{n}{2}+1\\right)}}{2}";

        formulaDatos =
            "\\frac{x_{\\left(\\frac{"
            + n
            + "}{2}\\right)}+x_{\\left(\\frac{"
            + n
            + "}{2}+1\\right)}}{2}"
            + "=\\frac{x_{("
            + posicion1
            + ")}+x_{("
            + posicion2
            + ")}}{2}"
            + "=\\frac{"
            + valor1
            + "+"
            + valor2
            + "}{2}";
    }

    if(Number.isInteger(resultado)){

        resultado =
            resultado.toString();

    }
    else{

        resultado =
            resultado.toFixed(2)
            .replace(".", ",");

    }

    document.getElementById("formula-mediana").innerHTML =
        "$$"
        + formulaGeneral
        + "="
        + formulaDatos
        + "="
        + resultado
        + "$$";

    MathJax.typesetPromise();
}
// Funciones Diego