const apiKey = '08f3f16a0c3d1bcd760d6a05d5375b71'; 

document.getElementById('search-btn').addEventListener('click', () => {
  const city = document.getElementById('city-search').value;
  if (city) {
    fetchWeatherData(city);
  } else {
    alert("Please enter a city name!");
  }
});

document.getElementById('toggle-mode').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

async function fetchWeatherData(city) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('City not found');
    }
    const data = await response.json();
    displayWeatherData(data);
  } catch (error) {
    alert('Error fetching weather data: ' + error.message);
  }
}

function displayWeatherData(data) {
  // Current Weather
  document.getElementById('city-name').textContent = data.city.name;
  document.getElementById('current-date').textContent = new Date().toLocaleDateString();
  const currentWeather = data.list[0];
  document.getElementById('temperature').textContent = currentWeather.main.temp;
  document.getElementById('weather-description').textContent = currentWeather.weather[0].description;
  document.getElementById('humidity').textContent = currentWeather.main.humidity;
  document.getElementById('wind-speed').textContent = currentWeather.wind.speed;

  // 5-Day Forecast
  const forecastContainer = document.getElementById('forecast-container');
  forecastContainer.innerHTML = ''; // Clear previous forecasts
  for (let i = 0; i < data.list.length; i += 8) {
    const forecast = data.list[i];
    const card = document.createElement('div');
    card.classList.add('forecast-card');
    card.innerHTML = `
      <h3>${new Date(forecast.dt * 1000).toLocaleDateString()}</h3>
      <p><strong>Temp:</strong> ${forecast.main.temp}°C</p>
      <p><strong>Weather:</strong> ${forecast.weather[0].description}</p>
      <p><strong>Humidity:</strong> ${forecast.main.humidity}%</p>
      <p><strong>Wind:</strong> ${forecast.wind.speed} km/h</p>
    `;
    forecastContainer.appendChild(card);
  }
}
