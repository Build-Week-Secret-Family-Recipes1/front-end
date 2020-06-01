import React from 'react';
<<<<<<< HEAD
import {Link} from 'react-router-dom';
=======
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
>>>>>>> master

export default function (){
    const home = {path: '/', name: 'Home'};
    const recipes = {path: '/recipes', name: 'Recipes'};
    const form = {path: '/new', name: 'Add New Recipe'};
    const nav = [home, recipes, form];

    return (
<<<<<<< HEAD
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
              <nav >
                  <Link to={`${navItem.path}`}><button style={{
                      border: '.5px solid white',
                      backgroundColor: 'rgba(111, 211, 86, 0.9)',
                      color: 'white',
                      height: '3.5rem',
                      margin: '1rem'
                  }}>{`${navItem.name}`}</button></Link>
=======
        <NavBar className='nav-container'>
          {nav.map(navItem => (
              <nav>
                  <Link to={`${navItem.path}`}><Button>{`${navItem.name}`}</Button></Link>
>>>>>>> master
              </nav>
              
          ))}
        </NavBar>
    )
}