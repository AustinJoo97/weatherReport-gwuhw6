# Weather Report

This weather application allows users to search up the five day forecast for any searched city including the temperature, humidity, and weather conditions. Additionally, for the current day, the user, upon either searching for a city or clicking on a previously searched city, will be rendered with the information stated prior in addition to the current wind speed and a color-corresponding uv index value. 

## Link

https://austinjoo97.github.io/weatherReport-gwuhw6/

## How it works

When initially loading the application, the user will be presented with a search box as well as a clear history button. Upon searching for a city, an external API will be contacted with a request to retrieve the weather information for the current day as well as the following five. In addition to this API call, another will be made to retrieve the geological coordinates of the searched city to find the current uv index. All of this information will be rendered to the DOM for the user to see.

In addition to rendering the weather report for the following days, upon searching for a city, the weather information retrieved will also be saved to localStorage for quick access. Saving each city to localStorage will also create a new button with the saved city's name to allow for quick searching. 

Finally, when any of the recent cities are called, the cities stored in localStorage will be resorted to reflect which was the most recently searched city. Additionally, clicking the clear search history button will clear all cities saved in localStorage and remove all of the buttons rendered to the DOM.

## Demo

![GitHub Logo](./assets/demo/weatherReportDemo.gif)