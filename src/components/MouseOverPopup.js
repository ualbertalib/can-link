import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Popover from '@material-ui/core/Popover'
import PopupState, { bindHover, bindPopover } from 'material-ui-popup-state'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const useStyles = makeStyles(theme => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing.unit,
  }
}))

const MouseOverPopup = ({ item }) => {
    const classes = useStyles();
    return (
  <PopupState variant="popover" popupId="demoPopover">
    {popupState => (
      <div>
        <ListItem alignItems="flex-start" key={item.id}>
            <ListItemText 
                {...bindHover(popupState)}
                primary={item.title[0]}
                secondary={<React.Fragment>
                    <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    >
                    {item.creator[0]}
                    </Typography>
                </React.Fragment>}
                />
        </ListItem>
        <Popover
          {...bindPopover(popupState)}
          className={classes.popover}
          classes={{
            paper: classes.paper,
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          disableRestoreFocus
        >
            <Typography component="span"
                    variant="body2">
                <Typography variant="h6" >
                    Abstract
                </Typography> 
                <TextareaAutosize
                    rowsMax={4}
                    aria-label="maximum height"
                    placeholder="Maximum 4 rows"
                    defaultValue={item.abstract?`Abstract: ${item.abstract}`:'No abstract available.'}
                    />
                <Typography variant="h6" >
                    Year
                </Typography> 
                {item.year}
                <Typography variant="h6" >
                    Subject
                </Typography> 
                {item.subject}
                <Typography variant="h6" >
                    Degree
                </Typography> 
                {item.degree}
                <Typography variant="h6" >
                    Institution
                </Typography> 
                {item.institution}
            </Typography>

        </Popover>
      </div>
    )}
  </PopupState>
)}

MouseOverPopup.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default MouseOverPopup