import React from 'react';
import {Link} from 'react-router-dom';

export default function (){
    const home = {path: '/', name: 'Home'};
    const recipes = {path: '/recipes', name: 'Recipes'};
    const form = {path: '/new', name: 'Add New Recipe'};
    const nav = [home, recipes, form];

    return (
        <div className='fEKTmX' 
        style={{
            backgroundColor: 'rgba(106,216,86,0.9)',
            borderRadius: '0',
            display: 'flex',
            flexDirection: "row",
            justifyContent: 'space-around',
            padding: '0',
            margin: '0',
        }}
        >
          {nav.map(navItem => (
              <nav style={{
                      backgroundColor: 'rgba(106,216,86,0.9)',
                      color: 'lightgreen',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-end'
                  }}>
                  <Link to={`${navItem.path}`}><button style={{
                      border: '.5px solid white',
                      backgroundColor: 'rgba(111, 211, 86, 0.9)',
                      color: 'white',
                      height: '3.5rem',
                      margin: '1rem'
                  }}>{`${navItem.name}`}</button></Link>
              </nav>
              
          ))}
        </div>
    )
}