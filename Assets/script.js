// Variables

var formEl = $('#searchForm');
var cityInputEl = $('input[name="cityName"]');
var searchBtn = document.getElementById('citySearchBtn');
var currentWeatherFirst = 'http://api.openweathermap.org/data/2.5/weather?q='
var allWeatherLast = '&appid=06ac0e5e9aecb8b74a0ca04ef150a8a4&units=imperial'
var futureWeatherFirst = 'http://api.openweathermap.org/data/2.5/forecast?q='
var currentCityName = $('#mainWeatherHeader');
var d = new Date();
var date = d.toLocaleDateString();

// Button to start everything

searchBtn.addEventListener("click", handleFormSubmit);

//Function to pull all API and set basic data

function handleFormSubmit(event) {

event.preventDefault();
pullCurrentData();
pullFutureData();
applyNameAndTime();
}

// Pull Current API Data

function pullCurrentData(){
    fetch(currentWeatherFirst + cityInputEl.val() + allWeatherLast)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    
        const temp = data.main.temp;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;

        console.log(temp);
        console.log(humidity);
        console.log(windSpeed);

    function insertDataToCurrent(){
        document.getElementById('tempText').innerHTML = "Temperature: " + temp + " F";
        document.getElementById('humidityText').innerHTML = "Humidity: " + humidity;
        document.getElementById('windSpeedText').innerHTML = "Wind Speeds: " + windSpeed + " mph";
        }

        insertDataToCurrent();
        
    })}






// Pull future API Data

function pullFutureData(){

fetch(futureWeatherFirst + cityInputEl.val() + allWeatherLast)
.then(Response => Response.json())
.then(data => console.log(data));
}

//Function to set the time and current city

function applyNameAndTime(){
    document.getElementById('mainWeatherHeader').innerHTML = cityInputEl.val() + " " + '(' + date + ')';
    
}

