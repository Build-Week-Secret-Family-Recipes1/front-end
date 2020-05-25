import React from 'react';
import {Link} from 'react-router-dom'

function Home(props) {

    const recipes = [{title: '', ingredients: ''}] // temporary, in place of actual data to be used

    return (
        <div>
            <div className='header-wrapper'>
                <h1>Secret Family Recipes</h1>
                <Link to='/new'>New Recipe</Link>
            </div>
            <div>
                {
                  recipes.map( recipe => (
                      <div>
                          <h3 className="recipe" >{recipe.title}</h3>
                          <p className="recipe-intro">{recipe.ingredients}</p>
                      </div>
                  ))
                }
            </div>
        </div>
    )
}

export default Home;