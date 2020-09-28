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

export default function DegreeSelect({setValue, width}) {
  const [degreeList] = useContext(DegreeListContext)
  //const degrees = DEGREE_FACET_URL
  //const degrees = [{name:'Master of Arts', value:'Master'}, {name:'Master of Science', value:'Master'}, {name:'Bachelor of Arts', value:'Bachelor'}, {name:'Bachelor of Science', value:'Bachelor'}]  //Object.entries(uniMapping);
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
      limitTags={1}
      autoHighlight
      style={{ width: width }}
      onChange={(event, newInputValue) => {
        setValue("Degree", newInputValue);
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
