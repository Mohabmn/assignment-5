let day = document.querySelector('.day');
let country = document.querySelector('.country');
let temp = document.querySelector('.temp');
let icon = document.querySelector('.icon');
let textInfo = document.querySelector('.text-info');
let wind = document.querySelector('.wind');
let windSpeed = document.querySelector('.windSpeed');
let windDir = document.querySelector('.windDir');
let maxTemp = document.querySelectorAll('.maxTemp');
let minTemp = document.querySelectorAll('.minTemp');
let infocard2 = document.querySelectorAll('.infocard2');
let icon2 = document.querySelectorAll('.icon2');
let todayDate = document.querySelector('.todayDate');
let todayNumber = document.querySelector('.todayNumber');
let todayMonth = document.querySelector('.todayMonth');
let nextDay = document.querySelectorAll('.nextDay');
let locationInput = document.querySelector('.locationInput');
let locationBtn = document.querySelector('.locationBtn');
//------------------------------------------- events ----------------------------------------------

locationInput.addEventListener('input', function(){
    getApi(locationInput.value)
})

locationBtn.addEventListener('click' , function(){
})

// ----------------------------------------- functions --------------------------------
async function getApi(city = "london") {
    let Request = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=9dad6a4f1e9d4bfe8c9133154242012&q=${city}&days=3`);
    let dataRequest = await Request.json();
    console.log(dataRequest);
    displayWeather(dataRequest)
    displayNextDays(dataRequest)
}
getApi()

function displayWeather(data) {
    let date = new Date();
    todayDate.innerHTML = date.toLocaleDateString("en-US", { weekday: "long" });
    todayNumber.innerHTML = date.getDate();
    todayMonth.innerHTML = date.toLocaleDateString("en-US", { month: "long" });
    country.innerHTML = data.location.name;
    temp.innerHTML = data.current.temp_c + 'c';
    icon.setAttribute('src', data.current.condition.icon);
    textInfo.innerHTML = data.current.condition.text;
    wind.innerHTML = data.current.humidity + '%';
    windSpeed.innerHTML = data.current.wind_kph + ' km/h';
    windDir.innerHTML = data.current.wind_dir;

}

function displayNextDays(data) {
    for (let i = 0; i < 2; i++) {
        let nextDays = new Date(data.forecast.forecastday[i+1].date)
        nextDay[i].innerHTML = nextDays.toLocaleDateString("en-US", {weekday: "long"})
        // console.log(nextDay.toLocaleDateString("en-US", {weekday: "short"}));
        
        maxTemp[i].innerHTML = data.forecast.forecastday[i + 1].day.maxtemp_c + 'c';
        minTemp[i].innerHTML = data.forecast.forecastday[i + 1].day.mintemp_c + 'c';
        infocard2[i].innerHTML = data.forecast.forecastday[i + 1].day.condition.text;
        icon2[i].setAttribute('src', data.forecast.forecastday[i + 1].day.condition.icon);
    }

}


