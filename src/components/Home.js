import React, { useState } from 'react';
import styled from 'styled-components';
import RecipeForm from './RecipeForm';
import RecipeList from './RecipeList';
import EditRecipe from './EditRecipe';
import SearchBar from './SearchBar';

const H1 = styled.h1`
    color: #5e4c5a;
    font-size: 2.7rem;
    padding: 70px;
    margin: 0;
    border-bottom: 2px solid #55917F;
    background-color: rgba(64, 224, 208, 0.5);
`

function Home(props) {
    const [recipes, setRecipes] = useState([]);

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
            <H1>Secret Family Recipes</H1>
            <div>
                <SearchBar recipes={recipes}/>
                <RecipeList {...props} recipes={recipes}/>
                <RecipeForm setRecipes={setRecipes}/>
                <EditRecipe setRecipes={setRecipes}/>
                {/*
                will show a list of recipes
                will have button to add a new recipe (will link to RecipeForm)
                */}
            </div>
        </div>
    )
}

export default Home;
