const LOCAL_STORAGE_KEY = "turbomarks-data";

let form = document.querySelector("#form-part");

// Description:
// This script is responsible for handling the form submission
// and storing the data in the local storage.
form.addEventListener("submit", async (event) => {
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
  let resultData = await chrome.storage.local.get(LOCAL_STORAGE_KEY);
  let existingData = [];

  // Condition:
  // Checking if the data is an empty object
  if (resultData[LOCAL_STORAGE_KEY]) {
    existingData = JSON.parse(resultData[LOCAL_STORAGE_KEY]);
  }

  existingData.push(data);

  await chrome.storage.local.set({
    [LOCAL_STORAGE_KEY]: JSON.stringify(existingData),
  });

  // show success message
});
