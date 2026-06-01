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
    if(document.getElementById("inicio")) { document.getElementById("inicio").classList.remove("activa"); }
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
mostrarSeccion("inicio");


//Funciones Francisco

//Funciones Diego
function calcularMedia() {

    let texto = document.getElementById("miInput").value;

    // Detectar si la coma se usa como separador de lista (ej: "32, 34, 36")
    // o como separador decimal (ej: "32,5"). Si hay espacios tras la coma, es separador de lista.
    // Estrategia: separar por coma, luego normalizar el punto decimal en cada fragmento.
    let numeros = texto.split(",");

    let suma = 0;
    let cantidad = 0;

    for (let i = 0; i < numeros.length; i++) {
        // Reemplazar coma por punto para manejar decimales estilo europeo en cada fragmento
        let fragmento = numeros[i].trim().replace(",", ".");
        let numero = Number(fragmento);

        // Solo contar si es un número válido
        if (!isNaN(numero) && fragmento !== "") {
            suma = suma + numero;
            cantidad = cantidad + 1;
        }
    }

    if (cantidad === 0) {
        document.getElementById("miResultado").textContent = "Por favor ingresa al menos un número.";
        return;
    }
    let media = suma / cantidad;
    document.getElementById("miResultado").textContent = 
        "Suma: " + suma + " — Cantidad de números: " + cantidad + " — Media: " + media;
}


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
    "\\Large \\tilde{x}=x_{\\left(\\frac{n+1}{2}\\right)}";

formulaDatos =
    "\\Large x_{\\left(\\frac{"
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


function calcularModa() {
    let texto = document.getElementById("inputModa").value;
    let numeros = texto.split(",");
    if (numeros.length === 0 || texto === "") {
        document.getElementById("resultadoModa").textContent = "Por favor ingresa al menos un número.";
        return;
    }
    let conteo = {};

    for (let i = 0; i < numeros.length; i++) {
        let numero = Number(numeros[i]);

        if (!isNaN(numero) && numeros[i].trim() !== "") {

            // Si el número ya existe en conteo, sumarle 1
            if (conteo[numero] !== undefined) {
                conteo[numero] = conteo[numero] + 1;

        
            } else {
                conteo[numero] = 1;
            }
        }
    }
    let maxFrecuencia = 0;

    for (let clave in conteo) {
        if (conteo[clave] > maxFrecuencia) {
            maxFrecuencia = conteo[clave];
        }
    }

  
    let modas = [];

    for (let clave in conteo) {
        if (conteo[clave] === maxFrecuencia) {
            modas.push(clave);
        }
    }

    if (maxFrecuencia === 1) {
        document.getElementById("resultadoModa").textContent = "No hay moda, ningún número se repite.";
    } else {
        document.getElementById("resultadoModa").textContent = 
            "Moda: " + modas.join(", ") + " — Se repite " + maxFrecuencia + " veces.";
    }
}

function calcularModaAgrupada() {


    let Li = Number(document.getElementById("inputLi").value);
    let fi = Number(document.getElementById("inputFi").value);
    let fiAnterior  = Number(document.getElementById("inputFiAnterior").value);
    let fiSiguiente = Number(document.getElementById("inputFiSiguiente").value);
    let Ai = Number(document.getElementById("inputAi").value);

    
    if (isNaN(Li) || isNaN(fi) || isNaN(fiAnterior) || isNaN(fiSiguiente) || isNaN(Ai)) {
        document.getElementById("resultadoModaAgrupada").textContent = "Por favor completa todos los campos.";
        return;
    }

   
    let denominador = (fi - fiAnterior) + (fi - fiSiguiente);

   
    if (denominador === 0) {
        document.getElementById("resultadoModaAgrupada").textContent = "Error: el denominador es cero.";
        return;
    }

    
    let moda = Li + ((fi - fiAnterior) / denominador) * Ai;

    
    document.getElementById("resultadoModaAgrupada").textContent = "Moda = " + moda.toFixed(2);
}


