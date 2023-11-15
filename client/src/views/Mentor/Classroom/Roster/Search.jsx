import React, { useState } from "react";
import './Roster.less';

export default function Search({ filterText, setFilterText }) {

    const [valid, setValid] = useState(true);

    // Prevents accidental refreshing of the website
    const handleSubmit = (event) => {
        event.preventDefault();
    }

    // Checks for the input in the search bar with regex requirements
    const handleChange = (input) => {
        if (!input.match(/^[a-zA-Z]*$/)) {
            setValid(false);
            return;
        }
        else {
            setFilterText(input);
            setValid(true);
        }
    }

    return (
        // <span id="search-label">Enter student name:
        //     <input
        //         id="search-input"
        //         type="text"
        //         placeholder="Search"
        //         value={filterText}
        //         onChange={event => handleChange(event.target.value)}
        //     />
        //     {/* Invalid input message will be rendered when regex is not satisfied */}
        //     {!valid ? (
        //         <label id="search-error">Invalid Name</label>
        //     ) : null}
        // </span>
        <>
            {!valid ? (
                <label id="search-error">Names can only include letters</label>
            ) : null}
            <input
                id="search-input"
                type="text"
                placeholder="Search student name"
                value={filterText}
                onChange={event => handleChange(event.target.value)}
            />
        </>
    )
}