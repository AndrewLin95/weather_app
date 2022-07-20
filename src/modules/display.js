import { callCurrentData } from "./apiCalls";
import { convertUnit } from "./tempDate";
import { format } from 'date-fns';

function updateTopPage(){ 
    document.getElementById('location').textContent = callCurrentData().name;
    updateTemperature();
    document.getElementById('weatherIcon').setAttribute('src', `http://openweathermap.org/img/wn/${callCurrentData().weather[0].icon}@2x.png`);
    document.getElementById('description').textContent = ` ${callCurrentData().weather[0].description}`;
    document.getElementById('humidity').textContent = `${callCurrentData().main.humidity} %`;
    document.getElementById('pressure').textContent = `${callCurrentData().main.pressure} kPa`;

    const today = format(new Date(), 'PPPP');
    const currentTime = new Date();
    document.getElementById('date').textContent = today;
    document.getElementById('time').textContent = currentTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
}

function updateTemperature(){
    const temperature = Math.round(callCurrentData().main.temp * 1) / 1;
    document.getElementById('mainTemp').textContent = convertUnit(temperature);

    const feelsLikeTemp = Math.round(callCurrentData().main.feels_like * 1) / 1;
    document.getElementById('feelsLike').textContent = convertUnit(feelsLikeTemp);
}



export {updateTopPage};