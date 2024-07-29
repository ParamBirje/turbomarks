const LOCAL_STORAGE_KEY = "turbomarks-data";

// Description:
// Populating links-list with saved links
// from chrome.storage.local
let linksContainer = document.querySelector("#links-list");

window.addEventListener("load", async () => {
  await triggerRenderLinks();
});

// Description:
// This script is responsible for handling the form submission
// and storing the data in the local storage.
let form = document.querySelector("#form-part");

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

  // re-render the links-list
  await triggerRenderLinks();

  // reset the form
  form.reset();
});

/*

  Helper functions ----------------------

*/

// Helper function to re-render the links-list
async function triggerRenderLinks() {
  await renderLinksListItems();
  await intializeDeleteButtons();
}

// Helper function to render the links-list items
async function renderLinksListItems() {
  let resultData = await chrome.storage.local.get(LOCAL_STORAGE_KEY);
  let existingData = [];

  // Condition:
  // Checking if the data is an empty object
  if (resultData[LOCAL_STORAGE_KEY]) {
    existingData = JSON.parse(resultData[LOCAL_STORAGE_KEY]);
  }

  // flushing the existing links
  linksContainer.innerHTML = "";
  // Dangerous.
  existingData.forEach((item) => {
    linksContainer.innerHTML += generateLinkItem(item);
  });
}

// Helper function to generate link-item HTML
function generateLinkItem(linkItem) {
  return `
    <div class="link-item">
      <div class="link-item-data">
        <span class="shorthand">${linkItem.shorthand}</span>
        <a href="${linkItem.url}" target="_blank">${linkItem.url.substring(
          0,
          28,
        )}...</a>
      </div>
      <button data-shorthand="${
        linkItem.shorthand
      }" class="delete-button">Delete</button>
    </div>
  `;
}

// Helper function for deleting a link-item from the list
// and from chrome.storage.local
async function intializeDeleteButtons() {
  let deleteButtons = document.querySelectorAll(".delete-button");

  deleteButtons.forEach((button) => {
    // return if the button already has the click event listener
    if (button.getAttribute("data-click-event")) {
      return;
    }

    button.addEventListener("click", async (event) => {
      let shorthand = event.target.getAttribute("data-shorthand");

      let resultData = await chrome.storage.local.get(LOCAL_STORAGE_KEY);
      let existingData = [];

      // Condition:
      // Checking if the data is an empty object
      if (resultData[LOCAL_STORAGE_KEY]) {
        existingData = JSON.parse(resultData[LOCAL_STORAGE_KEY]);
      }

      existingData = existingData.filter(
        (item) => item.shorthand !== shorthand,
      );

      await chrome.storage.local.set({
        [LOCAL_STORAGE_KEY]: JSON.stringify(existingData),
      });

      // remove the link-item from the list
      event.target.parentElement.remove();
    });
  });
}
