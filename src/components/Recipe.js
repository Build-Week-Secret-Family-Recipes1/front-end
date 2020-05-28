import React from 'react';
import {Route} from 'react-router-dom'
import { axiosWithAuth } from '../utils/axiosWithAuth';
import axios from 'axios';

import styled from 'styled-components';

const RecipeCard = styled.div`
    background-color: rgba(255, 226, 209, 0.3);

    border: 2px solid #55917F;
    border-radius: 3px;

    color: #5e4c5a;

    box-sizing: border-box;
    width: 40vw;
    margin: 10px;
    padding: 20px;
    text-align: left;
`

const H3 = styled.h3`
    font-size: 2rem;
`

const H5 = styled.h5`
    font-size: 1.1rem;
    font-style: italic;
`
const Step = styled.li`
    width: 95%;
`


function Recipe(props) {
    const deleteRecipe = () => {
        const recipeId = props.id;
        axios.delete(`api-url/${recipeId}`)
            .then(response => {
                console.log('Deleted!')
            })
            .catch(error => {
                console.log(error)
            })
    }

    const getRecipe = () => {
        const recipe = {
            id: props.id,
            title: props.title,
            source: props.source,
            ingredients: props.ingredients,
            steps: props.steps,
            tags: props.tags
        };
        console.log('setRecipeToEdit from Recipe', props.editRecipe);
        console.log('Recipe props', props);
        console.log(recipe)
        props.editRecipe(recipe);
    }

    return (
        <Route path='/recipes/:id'>

        <RecipeCard>
            <H3>{props.title}</H3>
            <H5>{props.source}</H5>
            <p>Categories:</p>
            <p>Ingredients</p>
            <ul>
                {props.ingredients.map(ingredient => {
                    return (
                        <li>{ingredient}</li>
                    )
                })}
            </ul>
            <p>Instructions</p>
            <ol>
                {props.steps.map(step => {
                    return (
                        <Step>{step}</Step>
                    )
                })}
            </ol>
            <button onClick={getRecipe}>Edit</button>
            <button onClick={deleteRecipe}>Delete</button>
        </RecipeCard>
        </Route>
)
}

export default Recipe;
