import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { postRecipe } from "../actions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getRecipe } from "../actions";

const formSchema = yup.object().shape({
    id: yup.number(),
    title: yup.string().required("Please give your recipe a title"),
    source: yup.string(),
    newIngredient: yup.string(),
    ingredients: yup.array().min(1).required("A recipe must have at least one ingredient"),
    newStep: yup.string(),
    steps: yup.array().min(1).required("A recipe must have at least one step"),
    newTag: yup.string(),
    tags: yup.array()
})

function EditRecipe(props) {
    const [redirect, setRedirect] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    const [recipeState, setRecipeState] = useState({
        id: null,
        title: '',
        source: '',
        newIngredient: '',
        ingredients: [],
        newStep: '',
        steps: [],
        newTag: '',
        tags: []
    });

    const [errorState, setErrorState] = useState({
        id: '',
        title: '',
        source: '',
        newIngredient: '',
        ingredients: '',
        newStep: '',
        steps: '',
        newTag: '',
        tags: ''
    });



    const inputChange = e => {
        e.persist();
        validate(e);
        setRecipeState({ ...recipeState, [e.target.name]: e.target.value });
        console.log(recipeState);
    };

    const addIngredient = e => {
        e.preventDefault();
        setRecipeState({...recipeState, ingredients: recipeState.ingredients.concat(recipeState.newIngredient), newIngredient: ''});
        console.log('recipeState:', recipeState);
    }

    const addStep = e => {
        e.preventDefault();
        setRecipeState({...recipeState, steps: recipeState.steps.concat(recipeState.newStep), newStep: ''});
        console.log('recipeState:', recipeState);
    }

    const addTag = e => {
        e.preventDefault();
        setRecipeState({...recipeState, tags: recipeState.tags.concat(recipeState.newTag), newTag: ''});
        console.log('recipeState:', recipeState);
    }

    const validate = e => {
        yup
            .reach(formSchema, e.target.name)
            .validate(e.target.value)
            .then(valid => {
                setErrorState({...errorState, [e.target.name]: ""});
            })
            .catch(err => {
                setErrorState({...errorState, [e.target.name]: err.errors[0]});
            })
    }

    const submitForm = e => {
        e.preventDefault();
        props.setRecipes(recipeState);
        props.postRecipe(recipeState);
        console.log("Submitted!")
        setSubmitted(true);
        setRedirect('/');
    }

    useEffect(()=>{
      if (submitted && props.resStatus!==null && props.error==='') {
        console.log(props.resStatus);
        setRedirect('/');
      }
    },[submitted, props.resStatus, props.error]);


    if (redirect !== null) {
      return (<Redirect to={redirect} />);
    } else if (props.isPosting) {
      return (<p>Please wait...</p>);
    } else {
      return (
          <form onSubmit={submitForm}>
              <label htmlFor="title">
                  Title
                  <input
                      type="text"
                      name="title"
                      id="title"
                      placeholder="What's your recipe called?"
                      value={props.recipeToEdit.title}
                      onChange={inputChange}
                  />
              </label>
              {errorState.title.length > 0 ? (<p>{errorState.title}</p>) : null}
              <label htmlFor="newIngredient">
                  Ingredient
                  <input
                      type="text"
                      name="newIngredient"
                      id="newIngredient"
                      placeholder="What do you need for your recipe?"
                      value={recipeState.newIngredient}
                      onChange={inputChange}
                  />
              </label>
              <button onClick={addIngredient}>Add Ingredient</button>
              {/* Need to figure out how to get this ingredients error to show */}
              {errorState.ingredients.length > 0 ? (<p>{errorState.ingredients}</p>) : null}
              <div>
                  <h5>Ingredients</h5>
                  <ul>
                      {props.recipeToEdit.ingredients.map((ingredient) => {
                          return (
                              <li>{ingredient}</li>
                          )
                      })}
                  </ul>
              </div>
              <label htmlFor="newStep">
                  Steps
                  <input
                      type="text"
                      name="newStep"
                      id="newStep"
                      placeholder="How do you make the recipe?"
                      value={recipeState.newStep}
                      onChange={inputChange}
                  />
              </label>
              <button onClick={addStep}>Add Step</button>
              <div>
                  <h5>Steps</h5>
                  <ol>
                      {props.recipeToEdit.steps.map((step) => {
                          return (
                              <li>{step}</li>
                          )
                      })}
                  </ol>
              </div>
              <label htmlFor="newTag">
                  Categories
                  <input
                      type="text"
                      name="newTag"
                      id="newTag"
                      placeholder="ex) chicken, vegetarian, etc..."
                      value={recipeState.newTag}
                      onChange={inputChange}
                  />
              </label>
              <button onClick={addTag}>Add Category</button>
              <div>
                  <h5>Categories</h5>
                  <ul>
                      {props.recipeToEdit.tags.map((tag) => {
                          return (
                              <li>{tag}</li>
                          )
                      })}
                  </ul>
              </div>
              <label htmlFor="source">
                  Source
                  <input
                      type="text"
                      name="source"
                      id="source"
                      placeholder="Where did you get your recipe?"
                      value={props.recipeToEdit.source}
                      onChange={inputChange}
                  />
              </label>
              <button>Add Recipe</button>
              {props.error!==''?<p>{props.error}</p>:<></>}
          </form>
      )
    }
}

// hook up the connect to our store
const mapStateToProps = state => {
  return {
    recipe: state.recipe,
    isPosting: state.isPosting,
    error: state.error,
    resStatus: state.resStatus
  };
};

export default connect(
  mapStateToProps,
  { postRecipe, getRecipe }
)(EditRecipe);
