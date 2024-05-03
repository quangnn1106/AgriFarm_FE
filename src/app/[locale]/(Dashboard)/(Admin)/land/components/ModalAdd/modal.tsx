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
import { CloseOutlined, BarsOutlined } from '@ant-design/icons';
import { Position } from '@/services/SuperAdmin/Site/payload/response/sites';
import { LandPayLoad } from '@/services/Admin/Land/Payload/request/addLandPayLoad';
import { addNewLandApi } from '@/services/Admin/Land/addNewLand';
import { STATUS_CREATED, STATUS_OK } from '@/constants/https';
import { useTranslations } from 'next-intl';
import { MAP_BOX_SATELLITE } from '@/constants/MapBoxStyles';

import { useSession } from 'next-auth/react';

const cx = classNames.bind(styles);
type Props = {};

const AddLand = ({
  params
}: {
  params: {
    siteId: string | undefined;
    visible: boolean;
    onCancel: () => void;
    pinsPositions: (React.JSX.Element | '')[] | undefined;
  };
}) => {
  const { data: session } = useSession();
  const siteId = session?.user.userInfo.siteId;
  const { latitude, longitude, error } = useGeolocation();
  const [loading, setLoading] = React.useState<boolean>(true);

  const [displayMarker, setDisplayMarker] = React.useState<boolean>(true);
  const tM = useTranslations('Message');
  const t = useTranslations('Common');
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

  const handleForm = async (values: LandPayLoad) => {
    const payLoadAddPos: Position[] = [
      { lat: events?.onDragEnd?.lat, long: events?.onDragEnd?.lng }
    ];

    const allValues: LandPayLoad = {
      ...values,
      defaultUnit: 'm2',
      positions: payLoadAddPos
    };
    //setLoading(true);

    console.log('value form: ', allValues);

    const res = await addNewLandApi(http, allValues);
    if (res.data && res.status === STATUS_CREATED) {
      setLoading(false);
      openNotification('top', `${tM('add_susses')}`, 'success');
      params.onCancel();
      form.resetFields();

      //  console.log('add site success', res.status);
    } else {
      openNotification('top', `${tM('add_error')}`, 'error');
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
        title='New Land'
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
              latInit={latitude as number}
              lngInit={longitude as number}
              zoom={7}
              style={{ width: '100%', height: '400px', margin: '25px 0' }}
              mapStyle={MAP_BOX_SATELLITE}
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
                onFinish={handleForm}
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

export default AddLand;
