import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './features/Login/Login.js'
import Posts from './features/posts/Posts.js'
import { Grommet, Box, Button } from "grommet";

import fire from './fire.js';
import Signup from "./features/Signup/Signup.js";

const theme = {
  global: {
    colors: {
      brand: '#cc0000',
      back: "#292929",
      card: "#bfdbf7",
      accent: "#994650",
      ok: '#00C781',
    },
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px",
    },
  },
};

function App() {

  const [isLoggedIn, setIsLoggedIn] = React.useState();

  React.useEffect(() => {
    console.log(isLoggedIn);
  }, [isLoggedIn])

  fire.auth().onAuthStateChanged((user) => {
    return user ? setIsLoggedIn(true) : setIsLoggedIn(false);
  })

  return (
    <Grommet theme={theme} full>
      <Router>
        {!isLoggedIn ? (
          <Switch>
            <Route path="/" exact>
              <Login />
            </Route>
            <Route path="/signup" exact>
              <Signup />
            </Route>
          </Switch>
        )
      : (
        <Switch>
        <Route path="/" exact>
        <Posts />
      </Route>
      </Switch>
       
      )}
      
      </Router>
    </Grommet>
  );
}

export default App;
