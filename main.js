const lambdaBase = "https://sp4cel6moe.execute-api.us-east-1.amazonaws.com/weathertest/weather";

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

// Load default city on page open
document.addEventListener("DOMContentLoaded", () => {
  getResults("Chennai");
});

function setQuery(evt) {
  if (evt.key === "Enter") {
    getResults(searchbox.value);
  }
}

function getResults(query) {
  if (!query) query = "Chennai"; // fallback
  fetch(`${lambdaBase}?city=${query}`)
    .then(res => res.json())
    .then(displayResults)
    .catch(err => {
      document.querySelector('.location .city').innerText = "Error fetching data";
      console.error("API error:", err);
    });
}

function displayResults(weather) {
  document.querySelector('.location .city').innerText = `${weather.name}, ${weather.sys.country}`;
  document.querySelector('.location .date').innerText = dateBuilder(new Date());

  document.querySelector('.current .temp').innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
  document.querySelector('.current .weather').innerText = weather.weather[0].main;
  document.querySelector('.hi-low').innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;

  // 🔥 Dynamic background logic
  const body = document.querySelector('body');
  if (weather.main.temp > 20) {
    body.classList.add('warm');
    body.classList.remove('cool');
  } else {
    body.classList.add('cool');
    body.classList.remove('warm');
  }
}

function dateBuilder(d) {
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}
