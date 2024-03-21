'use client';
import * as React from 'react';

import BreadcrumbArgiFarm from '@/components/Breadcrumb/breadCrumb';
import { usePathname } from '@/navigation';
import { SITE_MAP_PATH } from '@/constants/routes';
import { Content } from 'antd/es/layout/layout';
import { Col, ConfigProvider, Flex, Form, Input, Row, Select } from 'antd';
import { formItemLayout } from '@/components/FormItemLayout/formItemLayout';
import Map, {
  FullscreenControl,
  GeolocateControl,
  Marker,
  NavigationControl,
  ScaleControl
} from 'react-map-gl';
import GeocoderControl from '@/components/MapBox/geocoder-controll';
import { MAPBOX_TOKEN } from '@/constants/mapbox_token';
import TitleLabelFormItem from '@/components/TitleLabel/TitleLabelFormItem';
import { formItemLayoutSite } from '../components/FormItemLayout/formItemSite';
import styles from './add.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
type Props = {};

const AddSitePage = (props: Props) => {
  const path = usePathname();
  return (
    <>
      <Content>
        <BreadcrumbArgiFarm
          subPath={SITE_MAP_PATH}
          subPath2={path}
        />

        {/* <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 19 }}
          layout='vertical'
          //   style={{ maxWidth: 600 }}
        >
          <Form.Item
            label='Checkbox'
            name='disabled'
            valuePropName='checked'
          >
            <Input />
          </Form.Item>

          <Form.Item label='Input'>
            <Input />
          </Form.Item>
          <Form.Item label='Select'>
            <Select>
              <Select.Option value='demo'>Demo</Select.Option>
            </Select>
          </Form.Item>
        </Form> */}
        <Row>
          <Col
            xs={24}
            md={14}
          >
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
            </Map>
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
                layout='vertical'
              >
                <Form.Item
                  label={<TitleLabelFormItem name='Site Code'></TitleLabelFormItem>}
                >
                  <Input size='large' />
                </Form.Item>

                <Form.Item
                  label={<TitleLabelFormItem name='Site Name'></TitleLabelFormItem>}
                >
                  <Input size='large' />
                </Form.Item>
                <Form.Item
                  label={<TitleLabelFormItem name='Square'></TitleLabelFormItem>}
                >
                  <Input size='large' />
                </Form.Item>
              </Form>
            </ConfigProvider>
          </Col>
        </Row>
      </Content>
    </>
  );
};

export default AddSitePage;
