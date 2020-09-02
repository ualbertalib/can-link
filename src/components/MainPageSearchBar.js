import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import FormControl from '@material-ui/core/FormControl';
import { useHistory } from 'react-router-dom'
//import history from "../utils/history";


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

export default function MainPageSearchBar() {
  const classes = useStyles();
  const [query, setQuery] = useState('')
  const history = useHistory()
  const handleSubmit = (evt) => {
    evt.preventDefault();
    history.push({
      pathname: 'search',
      state: { query: query }
  });
    
}
  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <FormControl>
        <Paper component="form"  className={classes.root}>
          <InputBase
            onChange={e => setQuery(e.target.value)}
            value={query}
            className={classes.input}
            placeholder="Search For Theses"
            inputProps={{ 'aria-label': 'search can link' }}
          />
          <IconButton type="submit" className={classes.iconButton} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </FormControl>
    </form>
  );
}
