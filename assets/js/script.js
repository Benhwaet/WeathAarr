
function getCityName() {
  var cityName = document.querySelector("#searchText").value;
  console.log(cityName)

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
    })
   
};

function getWeathArr(latitude, longitude) {

  var getWeather = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=a58950883dae614383cd128e22972f9c&units=metric`;

  fetch(getWeather)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data)
    })
};

