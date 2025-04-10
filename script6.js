let renta = 0, servicios = 0, alimentacion = 0, costoTransporte = 0, entretenimiento = 0, salud = 0, personales = 0, propios = 0, impuestos = 0;
const API_KEY = "f62bef46f86c9dfc98ce086f"; //Llave única API para obtener las tasas de conversión de monedas en tiempo real
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair`; //Hipervínculo para obtenerlas
let costoVidaCalculado = 0;  /*Establecimiento de variables globales*/

document.addEventListener("DOMContentLoaded", function () {
    // Función que se ejecuta cuando la página carga
    document.getElementById("calcular").addEventListener("click", calcularCosto);
});

function calcularCosto() { /*Cálculo lógicos y matemáticos del costo de vida*/
    let vivienda = document.getElementById("vivienda").value;

    if (vivienda === "r_keele") { /*Costo de distintas variables si el usuario escoge campus keele */
        renta = 750+((10297.97/8)*12) ;
        servicios = 50;
        alimentacion = 0;
    } else if(vivienda==="r_glendon"){ /*Costo de distintas variables si el usuario escoge campus glendon */
        renta = 750+((10810.54/8)*12) ;
        servicios = 50;
        alimentacion = 0;
    } else if(vivienda==="r_markham"){ /*Costo de distintas variables si el usuario escoge campus markham */
        renta = 750+((1400)*12) ;
        servicios = 50;
        alimentacion = 0;
    }else { /*Costo de distintas variables si el usuario escoge vivir aparte */
        let roomies = parseInt(document.getElementById("roomies").value) || 1;
        let personas = roomies +1
        renta = (1800 / personas)*12;
        servicios = (75+75+60+60+50)/personas;
        alimentacion = 400;
    }
    /*Valores obtenidos en toronto.html*/
    let transporte = document.getElementById("transporte").value;
    let taxis = parseInt(document.getElementById("taxis").value) || 0;
    costoTransporte = transporte === "bicicleta" ? 900 + ((taxis * 20 * 4)*12) : (128 + (taxis * 20 * 4))*12;
/*Costo anual del transporte dependiendo el medio escogido por el cliente*/
    let comerFuera = parseInt(document.getElementById("comerFuera").value) || 0;
    let cafes = parseInt(document.getElementById("cafes").value) || 0;
    alimentacion += (comerFuera * 22.5) + (cafes * 3.5);
/*Alimentación dependiendo la vivienda y las preferencias adicionales*/
    let cine = parseInt(document.getElementById("cine").value) || 0;
    let discoteca = parseInt(document.getElementById("discoteca").value) || 0;
    let bebidas = parseInt(document.getElementById("bebidas").value) || 0;
    let suscripciones = parseInt(document.getElementById("suscripciones").value) || 0;
    entretenimiento = (cine * 14) + (discoteca * 4 * 15) + (bebidas * 7) + (suscripciones * 10);
/*Entretenimiento total junto a las preferencias*/
    salud = 85; /*Seguro de salud obligatorio*/
    personales = 50 + 15 + 20 + 20; //Gastos personales, higiene, gastos varios, lavandería, y suministros de oficina
    let turismo = parseInt(document.getElementById("turismo").value) || 0;
    let gym = document.getElementById("gimnasio").checked ? 60 : 0;
    let music = document.getElementById("musica").checked ? 10 : 0;
    let ropa = parseInt(document.getElementById("compras").value) || 0;
    personales += (ropa * 300) + (turismo * 200) + gym + music;
    propios=500 //Gastos personales, higiene, gastos varios, lavandería, y suministros de oficina
//Cálculo de impuestos si se va a trabajar, hay dos cuotas, una hacia el estado y otra para la provincia
    impuestos_federal = 0;
    impuestos_provincial = 0;
    if (document.getElementById("trabajo").checked) {
        let pago = parseInt(document.getElementById("pago").value) || 0;
        let horas = parseInt(document.getElementById("horas").value) || 0;
        let semanas = parseInt(document.getElementById("semanas").value) || 0;
        let ingresos = horas * semanas*pago;
        if (ingresos < 53359) impuestos_federal = 0.15*ingresos;
        else if (ingresos < 106717) impuestos_federal = 0.205 * ingresos;
        else if (ingresos < 165430) impuestos_federal = 0.260 * ingresos;
        else if (ingresos < 235675) impuestos_federal = 0.29 *ingresos;
        else impuestos_federal = 0.33 * ingresos;
    }
    if (document.getElementById("trabajo").checked) {
        let pago = parseInt(document.getElementById("pago").value) || 0;
        let horas = parseInt(document.getElementById("horas").value) || 0;
        let semanas = parseInt(document.getElementById("semanas").value) || 0;
        let ingresos = horas * semanas*pago;
        if (ingresos < 49231) impuestos_provincial = 0.0505 *ingresos;
        else if (ingresos < 98463) impuestos_provincial = 0.0915 * ingresos;
        else if (ingresos < 150000) impuestos_provincial = 0.1116 * ingresos;
        else if (ingresos < 220000) impuestos_provincial = 0.1216 *ingresos;
        else impuestos_provincial = 0.1316 * ingresos;
    }
//Costo total
    costoVidaCalculado = ((servicios + alimentacion + entretenimiento + salud + personales) * 12)+impuestos_federal+impuestos_provincial+(propios*2)+renta+costoTransporte;
    document.getElementById("resultado").innerText = `Costo de vida anual en Toronto: ${costoVidaCalculado.toLocaleString('en-CA', { style: 'currency', currency: 'CAD' })}`;
}
//Conversión del valor calculado de la moneda local a la moneda preferida
async function convertCurrency() {
    const fromCurrency = "CAD";  //Moneda local
    const toCurrency = document.getElementById("toCurrency").value;

    if (!costoVidaCalculado || costoVidaCalculado <= 0) { //Comprobación de que haya un valor a convertir
        alert("Primero calcula el costo de vida.");
        return;
    }

    const url = `${API_URL}/${fromCurrency}/${toCurrency}/${costoVidaCalculado}`;  // En caso de que las solicitudes al api se acaben muestra el siguiente error

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Error en la API");

        const data = await response.json();
        const convertedAmount = data.conversion_result.toFixed(2);
        //muestreo de resultados
        document.getElementById("result").innerText =
            `${costoVidaCalculado.toLocaleString('en-CA', { style: 'currency', currency: 'CAS' })} CAD = $${convertedAmount} ${toCurrency}`;
    } catch (error) {
        document.getElementById("result").innerText = "Error al obtener los datos.";
    }
}
async function convertirMonto(monto, currency) {
    const url = `${API_URL}/CAD/${currency}/${monto}`;
    try {
        const response = await fetch(url); //función para convertir los valores de cada categoría a la moneda escogida previamente
        if (!response.ok) throw new Error("Error en la API");
        const data = await response.json();
        return data.conversion_result.toFixed(2);
    } catch (error) {
        return "Error";
    }
}
async function generarPDF() { //función de generación del pdf
    const doc = new jspdf.jsPDF();
    let yOffset = 10;   //inicio de la página
    const pageHeight = doc.internal.pageSize.height; 

    function checkPageBreak() {
        if (yOffset >= pageHeight - 20) { 
            doc.addPage();
            yOffset = 10; 
        }
    }
    //Preferencias del texto 
    doc.setFontSize(18);
    doc.text("Informe de Costo de Vida en Toronto", 10, yOffset);
    yOffset += 10;
    checkPageBreak();

    doc.setFontSize(12);
    doc.text("Preferencias:", 10, yOffset);
    yOffset += 10;
    checkPageBreak();
     //Preferencias escogidas por el cliente 
    const preferencias = [
        `Tipo de vivienda: ${document.getElementById("vivienda").value}`,
        `Número de acompañantes: ${document.getElementById("roomies").value || 1}`,
        `Transporte preferido: ${document.getElementById("transporte").value}`,
        `Taxis por semana: ${document.getElementById("taxis").value || 0}`,
        `Comidas fuera por semana: ${document.getElementById("comerFuera").value || 0}`,
        `Cafés por semana: ${document.getElementById("cafes").value || 0}`,
        `Entradas al cine por mes: ${document.getElementById("cine").value || 0}`,
        `Turismo mensual: ${document.getElementById("turismo").value || 0}`,
        `Entradas a discoteca por mes: ${document.getElementById("discoteca").value || 0}`,
        `Bebidas en la discoteca: ${document.getElementById("bebidas").value || 0}`,
        `Suscripciones a streaming: ${document.getElementById("suscripciones").value || 0}`,
        `Servicio de música: ${document.getElementById("musica").checked ? "Sí" : "No"}`,
        `Gimnasio: ${document.getElementById("gimnasio").checked ? "Sí" : "No"}`,
        `Compras mensuales: ${document.getElementById("compras").value || 0}`,
        `Trabajo: ${document.getElementById("trabajo").checked ? "Sí" : "No"}`,
        `Pago por hora: ${document.getElementById("pago").value || 0}`,
        `Horas por semana: ${document.getElementById("horas").value || 0}`,
        `Semanas por año: ${document.getElementById("semanas").value || 0}`
    ];
 //Evita que se sobrepongan las variables en el documento
    preferencias.forEach(pref => {
        doc.text(pref, 10, yOffset);
        yOffset += 8;
        checkPageBreak(); 
    });

    doc.text("Cálculos:", 10, yOffset);
    yOffset += 10;
    checkPageBreak();

    doc.text(`Costo de vida anual en Toronto: ${costoVidaCalculado.toLocaleString('en-CA', { style: 'currency', currency: 'CAS' })} CAD`, 10, yOffset);
    yOffset += 10;
    checkPageBreak();

    doc.text("Desglose de gastos anuales:", 10, yOffset);
    yOffset += 10;
    checkPageBreak();
//Despliege de valores propios realizados en el cálculo previo
    const toCurrency = document.getElementById("toCurrency").value;
    const categorias = [
        { nombre: "Renta", valor: renta },
        { nombre: "Servicios", valor: servicios },
        { nombre: "Alimentación", valor: alimentacion },
        { nombre: "Transporte", valor: costoTransporte },
        { nombre: "Entretenimiento", valor: entretenimiento },
        { nombre: "Salud", valor: salud },
        { nombre: "Gastos personales", valor: personales },
        { nombre: "Gastos propios", valor: propios },
        { nombre: "Impuestos Federales", valor: impuestos_federal },
        { nombre: "Impuestos Provinciales", valor: impuestos_provincial },
    ];

    //Conversión de las categorias diferentes
    const conversiones = await Promise.all(
        categorias.map(async (categoria) => {
            return await convertirMonto(categoria.valor, toCurrency);
        })
    );

    categorias.forEach((categoria, index) => {
        doc.text(
            `${categoria.nombre}: ${categoria.valor.toLocaleString('en-CA', { style: 'currency', currency: 'CAD' })} AUD = ${conversiones[index]} ${toCurrency}`,
            10,
            yOffset
        );
        yOffset += 10;
        checkPageBreak();
    });

   //Costo total      
    const costoTotalConvertido = await convertirMonto(costoVidaCalculado, toCurrency);
    doc.text(`Costo total convertido a ${toCurrency}: ${costoTotalConvertido} ${toCurrency}`, 10, yOffset + 10);
    //Nombre del documento
    doc.save("Informe_Costo_Vida_Toronto.pdf");
}
