'use client';
import * as React from 'react';

import BreadcrumbArgiFarm from '@/components/Breadcrumb/breadCrumb';
import { usePathname } from '@/navigation';
import { SITE_MAP_PATH } from '@/constants/routes';
import { Content } from 'antd/es/layout/layout';
import {
  Col,
  ConfigProvider,
  Flex,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  notification,
  Button
} from 'antd';
import { formItemLayout } from '@/components/FormItemLayout/formItemLayout';
import Map, {
  FullscreenControl,
  GeolocateControl,
  LngLat,
  Marker,
  MarkerDragEvent,
  NavigationControl,
  ScaleControl
} from 'react-map-gl';
import GeocoderControl from '@/components/MapBox/geocoder-controll';
import { MAPBOX_TOKEN } from '@/constants/mapbox_token';
import TitleLabelFormItem from '@/components/TitleLabel/TitleLabelFormItem';
//import { formItemLayoutSite } from '../components/FormItemLayout/formItemSite';
import styles from './add.module.scss';
import classNames from 'classnames/bind';
import ModalCustom from '@/components/ModalCustom/ModalCustom';
import UseAxiosAuth from '@/utils/axiosClient';
import { NotificationPlacement } from 'antd/es/notification/interface';
import MapBoxAgriFarm from '@/components/MapBox/mapBoxReact';
import useGeolocation from '@/utils/getlocaiton';
import { formItemLayoutSite } from '../FormItemLayout/formItemSite';
import {
  BorderlessTableOutlined,
  CloseOutlined,
  DownCircleOutlined,
  FormOutlined,
  FileOutlined,
  BarsOutlined
} from '@ant-design/icons';

const cx = classNames.bind(styles);
type Props = {};

const AddLand = ({
  params
}: {
  params: { siteId: string | undefined; visible: boolean; onCancel: () => void };
}) => {
  const { latitude, longitude, error } = useGeolocation();
  const [loadingMap, setLoading] = React.useState<boolean>(true);

  const [displayMarker, setDisplayMarker] = React.useState<boolean>(true);

  const handleMapLoading = () => setLoading(false);
  const [marker, setMarker] = React.useState<any>();
  const path = usePathname();
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const http = UseAxiosAuth();
  const openNotification = (
    placement: NotificationPlacement,
    status: string,
    type: 'success' | 'error'
  ) => {
    api[type]({
      message: `New ${status}`,
      placement,
      duration: 2
    });
  };

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
  return (
    <>
      {contextHolder}
      <ModalCustom
        open={params.visible}
        title='New Land'
        //  title={t('title_add')}
        width='65%'
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
              loadingMap={loadingMap}
              latInit={latitude as number}
              lngInit={longitude as number}
              zoom={7}
              style={{ width: '100%', height: '400px', margin: '25px 0' }}
              mapStyle='mapbox://styles/mapbox/satellite-streets-v12'
              //mapboxAccessToken={MAPBOX_TOKEN}
            >
              <GeocoderControl
                mapboxAccessToken={MAPBOX_TOKEN}
                position='top-right'
                marker={true}
                displayMarker={displayMarker}
                //   latFromUpdate={poInit?.positions[0]?.lat || 0}
                //   lngFromUpdate={poInit?.positions[0]?.long || 0}
                onMarkerDragStart={onMarkerDragStart}
                onMarkerDrag={onMarkerDrag}
                onMarkerDragEnd={onMarkerDragEnd}
              />
              <GeolocateControl position='top-left' />
              <FullscreenControl position='top-left' />
              <NavigationControl position='top-left' />
              <ScaleControl />
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
                  maxHeight: 'calc(63vh)',
                  marginTop: '50px'
                }}
              >
                <Form.Item
                  label={<TitleLabelFormItem name='Land Name'></TitleLabelFormItem>}
                >
                  <Input size='large' />
                </Form.Item>

                <Form.Item
                  label={<TitleLabelFormItem name='Description'></TitleLabelFormItem>}
                >
                  <Input size='large' />
                </Form.Item>
                <Form.Item
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
                              <Input placeholder='Name' />
                            </Form.Item>
                            <Form.Item name={[field.name, 'value']}>
                              <InputNumber placeholder='Value' />
                            </Form.Item>
                            <Form.Item name={[field.name, 'unit']}>
                              <Input placeholder='Unit' />
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
                          + Add new property
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

export default AddLand;
