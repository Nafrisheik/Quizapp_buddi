import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Categories from './pages/Categories';
import './pages/Categories.css'
import Quiz from './pages/Quiz';
function App() {
  return (
    <>
    <Router>
      <Switch>
        <Route path='/' exact component={Categories}></Route>
        <Route path='/Quiz' exact component={Quiz}></Route>
      </Switch>
    </Router>
    </>
  );
}

export default App;
