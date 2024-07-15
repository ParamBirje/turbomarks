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
  if (!data.title || !data.url) {
    // show error message
    return;
  }

  // append the data to the list in local storage
  // if the list is not present, create a new list
  let existingData = localStorage.getItem("turbomarks-data");
  if (existingData) {
    existingData = JSON.parse(existingData);
  } else {
    existingData = [];
  }

  existingData.push(data);
  localStorage.setItem("turbomarks-data", JSON.stringify(existingData));
  // show success message
});
