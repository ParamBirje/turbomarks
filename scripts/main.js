const LOCAL_STORAGE_KEY = "turbomarks-data";

// Description:
// Populating links-list UI with saved links
// from chrome.storage
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
    // TODO: show error message
    return;
  }

  let resultData = await chrome.storage.local.get(LOCAL_STORAGE_KEY);
  let existingData = {};

  if (resultData[LOCAL_STORAGE_KEY]) {
    existingData = JSON.parse(resultData[LOCAL_STORAGE_KEY]);
  }

  existingData[data.shorthand] = data.url;

  await chrome.storage.local.set({
    [LOCAL_STORAGE_KEY]: JSON.stringify(existingData),
  });

  await triggerRenderLinks();
  form.reset();
});

/*
 *
 * Helper Functions
 *
 */

// Re-render the links-list
async function triggerRenderLinks() {
  await renderLinksListItems();
  await intializeDeleteButtons();
}

// Render the links-list items
async function renderLinksListItems() {
  let resultData = await chrome.storage.local.get(LOCAL_STORAGE_KEY);
  let existingData = {};

  if (resultData[LOCAL_STORAGE_KEY]) {
    existingData = JSON.parse(resultData[LOCAL_STORAGE_KEY]);
  }

  // flushing the existing links
  // HACK: Dangerous.
  linksContainer.innerHTML = "";
  Object.entries(existingData).forEach(([shorthand, url]) => {
    let item = { shorthand, url };
    linksContainer.innerHTML += generateLinkItem(item);
  });
}

// Generate and return a link-item HTML
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

// Deleting a link-item from the UI list
// and from chrome.storage
async function intializeDeleteButtons() {
  let deleteButtons = document.querySelectorAll(".delete-button");

  deleteButtons.forEach((button) => {
    if (button.getAttribute("data-click-event")) {
      return;
    }

    button.addEventListener("click", async (event) => {
      let shorthand = event.target.getAttribute("data-shorthand");

      let resultData = await chrome.storage.local.get(LOCAL_STORAGE_KEY);
      let existingData = {};

      if (resultData[LOCAL_STORAGE_KEY]) {
        existingData = JSON.parse(resultData[LOCAL_STORAGE_KEY]);
      }

      delete existingData[shorthand];
      await chrome.storage.local.set({
        [LOCAL_STORAGE_KEY]: JSON.stringify(existingData),
      });

      // remove the link-item from the list
      event.target.parentElement.remove();
    });
  });
}
