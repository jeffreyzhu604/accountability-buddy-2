import React, { useState, useContext } from 'react';
import styles from '../../src/styles.css';
import { useDispatch } from 'react-redux';
import { newSearch } from '../actions';


// Responsive
/*
    Ex: If there are two users with name Jeff (substrings allowed), then it
*/
export const SearchBar = () => {
    const dispatch = useDispatch();

    const [searchInput, setSearchInput] = useState("");

    const handleSearchInput = e => {
        setSearchInput(e.target.value);
    }
    
    const handleSubmit = e => {
        e.preventDefault();
        dispatch(newSearch(searchInput));
    }

    return (
        <form onSubmit={handleSubmit} className="search-bar">
            <input
                type="text" 
                name="searchInput" 
                onChange={handleSearchInput} 
                value={searchInput} 
                autoComplete="off"
            />
        </form>
    );
};