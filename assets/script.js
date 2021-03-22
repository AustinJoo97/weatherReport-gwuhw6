let citySearch = document.getElementById('searchAndHistory');
let searchedCityQuery = document.getElementById('searchedCityQuery');
let searchButton = document.getElementById('searchButton');
let lastFiveSearched = document.getElementById('lastFiveSearched');
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
    fetch(apiURL)
    .then(function(response){
        console.log(response);
        return response.json()
    })
    .then(function(data){
        console.log(data);
    })

}

citySearch.addEventListener("submit", retrieveWeather)