import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import uniMapping from '../datasets/uniMapping'

export default function ThesisDialog({thesis}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
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
        <ListItem alignItems="flex-start" >
            <ListItemText 
               
                primary={thesis.title[0].substring(0,30) + '...'}
                secondary={<React.Fragment>
                    <Typography
                    component="span"
                    variant="body2"
                //    className={classes.inline}
                    >
                   <div> {thesis.creator[0]}</div>
                   <div>{thesis.institution?`${uniMapping[thesis.institution[0]].name}`:''}{thesis.degree?` - ${thesis.degree[0]}`:''} {thesis.year?` - ${thesis.year[0]}`:''}</div>
            
                    </Typography>
                </React.Fragment>}
                />
                 <Button onClick={handleClickOpen} variant="text" style={{verticalAlign: 'bottom'}} size="small" color="primary">See Abstract...</Button>
        </ListItem>

        
      <Dialog
        maxWidth={'md'}
        open={open}
        onClose={handleClose}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
            <div>{thesis.title[0]}</div>
            <div>{thesis.creator.map(creator=>creator)}</div>
            <div>{thesis.institution?`${uniMapping[thesis.institution[0]].name}`:''}{thesis.degree?` - ${thesis.degree[0]}`:''} {thesis.year?` - ${thesis.year[0]}`:''}</div>
            
        </DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {thesis.abstract?`${thesis.abstract}`:'No abstract available.'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={handleClose} color="primary">
            Go to Full Record
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
