'use client';
import React, { useEffect, useState } from 'react';
import NumberBlock from './component/number-block';
import { Button, ConfigProvider, DatePicker, DatePickerProps, Flex, Select, SelectProps, Table, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import styles from '../adminStyle.module.scss';
import statStyle from './statisticsStyle.module.scss';
import classNames from 'classnames/bind';
import UseAxiosAuth from '@/utils/axiosClient';
import { useSession } from 'next-auth/react';
import { FaCloudShowersHeavy, FaDroplet, FaTemperatureLow, FaFan,FaCloudSunRain,  FaWind } from "react-icons/fa6";

import {
  AntCloudOutlined,
  HomeOutlined,
  SunOutlined,
  ThunderboltOutlined
} from '@ant-design/icons';
import IconText from '@/components/IconText/IconText';

import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { AxiosInstance } from 'axios';
import fetchListProductData from '@/services/Admin/Product/getProductsApi';
import { STATUS_OK } from '@/constants/https';
import getWeathersApi from '@/services/Weather/getWeathersApi';
import { DataWeather, Forecast, Weather } from '@/services/Weather/weather-models';
import { Product } from '../season/models/season-model';
import TitleHeader from '../season/component/TitleHeader/tiltle-header';
import { ProductTableColumns } from './component/Table/product-column-type';

const Statistic = () => {
  const { data: session } = useSession();
  const siteId = session?.user.userInfo.siteId;
  const http = UseAxiosAuth();
  const siteName = session?.user.userInfo.siteName;

  const cx = classNames.bind(styles);
  const ss = classNames.bind(statStyle);

  const optionSeasons: SelectProps['options'] = [
    { value: 'Dong Xuan', label: 'Đông Xuân' },
    { value: 'He Thu', label: 'Hè Thu' },
    { value: 'Thu Dong', label: 'Thu Đông' },
  ];
  const handleChangeSeason = (value: string) => {
    console.log(`selected ${value}`);
  };
  const handleChangeYear: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  //get product
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[] | undefined>([]);
  const [dataWeather, setDataWeather] = useState<DataWeather>();
  const [weather, setWeathers] = useState<Forecast>();
  
  // fetch list product data details
  const getListProductData = async (http: AxiosInstance, seasonId?: string) => {
    try {
      setLoading(true);
      const responseData = await fetchListProductData(http, seasonId);
      if (responseData?.status === STATUS_OK) {
        //console.log('status ok: ' + responseData?.data);
        setProducts(responseData?.data as Product[]);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log('Error: : ', error);
    }
  };

    // fetch list product data details
    const getWeathers = async (http: AxiosInstance) => {
      try {
        await getWeathersApi(http).then((res) => {
          const data = res.data as DataWeather;
          console.log(data);
          setWeathers(data.list[0]);
        });
        
      } catch (error) {
        setLoading(false);
        console.log('Error: : ', error);
      }
    };

  useEffect(() => {
    getListProductData(http, '0bbafb0c-6c36-4996-b0c3-417443ad1f6e');
    getWeathers(http);
  }, [http]);

  return (
    <> 
      <Content style={{ padding: '20px 20px', maxWidth: '1280px' }}>
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
            className={cx('home-btn')}
            href='/'
            size={'large'}
          >
            <HomeOutlined />
            {siteName}
          </Button>
        </ConfigProvider>
        <TitleHeader title='Thống kê'></TitleHeader>
        <Flex
          gap={10}
          style={{ width: '100%', marginTop: '20px' }}
          wrap='wrap'
          vertical={false}
          justify='center'
        >
          <div style={{ width: '30%' }}>
            <IconText
              icon={<FaCloudSunRain />}
              label='Thời tiết'
              value='rain'
            ></IconText>
          </div>
          <div style={{ width: '30%' }}>
            <IconText
              icon={<FaDroplet />}
              label='Độ ẩm'
              value='rain'
            ></IconText>
          </div>
          <div style={{ width: '30%' }}>
            <IconText
              icon={<FaTemperatureLow />}
              label='Nhiệt độ'
              value='rain'
            ></IconText>
          </div>
          <div style={{ width: '30%' }}>
            <IconText
             icon={<FaWind />}
              label='Tốc độ gió'
              value='rain'
            ></IconText>
          </div>
          <div style={{ width: '30%' }}>
            <IconText
             icon={<FaFan />}
              label='Weather'
              value='rain'
            ></IconText>
          </div>
          <div style={{ width: '30%' }}>
            <IconText
              icon={<FaCloudShowersHeavy />}
              label='Weather'
              value='rain'
            ></IconText>
          </div>
        </Flex>
        <Flex className={ss('total-section')} vertical={true} justify='center'>
        <Flex gap={10} style={{marginBottom: '12px'}} align='center' wrap='wrap'>
          <span style={{fontSize: '1.25rem', fontWeight: 600}}>Thống kê theo vụ hoặc năm</span>
          <Select
            defaultValue=''
            style={{ width: 120 }}
            onChange={handleChangeSeason}
            options={optionSeasons}
            placeholder='Chọn mùa'
          />
         <DatePicker onChange={handleChangeYear} picker="year" placeholder='Chọn năm'/>
        </Flex>
        <Flex
          gap={10}
          style={{ width: '100%' }}
          wrap='wrap'
          justify='center'
        >
          <NumberBlock
            totalNumbers={1000}
            title={'Tổng doanh thu'}
            color={
              '#FFE2E5'
            }
            rate={-8}
            float={2}
            unit='Tr VND'
            timeCompare='mùa trước'
          ></NumberBlock>
          <NumberBlock
            totalNumbers={100}
            title={'Tổng sản lượng'}
            color={
              '#DCFCE7'
            }
            rate={-8}
            float={0}
            unit='tấn'
            timeCompare='mùa trước'
          ></NumberBlock>
          <NumberBlock
            totalNumbers={100}
            title={'Năng suất'}
            color={
              '#fff4de'
            }
            rate={8}
            float={0}
            unit='tạ/ha'
            timeCompare='mùa trước'
          ></NumberBlock>
          <NumberBlock
            totalNumbers={10}
            title={'Tổng số nhân công'}
            color={
              '#F3E8FF'
            }
            rate={0}
            float={2}
            unit='Người'
            timeCompare='mùa trước'
          ></NumberBlock>
          <NumberBlock
            totalNumbers={1000}
            title={'Tổng diện tích'}
            color={
              '#E5F9FF'
            }
            rate={0}
            float={2}
            unit='m^2'
            timeCompare='mùa trước'
          ></NumberBlock>
          <NumberBlock
            totalNumbers={1000}
            title={'Tổng doanh thu'}
            color={
              '#F8FFE5'
            }
            rate={-8}
            float={2}
            unit='Tr VND'
            timeCompare='mùa trước'
          ></NumberBlock>
        </Flex>
        </Flex>
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
        <Table
                loading={loading}
                rowKey={'id'}
                columns={ProductTableColumns()}
                bordered
                scroll={{ x: 'max-content' }}
                className={cx('table_style')}
                dataSource={products?.map(product => ({
                  ...product
                }))}
              />
              </ConfigProvider>
              {/* <Typography>
                <pre>{JSON.stringify(weather, null, 2)}</pre>
              </Typography> */}
      </Content>
    </>
  )
};

export default Statistic;
