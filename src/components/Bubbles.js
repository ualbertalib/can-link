import React from 'react';
import BubbleChart from '@weknow/react-bubble-chart-d3';

export default function Bubbles({values, handleVizClick, searchFieldName, vizName}) {
 
    const bubbleClick = (label) =>{
        handleVizClick(searchFieldName, label, vizName)
      }
      const legendClick = (label) =>{
        handleVizClick(searchFieldName, label, vizName)
      }

      return (
       
      <BubbleChart
        graph= {{
          zoom: 0.88,
          offsetX: 0.00,
          offsetY: -0.01,
        }}
        width={900}
        height={900}
        padding={4} 
        showLegend={false}
        legendPercentage={0} 
        bubbleClickFun={bubbleClick}
        legendClickFun={legendClick}
        data={values}
        legendFont={{
          family: "'News Cycle', sans-serif",
          size: 12,
          color: 'grey',
          weight: 'bold',
        }}
    valueFont={{
          family: "'News Cycle', sans-serif",
          size: 12,
          color: 'grey',
          weight: 'bold',
        }}
    labelFont={{
          family: "'News Cycle', sans-serif",
          size: 16,
          color: 'grey',
          weight: 'bold',
        }}
      />
     
      )
}