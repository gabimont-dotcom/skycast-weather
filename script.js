const apiKey = "d6965e09fdc28804c979ac08e699e632";
const form = document.querySelector("form");
const input = document.querySelector("#cityInput");
const weatherDiv = document.querySelector("#weather");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = input.value.trim();
  if (city) {
    getWeather(city);
  }
});

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 200) {
      weatherDiv.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p><strong>Temperature:</strong> ${data.main.temp}°F</p>
        <p><strong>Condition:</strong> ${data.weather[0].description}</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.wind.speed} mph</p>
      `;
    } else {
      weatherDiv.innerHTML = `<p>City not found. Try again.</p>`;
    }
  } catch (error) {
    weatherDiv.innerHTML = `<p>Error fetching data. Please try again later.</p>`;
  }
}
