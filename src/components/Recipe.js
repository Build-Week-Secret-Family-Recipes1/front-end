import React from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {testList as Recipes} from '../tests/TestData';
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

    return (
        <div className='recipe-card-container'>
            
        {Recipes.map(recipes => 
            (
        <RecipeCard>
            <H3>{recipes.title}</H3>
            <H5>{recipes.source}</H5>
            <p>Categories:</p>
            <p>Ingredients</p>
            <ul>
                {recipes.ingredients.map(ingredient => {
                    return (
                        <li>{ingredient}</li>
                    )
                })}
            </ul>
            <p>Instructions</p>
            <ol>
                {recipes.steps.map(step => {
                    return (
                        <Step>{step}</Step>
                    )
                })}
            </ol>
            <Link to={`/edit/${recipes.id}`}>
                <button>Edit</button>
            </Link>
            <button onClick={deleteRecipe}>Delete</button>
        </RecipeCard>
        )
        )}
        </div>
    )
}

export default Recipe;
