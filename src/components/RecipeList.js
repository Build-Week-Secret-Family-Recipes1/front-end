import React, {useEffect, useState} from 'react';
import {Route, Link, useParams} from 'react-router-dom';
import { getList} from "../actions";
import { connect } from "react-redux";
import { testList } from '../tests/TestData';
import Recipe from './Recipe';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

function RecipeList(props) {
  let id = useParams();
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

            {props.list.map((object) => {
              console.log('setRecipeToEdit from RecipeList', object.editRecipe)
              return (
                <Route path='/recipes/:id'>
                  <Recipe />
                </Route>
              )
            })}
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
