document.addEventListener("DOMContentLoaded", function () {
    // Función que se ejecuta cuando la página carga
    document.getElementById("calcular").addEventListener("click", calcularCosto);
});

function calcularCosto() {
    let vivienda = document.getElementById("vivienda").value;
    let renta = 0, servicios = 0, alimentacion = 0;

    if (vivienda === "u_c_c") {
        renta = 10780*12 ;
        servicios = 300;
        alimentacion = 0;
    } else if (vivienda ==='u_s_c') {
        renta =16287*12
        servicios = 300
        alimentacion = 0
    } else if (vivienda ==='u_c_f') {
        renta =7680*12
        servicios = 300
        alimentacion = 0
    } else if (vivienda ==='u_s_f') {
        renta =10290*12
        servicios = 300
        alimentacion = 0
    } else {
        let roomies = parseInt(document.getElementById("roomies").value) || 1;
        renta = (9000 / (roomies+1))*12;
        servicios = ((500+700+517+300)/(roomies +1));
        alimentacion = 2700;
    }

    let transporte = document.getElementById("transporte").value;
    let taxis = parseInt(document.getElementById("taxis").value) || 0;
    let costoTransporte = transporte === "bicicleta" ? (10250 + ((taxis * 150 * 4)*12)) : ((600 + (taxis * 4 * 150))*12);

    let comerFuera = parseInt(document.getElementById("comerFuera").value) || 0;
    let cafes = parseInt(document.getElementById("cafes").value) || 0;
    alimentacion += (comerFuera * 400) + (cafes * 100);

    let cine = parseInt(document.getElementById("cine").value) || 0;
    let discoteca = parseInt(document.getElementById("discoteca").value) || 0;
    let bebidas = parseInt(document.getElementById("bebidas").value) || 0;
    let suscripciones = parseInt(document.getElementById("suscripciones").value) || 0;
    let entretenimiento = (cine * 100) + (discoteca * 4 * 300) + (bebidas * 100) + (suscripciones * 120);

    let salud = document.getElementById("salud").checked ? 900:0 ;
    let personales = 1000 + 100 + 400 + 400;
    let turismo = parseInt(document.getElementById("turismo").value) || 0;
    let gym = document.getElementById("gimnasio").checked ? 1000 : 0;
    let music = document.getElementById("musica").checked ? 120 : 0;
    let ropa = parseInt(document.getElementById("compras").value) || 0;
    personales += (ropa * 1600) + (turismo * 2000) + gym + music;
    let propios=1000

    let total = ((servicios + alimentacion + entretenimiento + salud + personales+propios) * 12)+renta+costoTransporte;
    document.getElementById("resultado").innerText = `Costo de vida anual en Monterrey: ${total.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}`;
}