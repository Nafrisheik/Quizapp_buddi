import React, { useState,useEffect } from 'react'
import Categories from './Categories';
function Quiz() {
    const[CurrentCategory,setCurrent]=useState(localStorage.getItem('category'));
    console.log(CurrentCategory);

    useEffect(() => {
        async function getQuestion(){
            const questionData= await fetch("https://opentdb.com/api.php?amount=20&category="+CurrentCategory+"&type=multiple");
            const Questions= await questionData.json();
            console.log(Questions.results);
        }
        getQuestion();
       
    }, [])

    
    return (
        <div>
            sjncknknkns
            
        </div>
    )
}

export default Quiz
