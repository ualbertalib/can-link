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
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress';
import RDFSerializationSelect from './RDFSerializationSelect';
import axios from 'axios';
import fileDownload from 'js-file-download';


import { HEADER_MAPPING } from '../constants';

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
        marginLeft: '1em',
        minWidth: 200
    }
}));


export default function DownloadDialog({downloadLink, message, buttonName, minWidth = 200}) {
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
    axios.get(downloadLink, {
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
      <Button variant="outlined" color="primary" onClick={handleClickOpen} className={classes.buttons} >
      {buttonName}
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Download RDF from CanLink triplestore
        </DialogTitle>
        <DialogContent dividers>
        <Typography gutterBottom color='secondary' variant='h2'>
        {isDownloading && <Box display="flex" justifyContent="center" m={2} p={2}><CircularProgress color="secondary" /></Box>}
           {isDownloading && "Your file is downloading!  It may take a while. We'll let you know when it's done."}
           {isDownloadDone && 'Your file has been downloaded.'}
        </Typography>
          <Typography gutterBottom>
            {message}
          </Typography>
          <Typography gutterBottom>
            You may also choose from several serializations. 
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
