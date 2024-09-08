const LOCAL_STORAGE_KEY = "turbomarks-data";

// Description:
// Populating links-list UI with saved links
// from browser.storage
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

  let resultData = await browser.storage.local.get(LOCAL_STORAGE_KEY);
  let existingData = {};

  if (resultData[LOCAL_STORAGE_KEY]) {
    existingData = JSON.parse(resultData[LOCAL_STORAGE_KEY]);
  }

  existingData[data.shorthand] = data.url;

  await browser.storage.local.set({
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
  let resultData = await browser.storage.local.get(LOCAL_STORAGE_KEY);
  let existingData = {};

  if (resultData[LOCAL_STORAGE_KEY]) {
    existingData = JSON.parse(resultData[LOCAL_STORAGE_KEY]);
  }

  // Clear existing content safely
  while (linksContainer.firstChild) {
    linksContainer.removeChild(linksContainer.firstChild);
  }

  // Create and append new link items
  Object.entries(existingData).forEach(([shorthand, url]) => {
    let item = { shorthand, url };
    linksContainer.appendChild(generateLinkItem(item));
  });
}

// Generate and return a link-item HTML
function generateLinkItem(linkItem) {
  /*
   * HTML Structure:
   
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
  */

  const linkItemDiv = document.createElement("div");
  linkItemDiv.className = "link-item";

  const linkItemDataDiv = document.createElement("div");
  linkItemDataDiv.className = "link-item-data";

  const shorthandSpan = document.createElement("span");
  shorthandSpan.className = "shorthand";
  shorthandSpan.textContent = linkItem.shorthand;

  const link = document.createElement("a");
  link.href = linkItem.url;
  link.target = "_blank";
  link.textContent =
    linkItem.url.length > 28
      ? `${linkItem.url.substring(0, 28)}...`
      : linkItem.url;

  // Append shorthand and link to link-item-data div
  linkItemDataDiv.appendChild(shorthandSpan);
  linkItemDataDiv.appendChild(link);

  // Create and set the delete button
  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-button";
  deleteButton.dataset.shorthand = linkItem.shorthand;
  deleteButton.textContent = "Delete";

  // Append link-item-data and delete button to link-item div
  linkItemDiv.appendChild(linkItemDataDiv);
  linkItemDiv.appendChild(deleteButton);

  return linkItemDiv;
}

// Deleting a link-item from the UI list
// and from browser.storage
async function intializeDeleteButtons() {
  let deleteButtons = document.querySelectorAll(".delete-button");

  deleteButtons.forEach((button) => {
    if (button.getAttribute("data-click-event")) {
      return;
    }

    button.addEventListener("click", async (event) => {
      let shorthand = event.target.getAttribute("data-shorthand");

      let resultData = await browser.storage.local.get(LOCAL_STORAGE_KEY);
      let existingData = {};

      if (resultData[LOCAL_STORAGE_KEY]) {
        existingData = JSON.parse(resultData[LOCAL_STORAGE_KEY]);
      }

      delete existingData[shorthand];
      await browser.storage.local.set({
        [LOCAL_STORAGE_KEY]: JSON.stringify(existingData),
      });

      // remove the link-item from the list
      event.target.parentElement.remove();
    });
  });
}
