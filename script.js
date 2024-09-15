const units = {
    mass: ["Kilograms", "Grams", "Pounds", "Ounces"],
    temperature: ["Celsius", "Fahrenheit", "Kelvin"],
    area: ["Square Meters", "Square Kilometers", "Square Miles", "Square Feet"],
    time: ["Seconds", "Minutes", "Hours", "Days"],
    volume: ["Liters", "Milliliters", "Gallons", "Cubic Meters"],
    length: ["Meters", "Kilometers", "Miles", "Feet", "Inches"]
};

const conversions = {
    mass: {
        "Kilograms": 1000,
        "Grams": 1,
        "Pounds": 2.20462,
        "Ounces": 35.274
    },
    temperature: {
        toCelsius(value, fromUnit) {
            if (fromUnit === "Fahrenheit") return (value - 32) * 5/9;
            if (fromUnit === "Kelvin") return value - 273.15;
            return value;
        },
        fromCelsius(value, toUnit) {
            if (toUnit === "Fahrenheit") return (value * 9/5) + 32;
            if (toUnit === "Kelvin") return value + 273.15;
            return value;
        }
    },
    area: {
        "Square Meters": 1,
        "Square Kilometers": 1e-6,
        "Square Miles": 3.861e-7,
        "Square Feet": 10.7639
    },
    time: {
        "Seconds": 1,
        "Minutes": 1/60,
        "Hours": 1/3600,
        "Days": 1/86400
    },
    volume: {
        "Liters": 1,
        "Milliliters": 1000,
        "Gallons": 0.264172,
        "Cubic Meters": 0.001
    },
    length: {
        "Meters": 1,
        "Kilometers": 0.001,
        "Miles": 0.000621371,
        "Feet": 3.28084,
        "Inches": 39.3701
    }
};

function populateUnits() {
    const category = document.getElementById("category").value;
    const fromUnitSelect = document.getElementById("fromUnit");
    const toUnitSelect = document.getElementById("toUnit");

    fromUnitSelect.innerHTML = "";
    toUnitSelect.innerHTML = "";

    units[category].forEach(unit => {
        const optionFrom = document.createElement("option");
        optionFrom.value = unit;
        optionFrom.textContent = unit;
        fromUnitSelect.appendChild(optionFrom);

        const optionTo = document.createElement("option");
        optionTo.value = unit;
        optionTo.textContent = unit;
        toUnitSelect.appendChild(optionTo);
    });
}

function convert() {
    const category = document.getElementById("category").value;
    const inputValue = parseFloat(document.getElementById("inputValue").value);
    const fromUnit = document.getElementById("fromUnit").value;
    const toUnit = document.getElementById("toUnit").value;

    if (isNaN(inputValue)) {
        alert("Please enter a valid number");
        return;
    }

    let result;

    if (category === "temperature") {
        const valueInCelsius = conversions.temperature.toCelsius(inputValue, fromUnit);
        result = conversions.temperature.fromCelsius(valueInCelsius, toUnit);
    } else {
        const conversionFactor = conversions[category][fromUnit] / conversions[category][toUnit];
        result = inputValue * conversionFactor;
    }

    document.getElementById("result").textContent = `Result: ${result} ${toUnit}`;
}

// Initialize the unit options on page load
window.onload = populateUnits;
