// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
var currentDate = document.querySelector("#currentDay")
var secondDate = document.querySelector("#secondDay")
var thirdDate = document.querySelector("#thirdDay")
var fourthDate = document.querySelector("#fourthDay")
var fifthDate = document.querySelector("#fifthDay")
var sixthDate = document.querySelector("#sixthDay")
var nameInputEl = document.querySelector("#username")
var cityFormEl = document.querySelector("#user-form")
var SubBtn = document.querySelector("#subBtn")
var cityN = document.querySelector("#city")
var infoEl = document.querySelector("#info")
var dates = document.querySelector("#datesInfo")
var cities = {}
var displayCities = document.querySelector("#displayCities")
var hideAll = document.querySelector(".hide")


var currentTime = moment();
currentDate.textContent = currentTime.format("L");
var secondTime = moment().add(1, 'days')
secondDate.textContent = secondTime.format("L")
var thirdTime = moment().add(2, 'days')
thirdDate.textContent = thirdTime.format("L")
var fourthTime = moment().add(3, 'days')
fourthDate.textContent = fourthTime.format("L")
var fifthTime = moment().add(4, 'days')
fifthDate.textContent = fifthTime.format("L")

let getCurrentInfo = (city) => {
    cityN.textContent = city
    loadTasks(city)

    let apiURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&exclude=,daily&appid=b20a0c8394f0e460f879d6303c6f83ca";
    fetch(apiURL).then((response) => {
        response.json().then((data) => {
            console.log(data)
            fetch("https://api.openweathermap.org/data/2.5/uvi?lat=" + data.city.coord.lat + "&lon=" + data.city.coord.lon + "&appid=b20a0c8394f0e460f879d6303c6f83ca").then(uvRes => {
                uvRes.json().then(uvData => {

                    console.log(uvData.value)

                    let uvDataEl = document.createElement("p")
                    uvDataEl.textContent = "UV INDEX:" + uvData.value
                    infoEl.appendChild(uvDataEl)

                    hideAll.classList.remove("hide")
                })
            })
            // console.log(data);
            displayCurrentInfo(data)
        })
    });

};


function formSubmitHandler() {
    // console.log(event);
    // get value from input element
    var cityName = nameInputEl.value.trim();
    if (cityName) {
        getCurrentInfo(cityName);
        nameInputEl.value = "";
    } else {
        alert("Please enter a City name");

    }
};

let displayCurrentInfo = (info) => {

    let tempObject = document.createElement("p")
    tempObject.textContent = "Temp: " + info.list[0].main.temp + " F"
    infoEl.appendChild(tempObject)
    console.log(tempObject)

    let humudityObject = document.createElement("p")
    humudityObject.textContent = "Humidity: " + info.list[0].main.humidity + " %"
    infoEl.appendChild(humudityObject)
    console.log(humudityObject)

    let windObject = document.createElement("p")
    windObject.textContent = "Wind speed: " + info.list[0].wind.speed + " MPH"
    infoEl.appendChild(windObject)
    console.log(windObject)


    let secondDateTemp = document.createElement("p")
    secondDateTemp.textContent = "Temp: " + info.list[7].main.temp + " F"
    secondDay.appendChild(secondDateTemp)

    let secondDateHumidity = document.createElement("p")
    secondDateHumidity.textContent = "Humidity: " + info.list[7].main.humidity + " %"
    secondDay.appendChild(secondDateHumidity)

    let thirdDateTemp = document.createElement("p")
    thirdDateTemp.textContent = "Temp: " + info.list[15].main.temp + " F"
    thirdDay.appendChild(thirdDateTemp)

    let thirdDateHumidity = document.createElement("p")
    thirdDateHumidity.textContent = "Humidity: " + info.list[15].main.humidity + " %"
    thirdDay.appendChild(thirdDateHumidity)

    let fourthDateTemp = document.createElement("p")
    fourthDateTemp.textContent = "Temp: " + info.list[23].main.temp + " F"
    fourthDay.appendChild(fourthDateTemp)

    let fourthDateHumidity = document.createElement("p")
    fourthDateHumidity.textContent = "Humidity: " + info.list[23].main.humidity + " %"
    fourthDay.appendChild(fourthDateHumidity)

    let fifthDateTemp = document.createElement("p")
    fifthDateTemp.textContent = "Temp: " + info.list[31].main.temp + " F"
    fifthDay.appendChild(fifthDateTemp)

    let fifthDateHumidity = document.createElement("p")
    fifthDateHumidity.textContent = "Humidity: " + info.list[31].main.humidity + " %"
    fifthDay.appendChild(fifthDateHumidity)

    let sixthDateTemp = document.createElement("p")
    sixthDateTemp.textContent = "Temp: " + info.list[39].main.temp + " F"
    sixthDay.appendChild(sixthDateTemp)

    let sixthDateHumidity = document.createElement("p")
    sixthDateHumidity.textContent = "Humidity: " + info.list[39].main.humidity + " %"
    sixthDay.appendChild(sixthDateHumidity)

}

var saveCities = function () {
    console.log("146")
    localStorage.setItem("cities", JSON.stringify(cities));
};

var loadTasks = function (city) {
    console.log(city)
    
    cities = JSON.parse(localStorage.setItem(city, city));

    // if nothing in localStorage, create a new object to track all task status arrays
    if (!tasks) {
        tasks = {
            city: []
        };
    }
    displayCities.appendChild(cities)
    console.log(cities)
}





// getCurrentInfo();
SubBtn.addEventListener("click", (event) => {
    event.preventDefault()
    formSubmitHandler()
});


function allStorage() {
    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;
    while ( i-- ) {
        values.push( localStorage.getItem(keys[i]) );
    }
    return values;
}

console.log(allStorage())

