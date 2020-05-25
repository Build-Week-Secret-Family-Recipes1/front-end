import React from 'react';

import styled from 'styled-components';

const RecipeCard = styled.div`
    border: 1px solid purple;

    width: 40vw;
    margin: 10px;
`

function Recipe(props) {
    return (
        <RecipeCard>
            <h3>Title of Recipe</h3>
            <h5>Source of Recipe</h5>
            <p>Categories:</p>
            <p>Ingredients</p>
            <ul>
                <li>ingredients</li>
            </ul>
            <p>Instructions</p>
            <ol>
                <li>steps</li>
            </ol>
        </RecipeCard>
    )
}

export default Recipe;
