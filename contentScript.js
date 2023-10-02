console.log("Content Script is running.");

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.action === "scrapeEntirePage") {
        sendResponse({ content: document.body.innerText });
    }
});
