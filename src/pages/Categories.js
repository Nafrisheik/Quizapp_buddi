import React from 'react'
import {useState,useEffect} from 'react';
import {Link,BrowserRouter as Router} from 'react-router-dom';
import Button from '../components/button';
function Categories() {

    const[Category,setCategory]=useState([]);
    const[gameCategory,setgameCategory]=useState();

    const addCategory=(value)=>{
        setgameCategory(value);
console.log(gameCategory);
    }

    useEffect(() => {
        async function getCategories(){
            const data= await fetch('https://opentdb.com/api_category.php');
            const jsondata= await data.json();
            setCategory(jsondata.trivia_categories);
    
        }
        getCategories();  
      }, [])
    // async function getCategories(){
    //     const data= await fetch('https://opentdb.com/api_category.php');
    //     const jsondata= await data.json();
    //     setCategory(jsondata.trivia_categories);

    // }
    // getCategories();

    return (
        <>
        {Category.map((item,index)=> <Link key={index} to='/Quiz'><Button  addCategory={addCategory} id={item.id} Category={item.name}></Button></Link> )}
        </>
    )
}

export default Categories
