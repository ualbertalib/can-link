import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography'
import UnderlineLink from '@material-ui/core/Link';

import { makeStyles } from '@material-ui/core/styles';

import { SPARQL_URL, THESIS_URI } from '../constants';
import useSPARQLThesisQuery from '../hooks/useSPARQLThesisQuery'

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: '12pt',
    display: 'block'
  },
  body: {
    fontSize: '10pt',
    whiteSpace: 'pre'
  }
}));

export default function RdfDialog({ recordId }) {

  const thesisURI = `${THESIS_URI}${recordId}`
  const rdfURI = SPARQL_URL.replace('{SUBJECT_URI}', thesisURI)
  const [{ rdf }] = useSPARQLThesisQuery(rdfURI);
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const preventDefault = (event) => event.preventDefault();

  const handleClickOpen = (event) => {
    preventDefault(event)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  
  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  return (
    <div>
      <UnderlineLink href="#" className={classes.title} onClick={handleClickOpen}>
        RDF
      </UnderlineLink>
      <Dialog
        maxWidth={'md'}
        open={open}
        onClose={handleClose}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title" className={classes.title}>
          <div className={classes.title}>RDF</div>
        </DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <Typography className={classes.body}>{rdf}</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            <Typography className={classes.body}>Close</Typography>
          </Button>
          <Button
            color="primary"
            href={ rdfURI }>
            <Typography className={classes.body}>Download RDF</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
