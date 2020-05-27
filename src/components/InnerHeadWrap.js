import React from 'react';
import {Link} from 'react-router-dom';

export default function InnerHead(){

    return (
        <div className='header-wrapper'>
        <h1>Secret Family Recipes</h1>
        <Link to='/new'>New Recipe</Link>
    </div>
    )
}