import React, { useState } from 'react';
import * as yup from 'yup';
import styled from 'styled-components';

const StyledForm = styled.form`
    width: 45vw;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: teal;
`

const Button = styled.button`
    display: inline-block;
    padding: 10px;
    margin: 20px;
    width: 9rem;
    border-radius: 3px;
    border: 2px solid teal;
    background-color: rgba(64, 224, 208, 0.5);
    font-size: 0.9rem;
    font-family: Gill Sans;
`

const Label = styled.label`
    display: flex;
    justify-content: space-between;
    padding: 40px;
    width: 100%;
`

const Input = styled.input`
    width: 30rem;
    font-size: 1rem;
`

const H2 = styled.h2`
    font-size: 2.5rem;
`

const H5 = styled.h5`
    padding: ${props => props.primary ? '20px' : '5px'};
    font-size: 1.1rem;
    margin: 0;
`

const Ul = styled.ul`
    text-align: left;
    width: 80%;
    margin: auto;
`

const Ol = styled.ol`
    text-align: left;
    width: 80%;
    margin: auto;
`

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

function RecipeForm(props) {
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
        console.log("Submitted!")
    }

    return (
        <StyledForm onSubmit={submitForm}>
            <H2>Add Recipe</H2>
            <Label htmlFor="title">
                <H5>Title</H5>
                <Input 
                    type="text" 
                    name="title" 
                    id="title"
                    placeholder="What's your recipe called?"
                    value={recipeState.title}
                    onChange={inputChange}
                />
            </Label>
            {errorState.title.length > 0 ? (<p>{errorState.title}</p>) : null}
            <Label htmlFor="newIngredient">
                <H5>Ingredient</H5>
                <Input
                    type="text"
                    name="newIngredient"
                    id="newIngredient"
                    placeholder="What do you need for your recipe?"
                    value={recipeState.newIngredient}
                    onChange={inputChange}
                />
            </Label>
            <Button onClick={addIngredient}>Add Ingredient</Button>
            {/* Need to figure out how to get this ingredients error to show */}
            {errorState.ingredients.length > 0 ? (<p>{errorState.ingredients}</p>) : null}
            <div>
                <H5 primary>Ingredients:</H5>
                <Ul>
                    {recipeState.ingredients.map((ingredient) => {
                        return (
                            <li>{ingredient}</li>
                        )
                    })}
                </Ul>
            </div>
            <Label htmlFor="newStep">
                <H5>Steps</H5>
                <Input
                    type="text"
                    name="newStep"
                    id="newStep"
                    placeholder="How do you make the recipe?"
                    value={recipeState.newStep}
                    onChange={inputChange}
                />
            </Label>
            <Button onClick={addStep}>Add Step</Button>
            <div>
                <H5 primary>Steps:</H5>
                <Ol>
                    {recipeState.steps.map((step) => {
                        return (
                            <li>{step}</li>
                        )
                    })}
                </Ol>
            </div>
            <Label htmlFor="newTag">
                <H5>Categories</H5>
                <Input
                    type="text"
                    name="newTag"
                    id="newTag"
                    placeholder="ex) chicken, vegetarian, etc..."
                    value={recipeState.newTag}
                    onChange={inputChange}
                />
            </Label>
            <Button onClick={addTag}>Add Category</Button>
            <div>
                <H5 primary>Categories:</H5>
                <Ul>
                    {recipeState.tags.map((tag) => {
                        return (
                            <li>{tag}</li>
                        )
                    })}
                </Ul>
            </div>
            <Label htmlFor="source">
                <H5>Source</H5>
                <Input
                    type="text"
                    name="source"
                    id="source"
                    placeholder="Where did you get your recipe?"
                    value={recipeState.source}
                    onChange={inputChange}
                />
            </Label>
            <Button>Add Recipe</Button>
        </StyledForm>
    )
}

export default RecipeForm;