import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

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
      <Typography variant="h6">{children}</Typography>
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
        backgroundColor: '#A8DBF6'
    }
}));


export default function AboutDialog() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen} className={classes.buttons}>
        About
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          About CanLink
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
          CanLink is an initiative to increase the discoverability of Canadian theses and dissertations by leveraging the power of linked data to surface unexpected connections and relationships. The initial proof of concept was developed as part of the <a href="https://connect.library.utoronto.ca/display/U5LD/Canadian+Linked+Data+Initiative+Home">Canadian Linked Data Initiative</a>; the current initiative has built on this work and is maintained and developed by the <a href="https://library.ualberta.ca/">University of Alberta Library</a>.
          </Typography>
          <Typography gutterBottom>
          2020 saw major enhancements to the design and development, addition of more data, and refinement of processes and workflows. All of this is designed to improve the user experience and enable sustainable growth over time. 
          </Typography>
        </DialogContent>
      </Dialog>
    </div>
  );
}
