import React from 'react';
import {Link} from 'react-router-dom';

export default function (){
    const home = {path: '/', name: 'Home'};
    const recipes = {path: '/recipes', name: 'Recipes'};
    const form = {path: '/new', name: 'Add New Recipe'};
    const nav = [home, recipes, form];

    return (
        <div className='nav-container'>
          {nav.map(navItem => (
              <nav>
                  <Link to={`${navItem.path}`}><button>{`${navItem.name}`}</button></Link>
              </nav>
              
          ))}
        </div>
    )
}