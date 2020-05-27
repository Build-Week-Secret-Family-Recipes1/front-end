import React from 'react';
import {Link} from 'react-router-dom';
import Ingredients from './Ingredients'

export default function RecipeMap(props){

    const {recipes} = props;

    return (
          
    <div style={{
        border: '2px solid gray',
        backgroundColor: 'blue',
        display: 'flex',
        flexDirection: 'column'
    }}>
        {
          recipes.map( recipe => (
            <div key={recipe.id} style={{
                border: '2px solid black',
                display: 'flex',
                flexDirection: 'column'
            }}>
        <h3>
            <Link to='/home/:params' className="recipe" style={{
            color: 'white',
            borderTop: 'solid black',
            borderBottom: 'solid black'
        }}>
            {recipe.title}
            </Link>
            </h3>
        {recipes.source && <p className='sources'>{recipe.source}</p>}
        
            <Ingredients ingredients={recipe.ingredients}/>
        ))}
    </div>
                     
          ))
        }
    </div>
 
    )
}