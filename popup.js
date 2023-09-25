// Event listener for the Scrape URL button
document.getElementById('scrapeURL').addEventListener('click', function() {
  const url = document.getElementById('urlInput').value;
  chrome.runtime.sendMessage({ action: "scrapeURL", url: url });
});

// Event listener for the Scrape Current Page button
document.getElementById('scrapeCurrentPage').addEventListener('click', function() {
  chrome.runtime.sendMessage({ action: "scrapeCurrentPage" });
});

// Message listener to receive messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.recipe) {
      // Display the scraped content in the textarea
      document.getElementById('scrapedContent').value = message.recipe;

      // Send the content to your PWA
      let iframeWindow = document.getElementById('iframe').contentWindow;
      iframeWindow.postMessage(message.recipe, 'https://sethspwa.netlify.app/');
    }
});

// Logic to handle the message from background.js and update the popup accordingly
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.processedRecipe) {
      const processedRecipeText = message.processedRecipe;
      // Display it in the popup, or send it to the PWA, or do anything else you need
      document.getElementById('scrapedContent').value = processedRecipeText;

      // Sending it to the PWA
      let iframeWindow = document.getElementById('iframe').contentWindow;
      iframeWindow.postMessage(processedRecipeText, 'https://sethspwa.netlify.app/');
    }
});
