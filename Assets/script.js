var formEl = $('#searchForm');
var cityInputEl = $('input[name="cityName"]');
var searchBtn = document.getElementById('citySearchBtn');

fetch('http://api.openweathermap.org/data/2.5/weather?q=Houston&appid=06ac0e5e9aecb8b74a0ca04ef150a8a4')
.then(Response => Response.json())
.then(data => console.log(data));



function handleFormSubmit(event) {
event.preventDefault();
console.log(cityInputEl.val());
}

searchBtn.addEventListener("click", handleFormSubmit);
