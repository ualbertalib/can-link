import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
//import uniMapping from '../datasets/uniMapping'
import UnderlineLink from '@material-ui/core/Link';
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import {UniversityListContext} from '../contexts/UniversityListContext'

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: '12pt',
    display: 'block' 
  },
  body: {
    fontSize: '10pt'
  }
}));

export default function ThesisDialog({thesis}) {
  const [uniMapping] = useContext(UniversityListContext)
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const preventDefault = (event) => event.preventDefault();
 
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
        <ListItem alignItems="flex-start" onClick={handleClickOpen}>
            <ListItemText 
                
                primary={
                     <UnderlineLink href="#" onClick={preventDefault} className={classes.title}>
                        {thesis.title[0].substring(0,100) + (thesis.title[0].length>100?'...':'')}
                      </UnderlineLink>}
                secondary={<React.Fragment>
                    <Typography
                    component="span"
                    variant="body2"
                    className={classes.title}
                    >
                   {thesis.creator[0]}
                  
                    </Typography>
                    <Typography
                    component="span"
                    variant="body2"
                    className={classes.title}
                    >
                  
                   {thesis.institution?`${uniMapping[thesis.institution[0]].name}`:''}{thesis.degree_name?` - ${thesis.degree_name[0]}`:''} {thesis.year?` - ${thesis.year[0]}`:''}
            
                    </Typography>

                </React.Fragment>}
                />
                
        </ListItem>

        
      <Dialog
        maxWidth={'md'}
        open={open}
        onClose={handleClose}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title" className={classes.title}>
            <div className={classes.title}>{thesis.title[0]}</div>
            <div className={classes.title}>{thesis.creator.map(creator=>creator)}</div>
            <div className={classes.title}>{thesis.institution_name?`${thesis.institution_name}`:''}{thesis.degree_name?` - ${thesis.degree_name[0]}`:''} {thesis.year?` - ${thesis.year[0]}`:''}</div>
            
        </DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <span className={classes.body}>{thesis.abstract?`${thesis.abstract}`:'No abstract available.'}</span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            <Typography className={classes.body}>Close</Typography>
          </Button>
          <Button 
            component={Link} 
            color="primary"
            target="_blank"
            to={
              { 
                  pathname: "/record/" + thesis.id.split('/').pop()
              } }>
                      <Typography className={classes.body}>Open Full Record</Typography>
          </Button>

          {thesis.link?<Button 
            component={Link} 
            color="primary"
            target="_blank"
            to={
              { 
                  pathname: thesis.link
              } }>
                      <Typography className={classes.body}>See Full Thesis Text</Typography>
          </Button>:null}
        </DialogActions>
      </Dialog>
    </div>
  );
}
