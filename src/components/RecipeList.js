import React, {useEffect, useState} from 'react';
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
              console.log('setRecipeToEdit from RecipeList', props.editRecipe)
              return (
                <Recipe
                  {...props}
                  editRecipe={props.editRecipe}
                  id={object.id}
                  title={object.title}
                  source={object.source}
                  ingredients={object.ingredients}
                  steps={object.steps}
                  tags={object.tags}
                />
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