// Banco de preguntas
let preguntas = [
    {
        pregunta: "¿Qué es la media estadística y cuál es su principal utilidad?",
        opciones: ["Es la diferencia entre el dato mayor y el menor para ver la dispersión.", "Es un valor promedio que sirve para encontrar un punto de equilibrio donde los valores se compensan.", "Es el valor central que divide al conjunto exactamente en dos partes iguales.", "Es el intervalo que acumula la menor cantidad de frecuencias absolutas."],
        correcta: 1
    },
    {
        pregunta: "En la fórmula de la media aritmética, ¿qué representa el símbolo 'n'?",
        opciones: ["La suma de todos los valores evaluados.", "El valor máximo alcanzado dentro de la muestra.", "La cantidad total de datos que conforman el conjunto.", "La amplitud del intervalo analizado."],
        correcta: 2
    },
    {
        pregunta: "¿Cómo se define conceptualmente la moda en estadística?",
        opciones: ["Como el promedio de los valores extremos.", "Como el dato que se encuentra exactamente en la mitad al ordenarlos.", "Como el proceso de limpiar e inspeccionar variables temporales.", "Como el dato o valor que aparece con mayor frecuencia en la muestra."],
        correcta: 3
    },
    {
        pregunta: "Si en una distribución estadística el máximo número de repeticiones se produce en tres o más valores diferentes, se denomina:",
        opciones: ["Moda unimodal", "Moda bimodal", "Moda multimodal", "Moda agrupada"],
        correcta: 2
    },
    {
        pregunta: "Cuando los datos están agrupados en intervalos, ¿por qué se utiliza una fórmula especial en lugar de solo contar las repeticiones?",
        opciones: ["Porque los datos agrupados no se pueden sumar.", "Porque realmente no conocemos cuántas veces está repetido cada dato individualmente, solo la frecuencia del intervalo.", "Porque la moda agrupada siempre debe dar un resultado decimal.", "Porque los intervalos eliminan automáticamente los datos erróneos."],
        correcta: 1
    },
    {
        pregunta: "En la fórmula de la moda para datos agrupados, ¿qué parámetro representa la sigla 'Li'?",
        opciones: ["La amplitud total del intervalo modal.", "La frecuencia absoluta de la clase inmediatamente posterior.", "El límite inferior del intervalo de la clase modal.", "La frecuencia absoluta acumulada inicial."],
        correcta: 2
    },
    {
        pregunta: "¿Qué es la tendencia en estadística y para qué sirve?",
        opciones: ["Es el valor que más se repite a lo largo de un solo día.", "Es la dirección o comportamiento que siguen los datos en el tiempo, útil para analizar cambios y predecir comportamientos.", "Es la técnica para promediar únicamente los intervalos agrupados.", "Es el error absoluto que se genera al dividir para cero."],
        correcta: 1
    },
    {
        pregunta: "Si al analizar una serie cronológica, la diferencia entre el último dato y el primer dato es menor que cero, la tendencia se clasifica como:",
        opciones: ["↗ Creciente", "→ Estable", "↘ Decreciente", "Neutral"],
        correcta: 2
    },
    {
        pregunta: "En la fórmula de la tendencia, ¿qué representa la variable 'MM_t'?",
        opciones: ["La muestra máxima del intervalo absoluto.", "El resultado promedio (Media Móvil) en el período de tiempo actual t.", "La mediana multiplicada por el tiempo total.", "La moda absoluta del período inicial."],
        correcta: 1
    },

    {
        pregunta: "Los ingresos mensuales de 10 familias ordenados de menor a mayor son: $300, $320, $350, $390, $420, $480, $500, $520, $600, $850. ¿Cuál es el valor exacto de la mediana?",
        opciones: [
            "Es $420, porque es el último valor de la primera mitad de los datos.",
            "Es $450, ya que al ser un número par de datos (n=10), se promedian los dos valores centrales ($420 y $480).",
            "Es $483, porque corresponde al promedio aritmético simple de todos los ingresos de la muestra.",
            "Es $550, porque es el punto medio exacto entre el ingreso más bajo y el más alto."
        ],
        correcta: 1
    },
    {
        pregunta: "Se registran las notas de 7 estudiantes en un examen: 12, 15, 18, 14, 11, 20 y 19. Si ordenamos los datos de menor a mayor para aplicar la fórmula de cantidad impar (n=7), ¿cuál es el valor de la mediana?",
        opciones: [
            "Es 14, porque al dividir el total de datos para dos (7 / 2) da 3.5 y se redondea hacia abajo.",
            "Es 15, porque una vez ordenados los datos (11, 12, 14, 15, 18, 19, 20), el número 15 ocupa la posición central exacta.",
            "Es 15.5, porque corresponde al promedio de los dos números que quedan en los extremos.",
            "Es 18, porque es la nota que se encuentra justo en la mitad del listado original sin ordenar."
        ],
        correcta: 1
    },
    {
        pregunta: "Un analista calcula la mediana de una lista ordenada de 8 datos (n es par). ¿Cómo obtiene el sistema el valor final de la mediana?",
        opciones: [
            "Toma directamente el dato que se encuentra en la posición número 4.",
            "Suma el dato de la posición 4 y el de la posición 5, y calcula su promedio.",
            "Divide el total de datos para dos y toma el número entero más cercano.",
            "Busca el dato que más veces se repite entre las posiciones centrales."
        ],
        correcta: 1
    },
    {
        pregunta: "¿Cuáles son las definiciones conceptuales correctas de la Media aritmética y de la Mediana dentro del análisis estadístico?",
        opciones: [
            "La Media es la tasa de variación porcentual acumulada de la muestra, mientras que la Mediana es la diferencia absoluta entre el valor máximo y el mínimo.",
            "La Media es el valor promedio que se obtiene al dividir la suma de todos los datos para el número total de elementos, mientras que la Mediana es el valor que ocupa la posición central en un conjunto de datos ordenados.",
            "La Media es el dato que registra la mayor frecuencia absoluta en la distribución, mientras que la Mediana es la representación geométrica de los intervalos de clase.",
            "La Media es el límite inferior del primer cuartil de la muestra, mientras que la Mediana es el resultado de multiplicar la varianza por el total de datos (n)."
        ],
        correcta: 1
    },
    {
        pregunta: "Un artículo que costaba $80 sube un 25% de precio. Semanas después, el nuevo precio baja un 25%. ¿Cuál es el valor resultante final?",
        opciones: [
            "Sigue costando $80, porque el aumento del 25% y la baja del 25% se anulan entre sí.",
            "Cuesta $75, porque el 25% de descuento se calcula sobre el nuevo precio de $100, restando $25 al total.",
            "Cuesta $60, porque se resta el porcentaje directamente del valor inicial de fábrica.",
            "Cuesta $105 debido a los impuestos acumulados por el cambio de precios."
        ],
        correcta: 1
    },
    {
        pregunta: "Un pantalón de $50 tiene el 10% de descuento directo en la etiqueta. Al pagar en caja, aplican un 10% de descuento adicional sobre el valor ya rebajado. ¿Cuánto terminas pagando en total?",
        opciones: [
            "Pagas $40, porque los dos descuentos se suman directamente dando un 20% en total.",
            "Pagas $40.50, porque el primer descuento deja el pantalón en $45, y el segundo descuento del 10% te resta $4.50 adicionales.",
            "Pagas $42.50, porque el segundo descuento solo aplica a la mitad del precio original.",
            "Pagas $45, porque las políticas de la tienda impiden acumular dos promociones seguidas."
        ],
        correcta: 1
    },   
    {
        pregunta: "Al observar un gráfico de líneas que muestra las ventas de una tienda, notas que la línea sube en unos meses y baja en otros, pero al mirar el año completo la línea empezó en $2,000 y terminó en $5,500. ¿Qué describe este comportamiento?",
        opciones: [
            "Una tendencia decreciente con alta estabilidad.",
            "Una tendencia creciente, a pesar de presentar variaciones o fluctuaciones en cortos periodos de tiempo.",
            "Un error absoluto en la recolección de los datos mensuales.",
            "Una distribución perfectamente simétrica donde la media y la moda coinciden."
        ],
        correcta: 1
    },     
    {
        pregunta: "Estás analizando el registro de temperatura diaria de un refrigerador médico que siempre marca entre 2°C y 4°C. De repente, el día martes registra 18°C. ¿Cómo se clasifica estadísticamente este valor?",
        opciones: [
            "Es un promedio móvil estándar del periodo analizado.",
            "Es una anomalía o valor atípico (outlier) que requiere investigación inmediata para comprobar errores o fallas.",
            "Es la moda de la semana porque representa el cambio más visible.",
            "Es una tendencia neutral estable de la serie cronológica."
        ],
        correcta: 1
    },
    {
        pregunta: "Si en un conjunto de datos encuentras una anomalía (valor atípico), ¿cuál debería ser el primer paso antes de decidir eliminarla del análisis?",
        opciones: [
            "Borrarla de inmediato para que la media aritmética no sufra alteraciones.",
            "Verificar el origen del dato para identificar si se trata de un error de digitación, una falla de medición o un evento real extraordinario.",
            "Cambiar su valor por el de la mediana para forzar la simetría del grupo.",
            "Duplicar los demás datos para restar importancia a la anomalía."
        ],
        correcta: 1
    },
    {
        pregunta: "¿Por qué las anomalías o valores atípicos extremos representan un riesgo al calcular únicamente la media aritmética de un estudio?",
        opciones: [
            "Porque causan que el sistema divida para cero automáticamente.",
            "Porque la media es muy sensible a los valores extremos y un solo dato anómalo puede distorsionar el promedio, dando una falsa representación de la realidad.",
            "Porque eliminan las frecuencias absolutas de los intervalos agrupados.",
            "Porque obligan a que el resultado final sea un número entero negativo."
        ],
        correcta: 1
    }
    
];

