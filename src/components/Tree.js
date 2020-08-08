import React, {useState} from 'react';
import {Treemap} from 'react-vis';
import { makeStyles } from '@material-ui/core/styles'

import D3FlareData from '../datasets/d3-flare-example.json';

const useStyles = makeStyles(theme => ({
  marginAutoContainer: {
    width: 800,
    height: 500,
    display: 'flex',
  },
  marginAutoItem: {
    margin: 'auto'
  }
}))

const STYLES = {
    SVG: {
      stroke: '#ddd',
      strokeWidth: '0.25',
      strokeOpacity: 0.5
    },
    DOM: {
      border: 'thin solid #ddd'
    }
  };

const MODE = [
  'circlePack',
  'partition',
  'partition-pivot',
  'squarify',
  'resquarify',
  'slice',
  'dice',
  'slicedice',
  'binary'
];

export default function Tree() {
  const classes = useStyles()
  const [modeIndex, setModeIndex] = useState(0);

  const updateModeIndex = increment => {
    const newIndex = modeIndex + (increment ? 1 : -1);
    setModeIndex(newIndex < 0 ? MODE.length - 1 : newIndex >= MODE.length ? 0 : newIndex);
  };
    const [useSVG, setUseSVG] = useState(true)

return (

            
  <div className={classes.marginAutoContainer}>
  <div className={classes.marginAutoItem}>
  
    


              <Treemap
                {...{
                  animation: true,
                  className: 'nested-tree-example',
                  colorType: 'literal',
                  colorRange: ['#88572C'],
                  data: D3FlareData,
                  mode: MODE[modeIndex],
                  renderMode: useSVG ? 'SVG' : 'DOM',
                  height: 400,
                  width: 600,
                  margin: 15,
                  getSize: d => d.value,
                  getColor: d => d.hex,
                  style: STYLES[useSVG ? 'SVG' : 'DOM']
                }}
            />
            

            </div>
</div>  
        )

            }