import React, { useState } from 'react';

function RecipeForm() {
    const [recipeState, setRecipeState] = useState({
        title: '',
        source: '',
        ingredients: [],
        steps: [],
        tags: []
    });

    const [ingredientState, setIngredientState] = useState({
        amount: '',
        unit: '',
        ingredient: ''
    })

    //state for ingredients?
    //state for steps?
    //state for tags?

    const inputChange = e => {
        setRecipeState({ ...recipeState, [e.target.name]: e.target.value });
        console.log(recipeState);
        console.log(ingredientState);
    };

    const inputIngredientChange = e => {
        setIngredientState({ ...ingredientState, [e.target.name]: e.target.value });
    };

    const addIngredient = e => {
        e.preventDefault();
        console.log('Ingredient added!');
        const newIngredient = `${ingredientState.amount} ${ingredientState.unit} ${ingredientState.ingredient}`;
        setRecipeState([...recipeState.ingredients, newIngredient]);
        setIngredientState({
            amount: '',
            unit: '',
            ingredient: ''
        });
        console.log(newIngredient)
        console.log("Hello, from the end of addIngredient")
    }

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
            <label htmlFor="amount">
                Amount
                <input
                    type="text"
                    name="amount"
                    id="amount"
                    value={ingredientState.amount}
                    onChange={inputIngredientChange}
                />
            </label>
            <label htmlFor="unit">
                Unit
                <input
                    type="text"
                    name="unit"
                    id="unit"
                    value={ingredientState.unit}
                    onChange={inputIngredientChange}
                />
            </label>
            <label htmlFor="ingredient">
                Ingredient
                <input
                    type="text"
                    name="ingredient"
                    id="ingredient"
                    placeholder="What do you need for your recipe?"
                    value={ingredientState.ingredient}
                    onChange={inputIngredientChange}
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