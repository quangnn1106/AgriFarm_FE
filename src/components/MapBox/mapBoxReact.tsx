import * as React from 'react';
import { Map, Marker, ViewState } from 'react-map-gl';
import Loader from '../Loader/Loader';

type Props = {
  children?: any;
  width?: number | string;
  height?: number | string;
  style?: React.CSSProperties | undefined;
  onLoaded?(map: mapboxgl.Map): void;
  loadingMap?: boolean;
  mapStyle?: string;
  latInit?: number;
  lngInit?: number;
  zoom?: number;
};
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const MapBoxAgriFarm = ({
  children,
  width,
  height,
  style,
  onLoaded,
  mapStyle,
  loadingMap,
  latInit,
  lngInit,
  zoom
}: Props) => {
  const [viewStateInit, setViewStateInit] = React.useState({
    latitude: latInit,
    longitude: lngInit,
    zoom: zoom
  });
  React.useEffect(() => {
    setViewStateInit((e: any) => ({
      ...e,
      latitude: latInit,
      longitude: lngInit,
      zoom: zoom
    }));
  }, [latInit, lngInit, zoom]);

  return (
    <Map
      onResize={e => e.target.resize()}
      {...viewStateInit}
      onMove={evt => setViewStateInit(evt.viewState)}
      onLoad={e => {
        if (onLoaded) e.target.once('load', () => onLoaded(e.target));
      }}
      // initialViewState={{
      //   // latitude: 9.99763360283688,
      //   // longitude: 105.7125548348531,
      //   latitude: viewStateInit?.latitude,
      //   longitude: viewStateInit?.longitude,
      //   zoom: zoom
      // }}
      style={style ? style : { width: '100%', height: 400, margin: '25px 0' }}
      mapStyle={mapStyle || 'mapbox://styles/mapbox/streets-v11'}
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      {children}
      {loadingMap && (
        <Loader
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background:
              '-webkit-linear-gradient(45deg, rgba(152, 207, 195, 0.7), rgb(86, 181, 184))'
          }}
          spinning
          fullScreen
        />
      )}
    </Map>
  );
};

export default MapBoxAgriFarm;
