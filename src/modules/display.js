import { callCurrentData } from "./apiCalls";

function updatePage(){ 
    document.getElementById('location').textContent = callCurrentData().name;
    updateTemperature();
    document.getElementById('weatherIcon').setAttribute('src', `http://openweathermap.org/img/wn/${callCurrentData().weather[0].icon}@2x.png`);
    document.getElementById('description').textContent = ` ${callCurrentData().weather[0].description}`;
    document.getElementById('humidity').textContent = `${callCurrentData().main.humidity} %`;
    document.getElementById('pressure').textContent = `${callCurrentData().main.pressure} kPa`;
}

function updateTemperature(){
    const temperature = Math.round(callCurrentData().main.temp * 1) / 1;
    document.getElementById('mainTemp').textContent = toCelcius(temperature);

    const feelsLikeTemp = Math.round(callCurrentData().main.feels_like * 1) / 1;
    document.getElementById('feelsLike').textContent = toCelcius(feelsLikeTemp);
}

function toCelcius(kelvin) {
    return `${kelvin - 273}°C`;
}

// function toFahrenheit(kelvin) {
//     return (kelvin + 460)
// }

export {updatePage};