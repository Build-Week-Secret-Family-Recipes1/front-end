import React, {useState, useEffect} from 'react';
import { deleteRecipe, getRecipe } from "../actions";
import { connect } from "react-redux";
import { Link, useParams, Redirect } from 'react-router-dom';

import styled from 'styled-components';

const RecipeCard = styled.div`
    border: 2px solid #32CD32;
    border-radius: 3px;
    box-sizing: border-box;
    width: 575px;
    margin: 10px;
    padding: 20px;
    text-align: left;
`

const H3 = styled.h3`
    font-size: 2rem;
`

const H5 = styled.h5`
    font-size: 1.1rem;
    font-style: italic;
`

const Li = styled.li`
    width: 95%;
    line-height: 1.5;
`

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
`

const Button = styled.button`
    display: inline-block;
    padding: 10px;
    margin: 20px;
    width: 9rem;
    font-size: 1.1rem;
    border: none;
    border-radius: 5px;
    background-color: ${props => props.secondary ? '#FE9A76' : '#6AD856'};
    color: white;
`


function Recipe(props) {
    const [recipeState, setRecipeState] = useState(props.recipe || {
      id: null,
      user_id: null,
      title: 'AAA',
    	source: '',
    	ingredients: [],
    	steps: [],
    	tags: []
    });
    const [toDelete, setToDelete] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const {id} = useParams();

    useEffect(()=>{
      if (props.recipe) {
        setRecipeState(props.recipe)
      }
    },[props.recipe]);

    useEffect(()=>{
      if (props.recipeFromProps) {
        setRecipeState(props.recipeFromProps)
      }
    },[props.recipeFromProps]);

    useEffect(()=>{
      if (parseInt(id)>=0) {
        props.getRecipe(parseInt(id));
      }
    },[id, props.getRecipe]);

    const deleteMe = (e) => {
      e.preventDefault();
      setToDelete(true);
      props.deleteRecipe(recipeState.id);
    }

    useEffect(()=>{
      if (toDelete && !props.isPosting && props.resStatus!==null) {
        setRedirect("/");
      }
    },[toDelete, props.isPosting, props.resStatus]);


    console.log('recipeState in Recipe.js: ', recipeState)
    console.log('...')
    console.log('recipeState ingredients in Recipe.js: ', recipeState.ingredients)
    
    if (redirect) {
      return (<Redirect to={redirect} />);
    } else if (props.isPosting) {
      return (<p>Please wait...</p>);
    } else {
      return (
          <RecipeCard>
              <H3>{recipeState.title}</H3>
              <H5>{recipeState.source}</H5>
              <p>Categories:</p>
              <p>Ingredients</p>
              <ul>
                  {recipeState.ingredients.map(ingredient => {
                      return (
                          <li key={`${ingredient+Date.now()}`}>{ingredient}</li>
                      )
                  })}
              </ul>
              <p>Instructions</p>
              <ol>
                  {recipeState.steps.map(step => {
                      return (
                          <Li key={`${step+Date.now()}`}>{step}</Li>
                      )
                  })}
              </ol>
              <ButtonContainer>
                  <Link to={`/edit/${recipeState.id}`}>
                      <Button>Edit</Button>
                  </Link>
                  <Button secondary onClick={deleteMe}>Delete</Button>
                  {props.error!==''?<p>{props.error}</p>:<></>}
              </ButtonContainer>
          </RecipeCard>
      )
    }
}

// hook up the connect to our store
const mapStateToProps = state => {
  return {
    recipe: state.recipe,
    isFetching: state.isFetching,
    isPosting: state.isPosting,
    error: state.error,
    resStatus: state.resStatus
  };
};

export default connect(
  mapStateToProps,
  { deleteRecipe, getRecipe }
)(Recipe);
