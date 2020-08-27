import React from 'react';
import Header from '../components/Header'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import uniMapping from '../datasets/uniMapping'
import {
    Link,
    useParams
  } from "react-router-dom";
  import useSOLRRecordQuery from '../hooks/useSOLRRecordQuery';

  import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: '100%',
    //maxWidth: 1500,
    margin: '2em'
  },
  title: {
    textDecoration: 'underline'
  }
});

export default function Record() {
    const classes = useStyles();

    let { recordId } = useParams(); 
    const [{thesis}] = useSOLRRecordQuery(recordId);
    const uni = uniMapping[thesis.institution]
    
    console.log(thesis)

    return (
        <div><Header/>
        <div className={classes.root}>
        <Typography component="div" variant="h5" gutterBottom>
            <span className={classes.title}>{thesis.title} </span>
        </Typography> 

        <Typography component="div" variant="h5" gutterBottom>
            {thesis.creator_first} {thesis.creator_last} 
        </Typography> 

        <Typography component="div" variant="h5" gutterBottom>
            {thesis.year} 
        </Typography> 
        
        <Typography component="div" variant="h5" gutterBottom>
            {uni?uni.name:''}
        </Typography> 

        <Typography component="div" variant="h5" gutterBottom>
        {thesis.degree} 
        </Typography> 

        <Typography component="div" variant="body1" gutterBottom>
        <Box fontWeight='fontWeightBold' m={1}>Subjects</Box>{thesis.subject?thesis.subject.map(sub=><span style={{marginRight:'1em'}}>{sub}</span>):''} 
        </Typography>

        <Typography component="div" variant="body2" gutterBottom>
            <Box fontWeight='fontWeightBold' m={1}>Abstract</Box> {thesis.abstract} 
        </Typography> 
        </div>
         
        </div>
    )
}