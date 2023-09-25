const recipeData = extractRecipeFromPage(); // pseudocode function
const ingredients = Array.from(document.querySelectorAll('.ingredient')).map(el => el.innerText);
chrome.runtime.sendMessage({recipe: ingredients.join('\n')}); // For debugging, you'll likely want to send this data somewhere later.