import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import throttle from 'lodash/throttle';
import axios from 'axios';
import {SOLR_URL} from '../constants'

// NOTE:  we pass the inputValue and setInputValue in from the parent to allow the parent to reset the form
export default function Suggester({title, setValue, width, suggestType, inputValue, setInputValue, doSearch}) {
  
  const [typedChars, setTypedChars] = React.useState('');
  const [options, setOptions] = React.useState([]);
  
  // useMemo ensures the function isn't recreated each time that's it is called from useEffect
  // throttle reduces requests when the user is still typing a search term

  const fetchData = React.useMemo(
    () =>
      throttle(async (queryTerm, callback) => {
        const url = `${SOLR_URL}suggesthandler?suggest.q=${queryTerm}`
        const result = await axios(url);  
        if (result && result.data && result.data.suggest && result.data.suggest[suggestType] && result.data.suggest[suggestType][queryTerm]) {
          const results = result.data.suggest[suggestType][queryTerm].suggestions.map(y=>y.term)
          callback(results)
        }
    
  }, 800),
  [suggestType],
);



  React.useEffect(() => {
    let active = true;

    if (! typedChars) {
     // setOptions(query ? [query] : []);
      setOptions([])
      return undefined;
    }

      fetchData(typedChars, (results)=>{
        if (active) {
          let newOptions = [];

          if (typedChars) {
            newOptions = [typedChars];
          }
  
          if (results) {
            newOptions = [...newOptions, ...results];
          }

          setOptions(newOptions);
      }
      })

    return () => {
      active = false;
    };
  }, [fetchData, typedChars]);


            
  return (
    
    <Autocomplete
      label={title}
      name={title}
      freeSolo
      id={title}
      style={{ width: width }}
      getOptionLabel={option => option}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      multiple
      limitTags={1}
      includeInputInList
      value={inputValue}
      filterSelectedOptions
      //defaultValue = {`All`}
      onChange={(event, newValue) => {
        setValue(title, newValue);
        setOptions(newValue ? [newValue, ...options] : options);
        setInputValue(newValue);
        doSearch()
      }}
      onInputChange={(event, newInputValue) => {
        setTypedChars(newInputValue);
      }}
     
      
      renderInput={(params) => (
        <TextField {...params} label={title} variant="outlined" fullWidth />
      )}
      renderOption={(option) => {
       /*  const matches = option.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match) => [match.offset, match.offset + match.length]),
        ); */

        return (
          <Grid container alignItems="center">
            
            <Grid item xs>
             {/*  {parts.map((part, index) => (
                <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                  {part.text}
                </span>
              ))} */}
              {option}
            </Grid>
          </Grid>
        );
      }}
    />
  );
}
