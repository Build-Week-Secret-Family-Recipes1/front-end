import React from 'react';

export default function Ingredients(props){
    const {ingredients} = props;

    return (
        <div style={{
            color: 'violet'
        }}className='ingredient-container'>
            <p className="recipe-intro" 
                style={{
                    color: 'yellow',
                    borderBottom: '1px dashed pink',
                    paddingBottom: '10px',
                }}>
                Ingredients
            </p>
            {ingredients.map(ingredient => (
                <p className='ingredient'>
                     {ingredient}
                </p>
            )
        )}
        </div>
    )
}