import React from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import axios from 'axios';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

const RecipeCard = styled.div`
    border: 2px solid #32CD32;
    border-radius: 3px;
    box-sizing: border-box;
    width: 575px;
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
    font-size: 1.1rem;
    border: none;
    border-radius: 5px;
    background-color: ${props => props.secondary ? '#FE9A76' : '#6AD856'};
    color: white;
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
                <Link to={`/edit/${props.id}`}>
                    <Button>Edit</Button>
                </Link>
                <Button secondary onClick={deleteRecipe}>Delete</Button>
            </ButtonContainer>
        </RecipeCard>
    )
}

export default Recipe;
