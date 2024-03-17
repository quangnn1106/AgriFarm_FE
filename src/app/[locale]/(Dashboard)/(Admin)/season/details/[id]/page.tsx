/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { Content } from 'antd/es/layout/layout';
import {
  Breadcrumb,
  Button,
  Checkbox,
  ConfigProvider,
  DatePicker,
  DatePickerProps,
  Divider,
  Flex,
  Form,
  FormInstance,
  Input,
  Layout,
  Spin,
  Table,
  TableProps,
  Tooltip,
  notification,
  theme
} from 'antd';
import { HomeOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';

import styles from '../../../adminStyle.module.scss';
import classNames from 'classnames/bind';
import Title from 'antd/es/typography/Title';
import React, { useEffect, useState } from 'react';

import { NextIntlClientProvider, useTranslations } from 'next-intl';
import TextArea from 'antd/es/input/TextArea';
import TitleHeader from '../../component/TitleHeader/tiltle-header';
import { seasonTableColumns } from '../../component/Table/column-types';
import SeasonModelDetail, { Land, Product, SeasonModel } from '../../models/season-model';
import fetchListLandData from '@/services/Admin/Land/getLandsApi';
import { LandAndRiceVarietyColumns } from '../LandAndRiceVarietyColumn/column-types';
import fetchListProductData from '@/services/Admin/Product/getProductsApi';
import { AxiosInstance } from 'axios';
import { STATUS_CREATED, STATUS_OK } from '@/constants/https';
import { useSession } from 'next-auth/react';
import UseAxiosAuth from '@/utils/axiosClient';
import getSeasonDetailApi from '@/services/Admin/Season/getSeasonDetailApi';
import TitleLabelFormItem from '@/components/TitleLabel/TitleLabelFormItem';
import form from 'antd/es/form';
import dayjs from 'dayjs';
import { UpdateSeasonDto, updateSeasonApi } from '@/services/Admin/Season/updateSeasonApi';
import { locales } from '@/navigation';
import { NotificationPlacement } from 'antd/es/notification/interface';
import AddProductSeason from '../../component/AddProductModal/add-land-and-rice-variety-modal';
import { useAppSelector } from '@/redux/hooks';
import { CreateProductDto, createProductApi } from '@/services/Admin/Product/postProductApi';

const SeasonDetails = ({
  params
}: {
  params: { id: string; visible: boolean; onCancel: () => void };
}) => {
  const t = useTranslations('UserManagement');
  const tM = useTranslations('Message');
  const cx = classNames.bind(styles);

  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
  // handle add season action
  const [createState, setCreateState] = useState<boolean>(false);
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  const productGlobal = useAppSelector(state => state.productsReducer.productGlobal);

  //delete product
  const [deletedProds, setDeletedProds] = useState<Product[] | undefined>([])
  const checkRowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: Product[]) => {
      setDeletedProds(selectedRows);
    },
    getCheckboxProps: (record: Product) => ({
      disabled: record.name === 'Disabled',
      name: record.name
    })
  };

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[] | undefined>([]);
  // const [formModal, setFormModal] = useState<any>(any);
  const [loadingProductsData, setLoadingProductsData] = useState(true);

  const { data: session } = useSession();
  const siteId = session?.user.userInfo.siteId;
  const dateFormat = 'YYYY/MM/DD';
  const [form] = Form.useForm();
  const http = UseAxiosAuth();
  const siteName = session?.user.userInfo.siteName;

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (
    placement: NotificationPlacement,
    status: string,
    type: 'success' | 'error'
  ) => {
    api[type]({
      message: `Admin ${status}`,
      placement,
      duration: 2
    });
  };


