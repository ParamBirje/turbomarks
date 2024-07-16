const LOCAL_STORAGE_KEY = "turbomarks-data";
let turbomarksData = [];

// Listening to messages for updating the turbomarksData
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.data) {
    turbomarksData = JSON.parse(message.data);
    sendResponse({ message: "Acknowledged by main." });
  }
});

// As the input changes, provide suggestions
chrome.omnibox.onInputChanged.addListener(async (text, suggest) => {
  chrome.storage.local.get(LOCAL_STORAGE_KEY).then((data) => {
    if (data[LOCAL_STORAGE_KEY]) {
      turbomarksData = JSON.parse(data[LOCAL_STORAGE_KEY]);
    }
  });

  let suggestions = [];

  // Loop to iterate over the turbomarksData list
  // and find the shorthand that starts with the input text
  for (let i of turbomarksData) {
    let shorthand = i.shorthand;
    let url = i.url;

    // Condition:
    // If the title starts with the input text
    // provide the suggestion
    if (shorthand.startsWith(text) && text.length > 0) {
      suggestions.push({
        content: shorthand,
        description: url,
      });
    }
  }

  suggest(suggestions);
});

// On pressing enter, open the matched URL
chrome.omnibox.onInputEntered.addListener((text) => {
  // chrome.storage.local.get(LOCAL_STORAGE_KEY).then((data) => {
  //   if (data[LOCAL_STORAGE_KEY]) {
  //     turbomarksData = JSON.parse(data[LOCAL_STORAGE_KEY]);
  //   }
  // });

  // Assuming the updated data is already present in turbomarksData
  for (let i of turbomarksData) {
    if (i.shorthand === text) {
      chrome.tabs.update({ url: i.url });
      return;
    }
  }
});
