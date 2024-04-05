'use client';
import React, { useEffect, useState } from 'react';
import NumberBlock from '../../(Admin)/statistic_admin/component/number-block';
import { Button, ConfigProvider, DatePicker, DatePickerProps, Flex, Select, SelectProps, Table } from 'antd';
import { Content } from 'antd/es/layout/layout';
import styles from '../../(Admin)/adminStyle.module.scss';
import statStyle from '../../(Admin)/statistic_admin/statisticsStyle.module.scss';
import classNames from 'classnames/bind';
import UseAxiosAuth from '@/utils/axiosClient';
import { useSession } from 'next-auth/react';

import {
  AntCloudOutlined,
  HomeOutlined,
  SunOutlined,
  ThunderboltOutlined
} from '@ant-design/icons';
import IconText from '@/components/IconText/IconText';
import TitleHeader from '../../(Admin)/season/component/TitleHeader/tiltle-header';

import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { ProductTableColumns } from '../../(Admin)/statistic_admin/component/Table/product-column-type';
import { Product } from '../../(Admin)/season/models/season-model';
import { AxiosInstance } from 'axios';
import fetchListProductData from '@/services/Admin/Product/getProductsApi';
import { STATUS_OK } from '@/constants/https';

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

  useEffect(() => {
    getListProductData(http, '0bbafb0c-6c36-4996-b0c3-417443ad1f6e');
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
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M5.119 23.764a.802.802 0 0 1 0-1.138l4.166-4.165a.803.803 0 0 1 1.386.557a.802.802 0 0 1-.248.581l-4.165 4.166a.802.802 0 0 1-1.138 0zm8.475-3.94a.802.802 0 0 1 0-1.138l3.059-3.056h-8.5l-4.198 4.195a.804.804 0 1 1-1.138-1.138l3.06-3.06h-.135a5.806 5.806 0 0 1 0-11.612h.067h-.003c.09 0 .18.007.269.011c1.364-2.42 3.917-4.027 6.846-4.027a7.832 7.832 0 0 1 7.832 7.831v.015a3.954 3.954 0 0 1 3.008 3.833a3.946 3.946 0 0 1-3.946 3.946h-.884l-4.198 4.198a.802.802 0 0 1-1.138 0zM1.609 9.82a4.201 4.201 0 0 0 4.196 4.197h14.004a2.338 2.338 0 1 0-.001-4.678c-.577 0-1.104.209-1.512.554l.003-.003a.806.806 0 0 1-1.045-1.227l.001-.001a3.924 3.924 0 0 1 1.852-.871l.024-.004A6.22 6.22 0 0 0 7.774 4.336l-.014.021a5.797 5.797 0 0 1 1.68.937l-.011-.009a.805.805 0 1 1-1.008 1.256l.001.001a4.127 4.127 0 0 0-2.606-.919h-.011h.001A4.2 4.2 0 0 0 1.607 9.82z"/></svg>}
              label='Weather'
              value='rain'
            ></IconText>
          </div>
          <div style={{ width: '30%' }}>
            <IconText
              icon={<AntCloudOutlined />}
              label='Weather'
              value='rain'
            ></IconText>
          </div>
          <div style={{ width: '30%' }}>
            <IconText
              icon={<AntCloudOutlined />}
              label='Weather'
              value='rain'
            ></IconText>
          </div>
          <div style={{ width: '30%' }}>
            <IconText
             icon={<AntCloudOutlined />}
              label='Weather'
              value='rain'
            ></IconText>
          </div>
          <div style={{ width: '30%' }}>
            <IconText
             icon={<AntCloudOutlined />}
              label='Weather'
              value='rain'
            ></IconText>
          </div>
          <div style={{ width: '30%' }}>
            <IconText
              icon={<AntCloudOutlined />}
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
      </Content>
    </>
  );
};

export default Statistic;
