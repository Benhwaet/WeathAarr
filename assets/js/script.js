

function getCityName() {
  var cityName = document.querySelector("#searchText").value;

  console.log(cityName)
  var geocodingApi = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=a58950883dae614383cd128e22972f9c`;

  fetch(geocodingApi)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      var lat = data[0].lat;
      var lon = data[0].lon;
      console.log(lat, lon);
      getWeathArr(lat, lon);
    })
};

var getWeathArr = function (lat, lon) {
  var getWeather = `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=eb0be5e867966a61e1d597337f2ab606`;

  fetch(getWeather)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)

    })
}

//  if (cityName) {
//     // This will run and return to the homepage if there was nothing in the URL query parameter.
//     cityName.textContent = '';
//     location.assign('./index.html');
//   } else {

//     getWeather(cityName);
//   }
// };
