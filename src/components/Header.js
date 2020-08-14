import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import  Toolbar from '@material-ui/core/ToolBar';
import { makeStyles } from '@material-ui/core/styles';

import AboutDialog from './AboutDialog';
import ContactDialog from './ContactDialog';
import canLinkLogo from '../images/CanLinklogo-gray.png';

const useStyles = makeStyles((theme) => ({
    logo: {
      flex: 1 
    }
  }));
 
export default function Header() {

    const classes = useStyles();

    return (
        <AppBar  position="static" color="transparent" >
            <Toolbar>
                <span className={classes.logo}><img src={canLinkLogo} alt={'logo'} height={'50px'}   /></span>  <AboutDialog/><ContactDialog/>
            </Toolbar>
        </AppBar>
    )
}