let preguntasSeleccionadas = [];
let respuestasUsuario = [];

function iniciarCuestionario() {

    // 1. Mezclar las preguntas de forma aleatoria
    let mezcladas = preguntas.slice();
    for (let i = mezcladas.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = mezcladas[i];
        mezcladas[i] = mezcladas[j];
        mezcladas[j] = temp;
    }

    // 2. Tomar solo las primeras 5
    preguntasSeleccionadas = mezcladas.slice(0, 5);
    respuestasUsuario = [];

    // 3. Limpiar resultados anteriores
    document.getElementById("resultadoCuestionario").textContent = "";

    // 4. Construir el HTML del cuestionario
    let html = "";

    for (let i = 0; i < preguntasSeleccionadas.length; i++) {
        let p = preguntasSeleccionadas[i];

        html += "<br><p><strong>Pregunta " + (i + 1) + ": " + p.pregunta + "</strong></p>";

        for (let j = 0; j < p.opciones.length; j++) {
            html += "<label>";
            html += "<input type='radio' name='pregunta" + i + "' value='" + j + "'> ";
            html += p.opciones[j];
            html += "</label><br>";
        }
    }

    html += "<br><button onclick='verificarRespuestas()'>Ver resultados</button>";

    
    html += "<br><button onclick='reiniciarCuestionario()'>Reiniciar cuestionario</button>";
    

    document.getElementById("cuestionario").innerHTML = html;
    
}

