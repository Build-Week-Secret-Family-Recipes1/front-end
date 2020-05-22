import React, { useState } from 'react';

function RecipeForm() {
    const [recipeState, setRecipeState] = useState({
        id: null,
        title: '',
        source: '',
        newIngredient: '',
        ingredients: [],
        newStep: '',
        steps: [],
        newTag: '',
        tags: []
    });

    const inputChange = e => {
        setRecipeState({ ...recipeState, [e.target.name]: e.target.value });
        console.log(recipeState);  
    };

    const addIngredient = e => {
        e.preventDefault();
        setRecipeState({...recipeState, ingredients: recipeState.ingredients.concat(recipeState.newIngredient), newIngredient: ''});
        console.log('recipeState:', recipeState);
    }

    const addStep = e => {
        e.preventDefault();
        setRecipeState({...recipeState, steps: recipeState.steps.concat(recipeState.newStep), newStep: ''});
        console.log('recipeState:', recipeState);
    }

    const addTag = e => {
        e.preventDefault();
        setRecipeState({...recipeState, tags: recipeState.tags.concat(recipeState.newTag), newTag: ''});
        console.log('recipeState:', recipeState);
    }

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
            <label htmlFor="newIngredient">
                Ingredient
                <input
                    type="text"
                    name="newIngredient"
                    id="newIngredient"
                    placeholder="What do you need for your recipe?"
                    value={recipeState.newIngredient}
                    onChange={inputChange}
                />
            </label>
            <button onClick={addIngredient}>Add Ingredient</button>
            {/* 
                --above, add inputs for number, unit, and ingredient (ex - 2.5 tsp curry powder)
                    --number input could be text or number type - text allows for fractions more easily
                    --unit input could be text or dropdown - dropdown must allow for no unit
                <button>Add Ingredient</button>   on click, it will the input to ingredient state (array)
                <ul>
                    will map over ingredient state and add a new li element for each item in array
                    will render each ingredient to the page underneath the ingredient input form
                    <li></li>
                </ul>
            */}
            <label htmlFor="newStep">
                Steps
                <input
                    type="text"
                    name="newStep"
                    id="newStep"
                    placeholder="How do you make the recipe?"
                    value={recipeState.newStep}
                    onChange={inputChange}
                />
            </label>
            <button onClick={addStep}>Add Step</button>
            <label htmlFor="newTag">
                Categories
                <input
                    type="text"
                    name="newTag"
                    id="newTag"
                    placeholder="ex) chicken, vegetarian, etc..."
                    value={recipeState.newTag}
                    onChange={inputChange}
                />
            </label>
            <button onClick={addTag}>Add Category</button>
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