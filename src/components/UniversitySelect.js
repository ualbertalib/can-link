/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import uniMapping from '../datasets/uniMapping'

const universities = Object.entries(uniMapping);

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

export default function UniversitySelect({setValue, width}) {
  const classes = useStyles();

  
  return (
    <Autocomplete
      name="Institution"
      id="university-select"
      options={universities}
      classes={{
        option: classes.option,
      }}
      autoHighlight
      style={{ width: width }}
      onChange={(event, newInputValue) => {
        setValue("Institution", newInputValue[0]);
      }}
      getOptionLabel={(option) => option[1].name}
      renderOption={(option) => (
        <React.Fragment>
          {option[1].name} 
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
