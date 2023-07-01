var currentWeatherContainer = document.querySelector("#current-weather");


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

      var lat = latitude.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
      var lon = longitude.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
      console.log(lat, lon);
      getWeathArr(lat, lon);
      getForecast(lat, lon);
    })
};

function getWeathArr(lat, lon) {

  var getWeather = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a58950883dae614383cd128e22972f9c&units=metric`;

  fetch(getWeather)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data)

      var city = data.name;
      var country = data.sys.country;
      var temp = data.main.temp;
      var feels = data.main.feels_like;
      var wind = data.wind.speed;
      var humidity = data.main.humidity;
      var icon = data.weather[0].icon;
      var description = data.weather[0].description;

      console.log(city, country, temp, feels, wind, humidity, icon, description);

      var currentWeather = `<div class="card shadow-0 border">
      <div class="card-body p-4 mb-4">

        <h4 class="mb-1 sfw-normal">${city}, ${country}</h4>
        <p class="mb-2">Current temperature: <strong>${temp}°C</strong></p>
        <p>Feels like: <strong>${feels}°C</strong></p>
        <p>Wind speed: <strong>${wind} km/h</strong></p>
        <p>Humidity: <strong>${humidity}%</strong></p>

        <div class="d-flex flex-row align-items-center">
          <p class="mb-0 me-4">${description}</p>
          <i class="fas fa-cloud fa-3x" style="color: #eee;"></i>
        </div>
      </div>
    </div>`

        currentWeatherContainer.insertAdjacentHTML('afterbegin', currentWeather);
    })
};

function getForecast(lat, lon) {

  var forecastApi = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=a58950883dae614383cd128e22972f9c&units=metric`;

  fetch(forecastApi)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data)
    })

  // var cityName = data.city.name;
  // var date = data.list[0].dt_text;
  // var description = data.list[0].weather[0].description;
  // var icon = data.list[0].weather[0].icon;
  // var currentTemp = data.list[0].main.temp;
  // var feelsLike = data.list[0].main.feels_like;
  // var wind = data.list[0].wind.speed;
  // var humidity = data.list[0].main.humidity;

  // console.log(cityName, date, description, icon, currentTemp, feelsLike, wind, humidity);
};

