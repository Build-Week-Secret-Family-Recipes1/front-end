import React from 'react';
import {Link, useParams} from 'react-router-dom'
import {testList as recipes} from '../tests/TestData'
import Inner from './Inner'

function Home(props) {
    const {params} = useParams();
console.log(recipes)
    return (
        <div>
           <Inner recipes={recipes}/>
        </div>
    )
}

export default Home;