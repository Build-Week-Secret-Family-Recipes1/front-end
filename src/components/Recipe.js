import React from 'react';

import styled from 'styled-components';

const RecipeCard = styled.div`
    border: 1px solid purple;

    width: 40vw;
    margin: 10px;
`

const StyledH3 = styled.h3`
    font-size: 2rem;
`

const StyledH5 = styled.h5`
    font-size: 1.1rem;
    
`



function Recipe(props) {
    return (
        <RecipeCard>
            <StyledH3>Title of Recipe</StyledH3>
            <StyledH5>Source of Recipe</StyledH5>
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
