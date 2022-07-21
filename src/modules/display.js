import { callCurrentData, callHourlyData } from "./apiCalls";
import { convertUnit } from "./tempDate";
import { format } from 'date-fns';

// create constants to store the data within this page.

function updateTopPage(){ 
    document.getElementById('location').textContent = callCurrentData().name;
    updateWeeklyTemperature();
    document.getElementById('weatherIcon').setAttribute('src', `http://openweathermap.org/img/wn/${callCurrentData().weather[0].icon}@2x.png`);
    document.getElementById('description').textContent = ` ${callCurrentData().weather[0].description}`;
    document.getElementById('humidity').textContent = `${callCurrentData().main.humidity} %`;
    document.getElementById('pressure').textContent = `${callCurrentData().main.pressure} kPa`;

    const today = format(new Date(), 'PPPP');
    const currentTime = new Date();
    document.getElementById('date').textContent = today;
    document.getElementById('time').textContent = currentTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
}

function updateBottomPage(){
    let i = 0;
    while (i < 6){
        document.getElementById(`day${i}`).textContent = format(new Date(convertTime(callHourlyData().list[i].dt)), 'iiii');
        document.getElementById(`hour${i}`).textContent = convertTime(callHourlyData().list[i].dt).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
        
        const temp = Math.round(callHourlyData().list[i].main.temp);
        document.getElementById(`temp${i}`).textContent = convertUnit(temp);
        document.getElementById(`weatherIcon${i}`).setAttribute('src', `http://openweathermap.org/img/wn/${callHourlyData().list[i].weather[0].icon}@2x.png`);
        i++;
    }
};

function convertTime(unixTime){
    const currentTime = new Date(unixTime * 1000);
    return currentTime;
}

function updateWeeklyTemperature(){
    const temperature = Math.round(callCurrentData().main.temp * 1) / 1;
    document.getElementById('mainTemp').textContent = convertUnit(temperature);

    const feelsLikeTemp = Math.round(callCurrentData().main.feels_like * 1) / 1;
    document.getElementById('feelsLike').textContent = convertUnit(feelsLikeTemp);
}

export { updateTopPage, updateBottomPage };