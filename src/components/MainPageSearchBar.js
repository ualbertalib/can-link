import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { Controller } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  }
}));

export default function MainPageSearchBar({control}) {
  const classes = useStyles();

  return (
    <Paper component="form"  className={classes.root}>
      <Controller
        as={InputBase}
        name="query"
        control={control}
       
        className={classes.input}
        placeholder="Search For Theses"
        inputProps={{ 'aria-label': 'search can link' }}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
      
    </Paper>
  );
}
