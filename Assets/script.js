var searchBar = document.getElementById("#citySearchBar");
var cityName = searchBar.value();
var goBtn = document.getElementById('#citySearchBtn');

// fetch('https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=06ac0e5e9aecb8b74a0ca04ef150a8a4')
// .then(Response => Response.json())
// .then(data => console.log(data));


fetch('https://api.opencagedata.com/geocode/v1/json?q=Atlanta&key=1f2ccb5ef25046768295cd37fe62ae32&language=en&pretty=1')
.then(Response => Response.json())
.then(data => console.log(data));

goBtn.addEventListener("click")
    console.log(cityName);
