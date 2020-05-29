import React from 'react';
import styled from 'styled-components';

import { testList } from '../tests/TestData';

const SearchForm = styled.form`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin: auto;
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
    border: 2px solid #6bab90;
    border-radius: 3px;
    color: #5e4c5a;
`

const Select = styled.select`
    font-size: 1rem;
    color: #5e4c5a;
    border: 2px solid #55917F;
    border-radius: 3px;
    padding: 5px;
    width: 9rem;
`

const H4 = styled.h4`
    margin: 0;
    font-size: 1.6rem;
    color: #5e4c5a;
`

const H5 = styled.h5`
    margin: 0;
    font-size: 1.1rem;
    color: #5e4c5a;
`

const Button = styled.button`
    display: inline-block;
    padding: 5px;
    margin: 20px;
    width: 9rem;
    border-radius: 3px;
    border: 2px solid #55917F;
    background-color: rgba(64, 224, 208, 0.5);
    font-size: 1.1rem;
    font-family: Gill Sans;
`

function SearchBar(props) {
    return (
        <SearchForm>
            <H4>Search for Recipes</H4>
            <Label>
                <H5>Search by Title:</H5>
                <Input 
                    type='text'
                    name='by-title'
                    id='by-title'
                    placeholder='Search by title...'
                />
            </Label>
            <Label htmlFor='tag-select'>
                <H5>Search by Category:</H5>
                <Select name='tags' id='tag-select'>
                    <option value=''>Select a tag...</option>
                    {/* map over tags from state to create option elements */}
                    {props.recipes.map((recipeObj, i) => {
                        console.log('props', props);
                        console.log('props.recipes', props.recipes);
                        console.log('recipeObj', recipeObj);
                        console.log('recipeObj.tags', recipeObj.tags);
                        console.log('recipeObj.tags[0]', recipeObj.tags[0]);
                        return (
                            recipeObj.tags.map(tag => {
                                return (
                                    <option value='tag'>{tag}</option>
                                )
                            })
                        )
                    })}
                    {/* it works with the testList but not the recipeState */}
                    {/* probably need the getList action */}
                    {/* {testList.map((recipeObj, i) => {
                        console.log('testList', testList);
                        console.log('recipeObj', recipeObj);
                        console.log('recipeObj.tags', recipeObj.tags);
                        console.log('recipeObj.tags[0]', recipeObj.tags[0]);
                        return (
                            recipeObj.tags.map(tag => {
                                return (
                                    <option value='tag'>{tag}</option>
                                )
                            })
                        )
                    })} */}
                </Select>
            </Label>
            <Button>Search</Button>
        </SearchForm>
    )
}

export default SearchBar;