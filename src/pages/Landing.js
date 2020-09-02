import React from 'react';
import '../App.css';

import { makeStyles } from '@material-ui/core/styles';

import Header from '../components/Header';
import MainPageSearchBar from '../components/MainPageSearchBar';
import UniList from '../components/UniList';
import Footer from '../components/Footer';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  }
}));

function Landing() {
  
  const classes = useStyles();
  
  return (
    <div>
        <Header/>
        <div className="App">
            <div className={classes.root}>
                <MainPageSearchBar/>
                <UniList/>
            </div>
        </div>
        <Footer/>
    </div> 
  );
}

export default Landing;
