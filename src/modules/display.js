import { callCurrentData, callHourlyData } from "./apiCalls";
import { convertUnit } from "./tempDate";
import { format } from 'date-fns';

// updates the top section of the page (main) using current weather information
function updateTopPage(){ 
    document.getElementById('location').textContent = callCurrentData().name;
    updateWeeklyTemperature();
    document.getElementById('weatherIcon').setAttribute('src', `http://openweathermap.org/img/wn/${callCurrentData().weather[0].icon}@2x.png`);
    document.getElementById('description').textContent = capitalizeFirstLetter(callCurrentData().weather[0].description);
    document.getElementById('humidity').textContent = `${callCurrentData().main.humidity} %`;
    document.getElementById('pressure').textContent = `${callCurrentData().main.pressure} kPa`;
    document.getElementById('sunrise').textContent = convertTime(callCurrentData().sys.sunrise).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    document.getElementById('sunset').textContent = convertTime(callCurrentData().sys.sunset).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

    // date-fns is used to format the date to the displayed format
    const today = format(new Date(), 'PPPP');
    const currentTime = new Date();
    document.getElementById('date').textContent = today;
    document.getElementById('time').textContent = currentTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
}

// uses the hourly weather data to populate the bottom of the page
function updateBottomPage(){
    let i = 0;
    // a loop that iterates to populate all fields with information
    while (i < 7){
        // API returns unix time. Convert time converts it to human readable time which gets converted to the appropriate format
        document.getElementById(`day${i}`).textContent = format(new Date(convertTime(callHourlyData().list[i].dt)), 'iiii');
        document.getElementById(`hour${i}`).textContent = convertTime(callHourlyData().list[i].dt).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
        
        const temp = Math.round(callHourlyData().list[i].main.temp);
        document.getElementById(`temp${i}`).textContent = convertUnit(temp);
        document.getElementById(`weatherIcon${i}`).setAttribute('src', `http://openweathermap.org/img/wn/${callHourlyData().list[i].weather[0].icon}@2x.png`);

        document.getElementById(`description${i}`).textContent = capitalizeFirstLetter(callHourlyData().list[i].weather[0].description);
        i++;
    }
};

function convertTime(unixTime){
    const currentTime = new Date(unixTime * 1000);
    return currentTime;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// seperate funtion to update the temperature
function updateWeeklyTemperature(){
    const temperature = Math.round(callCurrentData().main.temp * 1) / 1;
    document.getElementById('mainTemp').textContent = convertUnit(temperature);

    const feelsLikeTemp = Math.round(callCurrentData().main.feels_like * 1) / 1;
    document.getElementById('feelsLike').textContent = convertUnit(feelsLikeTemp);
}

export { updateTopPage, updateBottomPage };