import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from 'styled-components';

import NavBar from './components/NavBar';
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

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const H1 = styled.h1`
    color: white;
    font-size: 2.8rem;
    font-weight: bold;
    padding: 70px;
    margin: 0;
    border-bottom: 2px solid #00CC00;
    background-color: rgba(106, 216, 86, 0.9);
`

function App(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useSessionStorage("user",null);

  useEffect(()=>{
    if (user!==null) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  },[user])

  const logout = (username) => {
    setUser(null);
  };

  return (
    <Router history={props.history}>
      <AppContainer className="App">
        <NavBar />
        <H1>Secret Family Recipes</H1>
        <Switch>
          <Route exact path="/recipes" component={RecipeList} />
          <Route exact path="/home" component={Home} />
          <Route path="/recipes/:id" component={Recipe} />
          <Route path="/edit/:id" component={EditRecipe} />
          <Route path="/new" component={RecipeForm} />
          <Route path="/search" component={SearchBar} />
          <Route path="/login" render={(props)=> <Login {...props} func={setUser} />}/>
          <Route path="/logout" render={(props)=> <Logout {...props} history={props.history} func={logout} />}/>
          <Route path="/register" render={(props)=> <RegisterUser {...props} func={setUser} />}/>
          {!loggedIn?<Route render={(props)=> <Login {...props} func={setUser} />}/>:<Route component={Home} />}
        </Switch>
      </AppContainer>
    </Router>
  );
}

export default App;
