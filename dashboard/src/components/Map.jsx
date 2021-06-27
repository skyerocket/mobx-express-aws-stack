import React, { useState } from 'react';
import MapGL, { TrafficControl, Source, Layer } from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-traffic/mapbox-gl-traffic.css';
import {Button} from 'antd'
import { observer, inject } from "mobx-react";

const token = process.env.MAPBOX_ACCESS_TOKEN

function Map(props) {   
    const { dataForMap } = props.demoStore;
    const [showTraffic, setShowTraffic] = useState(false);
    const toggleTraffic = () => setShowTraffic(!showTraffic);
    const [viewport, setViewport] = useState({
        latitude: -38.1050,
        longitude: 145.2790,
        zoom: 9
      });

    return (
        <div>
            <Button onClick={toggleTraffic}>{showTraffic ? `turn off` : `showTraffic`}</Button>
            <MapGL
                style={{ width: '100%', height: '400px' }}
                mapStyle='mapbox://styles/mapbox/light-v9'
                accessToken={token}
                onViewportChange={setViewport}
                {...viewport}
            >
                <Source id='route' type='geojson' data={dataForMap} />
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
                <TrafficControl showTraffic={showTraffic} />
            </MapGL>
        </div>
    );
}

export default inject('demoStore')(observer(Map));