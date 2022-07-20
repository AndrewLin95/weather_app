import { getCurrentWeather, callCurrentData } from "./modules/apiCalls";

const weatherForm = document.querySelector('#weatherForm');

weatherForm.addEventListener('submit', () => {
    const weatherInput = document.querySelector('#weatherInput');
    const inputFormat = weatherInput.value.trim();
    getCurrentWeather(inputFormat);
})

const testBtn = document.querySelector('#test');
testBtn.addEventListener('click', () => {
    console.log(callCurrentData());
})
