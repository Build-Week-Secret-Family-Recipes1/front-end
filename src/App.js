import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/Login";
import Logout from "./components/Logout";
import RegisterUser from "./components/RegisterUser";
import RecipeList from "./components/RecipeList";
import RecipeForm from "./components/RecipeForm";
import Recipe from "./components/Recipe";
import Home from "./components/Home";
import PrivateRoute from "./components/PrivateRoute";
import { useLocalStorage } from "./hooks/useLocalStorage";
import "./styles.scss";


function App(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useLocalStorage("user",null);

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
      <div className="App">
        <Switch>
          <PrivateRoute exact path="/recipes" component={RecipeList} />
          <PrivateRoute path="/recipes/:id" component={Recipe} />
          <PrivateRoute path="/edit/:id" component={RecipeForm} />
          <PrivateRoute path="/new" component={RecipeForm} />
          <Route path="/login" render={(props)=> <Login {...props} func={setUser} />}/>
          <Route path="/logout" render={(props)=> <Logout {...props} history={props.history} func={logout} />}/>
          <Route path="/register" render={(props)=> <RegisterUser {...props} func={setUser} />}/>
          {!loggedIn?<Route render={(props)=> <Login {...props} func={setUser} />}/>:<PrivateRoute component={Home} />}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
