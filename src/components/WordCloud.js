import React from 'react';
import ReactWordcloud from 'react-wordcloud';

  const options = {
    colors: ['#2EBCEE'],
    enableTooltip: true,
    deterministic: false,
    fontFamily: "'News Cycle', sans-serif",
    fontSizes: [5, 60],
    fontStyle: 'normal',
    fontWeight: 'normal',
    padding: 1,
    rotations: 1,
    rotationAngles: [0, 90],
    scale: 'sqrt',
    spiral: 'archimedean',
    transitionDuration: 1000,
  };

 

export default function WordCloud({words, handleVizClick, searchFieldName, vizName}) {

  const callbacks={
    onWordClick: ({val}) => handleVizClick(searchFieldName, val, vizName) 
  }

return (
    
        
        <div style={{ width: '60vw', height: '60vh' }}>
          <ReactWordcloud options={options} words={words} callbacks={callbacks} />
        </div>
     
)
    }