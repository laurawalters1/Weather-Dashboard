//  Input form

// Declare variables
var inputForm = document.getElementById("inputForm");
var userInput = document.getElementById("userInput");
var formSubmitBtn = document.getElementById("formSubmit");
var searchHistoryList = document.getElementById("searchHistoryList");
inputForm.addEventListener("submit", function (e) {
  e.preventDefault();
  // Check for null value
  if (userInput.value === "") {
    alert("please enter a location");
  } else {
    // Save value to local storage (function defined below)
    console.log(userInput.value);
    saveToLocal(userInput.value);
    // Add event listener which will call the fetch function (call not define)
    // fetchFunction(userInput.value);
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

// Buttons

// Use local storage array to create buttons for each searched location
function searchHistoryButtons(array) {
  for (var i = 0; i < array.length; i++) {
    var locationLink = document.createElement("a");
    locationLink.href = "";
    var locationButton = document.createElement("button");
    locationButton.textContent = array[i];
    locationButton.appendChild(locationLink);
    locationButton.classList.add("locationButton");
    var locationListItem = document.createElement("li");
    locationListItem.appendChild(locationButton);
    searchHistoryList.appendChild(locationListItem);
    locationButton.addEventListener("click", function () {});
  }
}

searchHistoryButtons(JSON.parse(localStorage.getItem("searchHistory")));
// Add a value to these buttons (data-attribute) which will be the location name

// Add event listener to the buttons which will call the fetch function (call not define)
var locationButtonArray = document.querySelectorAll(".locationButton");

for (var i = 0; i < locationButtonArray.length; i++) {
  locationButtonArray[i].addEventListener("click", function () {
    console.log(locationButtonArray[i]);
  });
}
// Fetch function

// Takes values from either input or buttons

// Format the data into dashboard structure
