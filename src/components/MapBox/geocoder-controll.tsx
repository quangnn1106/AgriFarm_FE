import * as React from 'react';
import { useState } from 'react';
import {
  useControl,
  Marker,
  MarkerProps,
  ControlPosition,
  MarkerDragEvent
} from 'react-map-gl';
import MapboxGeocoder, { GeocoderOptions } from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
type GeocoderControlProps = Omit<
  GeocoderOptions,
  'accessToken' | 'mapboxgl' | 'marker'
> & {
  mapboxAccessToken?: string;
  marker?: boolean | Omit<MarkerProps, 'longitude' | 'latitude'>;
  displayMarker?: boolean;
  position?: ControlPosition;
  onLoading?: (e: object) => void;
  onResults?: (e: object) => void;
  onResult?: (e: object) => void;
  onError?: (e: object) => void;
  onMarkerDragStart?: (event: MarkerDragEvent) => void;
  onMarkerDrag?: (event: MarkerDragEvent) => void;
  onMarkerDragEnd?: (event: MarkerDragEvent) => void;
  latFromUpdate?: number;
  lngFromUpdate?: number;
};

const defaultProps: Partial<GeocoderControlProps> = {
  //marker: true,
  onLoading: () => {},
  onResults: () => {},
  onResult: () => {},
  onError: () => {},
  onMarkerDragStart: () => {},
  onMarkerDrag: () => {},
  onMarkerDragEnd: () => {}
};
/* eslint-disable complexity,max-statements */
const GeocoderControl = (props: GeocoderControlProps) => {
  const [marker, setMarker] = useState<any>(null);
  const [checkMarker, setCheckMarker] = useState<boolean>(props.displayMarker as boolean);

  const geocoder = useControl<MapboxGeocoder>(
    () => {
      const ctrl = new MapboxGeocoder({
        ...props,
        marker: false,
        accessToken: props.mapboxAccessToken as string
      });

      ctrl.on('loading', (event: any) => {
        props.onLoading && props.onLoading(event);
        console.log('loadingGeo: ', event);
        setCheckMarker(props.displayMarker as boolean);
        console.log('checkMarker ', checkMarker);
      });
      // @ts-ignore (TS2339) private member

      // ctrl.on('results', props.onResults);

      ctrl.on('results', (event: any) => {
        props.onResults && props.onResults(event);
      });
      ctrl.on('result', evt => {
        //props.onResult(evt);
        props.onResult && props.onResult(evt);

        const { result } = evt;

        const location =
          result &&
          (result.center ||
            (result.geometry?.type === 'Point' && result.geometry.coordinates));
        if (location && props.marker && props.displayMarker) {
          console.log('if true');

          setMarker(
            <Marker
              {...(props.marker as GeocoderControlProps)}
              draggable
              longitude={location[0]}
              latitude={location[1]}
              onDragStart={props.onMarkerDragStart}
              onDrag={props.onMarkerDrag}
              onDragEnd={props.onMarkerDragEnd}
            />
          );
        } else if (props.displayMarker === false) {
          console.log('else falsy else falsyelse falsyelse falsyelse falsyelse falsy');

          setMarker(null);
        } else {
          setMarker(null);
        }
      });
      // @ts-ignore (TS2339) private member

      //   ctrl.on('error', props.onError);

      ctrl.on('error', (event: any) => {
        props.onError && props.onError(event);
      });
      return ctrl;
    },
    {
      position: props.position
    }
  );

  // @ts-ignore (TS2339) private member
  if (geocoder._map) {
    if (geocoder.getProximity() !== props.proximity && props.proximity !== undefined) {
      geocoder.setProximity(props.proximity);
    }
    if (geocoder.getRenderFunction() !== props.render && props.render !== undefined) {
      geocoder.setRenderFunction(props.render);
    }
    if (geocoder.getLanguage() !== props.language && props.language !== undefined) {
      geocoder.setLanguage(props.language);
    }
    if (geocoder.getZoom() !== props.zoom && props.zoom !== undefined) {
      geocoder.setZoom(props.zoom);
    }
    if (geocoder.getFlyTo() !== props.flyTo && props.flyTo !== undefined) {
      geocoder.setFlyTo(props.flyTo);
    }
    if (
      geocoder.getPlaceholder() !== props.placeholder &&
      props.placeholder !== undefined
    ) {
      geocoder.setPlaceholder(props.placeholder);
    }
    if (geocoder.getCountries() !== props.countries && props.countries !== undefined) {
      geocoder.setCountries(props.countries);
    }
    if (geocoder.getTypes() !== props.types && props.types !== undefined) {
      geocoder.setTypes(props.types);
    }
    if (geocoder.getMinLength() !== props.minLength && props.minLength !== undefined) {
      geocoder.setMinLength(props.minLength);
    }
    if (geocoder.getLimit() !== props.limit && props.limit !== undefined) {
      geocoder.setLimit(props.limit);
    }
    if (geocoder.getFilter() !== props.filter && props.filter !== undefined) {
      geocoder.setFilter(props.filter);
    }
    if (geocoder.getOrigin() !== props.origin && props.origin !== undefined) {
      geocoder.setOrigin(props.origin);
    }
    // Types missing from @types/mapbox__mapbox-gl-geocoder
    // if (geocoder.getAutocomplete() !== props.autocomplete && props.autocomplete !== undefined) {
    //   geocoder.setAutocomplete(props.autocomplete);
    // }
    // if (geocoder.getFuzzyMatch() !== props.fuzzyMatch && props.fuzzyMatch !== undefined) {
    //   geocoder.setFuzzyMatch(props.fuzzyMatch);
    // }
    // if (geocoder.getRouting() !== props.routing && props.routing !== undefined) {
    //   geocoder.setRouting(props.routing);
    // }
    // if (geocoder.getWorldview() !== props.worldview && props.worldview !== undefined) {
    //   geocoder.setWorldview(props.worldview);
    // }
  }

  return props.displayMarker ? marker : '';
};

GeocoderControl.defaultProps = defaultProps;
export default GeocoderControl;
const noop = () => {};

// GeocoderControl.defaultProps = {
//   marker: true,
//   onLoading: noop,
//   onResults: noop,
//   onResult: noop,
//   onError: noop,
//   onMarkerDragStart: noop,
//   onMarkerDrag: noop,
//   onMarkerDragEnd: noop
// };
