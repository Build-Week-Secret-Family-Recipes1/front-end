import React, { useState } from 'react';

import RecipeForm from './RecipeForm';
import RecipeList from './RecipeList';
import EditRecipe from './EditRecipe';

function Home(props) {
    const [recipes, setRecipes] = useState([]);

    const [recipeToEdit, setRecipeToEdit] = useState({
        id: null,
        title: '',
        source: '',
        ingredients: [],
        steps: [],
        tags: []
    });

    const editRecipe = r => {
      setRecipeToEdit(r);
    }

    return (
        <div>
            <h1>Secret Family Recipes</h1>
            <div>
                <RecipeList {...props} recipes={recipes} editRecipe={editRecipe}/>
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
