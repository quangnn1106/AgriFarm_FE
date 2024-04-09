'use client';
import * as React from 'react';
import {
  Col,
  ConfigProvider,
  Flex,
  Form,
  Input,
  InputNumber,
  Row,
  Space,
  notification,
  Button
} from 'antd';
import Map, {
  FullscreenControl,
  GeolocateControl,
  LngLat,
  Marker,
  MarkerDragEvent,
  NavigationControl,
  ScaleControl
} from 'react-map-gl';
import styles from './update.module.scss';
import MapBoxAgriFarm from '@/components/MapBox/mapBoxReact';
import useGeolocation from '@/utils/getlocaiton';
import { formItemLayoutSite } from '../FormItemLayout/formItemSite';
import { CloseOutlined, BarsOutlined } from '@ant-design/icons';
import { NotificationPlacement } from 'antd/es/notification/interface';

import ModalCustom from '@/components/ModalCustom/ModalCustom';

import classNames from 'classnames/bind';
import FormRegisterValues from '@/types/register';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import UseAxiosAuth from '@/utils/axiosClient';

import { useTranslations } from 'next-intl';

import GeocoderControl from '@/components/MapBox/geocoder-controll';
import { MAPBOX_TOKEN } from '@/constants/mapbox_token';
import TitleLabelFormItem from '@/components/TitleLabel/TitleLabelFormItem';
import { Land } from '../../models/land-model';
import Pin from '@/components/MapBox/pin';
import { updateLandApi, updateLandPropApi } from '@/services/Admin/Land/updateLand';
import { STATUS_OK } from '@/constants/https';
import { LandUpdatePayLoad } from '@/services/Admin/Land/Payload/request/updateLandPayLoad';
import { Position } from '@/services/SuperAdmin/Site/payload/response/sites';
import { useSession } from 'next-auth/react';
import { MAP_BOX_SATELLITE } from '@/constants/MapBoxStyles';
import { Property } from '@/services/Admin/Land/Payload/request/addLandPayLoad';
import { AxiosInstance } from 'axios';
import fetchListLandData from '@/services/Admin/Land/getLandsApi';
import PinDetail from '@/components/MapBox/pinDetail';
const cx = classNames.bind(styles);
const UpdateLandModal = ({
  params
}: {
  params: {
    visible: boolean;
    onCancel: () => void;
    dataRow?: Land;
    pinsPositions: (React.JSX.Element | '')[] | undefined;
  };
}) => {
  const [form] = Form.useForm();
  const { latitude, longitude, error } = useGeolocation();
  const [loading, setLoading] = React.useState<boolean>(true);

  const [displayMarker, setDisplayMarker] = React.useState<boolean>(true);
  const tM = useTranslations('Message');
  const handleMapLoading = () => setLoading(false);
  const [marker, setMarker] = React.useState<any>();
  const t = useTranslations('FormRegister');
  const msg = useTranslations('Message');
  const { data: session } = useSession();
  const siteId = session?.user.userInfo.siteId;
  const [api, contextHolder] = notification.useNotification();

  const dispatch = useAppDispatch();
  const http = UseAxiosAuth();
  const openNotification = (
    placement: NotificationPlacement,
    status: string,
    type: 'success' | 'error'
  ) => {
    api[type]({
      message: `${status}`,
      placement,
      duration: 2
    });
  };
  React.useEffect(() => {
    form.setFieldsValue(params?.dataRow);
  }, [form, params?.dataRow]);

  const [events, logEvents] = React.useState<Record<string, LngLat>>({});
  const onMarkerDragStart = React.useCallback((event: MarkerDragEvent) => {
    logEvents(_events => ({ ..._events, onDragStart: event.lngLat as LngLat }));
    //  setStateBtnConfirm(false);
  }, []);

  const onMarkerDrag = React.useCallback((event: MarkerDragEvent) => {
    logEvents(_events => ({ ..._events, onDrag: event.lngLat as LngLat }));

    setMarker({
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat
    });
    // setStateBtnConfirm(false);
  }, []);
  const onMarkerDragEnd = React.useCallback((event: MarkerDragEvent) => {
    //logEvents(_events => ({ ..._events, onDragEnd: event.lngLat }));
    logEvents(_events => ({
      ..._events,
      onDragEnd: event.lngLat as LngLat
    }));
  }, []);
  const handleUpdate = async (values: LandUpdatePayLoad) => {
    const payLoadAddPos: Position[] = [
      { lat: events?.onDragEnd?.lat, long: events?.onDragEnd?.lng }
    ];

    const allValues: LandUpdatePayLoad = {
      ...values,
      defaultUnit: 'm2',
      positions: payLoadAddPos,
      properties: null
    };

    const res = await updateLandApi(http, allValues, params.dataRow?.id);

    if (res.data && res.status === STATUS_OK) {
      setLoading(false);
      console.log('values?.properties: ', values?.properties?.length);

      if (values?.properties?.length !== 0) {
        console.log('1231231312');
        const nested = await updateLandPropApi(
          http,
          values?.properties as Property[],
          params.dataRow?.id
        );
        if (nested.data && nested.status === STATUS_OK) {
          openNotification('top', `${tM('update_susses')}`, 'success');
          params.onCancel();
          form.resetFields();
          return;
        } else {
          openNotification('top', `${tM('update_error')}`, 'error');
          params.onCancel();
          form.resetFields();
        }
      }
      openNotification('top', `${tM('update_susses')}`, 'success');
      params.onCancel();
      form.resetFields();
      setLoading(false);
      //  console.log('add site success', res.status);
    } else {
      openNotification('top', `${tM('update_error')}`, 'error');
      params.onCancel();
      form.resetFields();
      //  console.log('add site fail', res.status);
    }
  };

  return (
    <>
      {contextHolder}

      <ModalCustom
        open={params.visible}
        title='Update Land'
        //  title={t('title_add')}
        width='70%'
        style={{ top: 40, maxWidth: 1000 }}
        keyboard
        onOk={form.submit}
        onCancel={() => {
          params.onCancel();
          //openNotification('top', 'create process have been cancel!', 'error');
        }}
      >
        <Row>
          <Col
            xs={24}
            md={14}
          >
            <MapBoxAgriFarm
              // {...viewState}
              //   onMove={evt => setViewState(evt.viewState)}
              onLoaded={handleMapLoading}
              loadingMap={loading}
              latInit={params.dataRow?.positions[0]?.lat || (latitude as number)}
              lngInit={params.dataRow?.positions[0]?.long || (longitude as number)}
              zoom={10}
              style={{ width: '100%', height: '400px', margin: '25px 0' }}
              mapStyle={MAP_BOX_SATELLITE}
              //mapboxAccessToken={MAPBOX_TOKEN}
            >
              {params.dataRow?.positions[0] ? (
                <Marker
                  latitude={params.dataRow?.positions[0]?.lat || 0}
                  longitude={params.dataRow?.positions[0]?.long || 0}
                  anchor='bottom'
                  style={{ position: 'absolute', zIndex: 1 }}
                >
                  <>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <PinDetail />{' '}
                      <span className='light_warning'>
                        {params.dataRow?.name ? params.dataRow?.name : ''}
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
                marker={true}
                displayMarker={displayMarker}
                latFromUpdate={params.dataRow?.positions[0]?.lat}
                lngFromUpdate={params.dataRow?.positions[0]?.long}
                onMarkerDragStart={onMarkerDragStart}
                onMarkerDrag={onMarkerDrag}
                onMarkerDragEnd={onMarkerDragEnd}
              />
              <GeolocateControl position='top-left' />
              <FullscreenControl position='top-left' />
              <NavigationControl position='top-left' />
              <ScaleControl />
              {params.pinsPositions}
            </MapBoxAgriFarm>
          </Col>

          <Col
            xs={24}
            md={10}
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
                // wrapperCol={{ span: 19 }}
                {...formItemLayoutSite}
                form={form}
                colon={false}
                layout={'vertical'}
                // labelCol={{ span: 10 }}
                // labelWrap
                // wrapperCol={{ span: 18 }}
                scrollToFirstError
                style={{
                  overflowY: 'auto',
                  maxHeight: 'calc(63vh)'
                  //marginTop: '50px'
                }}
                onFinish={handleUpdate}
              >
                <Form.Item
                  name='name'
                  label={<TitleLabelFormItem name='Land Name'></TitleLabelFormItem>}
                >
                  <Input size='large' />
                </Form.Item>

                <Form.Item
                  name='description'
                  label={<TitleLabelFormItem name='Description'></TitleLabelFormItem>}
                >
                  <Input size='large' />
                </Form.Item>
                <Form.Item
                  name='acreage'
                  label={<TitleLabelFormItem name='Square'></TitleLabelFormItem>}
                >
                  <Input size='large' />
                </Form.Item>

                <Flex
                  gap={'0.5rem'}
                  vertical
                  style={{ paddingBottom: '1rem' }}
                >
                  <label>
                    <BarsOutlined style={{ marginRight: '0.5rem' }} />
                    Properties
                  </label>
                  <Form.List name='properties'>
                    {(fields, { add, remove }) => (
                      <div>
                        {fields.map(field => (
                          <Space
                            key={field.key}
                            style={{ display: 'flex', marginBottom: '0.5rem' }}
                            align='baseline'
                          >
                            <Form.Item name={[field.name, 'name']}>
                              <Input placeholder={t('Name')} />
                            </Form.Item>
                            <Form.Item name={[field.name, 'value']}>
                              <InputNumber placeholder={t('Value')} />
                            </Form.Item>
                            <Form.Item name={[field.name, 'unit']}>
                              <Input placeholder={t('Unit')} />
                            </Form.Item>
                            <CloseOutlined
                              onClick={() => {
                                remove(field.name);
                              }}
                            />
                          </Space>
                        ))}
                        <Button
                          size='middle'
                          type='dashed'
                          onClick={() => add()}
                          block
                        >
                          {t('add_new_property')}
                        </Button>
                      </div>
                    )}
                  </Form.List>
                </Flex>
              </Form>
            </ConfigProvider>
          </Col>
        </Row>
      </ModalCustom>
    </>
  );
};
export default UpdateLandModal;
