import React, {useEffect, useState} from 'react';
import { getList} from "../actions";
import { connect } from "react-redux";

function RecipeList({ getList, isFetching, error, list}) {

  useEffect(()=>{
    getList();
  },[getList]);

  useEffect(()=>{
    console.log(list);
  },[list]);

    if (isFetching) {
      return (<p>Fetching your Recipes</p>);
    } else {
      return (
          <div className="recipe-list-wrapper">
            {list.map(recipe=>{
              return <p>{recipe.title}</p>
            })}
              {/*
                  will map over data and add a recipe card for each recipe
                  each recipe card will show the title, source, and tags
                  will link to full recipe
              */}
          </div>
      )
    }
}

// hook up the connect to our store
const mapStateToProps = state => {
  return {
    list: state.list,
    isFetching: state.isFetching,
    error: state.error,
  };
};

export default connect(
  mapStateToProps,
  { getList }
)(RecipeList);
