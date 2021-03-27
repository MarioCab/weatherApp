var formEl = $('#searchForm');
var cityInputEl = $('input[name="cityName"]');
var searchBtn = document.getElementById('citySearchBtn');
var openWeatherFirst = 'http://api.openweathermap.org/data/2.5/weather?q='
var openWeatherLast = '&appid=06ac0e5e9aecb8b74a0ca04ef150a8a4&units=imperial'
var currentCityName = $('#mainWeatherHeader');


function handleFormSubmit(event) {

event.preventDefault();
fetch(openWeatherFirst + cityInputEl.val() + openWeatherLast)
.then(Response => Response.json())
.then(data => console.log(data));
insertMainData();

}

searchBtn.addEventListener("click", handleFormSubmit);

function insertMainData(){
document.getElementById('mainWeatherHeader').innerHTML = cityInputEl.val();
    
}



