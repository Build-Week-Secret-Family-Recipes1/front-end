<<<<<<< HEAD
import React from 'react';
import {Link} from 'react-router-dom'
=======
import React, { useState } from 'react';

import RecipeForm from './RecipeForm';
import RecipeList from './RecipeList';
>>>>>>> master

function Home() {
    const [recipes, setRecipes] = useState([]);

    return (
        <div>
            <div>
<<<<<<< HEAD
               <h1>Secret Family Recipes</h1>
               <Link to='/new' value='Add Recipe' />
            </div>
            
            <div>
                {
                  recipes.map( recipe => (
                      <div>
                          <h3 className="recipe" >{recipe}</h3>
                          <p className="recipe-intro">Ingredients</p>
                      </div>
                  ))
                }
=======
                <RecipeList recipes={recipes}/>
                <RecipeForm setRecipes={setRecipes}/>
                {/*
                will show a list of recipes
                will have button to add a new recipe (will link to RecipeForm)
                */}
>>>>>>> master
            </div>
        </div>
    )
}

export default Home;