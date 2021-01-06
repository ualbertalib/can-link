import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import  Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';

import AboutDialog from './AboutDialog';
import ContactDialog from './ContactDialog';
import DownloadDialog from './DownloadDialog';
import canLinkLogo from '../images/CanLinklogo-gray.png';
import { Link } from 'react-router-dom'
import { SPARQL_URL } from '../constants';

const useStyles = makeStyles((theme) => ({
    logo: {
      flex: 1,
      marginTop: '5px'
    }
  }));
 
export default function Header() {

    const classes = useStyles();
    
    return (
        <AppBar position="static" color="transparent" elevation={0}>
            <Toolbar>
                <span className={classes.logo} >
                <Link  to={
                        { 
                            pathname: "/"
                        } }>
                    <img 
                        src={canLinkLogo} 
                        alt={'logo'} 
                        height={'50px'}
                        ></img> 
                </Link>  
                </span>
                <AboutDialog/>
                <ContactDialog/>
                <DownloadDialog downloadLink={SPARQL_URL} buttonName='Download Full Dataset' message='The download of the full CanLink dataset is quite large and so may take a while to download.  For reference the XML dataset is approximately 1 Gigabyte in size.'/>
            </Toolbar>
        </AppBar>
    )
}
