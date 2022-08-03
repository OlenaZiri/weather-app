let apiKey = "6ec7cd9ae6e3ca5bb170c503e2a51df0";
let unit = "metric";
let cityTitle = document.querySelector("#cityTitle");
// Display the current date and time
function formatDate(date) {
  let hourNow = date.getHours();
  if (hourNow < 10) {
    hourNow = `0${hourNow}`;
  }
  let minutesNow = date.getMinutes();
  if (minutesNow < 10) {
    minutesNow = `0${minutesNow}`;
  }
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let weekDay = weekDays[date.getDay()];
  return `${weekDay} ${hourNow}:${minutesNow}`;
}
let now = new Date();
let timeNow = document.querySelector("#time_now");
timeNow.innerHTML = formatDate(now);
// CHANGE CURRENT WEATHER
// Build url to get weather in searching city
function buildUrl(cityName) {
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let url = `${apiEndpoint}?q=${cityName}&units=${unit}&appid=${apiKey}`;
  return url;
}
// Display current temp, wind, humidity and weather description
//when submitted searching of new city.
function showWeather(response) {
  let curTemp = Math.round(response.data.main.temp);
  let curTempEl = document.querySelector("#current-temp");
  curTempEl.innerHTML = curTemp;
  let curHum = response.data.main.humidity;
  let curHumEl = document.querySelector("#current-humidity");
  curHumEl.innerHTML = `${curHum}%`;
  let curWind = Math.round(response.data.wind.speed);
  let curWindEl = document.querySelector("#current-wind");
  curWindEl.innerHTML = `${curWind}m/s`;
  let curWeatherDesc = response.data.weather[0].description;
  let curWeatherDescEl = document.querySelector("#current-weather-description");
  curWeatherDescEl.innerHTML = curWeatherDesc;
}
// Change City name and weather forecast after submitting search.
function changeCity(event) {
  event.preventDefault();
  let citySearchName = document.querySelector("#citySearchNew");
  if (citySearchName.value) {
    cityTitle.innerHTML = citySearchName.value.toUpperCase();
    axios.get(buildUrl(citySearchName.value)).then(showWeather);
  }
}
let cityForm = document.querySelector("#citySearchForm");
cityForm.addEventListener("submit", changeCity);
/////////////////////////////
// Current position weather
function getCityName(response) {
  cityTitle.innerHTML = response.data.name.toUpperCase();
}
function setPosition(position) {
  let curLat = position.coords.latitude;
  let curLon = position.coords.longitude;
  let urlCoordsBase = `https://api.openweathermap.org/data/2.5/weather`;
  let curCityUrl = `${urlCoordsBase}?lat=${curLat}&lon=${curLon}&units=${unit}&appid=${apiKey}&limit=5`;
  axios.get(curCityUrl).then(getCityName);
  axios.get(curCityUrl).then(showWeather);
}
function currentCity() {
  navigator.geolocation.getCurrentPosition(setPosition);
}
let curButton = document.querySelector("#current-button");
curButton.addEventListener("click", currentCity);
