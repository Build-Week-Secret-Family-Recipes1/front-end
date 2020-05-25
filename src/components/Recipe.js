import React from 'react';

import styled from 'styled-components';

const RecipeCard = styled.div`
    border: 1px solid purple;

    box-sizing: border-box;
    width: 40vw;
    margin: 10px;
    padding: 20px;
    text-align: left;
`

const StyledH3 = styled.h3`
    font-size: 2rem;
`

const StyledH5 = styled.h5`
    font-size: 1.1rem;
    font-style: italic;
`
const Step = styled.li`
    width: 95%;
`


function Recipe(props) {
    return (
        <RecipeCard>
            <StyledH3>Title of Recipe</StyledH3>
            <StyledH5>Source of Recipe</StyledH5>
            <p>Categories:</p>
            <p>Ingredients</p>
            <ul>
                {/* Map over ingredients from props */}
                <li>ingredients</li>
                <li>ingredients</li>
                <li>ingredients</li>
                <li>ingredients</li>
                <li>ingredients</li>
                <li>ingredients</li>
                <li>ingredients</li>
                <li>ingredients</li>
                <li>ingredients</li>
                <li>ingredients</li>
                <li>ingredients</li>
            </ul>
            <p>Instructions</p>
            <ol>
                {/* Map over steps from props */}
                <Step>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tristique euismod est, eget suscipit est venenatis sed. Pellentesque sit amet ante eget tortor tincidunt vehicula nec nec nisi.</Step>
                <Step>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu enim in sem congue iaculis. Pellentesque tristique euismod est, eget suscipit est venenatis sed.</Step>
                <Step>Consectetur adipiscing elit. Aenean eu enim in sem congue iaculis. Pellentesque tristique euismod est, eget suscipit est venenatis sed. Pellentesque sit amet ante eget tortor tincidunt vehicula nec nec nisi.</Step>
                <Step>Aenean eu enim in sem congue iaculis. Pellentesque sit amet ante eget tortor tincidunt vehicula nec nec nisi.</Step>
                <Step>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque tristique euismod est, eget suscipit est venenatis sed. Pellentesque sit amet ante eget tortor tincidunt vehicula nec nec nisi.</Step>
                <Step>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu enim in sem congue iaculis. Pellentesque tristique euismod est, eget suscipit est venenatis sed. Pellentesque sit amet ante eget tortor tincidunt vehicula nec nec nisi.</Step>
                <Step>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Step>
            </ol>
        </RecipeCard>
    )
}

export default Recipe;
