import React, { useState } from 'react';
import styled from 'styled-components';
import RecipeForm from './RecipeForm';
import RecipeList from './RecipeList';
import EditRecipe from './EditRecipe';
import SearchBar from './SearchBar';

const Div = styled.div`
    width: 100%;
`

const H1 = styled.h1`
    color: white;
    font-size: 2.8rem;
    font-weight: bold;
    padding: 70px;
    margin: 0;
    border-bottom: 2px solid #00CC00;
    background-color: rgba(106, 216, 86, 0.9);
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
        <Div>
            <H1>Secret Family Recipes</H1>
            <div>
                {/* <SearchBar recipes={recipes}/> */}
                <RecipeList {...props} />
                {/* <RecipeForm setRecipes={setRecipes}/>
                <EditRecipe setRecipes={setRecipes}/> */}
                {/*
                will show a list of recipes
                will have button to add a new recipe (will link to RecipeForm)
                */}
            </div>
        </Div>
    )
}

export default Home;
