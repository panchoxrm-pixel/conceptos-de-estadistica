// Variables globales Diego

//Variables globales Francisco


// Funciones generales
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
   
    let numeros = texto.split(",");

    let suma = 0;
    let cantidad = 0;

    for (let i = 0; i < numeros.length; i++) {
        let numero = Number(numeros[i]);

        // Solo contar si es un número válido
        if (!isNaN(numero) && numeros[i] !== "") {
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
