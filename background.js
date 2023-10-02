chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Received message in background:", message);
  if (message.recipe) {
    console.log("Sending recipe to OpenAI for processing:", message.recipe);
    processWithOpenAI(message.recipe).then((result) => {
      console.log("Processed result from OpenAI:", result); // Send the processed result to the popup (if needed)
      chrome.runtime.sendMessage({ processedRecipe: result });
    }).catch(error => {
      console.error("Error processing with OpenAI:", error);
    });
  }
});

async function processWithOpenAI(recipeData) {
  console.log("Starting request to OpenAI with data:", recipeData);
  const openaiEndpoint = 'https://api.openai.com/v1/engines/davinci/completions';
  const openaiApiKey = 'YOUR_OPENAI_API_KEY'; // This direct storage is not recommended due to security reasons.

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
  }).catch(error => {
    console.error("Fetch error:", error);
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0]?.text || ''; // Returning the processed result.
}
