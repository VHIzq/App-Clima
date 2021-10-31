//Api -Open Weather Map
//Recuperar los elelemtnos del DOM
const $container = document.getElementById("container");
const $searchForm = document.getElementById("search__submit");
const $searchInput = document.getElementById("search__input");
const $temperadureDegrees = document.getElementById("degree-number");
const $weatherIcon = document.getElementById("weather-icon");
const $temperadureDescription = document.getElementById("description");
const $timeZone = document.getElementById("timezone");
const $date = document.getElementById("date");
const $min = document.getElementById("min");
const $max = document.getElementById("max");

const displayBackgroundImage = (obj) => {
  //Recuperar la hora del objeto
  let dateHuman = new Date(obj.dt * 1000).toLocaleString("es-MX", {
    timeStyle: "short",
    dateStyle: "long",
  });
  console.log(dateHuman);
  //indicar hora
  $date.textContent = `Actualización ${dateHuman}`
  //Convertirlo a hora entendible
  const dayHour = new Date().getHours();
  //logica
  if(dayHour > 6 && dayHour < 18){
    $container.classList.remove("night");
    $container.classList.add("day");
  }else{
    $container.classList.remove("day");
    $container.classList.add("night");
  }
};
const displayData = (obj) => {
  console.log(obj)
  $temperadureDegrees.textContent = Math.floor(obj.main.temp)
  $timeZone.textContent = obj.name;
  const icon = obj.weather[0].icon;
  $weatherIcon.innerHTML = `<img src='./src/icons/${icon}.png'></img>`
  $min.textContent = Math.floor(obj.main.temp_min);
  $max.textContent = Math.floor(obj.main.temp_max)
  $temperadureDescription.textContent = obj.weather[0].description.charAt(0).toUpperCase() +
  obj.weather[0].description.slice(1);
};

//Se declara la función getWeatherData
const getWeatherData = async (city) => {
  //Realizar una consulta a la API y que devuelva los datos del clima de la ciudda elegida
  const resp = await fetch(`https://community-open-weather-map.p.rapidapi.com/weather?q=${city}&lang=sp&units=metric`, {
    "headers": {
      "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
      "x-rapidapi-key": "a6956fea59msh50f68c236b96ab3p19beb8jsnc4fb74a6b98a"
    }
  });
  const data = await resp.json();
  displayBackgroundImage(data);
  displayData(data);
}
$searchForm.addEventListener("submit", e => {
  e.preventDefault();
  getWeatherData($searchInput.value);
})
//Apenas cargue la página, cargar la ciudad
window.onload = () => {
  getWeatherData("Mexico City");
}


