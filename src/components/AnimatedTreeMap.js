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

function ShowcaseButton(props) {
  const {buttonContent, onClick} = props;
  return (
    <button className="showcase-button" onClick={onClick}>
      {buttonContent}
    </button>
  );
}

function _getRandomData(total) {
  const totalLeaves = total || Math.random() * 20;
  const leaves = [];
  for (let i = 0; i < totalLeaves; i++) {
    leaves.push({
      name: total ? total : String(Math.random()).slice(0, 3),
      size: Math.random() * 1000,
      color: Math.random(),
      style: {
        border: 'thin solid red'
      }
    });
  }
  return {
    title: '',
    color: 1,
    children: leaves
  };
}


function getData(data) {
  const dataObject = {
    title: 'some title',
    color: 1,
    children: data
  }
  return dataObject
}

export default function AnimatedTreeMap({data, type}) {

  const [hoveredNode, setHoveredNode] = useState(false);
  const [useCirclePacking, setUseCirclePacking] = useState(false);

    const treeProps = {
      animation: {
        damping: 9,
        stiffness: 300
      },
      data: getData(data),
      onLeafMouseOver: (x) => setHoveredNode(x),
      onLeafMouseOut: () => setHoveredNode(false),
      onLeafClick: (x) => {console.log(x)},
      height: 400,
      mode: type, // useCirclePacking ? 'circlePack' : 'squarify',
      getLabel: x => x.name,
      width: 700
    };
    return (
      <div className="dynamic-treemap-example">
        <Treemap {...treeProps} />
        {hoveredNode && hoveredNode.value}
      </div>
    );
  
}