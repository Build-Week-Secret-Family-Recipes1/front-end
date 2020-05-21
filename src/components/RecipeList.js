import React, {useEffect} from 'react';
import { getList} from "../actions";
import { connect } from "react-redux";

function RecipeList({ getList, isFetching, error, list}) {
  useEffect(()=>{
    getList();
  },[getList]);

    return (
        <div className="recipe-list-wrapper">
            {/*
                will map over data and add a recipe card for each recipe
                each recipe card will show the title, source, and tags
                will link to full recipe
            */}
        </div>
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
