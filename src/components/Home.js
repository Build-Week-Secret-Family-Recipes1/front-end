import React, { useState } from 'react';

import RecipeForm from './RecipeForm';
import RecipeList from './RecipeList';

function Home() {
    const [recipes, setRecipes] = useState([]);

    return (
        <div>
            <h1>Secret Family Recipes</h1>
            <div>
                <RecipeForm setRecipes={setRecipes}/>
                <RecipeList recipes={recipes}/>
                {/*
                will show a list of recipes
                will have button to add a new recipe (will link to RecipeForm)
                */}
            </div>
        </div>
    )
}

export default Home;