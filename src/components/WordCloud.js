import React from 'react';
import ReactWordcloud from 'react-wordcloud';

  const options = {
    colors: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b'],
    enableTooltip: true,
    deterministic: false,
    fontFamily: 'impact',
    fontSizes: [5, 60],
    fontStyle: 'normal',
    fontWeight: 'normal',
    padding: 1,
    rotations: 3,
    rotationAngles: [0, 90],
    scale: 'sqrt',
    spiral: 'archimedean',
    transitionDuration: 1000,
  };

export default function WordCloud({words}) {

return (
    
        
        <div style={{ width: '60vw', height: '60vh' }}>
          <ReactWordcloud options={options} words={words} />
        </div>
     
)
    }