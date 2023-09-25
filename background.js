// Listening for messages
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "scrapeURL") {
      chrome.tabs.create({ url: message.url }, function(tab) {
          chrome.tabs.executeScript(tab.id, { file: "contentScript.js" });
      });
  } else if (message.action === "scrapeCurrentPage") {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
          chrome.tabs.executeScript(tabs[0].id, { file: "contentScript.js" });
      });
  } else if (message.recipe) {
    processWithOpenAI(message.recipe).then((result) => {
      // Send the processed result to the popup (if needed)
      chrome.runtime.sendMessage({processedRecipe: result});
    });
  }
});

async function processWithOpenAI(recipeData) {
  const openaiEndpoint = 'https://api.openai.com/v1/engines/davinci/completions';
  const openaiApiKey = 'YOUR_OPENAI_API_KEY'; // Remember, this is not the safest method to keep API keys.

  const requestBody = {
    prompt: `Process this recipe: ${recipeData}`,
    max_tokens: 150
  };

  const response = await fetch(openaiEndpoint, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openaiApiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  });

  const data = await response.json();
  return data.choices[0]?.text || '';  // Returning the processed result.
}
