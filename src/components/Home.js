import React, { useState } from 'react';

import RecipeForm from './RecipeForm';
import RecipeList from './RecipeList';
import EditRecipe from './EditRecipe';
import SearchBar from './SearchBar';

function Home(props) {
    const [recipes, setRecipes] = useState([]);

    console.log('props from Home.js: ', props); 
    /* 
      history: {length: 19, action: "POP", location: {…}, createHref: ƒ, push: ƒ, …}
      location: {pathname: "/", search: "", hash: "", state: undefined, key: "advg85"}
      match: {path: "/", url: "/", params: {…}, isExact: true}
      staticContext: undefined
    */
    

    /* const [recipeToEdit, setRecipeToEdit] = useState({
        id: null,
        title: '',
        source: '',
        ingredients: [],
        steps: [],
        tags: []
    });

    const editRecipe = r => {
      setRecipeToEdit(r);
    } */

    return (
        <div>
            <h1>Secret Family Recipes</h1>
            <div>
                <SearchBar recipes={recipes}/>
                <RecipeList {...props} recipes={recipes}/>
                <RecipeForm setRecipes={setRecipes}/>
                {/* <EditRecipe setRecipes={setRecipes}  recipes={recipes}/> */}
                {/*
                will show a list of recipes
                will have button to add a new recipe (will link to RecipeForm)
                */}
            </div>
        </div>
    )
}

export default Home;
