// Variables

var formEl = $('#searchForm');
var cityInputEl = $('input[name="cityName"]');
var searchBtn = document.getElementById('citySearchBtn');
var currentWeatherFirst = 'http://api.openweathermap.org/data/2.5/weather?q='
var apiID = '&appid=06ac0e5e9aecb8b74a0ca04ef150a8a4&units=imperial'
var oneCallFirst = 'https://api.openweathermap.org/data/2.5/onecall?lat='
var oneCallMid = '&lon='
var currentCityName = $('#mainWeatherHeader');
var d = new Date();
var date = d.toLocaleDateString();

// Button to start everything

searchBtn.addEventListener("click", handleFormSubmit);

//Function to pull all API and set basic data

function handleFormSubmit(event) {

event.preventDefault();
pullWeatherData();
applyNameAndTime();
}

// Pull Current API Data

function pullWeatherData(){

    fetch(currentWeatherFirst + cityInputEl.val() + apiID)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);

        const temp = data.main.temp;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const latitude = data.coord.lat;
        const longitude = data.coord.lon;

        fetch(oneCallFirst + latitude + oneCallMid + longitude + apiID)
        .then(function (response){
            return response.json();
        })
        .then(function(data) {
            console.log(data);
        })

        function insertDataToCurrent(){
            document.getElementById('tempText').innerHTML = "Temperature: " + temp + " F";
            document.getElementById('humidityText').innerHTML = "Humidity: " + humidity;
            document.getElementById('windSpeedText').innerHTML = "Wind Speeds: " + windSpeed + " mph";
            document.getElementById('uvIndexText').innerHTML = "UV Index: " + uvIndex;
        }
        insertDataToCurrent();
    })
}










        // const uvIndex = 



//Function to set the time and current city

function applyNameAndTime(){
    document.getElementById('mainWeatherHeader').innerHTML = cityInputEl.val() + " " + '(' + date + ')';
}
