import React from 'react';

function Home() {
    return (
        <div>
            <h1>Secret Family Recipes</h1>
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