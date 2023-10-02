console.log("Content Script is running.");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "scrapeCurrentPage") {
        scrapePageContent();
    }
});

function scrapePageContent() {
    // Start by extracting the ingredients based on the class name '.ingredient'
    const ingredients = Array.from(document.querySelectorAll('.ingredient')).map(el => el.innerText);
    console.log('Extracted Ingredients:', ingredients);

    // Ensure that the ingredients list is not empty
    if (!ingredients.length) {
        console.warn('No ingredients found. Check the selector or the webpage structure.');
    }

    const otherRecipeDetails = extractRecipeFromPage();
    console.log('Extracted Recipe Details:', otherRecipeDetails);

    if (!otherRecipeDetails.method) {
        console.warn('No recipe method/details found. Check the extraction logic or the webpage structure.');
    }

    const fullRecipe = {
        ingredients: ingredients,
        details: otherRecipeDetails
    };

    console.log('Full Recipe Data:', fullRecipe);
    chrome.runtime.sendMessage({recipe: fullRecipe});
}

function extractRecipeFromPage() {
    let method = document.querySelector('.recipe-method')?.innerText || '';
    console.log('Extracted Method:', method);

    return {
        method: method
    };
}
