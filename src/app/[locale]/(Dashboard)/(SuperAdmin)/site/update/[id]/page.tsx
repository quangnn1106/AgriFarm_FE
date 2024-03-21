'use client';
import * as React from 'react';
import { useState, useCallback } from 'react';
import BreadcrumbArgiFarm from '@/components/Breadcrumb/breadCrumb';
import { usePathname } from '@/navigation';
import { SITE_MAP_PATH } from '@/constants/routes';
import { Content } from 'antd/es/layout/layout';
import {
  Button,
  Col,
  ConfigProvider,
  Flex,
  Form,
  FormInstance,
  Input,
  Row,
  Select
} from 'antd';
import { formItemLayout } from '@/components/FormItemLayout/formItemLayout';
import Map, {
  FullscreenControl,
  GeolocateControl,
  Marker,
  NavigationControl,
  ScaleControl
} from 'react-map-gl';
import type { MarkerDragEvent, LngLat } from 'react-map-gl';
import GeocoderControl from '@/components/MapBox/geocoder-controll';
import { MAPBOX_TOKEN } from '@/constants/mapbox_token';
import TitleLabelFormItem from '@/components/TitleLabel/TitleLabelFormItem';
import { formItemLayoutSite } from '../../components/FormItemLayout/formItemSite';
import styles from '../update.module.scss';
import classNames from 'classnames/bind';
import Pin from '@/components/MapBox/pin';
import { AxiosInstance } from 'axios';
import { Position, Sites } from '@/services/SuperAdmin/Site/payload/response/sites';
import { STATUS_CREATED, STATUS_OK } from '@/constants/https';
import { getSitesService } from '@/services/SuperAdmin/Site/getSiteService';
import UseAxiosAuth from '@/utils/axiosClient';
import MapBoxAgriFarm from '@/components/MapBox/mapBoxReact';
import ControlPanel from '../../components/control-panel';
import UploadImgAgri from '@/components/Upload/uploadAvatar';
import { addPositionService } from '@/services/SuperAdmin/Site/addPositionService';

const cx = classNames.bind(styles);
type Props = {};

