// Fetch function
var weatherCardsList = document.getElementById("weatherCards");
// fetch function takes in location as a parameter (location will come from either the text content of
// a button, or from user input)
function fetchFunction(location) {
  fetch(
    // initial fetch that takes the parameter of location (user input or button text content)
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
      location +
      "&limit=5&appid=d35548829c80ec12d10edefc67f06c96"
  ).then(function (response) {
    response.json().then(function (data) {
      // fetch to one call api which will return lat and lon, which are then concatenated
      // into the second fetch which will return weather data
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        location +
        "&appid=d35548829c80ec12d10edefc67f06c96";
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

// adding event listener to input form
inputForm.addEventListener("submit", function (e) {
  e.preventDefault();
  // checking if the currentDayCard variable currently exists, if so, setting the innerhtml of
  // current day card to an empty string, this prevents search results from accumulating
  if (currentDayCard) {
    currentDayCard.innerHTML = "";
  }
  // as above but for the list of cards for the future weather conditions
  if (weatherCardsList) {
    weatherCardsList.innerHTML = "";
  }
  // Check for null value so that the user is prompted to enter a location if they submit the form without doing so
  if (userInput.value === "") {
    alert("please enter a location");
  } else {
    // Save value to local storage (function defined below)
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
}
searchHistoryButtons(JSON.parse(localStorage.getItem("searchHistory")));
// Buttons

// Use local storage array to create buttons for each searched location
function searchHistoryButtons(array) {
  if (!array) {
    // returning the function if the array does not exist so that there is not an error in the console
    return;
  }
  for (var i = 0; i < array.length; i++) {
    // creating search history buttons
    var locationLink = document.createElement("a");
    var locationButton = document.createElement("button");
    locationButton.dataset.location = array[i];
    locationButton.textContent = array[i];
    locationButton.appendChild(locationLink);
    locationButton.classList.add("locationButton");
    var locationListItem = document.createElement("li");
    locationListItem.appendChild(locationButton);
    searchHistoryList.appendChild(locationListItem);
  }
}

// Add a value to these buttons (data-attribute) which will be the location name

// Add event listener to the buttons which will call the fetch function
var locationButtonArray = document.querySelectorAll(".locationButton");

for (var i = 0; i < locationButtonArray.length; i++) {
  locationButtonArray[i].addEventListener("click", function (e) {
    currentDayCard.innerHTML = "";
    weatherCardsList.innerHTML = "";
    // calling the fetch function with the event target text content
    // (which will be a city name) as the parameter
    fetchFunction(e.target.textContent);
  });
}

// Format the data into dashboard structure
function formatFunction(data, location) {
  var locationHeader = document.createElement("h2");
  locationHeader.textContent = location;
  currentDayCard.appendChild(locationHeader);
  currentDayCard.classList.add("col-12");
  currentDayCard.classList.add("col-lg-8");
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
  temp.textContent = Math.floor(celsius) + "ºC";
  currentDayCard.appendChild(temp);
  var humidity = document.createElement("h4");
  humidity.textContent = "Humidity: " + data.current.humidity + "%";
  currentDayCard.appendChild(humidity);
  var windSpeed = document.createElement("h4");
  windSpeed.textContent = "Wind speed: " + data.current.wind_speed + " mph";
  currentDayCard.appendChild(windSpeed);
  var uvIndex = document.createElement("h4");
  uvIndex.textContent = "UV Index: " + data.current.uvi;
  uvIndex.classList.add("uv");
  uvChecker(data, uvIndex);
  currentDayCard.appendChild(uvIndex);
  console.log(data);
  console.log("SUCCESS!");
}

// formatting the weather cards for future days
function formatFutureFunction(data, location) {
  for (i = 1; i < 6; i++) {
    var weatherCardItem = document.createElement("li");
    weatherCardItem.classList.add("weatherCardItem");
    var locationName = document.createElement("h2");
    var weatherCard = document.createElement("div");
    weatherCardItem.classList.add("weatherCard");
    weatherCardItem.classList.add("col-lg-5");
    weatherCardItem.classList.add("col-10");
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
    temp.textContent = Math.floor(futureCelsius) + "ºC";
    weatherCard.appendChild(temp);

    var futureWindSpeed = document.createElement("h4");
    futureWindSpeed.textContent =
      "Wind speed: " + data.daily[i].wind_speed + " mph";
    weatherCard.appendChild(futureWindSpeed);

    var futureHumidity = document.createElement("h4");
    futureHumidity.textContent = "Humidity: " + data.daily[0].humidity + "%";
    weatherCard.appendChild(futureHumidity);
  }
}

// function that will check the uv index and change the color of this
// item depending on its value
function uvChecker(data, uvItem) {
  if (data.current.uvi <= 3) {
    uvItem.classList.add("uv-mild");
  } else if (data.curent.uvi <= 7) {
    uvItem.classList.add("uv-med");
  } else if (data.current.uvi >= 8) {
    uvItem.classList.add("uv-xtr");
  }
}

// converting the date from unix so that it is more readable
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
