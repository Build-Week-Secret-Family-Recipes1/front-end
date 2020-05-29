import React, {useState, useEffect} from 'react';
import { deleteRecipe, getRecipe } from "../actions";
import { connect } from "react-redux";
import { Link, useParams, Redirect } from 'react-router-dom';

import styled from 'styled-components';

const RecipeCard = styled.div`
    background-color: rgba(255, 226, 209, 0.3);
    border: 2px solid #55917F;
    border-radius: 3px;
    color: #5e4c5a;
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
const Step = styled.li`
    width: 95%;
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
    border-radius: 3px;
    border: ${props => props.secondary ? '2px solid firebrick' : '2px solid #55917F'};
    background-color: ${props => props.secondary ? 'lightcoral' : 'rgba(64, 224, 208, 0.5)'};
    font-size: 1.1rem;
    font-family: Gill Sans;
`


function Recipe(props) {
    const [recipe, setRecipe] = useState({
      id: props.id || null,
      user_id: props.user_id || null,
      title: props.title || '',
    	source: props.source || '',
    	ingredients: props.ingredients || [],
    	steps: props.steps || [],
    	tags: props.tags || []
    });
    const [toDelete,setToDelete] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const params = useParams();

    useEffect(()=>{
      if (props.recipe && props.id===null) {
        setRecipe(props.recipe);
      }
    },[props.recipe]);

    useEffect(()=>{
      if (params.id) {
        props.getRecipe(parseInt(params.id));
      }
    },[params.id]);

    const deleteMe = (e) => {
      e.preventDefault();
      setToDelete(true);
      props.deleteRecipe(recipe.id);
    }

    useEffect(()=>{
      if (toDelete && !props.isPosting && props.resStatus!==null) {
        setRedirect("/");
      }
    },[toDelete, props.isPosting, props.resStatus]);

    if (redirect) {
      return (<Redirect to={redirect} />);
    } else if (props.isPosting) {
      return (<p>Please wait...</p>);
    } else {
      return (
          <RecipeCard>
              <H3>{recipe.title}</H3>
              <H5>{recipe.source}</H5>
              <p>Categories:</p>
              <p>Ingredients</p>
              <ul>
                  {recipe.ingredients.map(ingredient => {
                      return (
                          <li>{ingredient}</li>
                      )
                  })}
              </ul>
              <p>Instructions</p>
              <ol>
                  {recipe.steps.map(step => {
                      return (
                          <Step>{step}</Step>
                      )
                  })}
              </ol>
              <ButtonContainer>
                  <Link to={`/edit/${props.id}`}>
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
