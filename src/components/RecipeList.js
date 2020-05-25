import React, {useEffect} from 'react';
import { getList} from "../actions";
import { connect } from "react-redux";

import Recipe from './Recipe';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

function RecipeList({ getList, isFetching, error, list}) {
  useEffect(()=>{
    getList();
  },[getList]);

  useEffect(()=>{
    console.log(list);
  },[list]);

    return (
        <Wrapper className="recipe-list-wrapper">
          <Recipe/>
          <Recipe/>
          <Recipe/>
          <Recipe/>
          {/*
              will map over data and add a recipe card for each recipe
              each recipe card will show the title, source, and tags
              will link to full recipe
          */}
        </Wrapper>
    )
}

// hook up the connect to our store
const mapStateToProps = state => {
  return {
    list: state.list,
    isFetching: state.isFetching,
    error: state.error
  };
};

export default connect(
  mapStateToProps,
  { getList }
)(RecipeList);
