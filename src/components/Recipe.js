import React from 'react';

function Recipe(props) {
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
        </div>
    )
}

export default Recipe;
