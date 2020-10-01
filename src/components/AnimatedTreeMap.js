// Copyright (c) 2016 - 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React, {useState} from 'react';
import {Treemap} from 'react-vis';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function getData(data) {
  return {
    title: 'Years',
    color: "A6D8F6",
    children: data,
    style: {
      border: 'thin solid #2EBCEE'
    } 
  }
}

export default function AnimatedTreeMap({data, handleVizClick, searchFieldName}) {

  const [hoveredNode, setHoveredNode] = useState(false);

    const treeProps = {
      colorType: 'literal',
      colorRange: ['#A6D8F6'],
      animation: {
        damping: 9,
        stiffness: 300
      },
      data: getData(data),
      onLeafMouseOver: (x) => {setHoveredNode(x)},
      onLeafMouseOut: () => setHoveredNode(false),
      onLeafClick: (x) => {handleVizClick(searchFieldName, x.data.val)},
      height: 800,
      mode: 'squarify',
      getLabel: x => x.name,
      renderMode: 'DOM',
      getColor: x => '#A6D8F6',
      width: 900
    };
    return (
      <div>
        <Typography component="span"
                    variant="body2"
                    >
                      {
                        hoveredNode ? 
                        <Box style={{marginBottom:'2vh'}}>{hoveredNode.value} theses for {hoveredNode.data.label}</Box>
                        : 
                        <Box style={{marginBottom:'2vh'}}>Hover over an item to show the number of results for that item.</Box>
                      }
        </Typography> 
        <Treemap {...treeProps} />
        
      </div>
    );
  
}