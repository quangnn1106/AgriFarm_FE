import useGeolocation from '@/utils/getlocaiton';
import React from 'react';
import { Map, Marker } from 'react-map-gl';

type Props = {};
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const MapBoxReact = (props: Props) => {
  const { latitude, longitude, error } = useGeolocation();

  return (
    <Map
      initialViewState={{
        latitude: latitude as number,
        longitude: longitude as number,
        zoom: 14
      }}
      style={{ width: '100%', height: '400px' }}
      mapStyle='mapbox://styles/mapbox/streets-v9'
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      <Marker
        longitude={longitude as number}
        latitude={latitude as number}
        color='red'
      />
    </Map>
  );
};

export default MapBoxReact;
