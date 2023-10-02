// Start by extracting the ingredients based on the class name '.ingredient'
const ingredients = Array.from(document.querySelectorAll('.ingredient')).map(el => el.innerText);
console.log('Extracted Ingredients:', ingredients);  // Log the extracted ingredients

// You've also mentioned a pseudocode function 'extractRecipeFromPage', let's assume it extracts other details, perhaps the method or any notes.
const otherRecipeDetails = extractRecipeFromPage();
console.log('Extracted Recipe Details:', otherRecipeDetails);  // Log the extracted details

// Combine everything into one recipe object or string for clearer structure
const fullRecipe = {
    ingredients: ingredients,
    details: otherRecipeDetails
};

console.log('Full Recipe Data:', fullRecipe);  // Log the combined recipe data

// Send the extracted recipe data to the background script for further processing
chrome.runtime.sendMessage({recipe: fullRecipe});

// The pseudocode function 'extractRecipeFromPage' might look something like:
function extractRecipeFromPage() {
    // Here, you can add more specific extractions, e.g., method, notes, cooking time, etc.
    let method = document.querySelector('.recipe-method')?.innerText || '';
    // ... extract other details
    console.log('Extracted Method:', method);  // Log the extracted method

    return {
        method: method,
        // ... other extracted details
    };
}
