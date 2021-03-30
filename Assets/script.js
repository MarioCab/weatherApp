// Variables

var formEl = $("#searchForm");
var cityInputEl = $('input[name="cityName"]');
var searchBtn = document.getElementById("citySearchBtn");
var currentWeatherFirst = "http://api.openweathermap.org/data/2.5/weather?q=";
var apiID = "06ac0e5e9aecb8b74a0ca04ef150a8a4";
var oneCallFirst = "https://api.openweathermap.org/data/2.5/onecall?lat=";
var oneCallMid = "&lon=";
var currentCityName = $("#mainWeatherHeader");
var d = new Date();
var date = d.toLocaleDateString();
var forecastCardsDiv = document.getElementById("weekForecast");
var histBody = document.getElementById("historyBody");
// Button to start everything

searchBtn.addEventListener("click", handleFormSubmit);

//Function to pull all API and set basic data

function handleFormSubmit(event) {
  event.preventDefault();
  pullWeatherData();
  applyNameAndTime();
}

//populate search history from ls

if (localStorage.getItem("Search History")) {
  var historyFromStorage = JSON.parse(localStorage.getItem("Search History"));

  for (let i = 0; i < historyFromStorage.length; i++) {
    var histItem = document.createElement("p");
    histItem.textContent = historyFromStorage[i];
    histBody.prepend(histItem);
  }
}
// Pull All API Data

function pullWeatherData() {
  var currentWeatherAPI = `http://api.openweathermap.org/data/2.5/weather?q=${cityInputEl.val()}&appid=${apiID}&units=imperial`;

  fetch(currentWeatherAPI)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      if (!localStorage.getItem("Search History")) {
        var searchHistory = [];
        searchHistory.push(data.name);
        localStorage.setItem("Search History", JSON.stringify(searchHistory));
      } else {
        var historyFromStorage = JSON.parse(
          localStorage.getItem("Search History")
        );

        historyFromStorage.push(data.name);
        localStorage.setItem(
          "Search History",
          JSON.stringify(historyFromStorage)
        );
      }

      const temp = data.main.temp;
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;
      const latitude = data.coord.lat;
      const longitude = data.coord.lon;

      var icon = $("<img>").attr(
        "src",
        `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
      );

      $("#mainWeatherHeader").append(icon);

      function insertDataToCurrent() {
        document.getElementById("tempText").innerHTML =
          "Temperature: " + temp + " F";
        document.getElementById("humidityText").innerHTML =
          "Humidity: " + humidity;
        document.getElementById("windSpeedText").innerHTML =
          "Wind Speeds: " + windSpeed + " mph";
      }

      var oneCallURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiID}`;

      fetch(oneCallURL)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          forecastCardsDiv.innerHTML = ``;
          for (var i = 1; i < 6; i++) {
            console.log(data.daily[i]);
            // var icon = $("<img>").attr(
            //   "src",
            //   `http://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png`
            // );
            var cardTextMin = data.daily[i].temp.min;
            var cardTextMax = data.daily[i].temp.max;
            var futureDate = moment.unix(data.daily[i].dt).format("M/D/YYYY");
            var forecastCard = document.createElement("div");
            forecastCard.classList.add("card");
            forecastCard.innerHTML = `<div class="card-header" id="dayOneH">${futureDate}</div>
            <div class="card-body" id="dayOneB">
            <img src ='http://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png'/>
              <p>Temp Min: ${cardTextMin}F</p>
              <p>Temp Max: ${cardTextMax}F</p>
              <p>Humidity: ${data.daily[i].humidity}</p>
              <p>Wind Speed: ${data.daily[i].wind_speed}</p>
            </div>`;
            forecastCardsDiv.append(forecastCard);
            // var card = $('<div>').addClass('card m-1');
            // var cardBody = $('<div>').addClass('card-body').text('Min: ' + cardTextMin + "/" + 'Max:' + cardTextMax);
            // var cardHeader = $('<div>').addClass('card-header').text(futureDate);
            // $('#weekForecast').append(card.append(cardBody.append(cardHeader.append(icon))));
          }

          const uvIndex = data.current.uvi;

          function insertUVI() {
            document.getElementById("uvIndexText").innerHTML =
              "UV Index: " + uvIndex;

            if (uvIndex <= 2.99) {
              document.getElementById("uvIndexText").classList.add("lowUV");
            } else if (uvIndex >= 3 < 5.99) {
              document.getElementById("uvIndexText").classList.remove("lowUV");
              document.getElementById("uvIndexText").classList.add("modUV");
            } else if (uvIndex >= 6 < 7.99) {
              document.getElementById("uvIndexText").classList.remove("modUV");
              document.getElementById("uvIndexText").classList.add("highUV");
            } else if (uvIndex >= 8 < 10.99) {
              document.getElementById("uvIndexText").classList.remove("highUV");
              document
                .getElementById("uvIndexText")
                .classList.add("veryHighUV");
            } else if (uvIndex >= 11) {
              document.getElementById("uvIndexText").remove("veryHighUV");
              document.getElementById("uvIndexText").add("extremeUV");
            }
          }

          insertUVI();
        });

      insertDataToCurrent();
    });
}

//Function to set the time and current city

function applyNameAndTime() {
  document.getElementById("mainWeatherHeader").innerHTML =
    cityInputEl.val() + " " + "(" + date + ")";
}
