import React from 'react';
import {Link, useParams} from 'react-router-dom';
import styled from 'styled-components';

const NavBar = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background-color: rgba(0, 204, 0, 0.7);

`

const Button = styled.button`
    padding: 10px;
    margin: 20px;
    font-size: 1.2rem;
    border: none;
    border-radius: 5px;
    background-color: transparent;
    color: white;

    &:hover {
        background-color: #6AD856;
    }
`

export default function (){
    const home = {path: '/', name: 'Home'};
    const recipes = {path: '/recipes', name: 'Recipes'};
    const form = {path: '/new', name: 'Add New Recipe'};
    const nav = [home, recipes, form];
    const {id} = useParams();

    return (
        <NavBar className='nav-container'>
          {nav.map(navItem => (
              <nav>
                  <Link to={`${navItem.path}`}><Button>{`${navItem.name}`}</Button></Link>
              </nav>
              
          ))}
        </NavBar>
    )
}