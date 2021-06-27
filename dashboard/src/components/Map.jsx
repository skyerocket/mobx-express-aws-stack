import React, { useState } from 'react';
import MapGL, { Source, Layer } from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {data} from './data'

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1Ijoic3Nzb3VuZDEiLCJhIjoiY2txZGlzMHY3MHlkbjJ3cDk1NjR6am4zOSJ9.Mv-FNHKZPurlU5Jd0f1HEQ';

function Map() {   
    const [viewport, setViewport] = useState({
        latitude: -38.1050,
        longitude: 145.2790,
        zoom: 9
      });
      
    return (
        <MapGL
            style={{ width: '100%', height: '400px' }}
            mapStyle='mapbox://styles/mapbox/light-v9'
            accessToken={MAPBOX_ACCESS_TOKEN}
            onViewportChange={setViewport}
            {...viewport}
        >
        <Source id='route' type='geojson' data={data} />
        <Layer
            id='route'
            type='line'
            source='route'
            layout={{
            'line-join': 'round',
            'line-cap': 'round'
            }}
            paint={{
            'line-color': 'orange',
            'line-width': 8
            }}
        />
        </MapGL>
    );
}

export default Map;