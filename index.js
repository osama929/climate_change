document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu");
  const nav = document.querySelector(".nav-links");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
  }
});
const WeatherForm = document.querySelector("#WeatherForm");
const CityInput = document.querySelector("#CityInput");
const card = document.querySelector(".card1");
const apiKey = "22aa79c522eb4f2b8a0230324261109";
if (WeatherForm && CityInput && card) {
  WeatherForm.addEventListener("submit", async event => {
    event.preventDefault();
    const city = CityInput.value;
    if (city) {
      try {
        const weatherData = await getWeatherdata(city);
        displayWeatherData(weatherData);
      }
      catch (error) {
        console.error(error);
        displayError(error.message);
      }
    }
    else {
      displayError("Please enter a city name.");

    }
  });
}
async function getWeatherdata(city) {
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
  const response = await fetch(apiUrl);
  console.log(response);
  if (!response.ok) {
    throw new Error("Failed to fetch weather data.");
  }
  return await response.json();
}

function displayWeatherData(data) {
  const {
    location: { name: city },
    current: {
      temp_c: temp,
      humidity,
      condition: { text: description, code: id }
    }
  } = data;
  card.textContent = "";
  card.style.display = "flex";
  const  cityDisplay=document.createElement("h1");
  const  tempDisplay=document.createElement("p");
  const  humidityDisplay=document.createElement("p");
  const  descDisplay=document.createElement("p");
  const  weatherEmoji=document.createElement("p");

  cityDisplay.textContent=city;
  tempDisplay.textContent=`${temp}°C`;

  humidityDisplay.textContent=`Humidity:${humidity}%`;

  descDisplay.textContent=description;
  weatherEmoji.textContent=getWeatherIcon(id);


  weatherEmoji.classList.add("WeatherEmoji");
  descDisplay.classList.add("descDisplay");
  humidityDisplay.classList.add("HumidityDisplay");
  tempDisplay.classList.add("tempDisplay");
  cityDisplay.classList.add("CityDisplay");
  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(humidityDisplay);
  card.appendChild(descDisplay);
  card.appendChild(weatherEmoji);


}
function  getWeatherIcon(weatherid) {
 switch (true) {

    case (weatherid === 1000):
        return '☀️';

    case (weatherid === 1003):
        return '🌤️';

    case (weatherid === 1006 || weatherid === 1009):
        return '☁️';

    case (weatherid === 1030 || weatherid === 1135 || weatherid === 1147):
        return '🌫️';

    case (weatherid >= 1063 && weatherid <= 1072):
        return '🌧️';

    case (weatherid === 1087 || (weatherid >= 1273 && weatherid <= 1282)):
        return '⛈️';

    case (weatherid >= 1114 && weatherid <= 1117):
        return '🌨️';

    case (weatherid >= 1150 && weatherid <= 1171):
        return '🌧️';

    case (weatherid >= 1180 && weatherid <= 1201):
        return '🌧️';

    case (weatherid >= 1204 && weatherid <= 1225):
        return '❄️';

    case (weatherid === 1237 || (weatherid >= 1261 && weatherid <= 1264)):
        return '🧊';

    case (weatherid >= 1240 && weatherid <= 1258):
        return '🌧️';

    default:
        return '🌡️';
}

}
function displayError(message) {
  const errorDiv = document.createElement("p");
  errorDiv.textContent = message;
  errorDiv.classList.add("ErrorDisplay");
  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDiv);
}