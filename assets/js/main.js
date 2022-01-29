// Fetch function
var weatherCardsList = document.getElementById("weatherCards");
function fetchFunction(location) {
  fetch(
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
      location +
      "&limit=5&appid=d35548829c80ec12d10edefc67f06c96"
  ).then(function (response) {
    response.json().then(function (data) {
      console.log(data);
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        location +
        "&appid=d35548829c80ec12d10edefc67f06c96";
      // "https://api.openweathermap.org/data/2.5/forecast/daily?q=" +
      //   location +
      //   "&cnt=7&appid=d35548829c80ec12d10edefc67f06c96"
      // d35548829c80ec12d10edefc67f06c96
      fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          data[0].lat +
          "&lon=" +
          data[0].lon +
          "&exclude=hourly&appid=d35548829c80ec12d10edefc67f06c96"
      ).then(function (response) {
        response.json().then(function (data) {
          if (userInput.value) {
            saveToLocal(userInput.value);
          }

          console.log(data);
          formatFunction(data, location);
          formatFutureFunction(data, location);
        });
      });
    });
  });
}

//  Input form

// Declare variables
var inputForm = document.getElementById("inputForm");
var userInput = document.getElementById("userInput");
var formSubmitBtn = document.getElementById("formSubmit");
var searchHistoryList = document.getElementById("searchHistoryList");
var currentDayCard = document.getElementById("todaysWeather");

inputForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (currentDayCard) {
    currentDayCard.innerHTML = "";
  }
  if (weatherCardsList) {
    weatherCardsList.innerHTML = "";
  }
  // Check for null value
  if (userInput.value === "") {
    alert("please enter a location");
  } else {
    // Save value to local storage (function defined below)
    console.log(userInput.value);
    fetchFunction(userInput.value);
  }
});

// Local storage

function saveToLocal(location) {
  // Parse local storage array so that new values can be added
  var storageArray = JSON.parse(localStorage.getItem("searchHistory"));
  // Checking for empty local storage
  if (storageArray === null) {
    var storageArray = [];
  }
  // push user input to storageArray
  storageArray.push(location);
  console.log(storageArray);
  // Stringify storageArray and add to local storage
  localStorage.setItem("searchHistory", JSON.stringify(storageArray));
  //   searchHistoryButtons(storageArray);
}
searchHistoryButtons(JSON.parse(localStorage.getItem("searchHistory")));
// Buttons

// Use local storage array to create buttons for each searched location
function searchHistoryButtons(array) {
  if (!array) {
    return;
  }
  for (var i = 0; i < array.length; i++) {
    var locationLink = document.createElement("a");
    // locationLink.href =
    //   "http://api.weatherapi.com/v1/forecast.json?key=21bded92b0954e64aa1204441222301&q=" +
    //   array[i] +
    //   "&days=5&aqi=no&alerts=no";
    var locationButton = document.createElement("button");
    locationButton.dataset.location = array[i];
    locationButton.textContent = array[i];
    locationButton.appendChild(locationLink);
    locationButton.classList.add("locationButton");

    var locationListItem = document.createElement("li");
    locationListItem.appendChild(locationButton);
    searchHistoryList.appendChild(locationListItem);
    locationButton.addEventListener("click", function () {});
  }
}

// Add a value to these buttons (data-attribute) which will be the location name

// Add event listener to the buttons which will call the fetch function (call not define)
var locationButtonArray = document.querySelectorAll(".locationButton");

for (var i = 0; i < locationButtonArray.length; i++) {
  locationButtonArray[i].addEventListener("click", function (e) {
    console.log(e.target);
    currentDayCard.innerHTML = "";
    weatherCardsList.innerHTML = "";
    fetchFunction(e.target.textContent);
  });
}

// Takes values from either input or buttons

// Format the data into dashboard structure
function formatFunction(data, location) {
  //   console.log(data.forecast.forecastday[0].day.avgtemp_c);
  console.log(data);
  var locationHeader = document.createElement("h2");
  locationHeader.textContent = location;
  currentDayCard.appendChild(locationHeader);
  var dateHeader = document.createElement("h3");
  dateHeader.textContent = dateConverter(data.current.dt);
  currentDayCard.appendChild(dateHeader);
  currentDayCard.classList.add("todaysWeather");
  var todaysIcon = document.createElement("img");
  todaysIcon.setAttribute(
    "src",
    "https://openweathermap.org/img/wn/" +
      data.current.weather[0].icon +
      "@2x.png"
  );

  currentDayCard.appendChild(todaysIcon);
  var celsius = data.current.temp - 273.15;
  var temp = document.createElement("h4");
  temp.textContent = Math.floor(celsius);
  currentDayCard.appendChild(temp);
  var humidity = document.createElement("h4");
  humidity.textContent = "Humidity: " + data.current.humidity;
  currentDayCard.appendChild(humidity);
  var windSpeed = document.createElement("h4");
  windSpeed.textContent = "Wind speed: " + data.current.wind_speed;
  currentDayCard.appendChild(windSpeed);
  var uvIndex = document.createElement("h4");
  uvIndex.textContent = "UV Index: " + data.current.uvi;
  uvIndex.classList.add("uv");
  uvChecker(data, uvIndex);
  currentDayCard.appendChild(uvIndex);
  console.log(data);
  console.log("SUCCESS!");
}

function formatFutureFunction(data, location) {
  var dailyArray = data.daily;

  for (i = 1; i < 6; i++) {
    var weatherCardItem = document.createElement("li");
    weatherCardItem.classList.add("weatherCardItem");
    var locationName = document.createElement("h2");
    var weatherCard = document.createElement("div");
    weatherCard.classList.add("weatherCard");
    locationName.textContent = location;
    weatherCard.appendChild(locationName);
    weatherCardItem.appendChild(weatherCard);
    weatherCardsList.appendChild(weatherCardItem);
    var futureDate = document.createElement("h3");
    futureDate.textContent = dateConverter(data.daily[i].dt);
    weatherCard.appendChild(futureDate);

    var futureIcon = document.createElement("img");
    futureIcon.setAttribute(
      "src",
      "https://openweathermap.org/img/wn/" +
        data.daily[i].weather[0].icon +
        "@2x.png"
    );
    weatherCard.appendChild(futureIcon);

    var futureCelsius = data.daily[i].temp.day - 273.15;
    var temp = document.createElement("h4");
    temp.textContent = Math.floor(futureCelsius);
    weatherCard.appendChild(temp);

    var futureWindSpeed = document.createElement("h4");
    futureWindSpeed.textContent = "Wind speed: " + data.daily[i].wind_speed;
    weatherCard.appendChild(futureWindSpeed);

    var futureHumidity = document.createElement("h4");
    futureHumidity.textContent = "Humidity: " + data.daily[0].humidity;
    weatherCard.appendChild(futureHumidity);
  }
}

function uvChecker(data, uvItem) {
  if (data.current.uvi <= 3) {
    uvItem.classList.add("uv-mild");
  } else if (data.curent.uvi <= 7) {
    uvItem.classList.add("uv-med");
  } else if (data.current.uvi >= 8) {
    uvItem.classList.add("uv-xtr");
  }
}

function dateConverter(timestamp) {
  var miliseconds = timestamp * 1000;
  var humanDate = new Date(miliseconds).toLocaleString("en-US", {
    weekday: "long",

    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
  });

  return humanDate;
}
