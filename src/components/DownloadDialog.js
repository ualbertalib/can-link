import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import RDFSerializationSelect from './RDFSerializationSelect';
import axios from 'axios';
import fileDownload from 'js-file-download';

import { SPARQL_URL, HEADER_MAPPING } from '../constants';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  }
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h4">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const useStyles = makeStyles((theme) => ({
  buttons: {
        fontSize: '11pt',
        backgroundColor: '#A8DBF6',
        marginLeft: '1em'
    }
}));


export default function DownloadDialog() {
  const classes = useStyles();

  const [serialization, setSerialization] = React.useState('XML');
  const [open, setOpen] = React.useState(false);
  const [isDownloading, setIsDownloading] = React.useState(false)
  const [isDownloadDone, setIsDownloadDone] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSerializationChange = (newSerialization) => {
    setSerialization(newSerialization)
  }

  const doDownload = () => {
    setIsDownloading(true)
    const acceptHeader = HEADER_MAPPING[serialization]
    axios.get(SPARQL_URL, {
      responseType: 'blob',
      headers: {'Accept': acceptHeader}
    })
    .then((res) => {
      fileDownload(res.data, 'canLink.rdf')
      setIsDownloading(false)
      setIsDownloadDone(true)
    })
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen} className={classes.buttons}>
      Download Full Dataset
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Download Full RDF dataset from CanLink triplestore
        </DialogTitle>
        <DialogContent dividers>
        <Typography gutterBottom color='secondary' variant='h2'>
           {isDownloading && "Your file is downloading!  It may take a while. We'll let you know when it's done."}
           {isDownloadDone && 'Your file has been downloaded.'}
        </Typography>
          <Typography gutterBottom>
            The download is quite large and so may take quite some time to download.  For reference the XML dataset is approximately 1 Gigabyte in size.
          </Typography>
          <Typography gutterBottom>
            You may also choose from several other serializations. 
           </Typography>       
          <Typography gutterBottom>
              <RDFSerializationSelect serialization={serialization} handleSerializationChange={handleSerializationChange}/>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            <Typography className={classes.body}>Close</Typography>
          </Button>
          <Button
            color="primary"
            onClick={doDownload}>
            <Typography className={classes.body}>Download RDF</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
