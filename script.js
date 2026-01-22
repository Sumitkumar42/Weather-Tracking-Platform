const apiKey = '13fa17f14cb82cd7a5ddd7e24c60d053'; 
const url = 'https://api.openweathermap.org/data/2.5/weather';

document.getElementById('get-weather-btn').addEventListener('click', function() {
    const cityName = document.getElementById('city-input').value.trim();
    if (cityName) {
        fetchWeatherData(cityName);
    } else {
        showError('Please enter a city name.');
    }
});

async function fetchWeatherData(city) {
    try {
        const response = await fetch(`${url}?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) throw new Error('City not found');
        const data = await response.json();
        displayWeatherData(data);
    } catch (error) {
        showError(error.message);
    }
}

function displayWeatherData(data) {
    document.getElementById('city-name').innerText = data.name;
    document.getElementById('temperature').innerText = `${data.main.temp}°C`;
    document.getElementById('description').innerText = data.weather[0].description;
    document.getElementById('wind-speed').innerText = `Wind Speed: ${data.wind.speed} m/s`;
    document.getElementById('weather-info').style.display = 'block';
    document.getElementById('error-message').style.display = 'none';
}

function showError(message) {
    document.getElementById('error-message').innerText = message;
    document.getElementById('error-message').style.display = 'block';
    document.getElement}