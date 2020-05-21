import React, { useState } from 'react';

function RecipeForm() {
    const [recipeState, setRecipeState] = useState({
        title: '',
        source: '',
        ingredients: [],
        steps: [],
        tags: []
    });

    const inputChange = e => {
        setRecipeState({ ...recipeState, [e.target.name]: e.target.value });
        console.log(recipeState)
    };

    //title input = string - text
    //ingredients input = arr
    //steps input = arr or string
    //tags input = checkbox?
    //source input = string - text

    return (
        <form>
            <label htmlFor="title">
                Title
                <input 
                    type="text" 
                    name="title" 
                    id="title"
                    placeholder="What's your recipe called?"
                    value={recipeState.title}
                    onChange={inputChange}
                />
            </label>
            <label htmlFor="ingredients">
                Ingredients
                <input
                    type="text"
                    name="ingredients"
                    id="ingredients"
                    placeholder="What do you need for your recipe?"
                    value={recipeState.ingredients}
                    onChange={inputChange}
                />
            </label>
            <button>Add Ingredient {/* on click, will add another text input for another ingredient */}</button>
            <label htmlFor="steps">
                Steps
                <input
                    type="text"
                    name="steps"
                    id="steps"
                    placeholder="How do you make the recipe?"
                    value={recipeState.steps}
                    onChange={inputChange}
                />
            </label>
            <button>Add Step {/* on click, will add another text input for another step*/}</button>
            <label>
                Categories
                <input
                    type="text"
                    name="tags"
                    id="tags"
                    placeholder="ex) chicken, vegetarian, etc..."
                    value={recipeState.tags}
                    onChange={inputChange}
                />
            </label>
            <button>Add Category {/* on click, will add another text input for another category*/}</button>
            <label htmlFor="source">
                Source
                <input
                    type="text"
                    name="source"
                    id="source"
                    placeholder="Where did you get your recipe?"
                    value={recipeState.source}
                    onChange={inputChange}
                />
            </label>
            <button>Add Recipe</button>
        </form>
    )
}

export default RecipeForm;