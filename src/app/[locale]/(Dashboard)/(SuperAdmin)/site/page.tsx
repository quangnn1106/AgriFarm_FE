'use client';
//import { useEffect, useMemo, useState } from 'react';
import * as React from 'react';

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
import BreadcrumbComponent from '../subscription/components/Breadcrumb/breadCrumb';
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
import { SITE_MAP_ADD_PATH } from '@/constants/routes';
import GeocoderControl from '@/components/MapBox/geocoder-controll';

type Props = {};
interface CenterState {
  latitude?: number;
  longitude?: number;
  zoom?: number;
}
const SitePage = (props: Props) => {
  const [fetching, setIsFetching] = React.useState(true);
  const handleMapLoading = () => setIsFetching(false);
  const [map, setMap] = React.useState<mapboxgl.Map>();
  const [sites, setSites] = React.useState<Sites[] | []>([]);
  const t = useTranslations('Disease');
  const t2 = useTranslations('Button');
  const path = usePathname();

  const http = UseAxiosAuth();
  const router = useRouter();
  const [viewState, setViewState] = React.useState<CenterState>({
    latitude: 9.99763360283688,
    longitude: 105.7125548348531,
    zoom: 14
  });
  const [latitude, setLatitude] = React.useState<number | null>(null);
  const [longitude, setLongitude] = React.useState<number | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  // const getLocation = () => {
  //   if (navigator.geolocation) {
  //     navigator?.geolocation?.getCurrentPosition(
  //       position => {
  //         setViewState(prevState => ({
  //           ...prevState,
  //           latitude: position.coords.latitude
  //         }));
  //         setViewState(prevState => ({
  //           ...prevState,
  //           longitude: position.coords.longitude
  //         }));
  //       },
  //       error => {
  //         console.error('Error getting geolocation:', error);
  //         setError('Error getting geolocation');
  //       }
  //     );
  //   } else {
  //     console.error('Geolocation is not supported by this browser.');
  //     setError('Geolocation is not supported by this browser.');
  //   }
  // };

  const fetchSites = async (http: AxiosInstance) => {
    try {
      const responseData = await getSitesService(http);
      console.log(responseData?.data as Sites[]);
      setSites(responseData?.data as Sites[]);
      setIsFetching(false);
    } catch (error) {
      console.error('Error calling API fetchSites:', error);
    }
  };

  React.useEffect(() => {
    fetchSites(http);
  }, [http]);

  // const pins = useMemo(
  //   () =>
  //     sites.map((city, index) => (
  //       <Marker
  //         key={city.name}
  //         longitude={city?.positions[0]?.long}
  //         latitude={city?.positions[0]?.lat}
  //         anchor='bottom'
  //         // onClick={e => {
  //         //   // If we let the click event propagates to the map, it will immediately close the popup
  //         //   // with `closeOnClick: true`
  //         //   e.originalEvent.stopPropagation();
  //         //   setPopupInfo(city);
  //         // }}
  //       >
  //         <Pin />
  //       </Marker>
  //     )),
  //   [sites]
  // );
  const handleAddSite = () => {
    router.push(SITE_MAP_ADD_PATH);
  };

  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken();
  return (
    <>
      <Content>
        <BreadcrumbComponent subPath={path} />

        <Map
          // {...viewState}
          //   onMove={evt => setViewState(evt.viewState)}
          initialViewState={{
            latitude: 9.99763360283688,
            longitude: 105.7125548348531,
            zoom: 7
          }}
          style={{ width: '100%', height: '400px', margin: '25px 0' }}
          mapStyle='mapbox://styles/mapbox/streets-v11'
          mapboxAccessToken={MAPBOX_TOKEN}
        >
          <GeocoderControl
            mapboxAccessToken={MAPBOX_TOKEN}
            position='top-right'
          />
          <GeolocateControl position='top-left' />
          <FullscreenControl position='top-left' />
          <NavigationControl position='top-left' />
          <ScaleControl />
          {sites?.map((city, index) =>
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
          )}
        </Map>

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
                <Flex
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
                </Flex>
                <Table
                  loading={false}
                  rowKey={'id'}
                  bordered
                  // rowSelection={{
                  //   type: 'checkbox',
                  //   ...checkRowSelection
                  // }}
                  onRow={(record, rowIndex) => {
                    return {
                      onClick: event => {
                        console.log('record row onCLick: ', record);
                        console.log('event row onCLick: ', event);
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

                        // if (isWithinAction && !isWithinLink) {
                        //   handleDetails(record);
                        // }
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
