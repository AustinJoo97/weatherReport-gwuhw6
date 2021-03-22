let citySearch = document.getElementById('searchAndHistory');
let searchedCityQuery = document.getElementById('searchedCityQuery');
let searchButton = document.getElementById('searchButton');
let lastFiveSearched = document.getElementById('lastFiveSearched');
let weatherAPI = 'api.openweathermap.org/data/2.5/forecast?q=';
let tempAPI;

function retrieveWeather(event){
    event.preventDefault(); 
    let searchQuery = '';
    let searchArray = searchedCityQuery.value.split(" ");

    if(searchArray.length < 1){
        return;
    } else if(searchArray.length === 1){
        searchQuery = searchArray[0];
    } else {
        for(let i = 0; i < searchArray.length; i++){
            if(i === searchArray.length-1){
                searchQuery += `${searchArray[i]}`
            } else {
                searchQuery += `${searchArray[i]}+`
            }
        }
    }
    tempAPI = weatherAPI + searchQuery;
    // console.log(tempAPI)
    tempAPI = '';
}



citySearch.addEventListener("submit", retrieveWeather)