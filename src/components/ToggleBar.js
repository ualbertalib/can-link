import React from 'react';
import CloudQueueIcon from '@material-ui/icons/CloudQueueTwoTone';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import PublicIcon from '@material-ui/icons/Public';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import GroupWorkIcon from '@material-ui/icons/GroupWork';

export default function ToggleBar({setVisualization}) {
  
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
        <PublicIcon /> Map
      </ToggleButton>
      <ToggleButton value="cloud" aria-label="word cloud">
        <CloudQueueIcon /> Subjects
      </ToggleButton>
      <ToggleButton value="sqTree" aria-label="tree map">
        <AccountTreeIcon /> Years
      </ToggleButton>
      <ToggleButton value="rdTree" aria-label="xyplot" >
        <GroupWorkIcon/> Universities
      </ToggleButton>
      <ToggleButton value="subbub" aria-label="subjects" >
        <BubbleChartIcon/> Degrees
      </ToggleButton>
      <ToggleButton value="lang" aria-label="subjects" >
        <BubbleChartIcon/> Languages
      </ToggleButton>
     
    </ToggleButtonGroup>
  );
}