const UpdateSitePage = ({ params }: { params: { id: string } }) => {
  const path = usePathname();
  const [form] = Form.useForm();
  const [sitesDetail, setSitesDetail] = useState<Sites | undefined>();
  const [loadingMap, setLoading] = useState<boolean>(true);
  const [displayMarker, setDisplayMarker] = useState<boolean>(true);
  const [stateBtnConfirm, setStateBtnConfirm] = useState<boolean>(true);
  const handleMapLoading = () => setLoading(false);
  const [isFetching, setIsFetching] = useState<boolean | undefined>();
  const http = UseAxiosAuth();
  const fetchSitesDetails = async (
    http: AxiosInstance,
    siteId?: string,
    form?: FormInstance
  ) => {
    try {
      const responseData = await getSitesService(http, siteId);
      if (responseData.status === STATUS_OK) {
        //  console.log('status ok: ', responseData?.data);
        setSitesDetail(responseData?.data as Sites);
        // console.log('fetchSitesDetails: ', responseData?.data);

        form?.setFieldsValue({
          ...responseData?.data
        });
      }
      setIsFetching(false);
    } catch (error) {
      console.error('Error calling API Staffs:', error);
    }
  };
  React.useEffect(() => {
    fetchSitesDetails(http, params.id, form);
  }, [form, http, params.id]);
  const [marker, setMarker] = useState<any>();

  const [events, logEvents] = useState<Record<string, LngLat>>({});
  const onMarkerDragStart = useCallback((event: MarkerDragEvent) => {
    logEvents(_events => ({ ..._events, onDragStart: event.lngLat as LngLat }));
    //  setStateBtnConfirm(false);
  }, []);

  const onMarkerDrag = useCallback((event: MarkerDragEvent) => {
    logEvents(_events => ({ ..._events, onDrag: event.lngLat as LngLat }));

    setMarker({
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat
    });
    // setStateBtnConfirm(false);
  }, []);
  const onMarkerDragEnd = useCallback((event: MarkerDragEvent) => {
    //logEvents(_events => ({ ..._events, onDragEnd: event.lngLat }));
    logEvents(_events => ({
      ..._events,
      onDragEnd: event.lngLat as LngLat
    }));
    setStateBtnConfirm(false);
  }, []);
  const getFile = (e: any) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const handleForm = async (values: any) => {
    console.log('value form: ', values);
  };

  const handleConfirmPosition = async () => {
    const payLoadAddPos: Position[] = [
      { lat: events?.onDragEnd?.lat, long: events?.onDragEnd?.lng }
    ];
    const res = await addPositionService(http, params.id, payLoadAddPos);
    if (res?.status === STATUS_CREATED) {
      console.log('thanh cong');
      setStateBtnConfirm(true);
      setDisplayMarker(false);
      fetchSitesDetails(http, params.id, form);
    }
    // console.log('res click, ', res);
    // console.log('payLoadAddPos, ', payLoadAddPos);
  };

  return (
    <>
      <Content>
        <BreadcrumbArgiFarm
          subPath={SITE_MAP_PATH}
          subPath2='Update'
        />
        <Row>
          <Col
            xs={24}
            lg={14}
          >
            <MapBoxAgriFarm
              onLoaded={handleMapLoading}
              loadingMap={loadingMap}
              latInit={sitesDetail?.positions[0]?.lat}
              lngInit={sitesDetail?.positions[0]?.long}
              zoom={7}
              // style={{ width: '100%', height: 400, margin: '25px 0' }}
            >
              {sitesDetail?.positions[0] ? (
                <Marker
                  latitude={sitesDetail?.positions[0]?.lat || 0}
                  longitude={sitesDetail?.positions[0]?.long || 0}
                  anchor='bottom'
                >
                  <>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <Pin />{' '}
                      <span className='red'>
                        {sitesDetail?.name ? sitesDetail?.name : ''}
                      </span>
                    </div>
                  </>
                </Marker>
              ) : (
                ''
              )}
              <GeocoderControl
                mapboxAccessToken={MAPBOX_TOKEN}
                position='top-right'
                marker={displayMarker}
                latFromUpdate={sitesDetail?.positions[0]?.lat || 0}
                lngFromUpdate={sitesDetail?.positions[0]?.long || 0}
                onMarkerDragStart={onMarkerDragStart}
                onMarkerDrag={onMarkerDrag}
                onMarkerDragEnd={onMarkerDragEnd}
              />
              <GeolocateControl position='top-left' />
              <FullscreenControl position='top-left' />
              <NavigationControl position='top-left' />
              <ScaleControl />
              <button
                type='submit'
                className={cx('btn-pos', 'primary-btn')}
                hidden={stateBtnConfirm}
                onClick={handleConfirmPosition}
              >
                Confirm New Position
              </button>
            </MapBoxAgriFarm>
            {/* <ControlPanel events={events} /> */}
          </Col>

          <Col
            xs={24}
            lg={10}
            className={cx('mt_auto', 'pad_col')}
          >
            <ConfigProvider
              theme={{
                components: {
                  Form: {
                    itemMarginBottom: 10,
                    verticalLabelPadding: '0 0 0',
                    labelFontSize: 15,
                    labelColor: 'rgb(133, 133, 133)'
                  }
                }
              }}
            >
              <Form
                // labelCol={{ span: 4 }}
                form={form}
                // wrapperCol={{ span: 19 }}
                {...formItemLayoutSite}
                onFinish={handleForm}
                layout='vertical'
              >
                <Form.Item
                  name='avatar'
                  label={<TitleLabelFormItem name='Avatar Farm'></TitleLabelFormItem>}
                  valuePropName='fileList'
                  getValueFromEvent={getFile}
                >
                  <UploadImgAgri action='https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188' />
                </Form.Item>
                <Form.Item
                  name='siteCode'
                  label={<TitleLabelFormItem name='Site Code'></TitleLabelFormItem>}
                >
                  <Input
                    disabled
                    size='large'
                  />
                </Form.Item>

                <Form.Item
                  name='name'
                  label={<TitleLabelFormItem name='Site Name'></TitleLabelFormItem>}
                >
                  <Input size='large' />
                </Form.Item>
                <Form.Item
                  name='description'
                  label={<TitleLabelFormItem name='description'></TitleLabelFormItem>}
                >
                  <Input size='large' />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                  <Button
                    type='primary'
                    htmlType='submit'
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </ConfigProvider>
          </Col>
        </Row>
      </Content>
    </>
  );
};

export default UpdateSitePage;
