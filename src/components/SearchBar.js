import React from 'react';

import { testList } from '../tests/TestData';

function SearchBar(props) {
    return (
        <form>
            <h3>Search for Recipes</h3>
            <label>
                <h5>Search by Title</h5>
                <input 
                    type='text'
                    name='by-title'
                    id='by-title'
                    placeholder='Search by title...'
                />
            </label>
            <label htmlFor='tag-select'>
                <h3>Search by Category</h3>
                <select name='tags' id='tag-select'>
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
                </select>
            </label>
            <button>Search</button>
        </form>
    )
}

export default SearchBar;