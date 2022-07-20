import { updateTopPage } from "./display";

const unitBtn = document.querySelector('#unitToggle');

let currentUnit = 'Celcius';

unitBtn.addEventListener('click', () => {
    if (unitBtn.textContent === 'Celcius °C'){
        unitBtn.textContent = 'Fahrenheit °F';
        currentUnit = 'Fahrenheit';
    } else if (unitBtn.textContent === 'Fahrenheit °F'){
        unitBtn.textContent = 'Celcius °C';
        currentUnit = 'Celcius';
    }
    updateTopPage();
});

function convertUnit(kelvin) {
    if (currentUnit === 'Celcius'){
        return `${kelvin - 273}°C`
    } else if (currentUnit ==='Fahrenheit'){
        return `${((kelvin - 273)*9/5) + 32}°F`
    }
}

console.log('test');

export { convertUnit };