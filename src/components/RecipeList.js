import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import { getList} from "../actions";
import { connect } from "react-redux";
import { testList } from '../tests/TestData';
import Recipe from './Recipe';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 50px 0;
`

const Button = styled.button`
    display: inline-block;
    padding: 10px;
    margin: 20px;
    width: 9rem;
    font-size: 1.1rem;
    border: none;
    border-radius: 5px;
    background-color: #6AD856;
    color: white;
`

function RecipeList(props) {
  useEffect(()=>{
    props.getList();
  },[props.getList]);

  useEffect(()=>{
    console.log(props.list);
  },[props.list]);

    if (props.isFetching) {
      return (<p>Fetching your Recipes</p>);
    } else {
      return (
          <Wrapper className="recipe-list-wrapper">

            {props.list.map(recipe => {
              return (
                <Recipe
                  {...props}
                  recipeFromProps={recipe}
                  key={recipe.id}
                />
              )
            })}
             <Link to='/new'><Button>New Recipe</Button></Link>

              {/*
                  will map over data and add a recipe card for each recipe
                  each recipe card will show the title, source, and tags
                  will link to full recipe
              */}


             {props.error!==''?<p>{props.error}</p>:<></>}
            </Wrapper>
      )

    }
}

// hook up the connect to our store
const mapStateToProps = state => {
  return {
    list: state.list,
    isFetching: state.isFetching,
    error: state.error,
    resStatus: state.resStatus,
  };
};

export default connect(
  mapStateToProps,
  { getList }
)(RecipeList);
