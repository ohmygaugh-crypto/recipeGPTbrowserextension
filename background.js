console.log("Background script is running.");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Received message in background:", message);

  if (message.action === 'entirePageContent') {
    console.log("Received request to process entire page content.");
    const pageContent = message.content;

    // Process the page content with OpenAI
    processWithOpenAI(pageContent)
      .then((result) => {
        console.log("Processed result from OpenAI:", result);
        // Send the processed result to the popup
        chrome.runtime.sendMessage({ processedRecipe: result });
      })
      .catch(error => {
        console.error("Error processing with OpenAI:", error);
      });
  }
});

async function processWithOpenAI(recipeData) {
  console.log("Starting request to OpenAI with data:", recipeData);
  const openaiEndpoint = 'https://api.openai.com/v1/engines/davinci/completions';

  // Retrieve OpenAI API key from local storage
  const openaiApiKey = await getOpenAiApiKey();
  
  if (!openaiApiKey) {
    console.error("OpenAI API key not set.");
    return;
  }

  const requestBody = {
    prompt: `Given the following webpage content, extract and summarize the main cooking recipe:

${recipeData}

End of content. Please provide a clear and concise recipe summary stating just the ingredients and cooking instructions.`,
    max_tokens: 500  // Adjust max tokens based on expected response length
  };

  let response;
  try {
    response = await fetch(openaiEndpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }

  if (!response.ok) {
    console.error("Error response from OpenAI:", response.statusText);
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0]?.text || ''; // Returning the processed result.
}

function getOpenAiApiKey() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(['openai_key'], function(result) {
      if (result.openai_key) {
        resolve(result.openai_key);
      } else {
        reject("API Key not found");
      }
    });
  });
}
