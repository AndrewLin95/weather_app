
async function getWeather(location) {
    try {
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=59d8f83c0d0672671941c70c99060910`, {mode:'cors'});
        const weatherGeocode = await response.json();

        const weatherResponse = await fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${weatherGeocode[0].lat}&lon=${weatherGeocode[0].lon}&appid=59d8f83c0d0672671941c70c99060910`)
        const weatherData = await weatherResponse.json();

        console.log(weatherData);
    } catch (err) {
        console.log(err);
    }
};

export {getWeather};