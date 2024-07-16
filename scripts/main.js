const LOCAL_STORAGE_KEY = "turbomarks-data";

let form = document.querySelector("#form-part");

// Description:
// This script is responsible for handling the form submission
// and storing the data in the local storage.
form.addEventListener("submit", (event) => {
  event.preventDefault();

  // structuring the form data
  let formData = new FormData(form);
  let data = {};
  for (let [key, value] of formData.entries()) {
    data[key] = value;
  }

  // Condition:
  // If any form field is empty, return
  if (!data.shorthand || !data.url) {
    // show error message
    return;
  }

  // append the data to the list in local storage
  // if the list is not present, create a new list
  let existingData = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (existingData) {
    existingData = JSON.parse(existingData);
  } else {
    existingData = [];
  }

  existingData.push(data);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existingData));
  sendUpdateToBackgroundWorker(JSON.stringify(existingData));
  // show success message
});

// Description:
// Sends a message to the background service
// to update the data
function sendUpdateToBackgroundWorker(turbomarksData) {
  chrome.runtime.sendMessage({ data: turbomarksData }, (response) => {
    console.log(response.message);
  });
}
