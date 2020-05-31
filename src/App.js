import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/Login";
import Logout from "./components/Logout";
import RegisterUser from "./components/RegisterUser";
import RecipeList from "./components/RecipeList";
import RecipeForm from "./components/RecipeForm";
import Recipe from "./components/Recipe";
import Home from "./components/Home";
import EditRecipe from "./components/EditRecipe";
import SearchBar from "./components/SearchBar";
import PrivateRoute from "./components/PrivateRoute";
import { useSessionStorage } from "./hooks/useSessionStorage";
import "./styles.scss";


function App(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useSessionStorage("user",null);

  const login = (username) => {
    setLoggedIn(true);
    setUser(username);
  }

  const logout = (username) => {
    setUser(null);
    setLoggedIn(false);
    sessionStorage.clear();
  };

  return (
    <Router history={props.history}>
      <div className="App">
        <Switch>
          <PrivateRoute exact path="/recipes" component={RecipeList} />
          <PrivateRoute exact path="/home" component={Home} />
          <PrivateRoute path="/recipes/:id" component={Recipe} />
          <PrivateRoute path="/edit/:id" component={EditRecipe} />
          <PrivateRoute path="/new" component={RecipeForm} />
          <PrivateRoute path="/search" component={SearchBar} />
          <Route path="/login" render={(props)=> <Login {...props} func={login} />}/>
          <Route path="/logout" render={(props)=> <Logout {...props} history={props.history} func={logout} />}/>
          <Route path="/register" render={(props)=> <RegisterUser {...props} func={login} />}/>
          {!loggedIn?<Route render={(props)=> <Login {...props} func={setUser} />}/>:<PrivateRoute component={Home} />}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
