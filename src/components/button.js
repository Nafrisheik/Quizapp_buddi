import React from 'react'
// import './button.css'
function Button(props) {

    function addValue(event){
        localStorage.setItem('category', event.target.value);       

    }
    return (
        <button onClick={addValue} value={props.id}>{props.Category}</button>
    )
}

export default Button
