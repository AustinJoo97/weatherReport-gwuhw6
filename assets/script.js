let citySearch = document.getElementById('searchAndHistory');
let searchedCityQuery = document.getElementById('searchedCityQuery');
let searchButton = document.getElementById('searchButton');
let lastSearched = document.getElementById('lastSearched');
let currentWeather = document.getElementById('currentWeather');
let todaysDate = document.getElementById('todaysDate');
let todaysTemp = document.getElementById('todaysTemp');
let todaysHumidity = document.getElementById('todaysHumidity');
let todaysWind = document.getElementById('todaysWind');
let todaysWeatherIcon = document.getElementById('todaysWeatherIcon');
let futureDays = document.getElementById('fiveDayForecast');
let weatherAPI = 'http://api.openweathermap.org/data/2.5/forecast?q=';
let weatherAPI2 = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=';
let APIKey = '&appid=d7d8f56ce1652da17774366ee1b61ddd'
let APIQueries = '&units=imperial'
let tempAPI;
let clearRecentlySearched;

function initializer(){
    renderLastCities();
}

function retrieveWeather(event){
    event.preventDefault(); 
    let searchQuery = '';
    // Try using event.target.value.split(" ") or something of the like to get searchArray when running this fxn with onclick for recently searched buttons

    let searchArray = searchedCityQuery.value.split(" ");

    if(searchArray.length === 1){
        if(searchArray[0] === ""){
            return;
        } else {
            searchQuery = searchArray[0];
        }
    } else {
        for(let i = 0; i < searchArray.length; i++){
            if(i === searchArray.length-1){
                searchQuery += `${searchArray[i]}`
            } else {
                searchQuery += `${searchArray[i]}+`
            }
        }
    }
    tempAPI = weatherAPI + searchQuery + APIKey + APIQueries;
    saveToHistory(searchedCityQuery.value)
    weatherAPICall(tempAPI, searchedCityQuery.value);
    tempAPI = '';
}

function weatherAPICall(apiURL, searchedCityName){
    let weatherArray = [];
    let todaysWeather;
    let counter = 0;
    let fiveCast = [];
    searchedCityName = searchedCityName.charAt(0).toUpperCase() +  searchedCityName.slice(1);

    fetch(apiURL)
    .then(function(response){
        console.log(response);
        return response.json()
    })
    .then(function(data){
        while(weatherArray.length < 6){
            weatherArray.push(data.list[counter]);
            counter += 7;
        }

        todaysWeather = {
            date: weatherArray[0].dt_txt,
            icon: `http://openweathermap.org/img/wn/${weatherArray[0].weather[0].icon}.png`,
            temperature: weatherArray[0].main.temp,
            humidity: weatherArray[0].main.humidity,
            windSpeed: weatherArray[0].wind.speed,
            // uvIndex: 
        }

        todaysDate.textContent = `${searchedCityName} (${moment(todaysWeather.date).format('MMM Do, YYYY')})`;
        todaysWeatherIcon.src = `${todaysWeather.icon}`;
        todaysTemp.textContent = `Temperature: ${todaysWeather.temperature}F`;
        todaysHumidity.textContent = `Humidity: ${todaysWeather.humidity}%`;
        todaysWind.textContent = `Wind Speed: ${todaysWeather.windSpeed} MPH`;

        for(let i = 1; i < weatherArray.length; i++){
            fiveCast.push({
                date: weatherArray[i].dt_txt,
                icon: `http://openweathermap.org/img/wn/${weatherArray[i].weather[0].icon}.png`,
                temperature: weatherArray[i].main.temp,
                humidity: weatherArray[i].main.humidity
            })
        }

        for(let i = 0; i < fiveCast.length; i++){
            let renderingDay = document.getElementById(`day${i+1}`);
            renderingDay.querySelector(`#day${i+1}Date`).textContent = `${moment(fiveCast[i].date).format('MMM Do, YYYY')}`;
            renderingDay.querySelector(`#day${i+1}WeatherIcon`).src = fiveCast[i].icon;
            renderingDay.querySelector(`#day${i+1}Temp`).textContent = `Temp: ${fiveCast[i].temperature}F`;
            renderingDay.querySelector(`#day${i+1}Humidity`).textContent = `Hum: ${fiveCast[i].humidity}%`
        }
    })

}

function renderLastCities(){
    let recentSearchesArray;
    if(!localStorage.getItem('cityWeatherSearches')){
        localStorage.setItem('cityWeatherSearches', JSON.stringify([]));
    } else {
        recentSearchesArray = JSON.parse(localStorage.getItem('cityWeatherSearches'));
        for(let i = 0; i < recentSearchesArray.length; i++){
            if(i === 14){
                break;
            }
            let previouslySearched = document.createElement('button');
            previouslySearched.textContent = recentSearchesArray[i];
            previouslySearched.setAttribute("class", "previouslySearched");
            lastSearched.appendChild(previouslySearched);
        }
    }
    if(!lastSearched.querySelector('#clearHistoryButton')){
        clearRecentlySearched = document.createElement('button');
        clearRecentlySearched.textContent = 'Clear Recent Searches';
        clearRecentlySearched.setAttribute("class", "previouslySearched");
        clearRecentlySearched.setAttribute("id", "clearHistoryButton")
        clearRecentlySearched.style.backgroundColor = 'Red';
        lastSearched.appendChild(clearRecentlySearched);
    }
}

function saveToHistory(cityName){
    let savedCitiesArray = JSON.parse(localStorage.getItem('cityWeatherSearches'));
    cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
    if(savedCitiesArray.includes(cityName)){
        savedCitiesArray.splice(savedCitiesArray.indexOf(cityName), 1);
    }
    savedCitiesArray.unshift(cityName);
    localStorage.setItem('cityWeatherSearches', JSON.stringify(savedCitiesArray));
    while(lastSearched.firstChild){
        lastSearched.removeChild(lastSearched.firstChild);
    }
    renderLastCities();
}

function clearSearchHistory(){
    localStorage.setItem('cityWeatherSearches', JSON.stringify([]));
    document.location.reload();
}

initializer();
citySearch.addEventListener("submit", retrieveWeather);
clearRecentlySearched.addEventListener("click", clearSearchHistory);


// NEED TO DO
    // Add click functionality for recently searched buttons
    // Get uv index rendering to screen