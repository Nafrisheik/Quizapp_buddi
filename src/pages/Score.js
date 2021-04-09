import React from 'react';

function Score() {
    return (
        <div className="score-area">
           {localStorage.getItem('player') ? localStorage.getItem('player'):"You"} scored {localStorage.getItem('Score')} out of 20
        </div>
    )
}

export default Score
