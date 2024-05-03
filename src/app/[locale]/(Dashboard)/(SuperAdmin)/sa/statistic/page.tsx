'use client';
import React, { useEffect, useState } from 'react';
import NumberBlock from '../../../(Admin)/statistic_admin/component/number-block';
import {
  Button,
  ConfigProvider,
  DatePicker,
  DatePickerProps,
  Flex,
  Select,
  SelectProps,
  Table,
  Typography
} from 'antd';
import { Content } from 'antd/es/layout/layout';
import styles from '../../../(Admin)/adminStyle.module.scss';
import statStyle from '../statistic/statisticSA.module.scss';
import classNames from 'classnames/bind';
import UseAxiosAuth from '@/utils/axiosClient';
import { useSession } from 'next-auth/react';
import {
  FaCloudShowersHeavy,
  FaDroplet,
  FaTemperatureLow,
  FaFan,
  FaCloudSunRain,
  FaWind
} from 'react-icons/fa6';

import {
  AntCloudOutlined,
  HomeOutlined,
  SunOutlined,
  ThunderboltOutlined
} from '@ant-design/icons';
import IconText from '@/components/IconText/IconText';
//import TitleHeader from '../../(Admin)/season/component/TitleHeader/tiltle-header';

//import dayjs from 'dayjs';
//import type { Dayjs } from 'dayjs';
//import { ProductTableColumns } from '../../(Admin)/statistic_admin/component/Table/product-column-type';
//import { Product } from '../../(Admin)/season/models/season-model';
import { AxiosInstance } from 'axios';
import fetchListProductData from '@/services/Admin/Product/getProductsApi';
import { STATUS_OK } from '@/constants/https';
// import getWeathersApi from '@/services/Weather/getWeathersApi';
// import { Weather } from '@/services/Weather/weather-models';
import { Product } from '../../../(Admin)/season/models/season-model';
import TitleHeader from '../../../(Admin)/season/component/TitleHeader/tiltle-header';
import getStatisticsSuperAdmin, { StatisticData } from '@/services/SuperAdmin/Statistics/getStatistic';

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
    { value: 'Thu Dong', label: 'Thu Đông' }
  ];
  const handleChangeSeason = (value: string) => {
    console.log(`selected ${value}`);
  };

  //api/v1/disease/disease-diagnoses/get-statistics

  const nowDay = new Date();

  const [month, setMonth] = useState<number>(nowDay.getMonth() as number + 1);
  const [year, setYear] = useState<number>(nowDay.getFullYear() as number);
  const [statisticsData, setStatisticsData] = useState<StatisticData>();
  const handleChangeMonth: DatePickerProps['onChange'] = (date, dateString) => {
    console.log('month:');
    console.log(date, dateString);
    setMonth(date?.month() as number + 1)
    console.log(date?.month() as number);
  };
  const handleChangeYear: DatePickerProps['onChange'] = (date, dateString) => {
   setYear(date?.year() as number)
  };

  const getDiseaseData = async (http: AxiosInstance, month?: number, year?: number) => {
    try {
      const res = await getStatisticsSuperAdmin(http, month, year);
      setStatisticsData(res.data as StatisticData);
    } catch (error) {
      console.error('Error calling API Statistic Super:', error);
    }
  }

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
    getDiseaseData(http, month, year);
    // getWeathers();
  }, [http,  month, year]);

  // get weather
  // const [weather, setWeathers] = useState<Weather | undefined>();

  // const getWeathers = async () => {
  //   try {
  //     const responseData = await getWeathersApi();
  //   } catch (error) {
  //     console.log('Error: : ', error);
  //   }
  // };

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
          className={ss('total-section')}
          vertical={true}
          justify='center'
        >
          <Flex
            gap={10}
            style={{ marginBottom: '12px' }}
            align='center'
            wrap='wrap'
          >
            <span style={{ fontSize: '1.25rem', fontWeight: 600 }}>Thống kê theo </span>
            {/* <Select
              defaultValue=''
              style={{ width: 120 }}
              onChange={handleChangeSeason}
              options={optionSeasons}
              placeholder='Chọn tháng'
            /> */}
            <DatePicker
              onChange={handleChangeMonth}
              picker='month'
              placeholder='Chọn tháng'
            />
            <DatePicker
              onChange={handleChangeYear}
              picker='year'
              placeholder='Chọn năm'
            />
          </Flex>
          <Flex
            gap={10}
            style={{ width: '100%' }}
            wrap='wrap'
            justify='center'
          >
            <NumberBlock
              totalNumbers={8.9}
              title={'Tổng doanh thu'}
              color={'#FFE2E5'}
              rate={100}
              float={2}
              unit='tr VND'
              timeCompare='tháng trước'
            ></NumberBlock>
            {/* <NumberBlock
              totalNumbers={100}
              title={'Tổng số đơn hàng'}
              color={'#DCFCE7'}
              rate={4}
              float={0}
              unit='đơn'
              timeCompare='mùa trước'
            ></NumberBlock> */}
            {/* <NumberBlock
              totalNumbers={100}
              title={'Tổng số gói dịch vụ đã bán'}
              color={'#fff4de'}
              rate={8}
              float={0}
              unit='gói'
              timeCompare='mùa trước'
            ></NumberBlock> */}
            {/* <NumberBlock
              totalNumbers={10}
              title={'Tổng số nhân công'}
              color={'#F3E8FF'}
              rate={0}
              float={2}
              unit='người'
              timeCompare='mùa trước'
            ></NumberBlock> */}
            <NumberBlock
              totalNumbers={statisticsData?.numOfDiagnostic as number}
              title={'Tổng số lượt sử dụng chức năng dự đoán bệnh'}
              color={'#E5F9FF'}
              rate={30}
              float={0}
              unit='lượt'
              timeCompare='tháng trước'
            ></NumberBlock>
            <NumberBlock
              totalNumbers={statisticsData?.numOfPendingFeedback as number}
              title={'Tổng số phản hồi đang chờ'}
              color={'#F8FFE5'}
              rate={8}
              float={0}
              unit='phản hồi'
              timeCompare='tháng trước'
            ></NumberBlock>
          </Flex>
        </Flex>

        {/* <Typography>
                <pre>{JSON.stringify(weather, null, 2)}</pre>
              </Typography> */}
      </Content>
    </>
  );
};

export default Statistic;
