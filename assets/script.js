let citySearch = document.getElementById('searchAndHistory');
let searchedCityQuery = document.getElementById('searchedCityQuery');
let searchButton = document.getElementById('searchButton');
let lastSearched = document.getElementById('lastSearched');
let weatherAPI = 'http://api.openweathermap.org/data/2.5/forecast?q=';
let APIKey = '&appid=d7d8f56ce1652da17774366ee1b61ddd'
let tempAPI;
let clearRecentlySearched;

function initializer(){
    renderLastCities();
}

function retrieveWeather(event){
    event.preventDefault(); 
    let searchQuery = '';
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
    tempAPI = weatherAPI + searchQuery + APIKey;
    saveToHistory(searchedCityQuery.value)
    weatherAPICall(tempAPI);
    tempAPI = '';
}

function weatherAPICall(apiURL){
    let weatherArray;
    fetch(apiURL)
    .then(function(response){
        console.log(response);
        return response.json()
    })
    .then(function(data){
        console.log(data);
        weatherArray = [];
        for(let i = 0; i < 6; i++){
            weatherArray.push(data.list[i]);
        }
        console.log(weatherArray);
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