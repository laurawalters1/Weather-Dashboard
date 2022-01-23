//  Input form

// Declare variables
var inputForm = document.getElementById("inputForm");
var userInput = document.getElementById("userInput");
var formSubmitBtn = document.getElementById("formSubmit");

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
}

// Buttons

// Use local storage array to create buttons for each searched location

// Add a value to these buttons (data-attribute) which will be the location name

// Add event listener to the buttons which will call the fetch function (call not define)

// Fetch function

// Takes values from either input or buttons

// Format the data into dashboard structure
