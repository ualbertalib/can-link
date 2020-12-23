import React, {useEffect} from 'react';
import Header from '../components/Header'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import RDFSerializationSelect from '../components/RDFSerializationSelect'

import { SPARQL_SUBJECT_URL, SUBJECT_URI } from '../constants';
import useSPARQLQuery from '../hooks/useSPARQLQuery'

import axios from 'axios';
import { HEADER_MAPPING } from '../constants'

import {
    useParams
  } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  root: {
    width: '100%',
    flexGrow: 1
  },
  text: {
    margin: '2em',
  },
  rdf: {
    fontSize: '11pt',
    whiteSpace: 'pre'
  },
  title: {
    textDecoration: 'underline',
    fontSize: '12pt'
  },
  subheading: {
    marginBottom:'.7em',
    marginTop: '1em',
    fontSize: '12pt'
  }
});




export default function Subject() {
    const classes = useStyles();
    const { subjectId } = useParams(); 

    const subjectURI = `${SUBJECT_URI}${subjectId}`
    const rdfURI = SPARQL_SUBJECT_URL.replace('{SUBJECT_URI}', subjectURI)
    
    const [serialization, setSerialization] = React.useState('json');
    const [label, setLabel] = React.useState('')
    //const [{ rdf: jsonLD}] = useSPARQLQuery(rdfURI, 'json');
    const [{ rdf }, doSPARQLQueryWithSerialization ] = useSPARQLQuery(rdfURI, serialization);

    const handleSerializationChange = (newSerialization) => {
      setSerialization(newSerialization);
      doSPARQLQueryWithSerialization(newSerialization)
    };

    useEffect(() => {
      const fetchData = async () => {
          const result = await axios({
            method: 'get',
            url: rdfURI,
            headers: {'Accept': HEADER_MAPPING.json}
          })
          setLabel(result.data[subjectURI]['http://www.w3.org/2000/01/rdf-schema#label'][0].value) 
      };
      fetchData()
    }, []);
    
    return (
        <div><Header/>
        <div className={classes.root}>
          <div className={classes.text}>
          <div style={{ width: '92%' }}>
            <Box display="flex" p={1} >
              <Box p={1} flexGrow={1} style={{fontSize: '1.8em', color: 'grey'}}>
                RDF for subject: {label}
              </Box>
              <RDFSerializationSelect serialization={serialization} handleSerializationChange={handleSerializationChange}/>
            </Box>
          </div>
        <Typography gutterBottom className={classes.rdf}>
            {rdf}
        </Typography> 

        </div>
         </div>
        </div>
    )
}