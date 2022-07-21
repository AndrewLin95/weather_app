import { updateTopPage, updateBottomPage } from "./display";

const unitBtn = document.querySelector('#unitToggle');

let currentUnit = 'Celcius';

// eventlistner keeps track of which format (celcius or fahernheit) to display. if clicked, the page is updated to show new values
unitBtn.addEventListener('click', () => {
    if (unitBtn.textContent === 'Celcius °C'){
        unitBtn.textContent = 'Fahrenheit °F';
        currentUnit = 'Fahrenheit';
    } else if (unitBtn.textContent === 'Fahrenheit °F'){
        unitBtn.textContent = 'Celcius °C';
        currentUnit = 'Celcius';
    }
    updateTopPage();
    updateBottomPage();
});

// depending on the tracked format, this calculates the raw units from the API (kelvin) into either celcius or fahrenheit
function convertUnit(kelvin) {
    if (currentUnit === 'Celcius'){
        return `${kelvin - 273}°C`
    } else if (currentUnit ==='Fahrenheit'){
        return `${((kelvin - 273)*9/5) + 32}°F`
    }
}

export { convertUnit };