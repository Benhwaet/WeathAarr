var mainContainer = document.querySelector("#mainContainer");

window.onload = function(){
  mainContainer.style.display = 'none';
};

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

      // var lat = latitude.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
      // var lon = longitude.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
      // console.log(lat, lon);
      getWeathArr(latitude, longitude);
      getForecast(latitude, longitude);
    })
};

function getWeathArr(latitude, longitude) {

  var getWeather = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=a58950883dae614383cd128e22972f9c&units=metric`;

  fetch(getWeather)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data)

      var unixDate= data.dt;
      var fullDate = new Date(unixDate * 1000);
      var date = fullDate.toLocaleDateString("en-GB");
      var city = data.name;
      var country = data.sys.country;
      var temp = data.main.temp;
      var feels = data.main.feels_like;
      var wind = data.wind.speed * 3.6;
      var windSpeed = wind.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
      var humidity = data.main.humidity;
      var icon = data.weather[0].icon;
      var description = data.weather[0].description;

      console.log(city, country, temp, feels, wind, humidity, icon, description, date);
      
      mainContainer.style.display = '';

      var currentWeather = `<div class="card shadow-0 border">
      <div class="card-body p-4 mb-4">
        <h4 class="mb-3 sfw-normal">${city}, ${country} (${date})</h4>
        <p>Current temperature: <strong>${temp}°C</strong></p>
        <p>Feels like: <strong>${feels}°C</strong></p>
        <p>Wind speed: <strong>${windSpeed} km/h</strong></p>
        <p>Humidity: <strong>${humidity}%</strong></p>
        <div class="weatherDesc d-flex flex-row align-items-center">
          <p class="mb-0 me-4">${description}</p>
          <i class="fas fa-cloud fa-2x" style="color: #eee;"></i>
        </div>
      </div>
    </div>`

        currentWeatherContainer.insertAdjacentHTML('afterbegin', currentWeather);
    })
};

function getForecast(latitude, longitude) {

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
                </div>
            </div>
          </div>
        </div>`
       
        var forecastContainer = document.querySelector("#forecast-container");

        forecastContainer.insertAdjacentHTML('beforeend', forecast);
        
      }
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

