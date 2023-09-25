document.getElementById('scrapeURL').addEventListener('click', function() {
  const url = document.getElementById('urlInput').value;
  chrome.runtime.sendMessage({ action: "scrapeURL", url: url });
});

document.getElementById('scrapeCurrentPage').addEventListener('click', function() {
  chrome.runtime.sendMessage({ action: "scrapeCurrentPage" });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.recipe) {
      let iframeWindow = document.getElementById('iframe').contentWindow;
      iframeWindow.postMessage(message.recipe, 'https://sethspwa.netlify.app/');
    }
  });
  