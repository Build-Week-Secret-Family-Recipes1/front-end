import React, { useState, useEffect } from 'react';
import { getListByTitleSearch, getListByTagSearch, getList } from "../actions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import styled from 'styled-components';
import RecipeList from './RecipeList';
import Recipe from './Recipe';

const SearchForm = styled.form`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin: auto;
    padding-top: 20px;
    width: 90%;
`

const Label = styled.label`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 0;
    width: 25rem;
`

const Input = styled.input`
    margin: 0;
    width: 10rem;
    padding: 5px;
    font-size: 1rem;
    border: 2px solid #00CC00;
    border-radius: 3px;
`

const Select = styled.select`
    font-size: 1rem;
    border: 2px solid #00CC00;
    border-radius: 3px;
    padding: 5px;
    width: 9rem;
`

const H4 = styled.h4`
    margin: 0;
    font-size: 1.3rem;
`

const H5 = styled.h5`
    margin: 0;
    font-size: 1.1rem;
`
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

function SearchBar({list, ...props}) {
    const [recipes, setRecipes] = useState([]);
    const [searchFilter, setSearchFilter] = useState('');
    const [selectedTag, setSelectedTag] = useState('');
    const [tags, setTags] = useState([]);
    const [searchType, setSearchType] = useState(null);

    const submitHandler = e => {
      e.preventDefault();
      if (searchType==='title') {
        props.getListByTitleSearch(searchFilter);
      } else if (searchType==='tag') {
        if (selectedTag==='') {
          props.getList();
        } else {
          props.getListByTagSearch(selectedTag);
        }
      }
    }

    useEffect(()=>{
      console.log(props.list)
      props.getList();
    },[]);

    useEffect(()=>{
      console.log(list);
      setRecipes(list);
      if (tags.length<=0) {
        const ta = [];
        list.forEach(r=>{
          r.tags.forEach(t=>{
            if (ta.indexOf(t)===-1) {
              ta.push(t);
            }
          })
        });
        setTags(ta);
      }
    },[list]);

    const changeSearchFilterHandler = e => {
      e.preventDefault();
      setSearchType('title');
      setSearchFilter(e.target.value);
    }

    const changeTagHandler = e => {
      e.preventDefault();
      setSearchType('tag');
      setSelectedTag(e.target.value);
    }

    if (props.isFetching) {
      return (<p>Fetching your Recipes</p>);
    } else {
      return (
        <div>
          <SearchForm onSubmit={submitHandler}>
              <H4>Search for Recipes</H4>
              <Label>
                  <H5>Search by Title:</H5>
                  <Input
                      type='text'
                      name='by-title'
                      id='by-title'
                      placeholder='Search by title...'
                      onChange={changeSearchFilterHandler}
                  />
              </Label>
              <Label htmlFor='tag-select'>
                  <H5>Search by Category:</H5>
                  <Select name='tags' id='tag-select' onChange={changeTagHandler}>
                      <option value=''>Select a tag...</option>
                      {tags.map(t=><option value={t} key={t}>{t}</option>)}
                  </Select>
              </Label>
              <Button onClick={submitHandler}>Search</Button>
          </SearchForm>
          {/* <Wrapper className="recipe-list-wrapper"> */}

           {/*  {list.map((object) => {
              /* console.log('setRecipeToEdit from RecipeList', props.editRecipe) 
              return (
                <Recipe
                  {...props}
                  recipeFromProps={object}
                  key={object.id}
                />
              )
            ) */}
              {/*
                  will map over data and add a recipe card for each recipe
                  each recipe card will show the title, source, and tags
                  will link to full recipe
              */}


             {props.error!==''?<p>{props.error}</p>:<></>}
            {/* </Wrapper> */}
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
    resStatus: state.resStatus
  };
};

export default connect(
  mapStateToProps,
  { getListByTagSearch, getListByTitleSearch, getList }
)(SearchBar);
