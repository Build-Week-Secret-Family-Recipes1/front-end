import React from 'react';
import {Link} from 'react-router-dom'

function Home() {
    return (
        <div>
            <div>
               <h1>Secret Family Recipes</h1>
               <Link to='/new' value='Add Recipe' />
            </div>
            
            <div>
                {
                  recipes.map( recipe => (
                      <div>
                          <h3 className="recipe" >{recipe}</h3>
                          <p className="recipe-intro">Ingredients</p>
                      </div>
                  ))
                }
            </div>
        </div>
    )
}

export default Home;