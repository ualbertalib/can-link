/* eslint-disable no-use-before-define */
import React, { useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
//import uniMapping from '../datasets/uniMapping'
import {UniversityListContext} from '../contexts/UniversityListContext'



const useStyles = makeStyles({
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

export default function UniversitySelect({setValue, width, inputValue, setInputValue, doSearch}) {
  const [uniMapping] = useContext(UniversityListContext)
  const universities = Object.entries(uniMapping).map(uni=>uni[1].short_name)
  const classes = useStyles();

  
  return (
    <Autocomplete
      name="Institution"
      id="university-select"
      options={universities}
      classes={{
        option: classes.option,
      }}
      multiple
      limitTags={1}
      autoHighlight
      value={inputValue}
      style={{ width: width }}
      onChange={(event, newInputValue) => {
        setValue("Institution", newInputValue);
        setInputValue(newInputValue)
        doSearch()
      }}
      getOptionLabel={(option) => option}
      renderOption={(option) => (
        <React.Fragment>
          {option} 
        </React.Fragment>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Institution"
          variant="outlined"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}
