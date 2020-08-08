import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Paginator({handlePageChange, page, totalPages}) {
  const classes = useStyles();
 // const [page, setPage] = React.useState(1);
  
  const handleChange = (event, value) => {
    console.log(`page selected: ${value}`)
    handlePageChange(value);
   // setPage(value);
  };

  return (
    <div className={classes.root}>
      
      <Pagination count={totalPages} page={page} onChange={handleChange} />
    </div>
  );
}
