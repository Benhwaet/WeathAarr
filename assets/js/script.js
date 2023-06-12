
var cityName = $(".searchValue").value;

v

var getCityName = function () {
    // This is coming from the URL search bar in the browser. It is what comes after the `?`.
    var queryString = location.search;
    var cityName = queryString.split('=')[1];

  if (cityName) {
    $(".searchValue").textContent = cityName;

    getWeather(cityName);
  } else {
    // This will run and return to the homepage if there was nothing in the URL query parameter.
    location.assign('./index.html');
  }
};

var getWeather = function () {
    var weatherApi = 'https://www.api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=5&appid=a58950883dae614383cd128e22972f9';

    console.log(weatherAPI);

    fetch(weatherApi).then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            displayIssues(data);
})
}});
};