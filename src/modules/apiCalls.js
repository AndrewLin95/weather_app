import { updateTopPage, updateBottomPage } from "./display"

// google maps API + debouncing, limiting the # of calls. prevents spam

let weatherGeocode = '';
let currentWeatherData = '';
let hourlyWeatherData = '';

async function getLatLon(location){
    try {
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=59d8f83c0d0672671941c70c99060910`, {mode:'cors'});
        weatherGeocode = await response.json();
        getCurrentWeather();
        getWeeklyWeather();
    } catch (err) {
        console.log(err);
    }
};

async function getCurrentWeather() {
    try {
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${weatherGeocode[0].lat}&lon=${weatherGeocode[0].lon}&appid=59d8f83c0d0672671941c70c99060910`, {mode:'cors'});
        currentWeatherData = await weatherResponse.json();

        console.log(currentWeatherData);     // TO REMOVE 
        updateTopPage();
    } catch (err) {
        console.log(err);
    }
};

async function getWeeklyWeather() {
    try {
        const weeklyResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${weatherGeocode[0].lat}&lon=${weatherGeocode[0].lon}&appid=59d8f83c0d0672671941c70c99060910`, {mode:'cors'});
        hourlyWeatherData = await weeklyResponse.json();
        
        console.log(hourlyWeatherData);
        updateBottomPage();
    } catch (err) {
        console.log(err);
    }
}

function callCurrentData() {
    return currentWeatherData;
};

function callHourlyData() {
    return hourlyWeatherData;
};

export { getLatLon, callCurrentData, callHourlyData};