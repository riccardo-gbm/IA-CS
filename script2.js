let renta = 0, servicios = 0, alimentacion = 0, costoTransporte = 0, entretenimiento = 0, salud = 0, personales = 0, propios = 0, impuestos = 0;
const API_KEY = "f62bef46f86c9dfc98ce086f"; //Llave única API para obtener las tasas de conversión de monedas en tiempo real
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair`; //Hipervínculo para obtenerlas

costoVidaCalculado=0 /*Establecimiento de variables globales*/

document.addEventListener("DOMContentLoaded", function () {
        // Función que se ejecuta cuando la página carga
    document.getElementById("calcular").addEventListener("click", calcularCosto);
});

function calcularCosto() { /*Cálculo lógicos y matemáticos del costo de vida*/
    let vivienda = document.getElementById("vivienda").value;//valor de vivienda obtenido melbourne.html

    if (vivienda === "universidad") { /*Costo de distintas variables si el usuario escoge una residencia universitaria*/
        renta = 375.81*52 ;
        servicios = 30;
        alimentacion = 350;
    } else { /*Costo de distintas variables si el usuario escoge una vivienda aparte*/
        let roomies = parseInt(document.getElementById("roomies").value) || 1; /*número de acompañantes en una vivienda, divide el costo de ciertas variables*/
        renta = (750 / (roomies+1))*52;  //Siempre se considera una pesona en la vivienda aunque no tenga acompañantes, 
        servicios = (40 + 75 + 50+60+30)/(roomies+1);
        alimentacion = 350;
    }
/*Valores obtenidos en melbourne.html*/
    let transporte = document.getElementById("transporte").value;
    let taxis = parseInt(document.getElementById("taxis").value) || 0;
    costoTransporte = transporte === "bicicleta" ? 1000 + ((taxis * 15 * 4)*12) : (106 + (taxis * 15 * 4))*12;
/*Costo anual del transporte dependiendo el medio escogido por el cliente*/
    let comerFuera = parseInt(document.getElementById("comerFuera").value) || 0;
    let cafes = parseInt(document.getElementById("cafes").value) || 0;
    alimentacion += (comerFuera * 30) + (cafes * 10);
/*Alimentación dependiendo la vivienda y las preferencias adicionales*/
    let cine = parseInt(document.getElementById("cine").value) || 0;
    let discoteca = parseInt(document.getElementById("discoteca").value) || 0;
    let bebidas = parseInt(document.getElementById("bebidas").value) || 0;
    let suscripciones = parseInt(document.getElementById("suscripciones").value) || 0;
    entretenimiento = (cine * 15) + (discoteca * 4 * 20) + (bebidas * 10) + (suscripciones * 10);
/*Entretenimiento total junto a las preferencias*/
    salud = 45;/*Seguro de salud obligatorio*/
    personales = 50 + 15 + 20 + 40; //Gastos personales, higiene, gastos varios, lavandería, y suministros de oficina
    let turismo = parseInt(document.getElementById("turismo").value) || 0;
    let gym = document.getElementById("gimnasio").checked ? 60 : 0;
    let music = document.getElementById("musica").checked ? 10 : 0;
    let ropa = parseInt(document.getElementById("compras").value) || 0;
    personales += (ropa * 80) + (turismo * 200) + gym + music;
    propios=500//Gastos personales, higiene, gastos varios, lavandería, y suministros de oficina

    impuestos = 0; //Cálculo de impuestos si se va a trabajar
    if (document.getElementById("trabajo").checked) {
        let pago = parseInt(document.getElementById("pago").value) || 0;
        let horas = parseInt(document.getElementById("horas").value) || 0;
        let semanas = parseInt(document.getElementById("semanas").value) || 0;
        let ingresos = horas * semanas*pago;
        if (ingresos < 18200) impuestos = 0;
        else if (ingresos < 45000) impuestos = 0.19 * (ingresos - 18200);
        else if (ingresos < 120000) impuestos = 5092 + (0.325 * (ingresos - 45000));
        else if (ingresos < 180000) impuestos = 29567 + (0.37 * (ingresos - 120000));
        else impuestos = 51667 + (0.45 * (ingresos - 180000));
    }
    //Costo total
    costoVidaCalculado = ((servicios + alimentacion + entretenimiento + salud + personales) * 12)+impuestos+(propios*2)+renta+costoTransporte;
    document.getElementById("resultado").innerText = `Costo de vida anual en Melbourne: ${costoVidaCalculado.toLocaleString('en-AU', { style: 'currency', currency: 'AUD' })}`;
}
//Conversión del valor calculado de la moneda local a la moneda preferida
async function convertCurrency() {
    const fromCurrency = "AUD"; //Moneda local
    const toCurrency = document.getElementById("toCurrency").value;

    if (!costoVidaCalculado || costoVidaCalculado <= 0) { //Comprobación de que haya un valor a convertir
        alert("Primero calcula el costo de vida.");
        return;
    }

    const url = `${API_URL}/${fromCurrency}/${toCurrency}/${costoVidaCalculado}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Error en la API"); // En caso de que las solicitudes al api se acaben muestra el siguiente error

        const data = await response.json();
        const convertedAmount = data.conversion_result.toFixed(2); //redondeo a 2 cifras decimales
        //muestreo de resultados
        document.getElementById("result").innerText =
            `${costoVidaCalculado.toLocaleString('en-AU', { style: 'currency', currency: 'AUD' })} AUD = $${convertedAmount} ${toCurrency}`;
    } catch (error) {
        document.getElementById("result").innerText = "Error al obtener los datos.";
    }
}
async function convertirMonto(monto, currency) {//función para convertir los valores de cada categoría a la moneda escogida previamente
    const url = `${API_URL}/AUD/${currency}/${monto}`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Error en la API");
        const data = await response.json();
        return data.conversion_result.toFixed(2);
    } catch (error) {
        return "Error";
    }
}
async function generarPDF() { //función de generación del pdf
    const doc = new jspdf.jsPDF();
    let yOffset = 10; //inicio de la página
    const pageHeight = doc.internal.pageSize.height; 

    function checkPageBreak() {
        if (yOffset >= pageHeight - 20) { 
            doc.addPage();
            yOffset = 10; 
        }
    }
    //Preferencias del texto 
    doc.setFontSize(18);
    doc.text("Informe de Costo de Vida en Melbourne", 10, yOffset);
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

    doc.text(`Costo de vida anual en Melbourne: ${costoVidaCalculado.toLocaleString('en-AU', { style: 'currency', currency: 'AUD' })} AUD`, 10, yOffset);
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
        { nombre: "Impuestos", valor: impuestos }
    ];

    //Conversión de las categorias diferentes
    const conversiones = await Promise.all(
        categorias.map(async (categoria) => {
            return await convertirMonto(categoria.valor, toCurrency);
        })
    );

   
    categorias.forEach((categoria, index) => {
        doc.text(
            `${categoria.nombre}: ${categoria.valor.toLocaleString('en-AU', { style: 'currency', currency: 'AUD' })} AUD = ${conversiones[index]} ${toCurrency}`,
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
    doc.save("Informe_Costo_Vida_Melbourne.pdf");
}

