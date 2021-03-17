import './App.css';

import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"

import RecipeList from "./components/RecipeList";
import CreateRecipe from "./containers/CreateRecipe";
import ViewRecipe from "./containers/ViewRecipe";

Amplify.configure(awsExports);

const App = () => {
  return (
      <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="navbar-brand">FizzCocktail</div>
          </nav>
          <Switch>
            <Route exact path="/">
              <RecipeList/>
            </Route>
            <Route path="/create">
              <CreateRecipe/>
            </Route>
            <Route path="/recipe/:id">
              <ViewRecipe/>
            </Route>
          </Switch>
        </div>
      </Router>
  )
}

export default App;
