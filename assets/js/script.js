var mainContainer = document.querySelector("#mainContainer");
var currentWeatherContainer = document.querySelector("#current-weather");
var forecastContainer = document.querySelector("#forecast-container");

window.onload = function () {
  mainContainer.style.display = 'none';
};

function clearText() {
  document.querySelector("#searchText").value = '';
}


function getCityName() {

  var cityName = document.querySelector("#searchText").value;
  console.log(cityName);

  var geocodingApi = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=a58950883dae614383cd128e22972f9c`;

  fetch(geocodingApi)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data)
      var latitude = data[0].lat;
      var longitude = data[0].lon;

      // var lat = latitude.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
      // var lon = longitude.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
      // console.log(lat, lon);
      getWeathArr(latitude, longitude);
      getForecast(latitude, longitude);
    })
};

function getWeathArr(latitude, longitude) {

  while (currentWeatherContainer.firstChild) {
    currentWeatherContainer.removeChild(currentWeatherContainer.firstChild);
  };

  var getWeather = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=a58950883dae614383cd128e22972f9c&units=metric`;

  fetch(getWeather)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data)

      var unixDate = data.dt;
      var fullDate = new Date(unixDate * 1000);
      var date = fullDate.toLocaleDateString("en-GB");
      var city = data.name;
      var cityId = data.id;

      console.log(cityId)

      var country = data.sys.country;
      var temp = data.main.temp;
      var feels = data.main.feels_like;
      var wind = data.wind.speed * 3.6;
      var windSpeed = wind.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
      var humidity = data.main.humidity;
      var icon = data.weather[0].icon;
      // from samu101108 in an explanation on how to use the openweathermap API weather icon 
      // <https://stackoverflow.com/questions/44177417/how-to-display-openweathermap-weather-icon> 
      var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
      var description = data.weather[0].description;
      console.log(description);

      var iconDesc = description.charAt(0).toUpperCase() + description.slice(1);
      console.log(iconDesc)

      console.log(city, country, temp, feels, wind, humidity, icon, description, date);

      mainContainer.style.display = '';

      var currentWeather = `<div class="card shadow-0 border d-flex justify-content-center">
      <div class="card-body p-4>
        <h4 class="mb-3 sfw-normal" style="font-size: larger;"><strong>${city}, ${country} (${date})</strong></h4>
        <p>Current temperature: <strong>${temp}°C</strong></p>
        <p>Feels like: <strong>${feels}°C</strong></p>
        <p>Wind speed: <strong>${windSpeed} km/h</strong></p>
        <p>Humidity: <strong>${humidity}%</strong></p>
        <div class="weatherDesc d-flex flex-row align-items-center">
          <p>${iconDesc}</p>
          <img class="weatherIcon" src="${iconUrl}">
        </div>
      </div>
    </div>`

      currentWeatherContainer.insertAdjacentHTML('afterbegin', currentWeather);

      var searchHistory = `<button class="citySearchBtn btn rounded">${city}, ${country}</button>`;

      var navbar = document.querySelector("nav");

      navbar.insertAdjacentHTML('afterbegin', searchHistory);

      localStorage.setItem`("city.${cityId}", ${city})`;

    })
  var cityName = '';
  return cityName;
};

function getForecast(latitude, longitude) {

  while (forecastContainer.firstChild) {
    forecastContainer.removeChild(forecastContainer.firstChild);
  };

  var forecastApi = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=a58950883dae614383cd128e22972f9c&units=metric`;

  fetch(forecastApi)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data)

      for (var i = 3; i < data.list.length; i += 8) {
        console.log(data.list.length);

        var unixDate = data.list[i].dt;
        var fullDate = new Date(unixDate * 1000);
        var date = fullDate.toLocaleDateString("en-GB");
        var temp = data.list[i].main.temp;
        var feels = data.list[i].main.feels_like;
        var wind = data.list[i].wind.speed * 3.6;
        var windSpeed = wind.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
        var humidity = data.list[i].main.humidity;
        var icon = data.list[i].weather[0].icon;
        // from samu101108 in an explanation on how to use the openweathermap API weather icon 
        // <https://stackoverflow.com/questions/44177417/how-to-display-openweathermap-weather-icon> 
        var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
        var description = data.list[i].weather[0].description;
        console.log(description);
  
        var iconDesc = description.charAt(0).toUpperCase() + description.slice(1);
        console.log(iconDesc)

        console.log(temp, feels, wind, humidity, date);

        var forecast = `<div class="col-sm-6 d-flex flex-wrap" style="width: 20%">
            <div class="card p-3">
                <h5>(${date})</h5>
                <i class="icon"></i>
              <div class="weatherDesc">
                  <p>Temperature: <strong>${temp}°C</strong></p>
                  <p>Will feel like: <strong>${feels}°C</strong></p>
                  <p>Wind speed: <strong>${windSpeed} km/h</strong></p>
                  <p>Humidity: <strong>${humidity}%</strong></p>
                  <div class="weatherDesc d-flex flex-row align-items-center">
                  <p>${iconDesc}</p>
                  <img class="weatherIcon" src="${iconUrl}">
              </div>
            </div>
          </div>`

        var forecastContainer = document.querySelector("#forecast-container");

        forecastContainer.insertAdjacentHTML('beforeend', forecast);

      }
    })
};
