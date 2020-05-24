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
import "./styles.scss";


function App(props) {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(()=>{
    if (localStorage.getItem("token")) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  },[])

  const login = () => {
    setLoggedIn(true);
  };

  const logout = () => {
    setLoggedIn(false);
  };

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/recipes" component={RecipeList} />
          <Route path="/recipes/:id" component={Recipe} />
          <Route path="/edit/:id" component={RecipeForm} />
          <Route path="/new" component={RecipeForm} />
          <Route path="/login" render={(props)=> <Login {...props} func={login} />}/>
          <Route path="/logout" render={(props)=> <Logout {...props} history={props.history} func={logout} />}/>
          <Route path="/register" render={(props)=> <RegisterUser {...props} func={login} />}/>
          {/* {!loggedIn?<Route render={(props)=> <Login {...props} func={login} />}/>:<PrivateRoute component={Home} />} */}
          <Route component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
