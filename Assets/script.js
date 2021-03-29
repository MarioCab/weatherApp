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
var tomorrowDate = new Date(d)
var date = d.toLocaleDateString();
var cityNameDate = cityInputEl.val() + " " + '(' + date + ')'

// Button to start everything

searchBtn.addEventListener("click", handleFormSubmit);

//Function to pull all API and set basic data

function handleFormSubmit(event) {

event.preventDefault();
pullWeatherData();
applyNameAndTime();
}

// Pull All API Data

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
        
        function insertDataToCurrent(){
            document.getElementById('tempText').innerHTML = "Temperature: " + temp + " F";
            document.getElementById('humidityText').innerHTML = "Humidity: " + humidity;
            document.getElementById('windSpeedText').innerHTML = "Wind Speeds: " + windSpeed + " mph";
        }

        fetch(oneCallFirst + latitude + oneCallMid + longitude + apiID)
        .then(function (response){
            return response.json();
        })
        .then(function(data) {
            console.log(data);

            const uvIndex = data.current.uvi;

            function insertUVI(){
                document.getElementById('uvIndexText').innerHTML = "UV Index: " + uvIndex;

                if (uvIndex <= 2.99){
                    document.getElementById('uvIndexText').classList.add('lowUV')  
                } else if (uvIndex >= 3 < 5.99){
                    document.getElementById('uvIndexText').classList.remove('lowUV')
                    document.getElementById('uvIndexText').classList.add('modUV')
                } else if (uvIndex >= 6 < 7.99){
                    document.getElementById('uvIndexText').classList.remove('modUV')
                    document.getElementById('uvIndexText').classList.add('highUV')
                } else if (uvIndex >= 8 < 10.99){
                    document.getElementById('uvIndexText').classList.remove('highUV')
                    document.getElementById('uvIndexText').classList.add('veryHighUV')
                } else if (uvIndex >= 11){
                    document.getElementById('uvIndexText').remove('veryHighUV')
                    document.getElementById('uvIndexText').add('extremeUV')
                }
            }

            insertUVI();
        })

        insertDataToCurrent();
    })
}


//Function to set the time and current city

function applyNameAndTime(){
    document.getElementById('mainWeatherHeader').innerHTML = cityNameDate;
    document.getElementById('cOne').children[0].innerHTML = tomorrowDate.setDate(tomorrowDate.getDate() + 1).toLocaleString;
    document.getElementById('cTwo').children[0].innerHTML = "test test";
    document.getElementById('cThree').children[0].innerHTML = "test test";
    document.getElementById('cFour').children[0].innerHTML = "test test";
    document.getElementById('cFive').children[0].innerHTML = "test test";
}
