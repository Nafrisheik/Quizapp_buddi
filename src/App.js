import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import Categories from './pages/Categories';
import './App.css'
import Quiz from './pages/Quiz';
import Score from './pages/Score';
function App() {
  return (
    <>
    <Router>
      <Link to='/'>
      <h1>General Fun Quiz</h1>
      </Link>
      <Switch>
        <Route path='/' exact component={Categories}></Route>
        <Route path='/Quiz' exact component={Quiz}></Route>
        <Route path='/Score' exact component={Score}></Route>
      </Switch>
    </Router>
    </>
  );
}

export default App;