// fetch list product data details
  const getListProductData = async (http: AxiosInstance, seasonId?: string) => {
    try {
      const responseData = await fetchListProductData(http, seasonId);
      if (responseData?.status === STATUS_OK) {
        //console.log('status ok: ' + responseData?.data);
        setProducts(responseData?.data as Product[]);
      }
    } catch (error) {
      console.log('Error: : ', error);
    }
  };

  // fetch Season details getSeasonDetailApi
  const [seasonDetail, setSeasonDetail] = useState<SeasonModelDetail | undefined>();
  const [isFetching, setIsFetching] = useState<boolean>(true);

  useEffect(() => {
    const getSeasonDetailsData = async (
      http: AxiosInstance,
      seasonId?: string,
      form?: FormInstance
    ) => {
      try {
        const responseData = await getSeasonDetailApi(http, seasonId);
        if (responseData?.status === STATUS_OK) {
          setSeasonDetail(responseData?.data as SeasonModelDetail);
    
          // config form value
          form?.setFieldsValue({
            ...responseData?.data,
            startIn: seasonDetail?.startIn ? dayjs(`${seasonDetail?.startIn}`, dateFormat) : '',
            endIn: seasonDetail?.endIn ? dayjs(`${seasonDetail?.endIn}`,  dateFormat) : ''  ,
          });
          
          //console.log(responseData?.data) 
          
        } 
        setIsFetching(false);
      } catch (error) {
        console.log('Error: :  ', error);
      }
    };
    getSeasonDetailsData(http, params.id, form);
    getListProductData(http, params.id);

  }, [http, params.id, form, seasonDetail?.startIn, seasonDetail?.endIn, products]); 

  //handle update season
  const onFinish = async (value: UpdateSeasonDto) => {
    setIsFetching(true);
    try {
      const res = await updateSeasonApi(http, params.id, value);
      if (res.data) {
        setIsFetching(false);
        openNotification('top', `${tM('update_susses')}`, 'success');
  
        console.log('update staff success', res.status);
      } else {
        openNotification('top', `${tM('update_error')}`, 'error');
  
        console.log('update staff fail', res.status);
      }
    } catch (error) {
      console.error("Error occurred while updating season:", error);
    }
  }

 



  return (
    <>
    {contextHolder}
      <Content style={{ padding: '20px 24px' }}>
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
                  paddingInlineLG: 0,
                  defaultGhostBorderColor: 'transparent'
                }
              }
            }}
          >
            <Button
              className={cx('home-btn')}
              href='#'
              size={'large'}
            >
              <HomeOutlined />
              {siteName}
            </Button>
          </ConfigProvider>
          <Breadcrumb style={{ margin: '0px 24px' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Season</Breadcrumb.Item>
            <Breadcrumb.Item>Details</Breadcrumb.Item>
          </Breadcrumb>
          <TitleHeader
            title={seasonDetail?.title ? seasonDetail?.title : 'Chưa đặt tên'}
          ></TitleHeader>

          <Flex
            align='center'
            justify='end'
          >
            <Checkbox
              checked={componentDisabled}
              onChange={e => setComponentDisabled(e.target.checked)}
            >
              {t('edit_information')}
            </Checkbox>
          </Flex>
          
          <Spin spinning={isFetching}>
          <Form
            disabled={!componentDisabled}
            form={form}
            colon={false}
            layout='vertical'
            onFinish={onFinish}
          >
            <Form.Item
              name='title'

              style={{
                maxWidth: '100%',
                margin: '0px 0px 8px 0px',
                padding: '0px 0px'
              }}
              className={cx('color-input-disable')}
              label='Title'
            >
              <Input />
            </Form.Item>
            <Form.Item
              // label={<TitleLabelFormItem name='Description'></TitleLabelFormItem>}
              style={{
                maxWidth: '100%',
                margin: '0px 0px 8px 0px',
                padding: '0px 0px'
              }}
              name='description'
              label='Description'
            >
              <TextArea rows={4} />
            </Form.Item>

            <label>Period</label>
            <Flex
              align='center'
              justify='space-between'
            >
              <Form.Item
                style={{
                  maxWidth: '100%',
                  margin: '0px 0px 8px 0px',
                  padding: '0px 24px',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
                // label={<TitleLabelFormItem name='Start: '></TitleLabelFormItem>}
                name='startIn'
                label={<label>Start </label>}
              >
                  <DatePicker onChange={onChange} 
                    format={dateFormat}/>
              </Form.Item>

              <Form.Item
                style={{
                  maxWidth: '100%',
                  margin: '0px 0px 8px 0px',
                  padding: '0px 0px',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
                // label={<TitleLabelFormItem name='End: '></TitleLabelFormItem>}
                name='endIn'
                label={<label>End </label>}
              >
                {/* <Flex
                  align='center'
                  justify='center'
                  gap={10}
                > */}
                  <DatePicker onChange={onChange} format={dateFormat}/>
                {/* </Flex> */}
              </Form.Item>
            </Flex>

            <label>Land & Rice variety</label>
            <Flex
              align='center'
              justify='flex-start'
              gap={20}
              style={{ padding: '12px 0px' }}
            >
              <Button
                type='primary'
                icon={<PlusOutlined />}
                onClick={() => setCreateState(true)}
              >
                Add
              </Button>
              
              <AddProductSeason
              params={{
                seasonId: params.id,
                visible: createState,
                onCancel: () => setCreateState(false),
                isUpdate: true
              }}
            ></AddProductSeason>
              <Button
                type='primary'
                danger
                icon={<MinusOutlined />}
              >
                Delete
              </Button>
            </Flex>
            
            {/* <ConfigProvider
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
        > */}
            <Table
              loading={loading}
              rowKey={'id'}
              columns={LandAndRiceVarietyColumns}
              bordered
              rowSelection={{
                type: 'checkbox',
                ...checkRowSelection
              }}
              scroll={{ x: 'max-content' }}
              className={cx('table_style')}
              dataSource={products?.map(product => ({
                ...product
              }))}
            />

            {/* </ConfigProvider> */}
            <Form.Item
                  style={{
                    maxWidth: '90%',
                    margin: '30px 0px 8px 0px',
                    padding: '0px 20px'
                  }}
                >
                  <Button
                    className={cx('bg-btn')}
                    htmlType='submit'
                    type='primary'
                    loading={isFetching}
                  >
                    {t('save_change')}
                  </Button>
                </Form.Item>
          </Form>
          </Spin>
  
        </ConfigProvider>
      </Content>
    </>
  );
};
export default SeasonDetails;