function verificarRespuestas() {

    let correctas = 0;

    for (let i = 0; i < preguntasSeleccionadas.length; i++) {

        // Buscar qué opción seleccionó el usuario en cada pregunta
        let opciones = document.getElementsByName("pregunta" + i);
        let respuesta = -1;

        for (let j = 0; j < opciones.length; j++) {
            if (opciones[j].checked) {
                respuesta = Number(opciones[j].value);
            }
        }

        // Comparar con la respuesta correcta
        if (respuesta === preguntasSeleccionadas[i].correcta) {
            correctas = correctas + 1;
        }
    }

    // Mostrar puntaje final
    document.getElementById("resultadoCuestionario").textContent = 
        "Obtuviste " + correctas + " de 5 respuestas correctas.";
}

function reiniciarCuestionario() {
    document.getElementById("cuestionario").innerHTML = "";
    document.getElementById("resultadoCuestionario").textContent = "";
}

function calcularTendencia() {
    // 1. Capturar el texto del textarea y transformarlo en un array de números
    let texto = document.getElementById("inputDatosTendencia").value;
    let partes = texto.split(",");
    let datos = [];

    for (let i = 0; i < partes.length; i++) {
        let numero = Number(partes[i].trim());
        // Validar que sea un número real y no esté vacío
        if (!isNaN(numero) && partes[i].trim() !== "") {
            datos.push(numero);
        }
    }

    // 2. Validación de cantidad mínima de datos
    if (datos.length < 2) {
        document.getElementById("contenedorResultadosBásicos").style.display = "none";
        alert("Por favor ingresa al menos dos datos.");
        return;
    }

    // 3. Cálculos básicos elementales
    let primerDato = datos[0];
    let ultimoDato = datos[datos.length - 1];
    let diferencia = ultimoDato - primerDato;

    // Calcular el promedio acumulado de la serie
    let suma = 0;
    for (let i = 0; i < datos.length; i++) {
        suma += datos[i];
    }
    let promedio = suma / datos.length;

    // 4. Determinar la dirección de la tendencia mediante condicionales simples
    let direccion = "";
    let colorTexto = "";
    let mensajeExplicativo = "";

    if (diferencia > 0) {
        direccion = "↗ Creciente";
        colorTexto = "#c8873a"; // Tu color ámbar '--accent'
        mensajeExplicativo = "Los datos muestran un crecimiento generalizado. El último valor (" + ultimoDato + ") es mayor que el valor inicial (" + primerDato + ").";
    } else if (diferencia < 0) {
        direccion = "↘ Decreciente";
        colorTexto = "#0f2d52"; // Tu color azul '--navy'
        mensajeExplicativo = "Los datos muestran un descenso sostenido en el tiempo. El último valor (" + ultimoDato + ") es menor que el valor inicial (" + primerDato + ").";
    } else {
        direccion = "→ Estable";
        colorTexto = "#6b7f90"; // Tu color gris '--text-muted'
        mensajeExplicativo = "El comportamiento final se ha mantenido neutral respecto al inicio del periodo analizado.";
    }

    // 5. Renderizar los resultados en el HTML
    document.getElementById("base-tasa").textContent = (diferencia > 0 ? "+" : "") + diferencia.toFixed(2);
    document.getElementById("base-promedio").textContent = promedio.toFixed(2);
    
    let elementoDireccion = document.getElementById("base-direccion");
    elementoDireccion.textContent = direccion;
    elementoDireccion.style.color = colorTexto;

    document.getElementById("base-interpretacion").textContent = mensajeExplicativo;

    // Hacer visible el contenedor de resultados cambiando el "display: none"
    document.getElementById("contenedorResultadosBásicos").style.display = "block";
}