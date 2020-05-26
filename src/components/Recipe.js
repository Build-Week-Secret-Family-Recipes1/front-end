import React from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import axios from 'axios';

function Recipe(props) {
    const deleteRecipe = props => {
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
        <div>
            <h3>{props.title}</h3>
            <h5>{props.source}</h5>
            <p>Categories:</p>
            <p>Ingredients</p>
            <ul>
                {props.ingredients.map(ingredient => {
                    return (
                        <li>{ingredient}</li>
                    )
                })}
                <li>ingredients</li>
            </ul>
            <p>Instructions</p>
            <ol>
                {props.steps.map(step => {
                    return (
                        <li>{step}</li>
                    )
                })}
            </ol>
            <button >Edit</button>
            <button onClick={deleteRecipe}>Delete</button>
        </div>
    )
}

export default Recipe;
