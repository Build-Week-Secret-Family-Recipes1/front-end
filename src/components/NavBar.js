import React from 'react';
import {Link} from 'react-router-dom';

export default function (){
    const nav = ['Home', 'Recipes', 'Add Recipe']

    return (
        <div className='nav'>
          {nav.map(navItem => {
            <Link to='/:id'>{'${navItem}'}</Link>
          })}
        </div>
    )
}