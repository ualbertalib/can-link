import React from 'react';
import BubbleChart from '@weknow/react-bubble-chart-d3';

export default function Bubbles({values}) {
 
    const bubbleClick = (label) =>{
        console.log("Custom bubble click func")
      }
      const legendClick = (label) =>{
        console.log("Customer legend click func")
      }

      return (
        <span style={{paddingLeft:'1vw'}}>
      <BubbleChart
        graph= {{
          zoom: 1.1,
          offsetX: -0.0,
          offsetY: -0.01,
        }}
        width={"700"}
        height={"900"}
        padding={4} // optional value, number that set the padding between bubbles
        showLegend={true} // optional value, pass false to disable the legend.
        legendPercentage={25} // number that represent the % of with that legend going to use.
        
        //Custom bubble/legend click functions such as searching using the label, redirecting to other page
        bubbleClickFunc={bubbleClick}
        legendClickFun={legendClick}
        data={values}
      />
      </span>
      )
}