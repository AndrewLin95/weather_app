import { getLatLon, initialize } from "./modules/apiCalls";

const weatherForm = document.querySelector('#weatherForm');

weatherForm.addEventListener('submit', () => {
    const weatherInput = document.querySelector('#weatherInput');
    const inputFormat = weatherInput.value.trim();
    getLatLon(inputFormat);
})

// default initialize to Toronto
initialize();