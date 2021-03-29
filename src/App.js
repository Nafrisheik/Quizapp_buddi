import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import Categories from './pages/Categories';
import './App.css'
import Quiz from './pages/Quiz';
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
      </Switch>
    </Router>
    </>
  );
}

export default App;
