
import React, { useState } from "react";

// 1. Roster should have a search bar to search by student names
// 2. Include capability to update form dynamically with new inputs
// 3. Should work after deleting, adding, and updating student accounts

// 1. Create ability for teacher to click a button to sort students alphabetically and reverse alphabetically

// 1. Teacher should be able to "pin" students to bring them to the top of the list
// 2. While searching for a student, "pinned" students should only appear when names actually match
//    If they do match, give the students priority and show them on top

export default function Search({ filterText, setFilterText }) {

    const [valid, setValid] = useState(true);

    // Prevents accidental refreshing of the website
    const handleSubmit = (event) => {
        event.preventDefault();
    }

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
        <div id="wrapper">
            <form onSubmit={event => handleSubmit(event)} id="search-form-box">
                <div id="search-label">
                    Enter a student's name
                </div>
                <input
                    id="search-input"
                    type="text"
                    placeholder="Search"
                    value={filterText}
                    onChange={event => handleChange(event.target.value)}
                />
            </form>

            {!valid ? (
                <label id="search-error">Invalid Input</label>
            ) : null}
        </div>
    )
}