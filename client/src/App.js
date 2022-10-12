import { Route, Switch } from 'react-router-dom';
import './App.css';
import CreateRecipe from './views/CreateRecipe/CreateRecipe';
import LandingPage from './views/landingpage/LandingPage';
import Main from './views/main/Main';
import RecipeDetail from './views/recipeDetail/RecipeDetail';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getRecipes, getDiets } from './redux/actions';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
      dispatch(getRecipes())
      dispatch(getDiets())
  }, [dispatch]) 
  return (
    <div className="App">
      <Switch>
        <Route exact path='/'>
          <LandingPage />
        </Route>
        <Route exact path='/home'>
          <Main />
        </Route>
        <Route exact path='/create'>
          <CreateRecipe />
        </Route>
        <Route exact path='/recipe/:id'>
          <RecipeDetail />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
