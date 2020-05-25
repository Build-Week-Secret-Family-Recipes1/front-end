import React from 'react';
import {Link} from 'react-router-dom'
import {testList as recipes} from '../tests/TestData'

function Home(props) {
console.log(recipes)
    return (
        <div>
            <div className='header-wrapper'>
                <h1>Secret Family Recipes</h1>
                <Link to='/new'>New Recipe</Link>
            </div>
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
                          <h3 className="recipe" >{recipe.title}</h3>
                          {recipes.source && <p className='sources'>{recipe.source}</p>}
                          <p className="recipe-intro">Ingredients</p>
                          {recipe.ingredients.map(ingredient => (
                              <div className='ingredient-container'>
                                 <p className='ingredient'>{ingredient}</p>
                              </div>
                          ))}
        {/* newStep: '',
        steps: [],
        newTag: '',
        tags: [] */}
                      </div>
                  ))
                }
            </div>
        </div>
    )
}

export default Home;