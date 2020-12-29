/* eslint-disable no-use-before-define */
import React, { useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import {DegreeListContext} from '../contexts/DegreeListContext'

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

export default function DegreeSelect({setValue, width, inputValue, setInputValue, doSearch}) {
  
  const [degreeList] = useContext(DegreeListContext)
  const classes = useStyles();

  return (
    <Autocomplete
      name="Degree"
      id="degree-select"
      options={degreeList}
      classes={{
        option: classes.option,
      }}
      multiple
      value={inputValue}
      limitTags={1}
      autoHighlight
      style={{ width: width }}
      onChange={(event, newInputValue) => {
        setValue("Degree", newInputValue);
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
          label="Degree"
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
