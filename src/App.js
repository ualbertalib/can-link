import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import './App.css';
import Record from './pages/Record.js'
import Home from './pages/Home'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const font =  "'News Cycle', sans-serif";
const theme = createMuiTheme({
  typography: {
    fontFamily: font,
    fontSize: '10pt'
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default App;
