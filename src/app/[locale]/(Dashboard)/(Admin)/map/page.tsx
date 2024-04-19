'use client';
import * as React from 'react';
import { Suspense, useEffect, useMemo, useState } from 'react';

import { Breadcrumb, Button, ConfigProvider, Divider, theme } from 'antd';
import Map, {
  FullscreenControl,
  GeolocateControl,
  Marker,
  NavigationControl,
  ScaleControl
} from 'react-map-gl';
import styles from './map.module.scss';

import { HomeOutlined } from '@ant-design/icons';
import { useTranslations } from 'next-intl';

import { Content } from 'antd/es/layout/layout';
import { AxiosInstance } from 'axios';
import UseAxiosAuth from '@/utils/axiosClient';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
import Pin from '@/components/MapBox/pin';
import { MAPBOX_TOKEN } from '@/constants/mapbox_token';
import { Link, useRouter } from '@/navigation';

import GeocoderControl from '@/components/MapBox/geocoder-controll';
import useGeolocation from '@/utils/getlocaiton';
//import SearchConditionForm from '../../(SuperAdmin)/site/components/SearchCondition/searchConditionForm';

import MapBoxAgriFarm from '@/components/MapBox/mapBoxReact';
import { MAP_BOX_SATELLITE } from '@/constants/MapBoxStyles';
import { Land } from '../land/models/land-model';
import fetchListLandData from '@/services/Admin/Land/getLandsApi';
import { useSession } from 'next-auth/react';
import FilterSection from './components/FilterSection/filterSection';
import WeatherComponent from '@/components/Statistic/weather';
import { Water } from '../water/models/water-model';
import fetchListWaterData from '@/services/Admin/Water/getWaterService';
import PinWaterSource from '@/components/MapBox/pinWaterSource';
import PinDisease from '@/components/MapBox/pinDisease';
import ControlPanel from '../../(SuperAdmin)/sa/site/components/control-panel';
import {
  MarkerDisease,
  MarkerDiseaseParseNum
} from '@/services/SuperAdmin/Site/payload/response/markerDisease';
import { getDiseaseApi } from '@/services/SuperAdmin/Site/diseaseListMap';

