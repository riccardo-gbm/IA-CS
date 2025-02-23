function showCityForm() {
    let city = document.getElementById("city").value;
    let formContainer = document.getElementById("form-container");

    if (!city) {
        formContainer.innerHTML = "";
        return;
    }

    let formHTML = `
        <h2>Formulario para ${city.charAt(0).toUpperCase() + city.slice(1)}</h2>
        <form id="cost-form">
            <label for="rent">Renta mensual ($):</label>
            <input type="number" id="rent" required>

            <label for="utilities">Servicios básicos ($):</label>
            <input type="number" id="utilities" required>

            <label for="transport">Transporte ($):</label>
            <input type="number" id="transport" required>

            <label for="food">Alimentación ($):</label>
            <input type="number" id="food" required>

            <label for="entertainment">Entretenimiento ($):</label>
            <input type="number" id="entertainment" required>

            <label for="health">Salud ($):</label>
            <input type="number" id="health" required>

            <label for="personal">Gastos personales ($):</label>
            <input type="number" id="personal" required>

            <label for="taxes">Impuestos ($):</label>
            <input type="number" id="taxes" required>

            <button type="button" onclick="calculateCost()">Calcular</button>
        </form>
        <h2>Costo total de vida: $<span id="total-cost">0</span></h2>
    `;

    formContainer.innerHTML = formHTML;
}

function calculateCost() {
    let rent = parseFloat(document.getElementById("rent").value) || 0;
    let utilities = parseFloat(document.getElementById("utilities").value) || 0;
    let transport = parseFloat(document.getElementById("transport").value) || 0;
    let food = parseFloat(document.getElementById("food").value) || 0;
    let entertainment = parseFloat(document.getElementById("entertainment").value) || 0;
    let health = parseFloat(document.getElementById("health").value) || 0;
    let personal = parseFloat(document.getElementById("personal").value) || 0;
    let taxes = parseFloat(document.getElementById("taxes").value) || 0;

    let totalCost = rent + utilities + transport + food + entertainment + health + personal + taxes;

    document.getElementById("total-cost").textContent = totalCost.toFixed(2);
}

