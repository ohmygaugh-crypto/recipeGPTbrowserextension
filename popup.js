chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.recipe) {
      let iframeWindow = document.getElementById('iframe').contentWindow;
      iframeWindow.postMessage(message.recipe, 'https://sethspwa.netlify.app/');
    }
  });
  