document.addEventListener("DOMContentLoaded", function () {
    // Función que se ejecuta cuando la página carga
    document.getElementById("calcular").addEventListener("click", calcularCosto);
});

function calcularCosto() {
    let vivienda = document.getElementById("vivienda").value;
    let renta = 0, servicios = 0, alimentacion = 0;

    if (vivienda === "universidad") {
        renta = 15438.69+700 ;
        servicios = 55.55;
        alimentacion = 0;
    } else {
        let roomies = parseInt(document.getElementById("roomies").value) || 1;
        let personas = roomies +1
        renta = (15000 / personas);
        servicios = (235.89+69,36)/personas;
        alimentacion = 275;
    }

    let transporte = document.getElementById("transporte").value;
    let taxis = parseInt(document.getElementById("taxis").value) || 0;
    let costoTransporte = transporte === "bicicleta" ? 900 + ((taxis * 2.10 * 4)*12) : (130 + (taxis * 2.10 * 4))*12;

    let comerFuera = parseInt(document.getElementById("comerFuera").value) || 0;
    let cafes = parseInt(document.getElementById("cafes").value) || 0;
    alimentacion += (comerFuera * 22.5) + (cafes * 3.5);

    let cine = parseInt(document.getElementById("cine").value) || 0;
    let discoteca = parseInt(document.getElementById("discoteca").value) || 0;
    let bebidas = parseInt(document.getElementById("bebidas").value) || 0;
    let suscripciones = parseInt(document.getElementById("suscripciones").value) || 0;
    let entretenimiento = (cine * 10) + (discoteca * 4 * 15) + (bebidas * 7) + (suscripciones * 10);

    let salud = 60;
    let personales = 50 + 15 + 20 + 20;
    let turismo = parseInt(document.getElementById("turismo").value) || 0;
    let gym = document.getElementById("gimnasio").checked ? 40 : 0;
    let music = document.getElementById("musica").checked ? 10 : 0;
    let ropa = parseInt(document.getElementById("compras").value) || 0;
    personales += (ropa * 150) + (turismo * 125) + gym + music;
    let propios=120*6

    let impuestos_federal = 0;
    let impuestos_provincial = 0;
    if (document.getElementById("trabajo").checked) {
        let pago = parseInt(document.getElementById("pago").value) || 0;
        let horas = parseInt(document.getElementById("horas").value) || 0;
        let semanas = parseInt(document.getElementById("semanas").value) || 0;
        let ingresos = horas * semanas*pago;
        if (ingresos < 53359) impuestos_federal = 0,15*ingresos;
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

    let total = ((servicios + alimentacion + entretenimiento + salud + personales) * 12)+impuestos_federal+impuestos_provincial+(propios*2)+renta+costoTransporte;
    document.getElementById("resultado").innerText = `Costo de vida anual en Ottawa: ${total.toLocaleString('en-CA', { style: 'currency', currency: 'CAD' })}`;
}