let citySearch = document.getElementById('searchAndHistory');
let searchedCityQuery = document.getElementById('searchedCityQuery');
let searchButton = document.getElementById('searchButton');
let lastSearched = document.getElementById('lastSearched');
let weatherAPI = 'http://api.openweathermap.org/data/2.5/forecast?q=';
let APIKey = '&appid=d7d8f56ce1652da17774366ee1b61ddd'
let tempAPI;

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
        let clearRecentlySearched = document.createElement('button');
        clearRecentlySearched.textContent = 'Clear Recent Searches';
        clearRecentlySearched.setAttribute("class", "previouslySearched");
        clearRecentlySearched.style.backgroundColor = 'Red';
        lastSearched.appendChild(clearRecentlySearched);


    }
}

// This function will be used in the retrieveWeather function, taking the searchedCityQuery.value and adding it to the localStorage.cityWeatherSearches array
    // A check will be done first using Array.indexOf to see if the city already exists in recent searches to determine if the city was already searched recently
function saveToHistory(){

}

renderLastCities()
citySearch.addEventListener("submit", retrieveWeather)