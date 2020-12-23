import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography'
import UnderlineLink from '@material-ui/core/Link';
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles';
import useSPARQLQuery from '../hooks/useSPARQLQuery'
import RDFSerializationSelect from '../components/RDFSerializationSelect'

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: '12pt',
    display: 'block'
  },
  body: {
    fontSize: '11pt',
    whiteSpace: 'pre'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200
  },
}));


export default function RdfDialog({ rdfURI }) {

  const [serialization, setSerialization] = React.useState('XML');
  const [{ rdf }, doSPARQLQueryWithSerialization ] = useSPARQLQuery(rdfURI, serialization);
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


  const handleSerializationChange = (newSerialization) => {
    setSerialization(newSerialization);
    doSPARQLQueryWithSerialization(newSerialization)
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
        <DialogTitle id="scroll-dialog-title" >
          <div style={{ width: '92%' }}>
            <Box display="flex" p={1} >
              <Box p={1} flexGrow={1} style={{fontSize: '1.8em', color: 'grey'}}>
                RDF
              </Box>
              <RDFSerializationSelect 
              serialization={serialization} 
              handleSerializationChange={handleSerializationChange}
              style={{ fontSize: '.75em', color: 'grey' }}/>
            </Box>
          </div>

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
            href={rdfURI}>
            <Typography className={classes.body}>Download RDF</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
