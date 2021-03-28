import React, { useState } from 'react'

function Input() {
    const[player,setPlayer]=useState("");

    function handleChange(event){
        setPlayer(event.target.value);
        localStorage.setItem('player',event.target.value);

    }
    function handleSubmit(event){
        localStorage.setItem('player',player);
        event.preventDefault();
    }
    return (
        <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={player} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
}

export default Input