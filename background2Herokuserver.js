//3. Modify Your Extension:
//Update your background.js to make requests to your new server instead of directly to OpenAI:

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.recipe) {
        processWithServer(message.recipe).then((result) => {
            chrome.runtime.sendMessage({processedRecipe: result});
        });
    }
});

async function processWithServer(recipeData) {
    const serverEndpoint = 'https://your-heroku-app-name.herokuapp.com/process-recipe';
    
    const response = await fetch(serverEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({recipe: recipeData})
    });

    const data = await response.json();
    return data.processedRecipe;
}
