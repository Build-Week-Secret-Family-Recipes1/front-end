import React, { useState } from 'react';

import RecipeForm from './RecipeForm';
import RecipeList from './RecipeList';
import EditRecipe from './EditRecipe';

function Home() {
    const [recipes, setRecipes] = useState([]);

    const [recipeToEdit, setRecipeToEdit] = useState({});

    return (
        <div>
            <h1>Secret Family Recipes</h1>
            <div>
                <RecipeList recipes={recipes} setRecipeToEdit={setRecipeToEdit}/>
                <RecipeForm setRecipes={setRecipes}/>
                <EditRecipe recipeToEdit={recipeToEdit}/>
                {/*
                will show a list of recipes
                will have button to add a new recipe (will link to RecipeForm)
                */}
            </div>
        </div>
    )
}

export default Home;