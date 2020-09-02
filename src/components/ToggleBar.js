import React from 'react';
import CloudQueueIcon from '@material-ui/icons/CloudQueueTwoTone';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import PublicIcon from '@material-ui/icons/Public';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  buttons: {
        fontSize: '11pt',
        marginLeft: '.5em'
    }
}));

export default function ToggleBar({setVisualization}) {
  
  const classes = useStyles();

    const [value, setValue] = React.useState('map');

  const handleChange = (event, newValue) => {
    setVisualization(newValue)
    setValue(newValue);
  };

  return (
    <ToggleButtonGroup
    style={{marginBottom:'1em'}}
      value={value}
      exclusive
      onChange={handleChange}
      aria-label="text alignment"
    >
      <ToggleButton value="map" aria-label="map">
        <PublicIcon /> <Typography className={classes.buttons}>Map</Typography>
      </ToggleButton>
      <ToggleButton value="cloud" aria-label="word cloud">
        <CloudQueueIcon /> <Typography className={classes.buttons}>Subjects</Typography>
      </ToggleButton>
      <ToggleButton value="sqTree" aria-label="tree map">
        <AccountTreeIcon /> <Typography className={classes.buttons}>Years</Typography>
      </ToggleButton>
      <ToggleButton value="rdTree" aria-label="xyplot" >
        <GroupWorkIcon/> <Typography className={classes.buttons}>Universities</Typography>
      </ToggleButton>
      <ToggleButton value="subbub" aria-label="subjects" >
        <BubbleChartIcon/> <Typography className={classes.buttons}>Degrees</Typography>
      </ToggleButton>
     
    </ToggleButtonGroup>
  );
}