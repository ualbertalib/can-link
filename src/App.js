import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import './App.css';
import Record from './pages/Record'
import Search from './pages/Search'
import Landing from './pages/Landing'

import { UniversityListProvider } from './contexts/UniversityListContext'


import {
  BrowserRouter,
  Switch,
  Route
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
      <UniversityListProvider>
        <div style={{backgroundImage: 'linear-gradient(white, #A8DBF6)', height:'100%'}}>
        <BrowserRouter>
              <Switch>
                <Route path="/record/:recordId">
                  <Record/>
                </Route>
                <Route path="/search">
                  <Search/>
                </Route>
                <Route path="/">
                  <Landing/>
                </Route>
              </Switch>
        </BrowserRouter>
        </div>
      </UniversityListProvider>
    </ThemeProvider>
  );
}

export default App;
