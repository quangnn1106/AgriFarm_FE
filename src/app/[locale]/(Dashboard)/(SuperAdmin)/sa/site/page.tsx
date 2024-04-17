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
import SearchConditionForm from './components/SearchCondition/searchConditionForm';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslations } from 'next-intl';
//import BreadcrumbComponent from '../subscription/components/Breadcrumb/breadCrumb';
import { Content } from 'antd/es/layout/layout';
import { sitesTableColumns } from './columnsType';
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

import GeocoderControl from '@/components/MapBox/geocoder-controll';
import Loader from '@/components/Loader/Loader';
import useGeolocation from '@/utils/getlocaiton';
import { MAP_BOX_SATELLITE } from '@/constants/MapBoxStyles';
import BreadcrumbComponent from '../subscription/components/Breadcrumb/breadCrumb';
import ControlPanel from './components/control-panel';
import { getDiseaseApi } from '@/services/SuperAdmin/Site/diseaseListMap';
import {
  MarkerDisease,
  MarkerDiseaseParseNum
} from '@/services/SuperAdmin/Site/payload/response/markerDisease';
import PinDisease from '@/components/MapBox/pinDisease';
//import BreadcrumbComponent from '../../subscription/components/Breadcrumb/breadCrumb';

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
  const [markerDisease, setMarkerDisease] = React.useState<MarkerDisease[] | []>([]);
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

  const fetchListDisease = async (http: AxiosInstance) => {
    try {
      const responseData = await getDiseaseApi(http);
      //   console.log(responseData?.data as Sites[]);
      setMarkerDisease(responseData?.data as MarkerDisease[]);
      setIsFetching(false);
    } catch (error) {
      console.error('Error calling API fetchSites:', error);
    }
  };

  React.useEffect(() => {
    fetchSites(http);
    fetchListDisease(http);
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

  // Chuyển đổi danh sách chuỗi vị trí thành danh sách số
  const convertedData: MarkerDiseaseParseNum[] = markerDisease?.map(item => ({
    ...item,
    location: {
      lat: parseFloat(item.location.lat),
      lon: parseFloat(item.location.lon)
    }
  }));
  // console.log('convertedData: ', convertedData);

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
            <PinDisease /> <span className='red'></span>
          </div>
        </>
      </Marker>
    ));
  }, [convertedData]);
  // const handleAddSite = () => {
  //   router.push(SITE_MAP_ADD_PATH);
  // };

  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken();
  return (
    <>
      <Content>
        <BreadcrumbComponent subPath={path} />

        <MapBoxReact
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
          {pinsDiseasePosition}
          {/* <Marker
            longitude={105.82303450111112 || 0}
            latitude={9.245856390804775 || 0}
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
                <PinDisease /> <span className='red'></span>
              </div>
            </>
          </Marker>

          <Marker
            longitude={105.86374 || 0}
            latitude={9.90249 || 0}
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
                <PinDisease /> <span className='red'></span>
              </div>
            </>
          </Marker> */}
          <ControlPanel />
        </MapBoxReact>
        <ColoredLine text={t('search_condition')} />
        <div>
          <SearchConditionForm
          // handleDate={handleDate}
          // handleKeyword={handleKeyword}
          // searchAction={searchAction}
          />
        </div>
        <ColoredLine text={t('search_result')} />

        <ConfigProvider
          theme={{
            components: {
              Table: {
                cellPaddingBlock: 8,
                headerSortHoverBg: '#F2F3F5',
                borderColor: '#F2F3F5',
                headerBg: '#F2F3F5',
                rowHoverBg: '#F2F3F5'
              }
            }
          }}
        >
          <Content style={{ padding: '0px' }}>
            <Layout
              style={{
                padding: '0px 0',
                background: colorBgContainer,
                borderRadius: borderRadiusLG
              }}
            >
              <Content style={{ padding: '0 24px', minHeight: 280 }}>
                {/* <Flex
                  gap='small'
                  wrap='wrap'
                  className={cx('btn_row')}
                >
                  <Button
                    type='primary'
                    htmlType='submit'
                    icon={<PlusOutlined />}
                    size='large'
                    // className={cx('disease__btn')}
                    onClick={handleAddSite}
                  >
                    {t2('btn_add')}
                  </Button>
                </Flex> */}
                <Table
                  loading={fetching}
                  rowKey={'id'}
                  bordered
                  // rowSelection={{
                  //   type: 'checkbox',
                  //   ...checkRowSelection
                  // }}
                  onRow={(record, rowIndex) => {
                    return {
                      onClick: event => {
                        //console.log('record row onCLick: ', record);
                        // console.log('event row onCLick: ', event);
                        const target = event.target as HTMLElement;
                        const isWithinLink =
                          target.tagName === 'A' || target.closest('a');

                        const isWithinAction =
                          target.closest('td')?.classList.contains('ant-table-cell') &&
                          !target
                            .closest('td')
                            ?.classList.contains('ant-table-selection-column') &&
                          !target
                            .closest('td')
                            ?.classList.contains('ant-table-cell-fix-right');

                        if (isWithinAction && !isWithinLink) {
                          // handleDetails(record);
                          router.push(`${path}/update/${record.id}`);
                        }
                      } // click row
                    };
                  }}
                  columns={sitesTableColumns}
                  dataSource={sites?.map(sites => ({
                    ...sites
                    // onDetails: () => handleDetails(sites.id!),
                    // onDelete: () => handleDelete(sites.id!),
                    // onUpdate: () => handleApproved(sites.id!)
                  }))}
                  // onChange={onChange}
                  // pagination={{
                  //   showTotal: total => `Total ${total} Items`,
                  //   showSizeChanger: true,
                  //   pageSizeOptions: ['10', '20', '30'],
                  //   total: users?.length
                  // }}
                  scroll={{ x: 'max-content' }}
                  className='table_style'
                />
              </Content>
            </Layout>
          </Content>
        </ConfigProvider>
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
