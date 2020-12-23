import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CloudQueueIcon from '@material-ui/icons/CloudQueueTwoTone';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import PublicIcon from '@material-ui/icons/Public';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: 900,
  },
});

export default function VisualizationBar({setVisualization}) {
  const classes = useStyles();
  const [value, setValue] = React.useState('map');

  const handleChange = (event, newValue) => {
      console.log('The value from the tab bar change:  ')
      console.log(newValue)
    setVisualization(newValue)
    setValue(newValue);
    
  };

  return (
    <Paper square className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
        aria-label="icon label tabs example"
      >
        <Tab icon={<PublicIcon />} label="Bubble Map" value="map"/>
        <Tab icon={<CloudQueueIcon />} label="Word Cloud" value="cloud" />
        <Tab icon={<AccountTreeIcon />} label="Tree Map" value="tree"/>
        <Tab icon={<ShowChartIcon />} label="XYPlot" value="xy"/>
        <Tab icon={<BubbleChartIcon/>} label="Bubble Subjects" value="xy"/>
      </Tabs>
    </Paper>
  );
}
