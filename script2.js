document.addEventListener("DOMContentLoaded", function () {
    // Función que se ejecuta cuando la página carga
    document.getElementById("calcular").addEventListener("click", calcularCosto);
});

function calcularCosto() {
    let vivienda = document.getElementById("vivienda").value;
    let renta = 0, servicios = 0, alimentacion = 0;

    if (vivienda === "universidad") {
        renta = 375.81*52 ;
        servicios = 30;
        alimentacion = 350;
    } else {
        let roomies = parseInt(document.getElementById("roomies").value) || 1;
        renta = (750 / (roomies+1))*52;
        servicios = (40 + 75 + 50+60+30)/(roomies+1);
        alimentacion = 350;
    }

    let transporte = document.getElementById("transporte").value;
    let taxis = parseInt(document.getElementById("taxis").value) || 0;
    let costoTransporte = transporte === "bicicleta" ? 1000 + ((taxis * 15 * 4)*12) : (106 + (taxis * 15 * 4))*12;

    let comerFuera = parseInt(document.getElementById("comerFuera").value) || 0;
    let cafes = parseInt(document.getElementById("cafes").value) || 0;
    alimentacion += (comerFuera * 30) + (cafes * 10);

    let cine = parseInt(document.getElementById("cine").value) || 0;
    let discoteca = parseInt(document.getElementById("discoteca").value) || 0;
    let bebidas = parseInt(document.getElementById("bebidas").value) || 0;
    let suscripciones = parseInt(document.getElementById("suscripciones").value) || 0;
    let entretenimiento = (cine * 15) + (discoteca * 4 * 20) + (bebidas * 10) + (suscripciones * 10);

    let salud = 45;
    let personales = 50 + 15 + 20 + 40;
    let turismo = parseInt(document.getElementById("turismo").value) || 0;
    let gym = document.getElementById("gimnasio").checked ? 60 : 0;
    let music = document.getElementById("musica").checked ? 10 : 0;
    let ropa = parseInt(document.getElementById("compras").value) || 0;
    personales += (ropa * 80) + (turismo * 200) + gym + music;
    let propios=500

    let impuestos = 0;
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

    let total = ((servicios + alimentacion + entretenimiento + salud + personales) * 12)+impuestos+(propios*2)+renta+costoTransporte;
    document.getElementById("resultado").innerText = `Costo de vida anual en Melbourne: ${total.toLocaleString('en-AU', { style: 'currency', currency: 'AUD' })}`;
}