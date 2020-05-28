import React from 'react';
import {Link, useParams} from 'react-router-dom';

export default function (){
    const nav = ['Home', 'Recipes', 'Add Recipe']
    const {id} = useParams();
    return (
        <div className='nav'>
          {nav.map(navItem => {
              <nav key={id}><Link to='/:id'>{'${navItem}'}</Link></nav>
              console.log('params: ', params.id)
          })}
        </div>
    )
}