import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from "react-router-dom";

import Login from "./components/Login";
import Logout from "./components/Logout";
import RegisterUser from "./components/RegisterUser";
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
          {/* <PrivateRoute exact path="/recipes" component={} /> */}
          <Route path="/login" render={(props)=> <Login {...props} func={login} />}/>
          <Route path="/logout" render={(props)=> <Logout {...props} history={props.history} func={logout} />}/>
          <Route path="/register" render={(props)=> <RegisterUser {...props} func={login} />}/>
          {/* {!loggedIn?<Route render={(props)=> <Login {...props} func={login} />}/>:<PrivateRoute component={} />} */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
