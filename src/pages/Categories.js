import React from 'react';
import {useState, useEffect} from 'react';
import './Categories.css';
import {Link, BrowserRouter as Router} from 'react-router-dom';
import Button from '../components/button';
import Input from '../components/input';
function Categories() {
  const [Category, setCategory] = useState([]);
  const [gameCategory, setgameCategory] = useState();

  const addCategory = (value) => {
    setgameCategory(value);
    console.log(gameCategory);
  };

  //this will generate all the Categories for the Quiz from the api
  useEffect(() => {
    async function getCategories() {
      const data = await fetch('https://opentdb.com/api_category.php');
      const jsondata = await data.json();
      setCategory(jsondata.trivia_categories);
    }
    getCategories();
    localStorage.clear();

  }, []);

  return (
    <>
    <Input>Enter Player name</Input>
    <h2>Select a Category</h2>
    
      <div>
          <ul>
            {' '}
            <li>
              {Category.map((item, index) => (
                <Link key={index} to="/Quiz">
                  <Button
                    addCategory={addCategory}
                    id={item.id}
                    Category={item.name}
                  ></Button>
                </Link>
              ))}
            </li>
          </ul>
        </div>
    </>
  );
}

export default Categories;
