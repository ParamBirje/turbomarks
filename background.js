chrome.omnibox.onInputChanged.addListener((text, suggest) => {
  console.log("User input:", text);

  // Provide suggestions to the closest match
  suggest([
    { content: text + " one", description: "the first one" },
    { content: text + " number two", description: "the second entry" },
  ]);
});

chrome.omnibox.onInputEntered.addListener((text) => {
  // Input the matched URL into the url bar
  let newURL = "https://www.google.com";
  chrome.tabs.update({ url: newURL });
});
