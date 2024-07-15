const localStorageKey = "turbomarks-data";
let turbomarksData = [];

// As the input changes, provide suggestions
chrome.omnibox.onInputChanged.addListener((text, suggest) => {
  let suggestions = [];

  // Start a loop to iterate over the turbomarksData list
  // and find the shorthand that starts with the input text
  for (let i of turbomarksData) {
    let shorthand = i.shorthand;
    let url = i.url;

    // If the title starts with the input text
    // provide the suggestion
    if (shorthand.startsWith(text)) {
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
  let newURL = "https://www.google.com";
  chrome.tabs.update({ url: newURL });
});
