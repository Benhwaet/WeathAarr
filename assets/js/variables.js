
if (data.weather.main == 'Clouds') {

  var cloudy = `<i class="fas fa-cloud fa-2x" style="color: #eee;"></i>`
  var weatherDesc = document.querySelector(".weatherDesc")
  weatherDesc.insertAdjacentHTML('beforeend', cloudy);

} else if (data.weather.main == "Rain") {
  var rainy = `<i class="fa-duotone fa-cloud-showers fa-2x"></i>`
  var weatherDesc = document.querySelector(".weatherDesc")
  weatherDesc.insertAdjacentHTML('beforeend', rainy);

} else if (data.weather.main == "Clear") {

  var clear = `<i class="fas fa-sun fa-2x" style="color: #FFBD33"></i>`
  var weatherDesc = document.querySelector(".weatherDesc")
  weatherDesc.insertAdjacentHTML('beforeend', clear);

} else if (data.weather.main == "Drizzle") {

  var drizzle = `<i class="fas fa-cloud-showers fa-2x"></i>`
  var weatherDesc = document.querySelector(".weatherDesc")
  weatherDesc.insertAdjacentHTML('beforeend', drizzle);

} else if (data.weather.main == "Thunderstorm") {

  var storm = `<i class="fa-regular fa-cloud-bolt fa-2x"></i>`
  var weatherDesc = document.querySelector(".weatherDesc")
  weatherDesc.insertAdjacentHTML('beforeend', storm);

} else if (data.weather.main == "Snow") {

  var snow = `<i class="fa-regular fa-cloud-snow fa-2x" style="color: #FFBD33"></i>`
  var weatherDesc = document.querySelector(".weatherDesc")
  weatherDesc.insertAdjacentHTML('beforeend', snow);
  
};