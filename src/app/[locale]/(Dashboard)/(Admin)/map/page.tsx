'use client';
import * as React from 'react';
import { Suspense, useEffect, useMemo, useState } from 'react';
import MapboxMap from '@/components/MapBox/mapbox';
import { Button, Col, ConfigProvider, Flex, Layout, Row, Table, theme } from 'antd';
import Map, {
  FullscreenControl,
  GeolocateControl,
  Marker,
  NavigationControl,
  ScaleControl
} from 'react-map-gl';
import styles from './site.module.scss';

import { PlusOutlined } from '@ant-design/icons';
import { useTranslations } from 'next-intl';

import { Content } from 'antd/es/layout/layout';

import { Sites } from '@/services/SuperAdmin/Site/payload/response/sites';
import { AxiosInstance } from 'axios';
import { getSitesService } from '@/services/SuperAdmin/Site/getSiteService';
import UseAxiosAuth from '@/utils/axiosClient';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

import MapBoxReact from '@/components/MapBox/mapBoxReact';
import Pin from '@/components/MapBox/pin';
import { MAPBOX_TOKEN } from '@/constants/mapbox_token';

import { usePathname, useRouter } from '@/navigation';
import { SITE_MAP_ADD_PATH } from '@/constants/routes';
import GeocoderControl from '@/components/MapBox/geocoder-controll';
import Loader from '@/components/Loader/Loader';
import useGeolocation from '@/utils/getlocaiton';
import SearchConditionForm from '../../(SuperAdmin)/site/components/SearchCondition/searchConditionForm';
import MapBoxAgriFarm from '@/components/MapBox/mapBoxReact';
import { MAP_BOX_SATELLITE } from '@/constants/MapBoxStyles';

type Props = {};
interface CenterState {
  latitude?: number;
  longitude?: number;
  zoom?: number;
}
const SitePage = (props: Props) => {
  const [fetching, setIsFetching] = React.useState(true);
  const [loadingMap, setLoading] = React.useState(true);
  const handleMapLoading = () => setLoading(false);
  const { latitude, longitude, error } = useGeolocation();
  const [sites, setSites] = React.useState<Sites[] | []>([]);
  const t = useTranslations('Disease');
  const t2 = useTranslations('Button');
  const path = usePathname();

  const http = UseAxiosAuth();
  const router = useRouter();

  const fetchSites = async (http: AxiosInstance) => {
    try {
      const responseData = await getSitesService(http);
      //   console.log(responseData?.data as Sites[]);
      setSites(responseData?.data as Sites[]);
      setIsFetching(false);
    } catch (error) {
      console.error('Error calling API fetchSites:', error);
    }
  };

  React.useEffect(() => {
    fetchSites(http);
  }, [http]);

  const pinsPositions = useMemo(() => {
    return sites?.map((city, index) =>
      city.positions.length > 0 ? (
        <Marker
          key={index}
          longitude={city?.positions[0]?.long || 0}
          latitude={city?.positions[0]?.lat || 0}
          color='red'
          anchor='bottom'
          // onClick={e => {
          //   // If we let the click event propagates to the map, it will immediately close the popup
          //   // with `closeOnClick: true`
          //   e.originalEvent.stopPropagation();
          //   setPopupInfo(city);
          // }}
        >
          <>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Pin /> <span className='red'>{city?.name ? city?.name : ''}</span>
            </div>
          </>
        </Marker>
      ) : (
        ''
      )
    );
  }, [sites]);
  const handleAddSite = () => {
    router.push(SITE_MAP_ADD_PATH);
  };

  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken();
  return (
    <>
      <Content>
        {/* <BreadcrumbComponent subPath={path} /> */}

        <MapBoxAgriFarm
          onLoaded={handleMapLoading}
          loadingMap={loadingMap}
          latInit={latitude || 0}
          lngInit={longitude || 0}
          zoom={7}
          mapStyle={MAP_BOX_SATELLITE}
        >
          <GeocoderControl
            mapboxAccessToken={MAPBOX_TOKEN}
            position='top-right'
          />
          <GeolocateControl position='top-left' />
          <FullscreenControl position='top-left' />
          <NavigationControl position='top-left' />
          <ScaleControl />
          {pinsPositions}
        </MapBoxAgriFarm>

        <ColoredLine text={t('search_condition')} />
        <div>
          <SearchConditionForm
          // handleDate={handleDate}
          // handleKeyword={handleKeyword}
          // searchAction={searchAction}
          />
        </div>
        <ColoredLine text={t('search_result')} />
      </Content>
    </>
  );
};
interface ColoredLineProps {
  text: string;
}
const ColoredLine: React.FC<ColoredLineProps> = ({ text }) => (
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 25 }}>
    <div
      className={cx('disease__line')}
      style={{ flex: 1 }}
    />
    <span style={{ marginLeft: 5, marginRight: 5 }}>{text}</span>
    <div
      className={cx('disease__line')}
      style={{ flex: 12 }}
    />
  </div>
);
export default SitePage;
