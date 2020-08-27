import React from 'react';
import './App.css';
import Record from './pages/Record.js'
import Home from './pages/Home'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";



function App() {


  return (
    <Router>
        <Switch>
          <Route path="/record/:recordId">
            <Record/>
          </Route>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