type Props = {};
interface CenterState {
  latitude?: number;
  longitude?: number;
  zoom?: number;
}
const SitePage = (props: Props) => {
  const { data: session } = useSession();
  const siteId = session?.user.userInfo.siteId;
  const [loadingMap, setLoading] = React.useState(true);
  const handleMapLoading = () => setLoading(false);
  const { latitude, longitude, error } = useGeolocation();
  const [lands, setLands] = React.useState<Land[] | []>([]);
  const [water, setWater] = React.useState<Water[] | []>([]);
  const [markerDisease, setMarkerDisease] = React.useState<MarkerDisease[] | []>([]);
  const t = useTranslations('Common');

  const http = UseAxiosAuth();
  const router = useRouter();
  const breadCrumb = [
    {
      title: <Link href={`/`}>{t('home')}</Link>
    },
    {
      title: <Link href={`/map`}>Map</Link>
    }
  ];
  const fetchLandExist = async (siteId?: string, http?: AxiosInstance) => {
    try {
      const responseData = await fetchListLandData(siteId, http);
      //   console.log(responseData?.data as Sites[]);
      setLands(responseData?.data as Land[]);
      setLoading(false);
    } catch (error) {
      console.error('Error calling API fetchSites:', error);
    }
  };

  const fetchWaterExist = async (siteId?: string, http?: AxiosInstance) => {
    try {
      const responseData = await fetchListWaterData(siteId, http);
      //   console.log(responseData?.data as Sites[]);
      setWater(responseData?.data as Water[]);
      setLoading(false);
    } catch (error) {
      console.error('Error calling API fetchWater:', error);
    }
  };

  const fetchListDisease = async (http: AxiosInstance) => {
    try {
      const responseData = await getDiseaseApi(http);
      //   console.log(responseData?.data as Sites[]);
      setMarkerDisease(responseData?.data as MarkerDisease[]);
      setLoading(false);
    } catch (error) {
      console.error('Error calling API fetchSites:', error);
    }
  };

  React.useEffect(() => {
    fetchLandExist(siteId, http);
    fetchWaterExist(siteId, http);
    fetchListDisease(http);
  }, [http, siteId]);

  const pinsPositions = useMemo(() => {
    return lands?.map((city, index) =>
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
  }, [lands]);

  const pinsWater = useMemo(() => {
    return water?.map((city, index) =>
      city.positions.length > 0 ? (
        <Marker
          key={index}
          longitude={city?.positions[0]?.long || 0}
          latitude={city?.positions[0]?.lat || 0}
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
              <PinWaterSource />{' '}
              <span className='light-blue'>{city?.name ? city?.name : ''}</span>
            </div>
          </>
        </Marker>
      ) : (
        ''
      )
    );
  }, [water]);

  // Chuyển đổi danh sách chuỗi vị trí thành danh sách số
  const convertedData: MarkerDiseaseParseNum[] = markerDisease?.map(item => ({
    ...item,
    location: {
      lat: parseFloat(item.location.lat),
      lon: parseFloat(item.location.lon)
    }
  }));
  console.log('convertedData: ', convertedData);

  const pinsDiseasePosition = useMemo(() => {
    return convertedData?.map((city, index) => (
      <Marker
        key={index}
        longitude={city?.location?.lon || 0}
        latitude={city?.location?.lat || 0}
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
            <PinDisease type={city?.diseaseName} />
            <span className='red'></span>
          </div>
        </>
      </Marker>
    ));
  }, [convertedData]);

  return (
    <>
      <Content>
        {/* <BreadcrumbComponent subPath={path} /> */}
        <ConfigProvider
          theme={{
            components: {
              Button: {
                contentFontSizeLG: 24,
                fontWeight: 700,
                groupBorderColor: 'transparent',
                onlyIconSizeLG: 24,
                paddingBlockLG: 0,
                defaultBorderColor: 'transparent',
                defaultBg: 'transparent',
                defaultShadow: 'none',
                primaryShadow: 'none',
                linkHoverBg: 'transparent',
                paddingInlineLG: 24,
                defaultGhostBorderColor: 'transparent'
              }
            }
          }}
        >
          <Button
            className='home-btn'
            href='/'
            size={'large'}
          >
            <HomeOutlined />
            {/* {siteName} */}
          </Button>
        </ConfigProvider>
        <Breadcrumb
          style={{ margin: '0px 24px' }}
          items={breadCrumb}
        ></Breadcrumb>
        {/* <Divider
          orientation='left'
          plain
          style={{ margin: '0px' }}
        >
          {t('search_condition')}
        </Divider>

        <FilterSection></FilterSection>
        <Divider
          orientation='left'
          plain
        >
          {t('search_result')}
        </Divider> */}
        <Divider
          orientation='left'
          plain
          style={{ margin: '0px' }}
        >
          {t('search_condition')}
        </Divider>
        <WeatherComponent />

        <MapBoxAgriFarm
          onLoaded={handleMapLoading}
          loadingMap={loadingMap}
          latInit={latitude || 0}
          lngInit={longitude || 0}
          zoom={7}
          mapStyle={MAP_BOX_SATELLITE}
          //style={{ width: '100%', height: 500, margin: '25px 0' }}
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
          {pinsWater}
          {pinsDiseasePosition}
          <ControlPanel />
        </MapBoxAgriFarm>

        {/* <ColoredLine text={t('search_condition')} />
        <div>
          <SearchConditionForm
          // handleDate={handleDate}
          // handleKeyword={handleKeyword}
          // searchAction={searchAction}
          />
        </div>
        <ColoredLine text={t('search_result')} /> */}
      </Content>
    </>
  );
};

export default SitePage;
