const LOCAL_STORAGE_KEY = "turbomarks-data";
let turbomarksData = {};

// As the input changes, provide suggestions
browser.omnibox.onInputChanged.addListener((text, suggest) => {
  browser.storage.local.get(LOCAL_STORAGE_KEY).then((data) => {
    if (data[LOCAL_STORAGE_KEY]) {
      turbomarksData = JSON.parse(data[LOCAL_STORAGE_KEY]);
    }
  });

  let suggestions = [];

  for (let [shorthand, url] of Object.entries(turbomarksData)) {
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
browser.omnibox.onInputEntered.addListener((text) => {
  browser.storage.local.get(LOCAL_STORAGE_KEY).then((data) => {
    if (data[LOCAL_STORAGE_KEY]) {
      turbomarksData = JSON.parse(data[LOCAL_STORAGE_KEY]);
    }
  });

  if (text in turbomarksData) {
    let newURL = turbomarksData[text];
    browser.tabs.update({ url: newURL });
  }
});
