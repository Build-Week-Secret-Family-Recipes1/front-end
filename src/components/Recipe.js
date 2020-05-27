import React from 'react';
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

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
`

const Button = styled.button`
    display: inline-block;
    padding: 10px;
    margin: 20px;
    width: 9rem;
    border-radius: 3px;
    border: ${props => props.secondary ? '2px solid firebrick' : '2px solid #55917F'};
    background-color: ${props => props.secondary ? 'lightcoral' : 'rgba(64, 224, 208, 0.5)'};
    font-size: 1.1rem;
    font-family: Gill Sans;
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
            <ButtonContainer>
                <Button onClick={getRecipe}>Edit</Button>
                <Button secondary onClick={deleteRecipe}>Delete</Button>
            </ButtonContainer>
        </RecipeCard>
    )
}

export default Recipe;
