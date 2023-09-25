const recipeData = extractRecipeFromPage(); // pseudocode function
chrome.runtime.sendMessage({recipe: recipeData});
