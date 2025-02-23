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
const cityData = {
    sydney: { rent: 2000, utilities: 150, transport: 120, food: 400, entertainment: 200, health: 100, personal: 250, taxes: 300 },
    melbourne: { rent: 1800, utilities: 140, transport: 110, food: 380, entertainment: 190, health: 90, personal: 230, taxes: 280 },
    monterrey: { rent: 800, utilities: 100, transport: 50, food: 200, entertainment: 150, health: 80, personal: 150, taxes: 100 },
    cdmx: { rent: 700, utilities: 90, transport: 40, food: 180, entertainment: 130, health: 70, personal: 140, taxes: 90 },
    ottawa: { rent: 1600, utilities: 130, transport: 100, food: 350, entertainment: 180, health: 95, personal: 220, taxes: 260 },
    toronto: { rent: 2200, utilities: 160, transport: 130, food: 450, entertainment: 210, health: 110, personal: 270, taxes: 320 }
};

document.getElementById("city").addEventListener("change", function() {
    let city = this.value;
    if (cityData[city]) {
        document.getElementById("rent").value = cityData[city].rent;
        document.getElementById("utilities").value = cityData[city].utilities;
        document.getElementById("transport").value = cityData[city].transport;
        document.getElementById("food").value = cityData[city].food;
        document.getElementById("entertainment").value = cityData[city].entertainment;
        document.getElementById("health").value = cityData[city].health;
        document.getElementById("personal").value = cityData[city].personal;
        document.getElementById("taxes").value = cityData[city].taxes;
    }
});
