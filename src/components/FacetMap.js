import React from 'react';
import { Map, Tooltip, TileLayer, CircleMarker } from 'react-leaflet'

function calculateMapBounds(facets) {

    let minLat = -6.213898;
    let maxLat = 54.7201;
    let minLong = -123.470331452;
    let maxLong = 141.1500;

    

    if (facets && facets.length) {
        const allLats = facets.map(item => item.coordinates[0]);
        const allLongs = facets.map(item => item.coordinates[1]);
    
         minLat = Math.min(...allLats);
         maxLat = Math.max(...allLats);
         minLong = Math.min(...allLongs);
         maxLong = Math.max(...allLongs);
    } 
    
    const centerLat = (minLat + maxLat) / 2;
    const distanceLat = maxLat - minLat;
    const bufferLat = distanceLat * 0.05;
    const centerLong = (minLong + maxLong) / 2;
    const distanceLong = maxLong - minLong;
    const bufferLong = distanceLong * 0.15;
    const bounds=[
        [minLat - bufferLat, minLong - bufferLong],
        [maxLat + bufferLat, maxLong + bufferLong]
        ]

    return [bounds, centerLat, centerLong]
}

export default function FacetMap({facets, handleVizClick, searchFieldName, vizName}) {
    const [ bounds, centerLat, centerLong  ] = calculateMapBounds(facets);
    const handleCircleClick = uniName => handleVizClick(searchFieldName, uniName, vizName) 
    const canadaCentre = [60.1304, -106.3468]
   // const canadaBounds = [[55.6751050889, -52.6480987209, ], [55.23324, -140.99778]] bounds={canadaBounds}
return (
<Map
    center={canadaCentre} 
    zoom={3} 
    style={{ width: '100%', height: '400px'}}
    >
    <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
    />

    {facets.map(({val, count, coordinates, name, short_name},index) => {
        let radiusSize = 5;
        if (count > 100 && count <= 300) radiusSize = 10
        if (count > 300 && count <= 700) radiusSize = 15
        if (count > 700 && count <= 1200) radiusSize = 20
        if (count > 1200 && count <= 2500) radiusSize = 25
        if (count > 2500) radiusSize = 30
        //let radiusSize = 20 * Math.log(count / 100)
    
       /*  if (radiusSize < 10) {
            radiusSize = 10
        } else if (radiusSize > 30) {
            radiusSize = 30
        } */
        return (
            <CircleMarker
                key={index}
                center={coordinates}
                radius={radiusSize}
                fillOpacity={0.5}
                stroke={false}
                onClick={ e => handleCircleClick(short_name) }
            >
                <Tooltip sticky>{name}<br />{count} {count===1?'thesis':'theses'}</Tooltip>
            </CircleMarker>
        )})
    }


</Map>
)
}