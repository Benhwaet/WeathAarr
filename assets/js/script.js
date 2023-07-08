//Getting containers through DOM
var mainContainer = document.querySelector("#mainContainer");
var currentWeatherContainer = document.querySelector("#current-weather");
var forecastContainer = document.querySelector("#forecast-container");
var weatherHeader = document.querySelector("#title_weather");
var navbar = document.querySelector("nav");

//Clears text in the form textbox when clicked on, usually the previous city searched, 
//to make way for new search
function clearText() {
  document.querySelector("#searchText").value = '';
}

// Using the Geocode API on openweathermaps to find the coordinates for 
//the city typed in the textbox.
function getCityCoord() {

  var cityName = document.querySelector("#searchText").value;

  var geocodingApi = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=a58950883dae614383cd128e22972f9c`;

  fetch(geocodingApi)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      var latitude = data[0].lat;
      var longitude = data[0].lon;

      getWeathArr(latitude, longitude);
      getForecast(latitude, longitude);
    })
};

//Get info by using the text in button
function getCityInfo(cityId) {

  var cityNameBtn = document.getElementById(`${cityId}`);
  //taking the city name from the button element in order to generate the weather info for that city again
  var cityName = cityNameBtn.textContent || cityNameBtn.innerText;
 
  var geocodingApi = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=a58950883dae614383cd128e22972f9c`;

  fetch(geocodingApi)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);
      var latitude = data[0].lat;
      var longitude = data[0].lon;

      getWeathArr(latitude, longitude);
      getForecast(latitude, longitude);
    })
};

function generateButton(cityId) {
  var savedCity = localStorage.getItem(cityId)
 
  navbar.insertAdjacentHTML('afterbegin', savedCity);
 }

// fetching the API information with the coordinates determined in getCityCoord(), above, line 32 
function getWeathArr(latitude, longitude) {

  //remove previous search results
  while (currentWeatherContainer.firstChild) {
    currentWeatherContainer.removeChild(currentWeatherContainer.firstChild);
  };

  var getWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=a58950883dae614383cd128e22972f9c&units=metric`;

  fetch(getWeather)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {

      //variables created from fetched API data
      var unixDate = data.dt;
      var fullDate = new Date(unixDate * 1000);
      var date = fullDate.toLocaleDateString("en-GB");
      var city = data.name;
      const cityId = data.id;
      var country = data.sys.country;
      var temp = data.main.temp;
      var feels = data.main.feels_like;
      var wind = data.wind.speed * 3.6;
      var windSpeed = wind.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
      var humidity = data.main.humidity;
      var icon = data.weather[0].icon;
      // from samu101108 in an explanation on how to use the openweathermap API weather icon 
      // <https://stackoverflow.com/questions/44177417/how-to-display-openweathermap-weather-icon> 
      var iconUrl = "https://openweathermap.org/img/w/" + icon + ".png";
      var description = data.weather[0].description;

      //Changing first letter of description text to uppercase
      var iconDesc = description.charAt(0).toUpperCase() + description.slice(1);
    
     
      //HTML elements to be inserted into HTML when a search is initiated, displays current weather
      var currentWeather = `<div class="col-sm-6 d-flex align-items-center" style="width: 100%; padding: 30px;">
      <div class="card shadow-0 border d-flex justify-content-center">
        <div class="d-flex flex-wrap justify-content-center align-items-center">
            <h4 class="m-2" style="font-size: larger;"><strong>${city}, ${country} (${date})</strong></h4>
            <ul style="list-style-type: none;">
              <li>Current temperature: <strong>${temp}°C</strong></li>
              <li>Feels like: <strong>${feels}°C</strong></li>
              <li>Wind speed: <strong>${windSpeed} km/h</strong></li>
              <li>Humidity: <strong>${humidity}%</strong></li>
              <li class="weatherDesc d-flex flex-row align-items-center">
                <p>${iconDesc}</p>
                <img class="weatherIcon" src="${iconUrl}">
              </li>
            </ul>
        </div>
    </div>
  </div>`

      currentWeatherContainer.insertAdjacentHTML('afterbegin', currentWeather);


      var searchHistory = `<button id="${cityId}" class="search-history btn primaryBtn" 
      style="background-color: black; color: white" onclick="getCityInfo(${cityId})">${city}</button>`;
      
      localStorage.setItem(cityId, searchHistory);

      generateButton(cityId);
    })    
};


// Fetching weather information using latitude and longitude, 5-Day Forecast and future information.
function getForecast(latitude, longitude) {

  while (forecastContainer.firstChild) {
    forecastContainer.removeChild(forecastContainer.firstChild);
  };

  var forecastApi = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=a58950883dae614383cd128e22972f9c&units=metric`;

  fetch(forecastApi)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {

      //Generating a card with weather data from API for every 24 hours around noon
      for (var i = 3; i < data.list.length; i += 8) {
    
        //defining variables from data fetched in 5-Day Forecast API
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
        var iconUrl = "https://openweathermap.org/img/w/" + icon + ".png";
        var description = data.list[i].weather[0].description;

        var iconDesc = description.charAt(0).toUpperCase() + description.slice(1);
      
        var forecast = `<div id="daily-weather" class="col-sm-5 d-flex flex-wrap" style="width: 20%">
            <div class="card p-2">
                <h5>(${date})</h5>
                <i class="icon"></i>
              <ul class="weatherDesc" style="list-style-type: none;">
                  <li>Temperature: <strong>${temp}°C</strong></li>
                  <li>Will feel like: <strong>${feels}°C</strong></li>
                  <li>Wind speed: <strong>${windSpeed} km/h</strong></li>
                  <li>Humidity: <strong>${humidity}%</strong></li>
                  <div class="weatherDesc d-flex flex-row align-items-center">
                    <li>${iconDesc}
                    <img class="weatherIcon" src="${iconUrl}">
                  </li>
              </ul>
            </div>
          </div>`

        var forecastContainer = document.querySelector("#forecast-container");

        forecastContainer.insertAdjacentHTML('beforeend', forecast);
      }
    })
};

