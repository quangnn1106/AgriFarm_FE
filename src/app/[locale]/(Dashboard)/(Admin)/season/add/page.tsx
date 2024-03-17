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
  Input,
  Layout,
  Modal,
  Table,
  TableProps,
  Tooltip,
  notification,
  theme
} from 'antd';
import { HomeOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';

import styles from '../../adminStyle.module.scss';
import classNames from 'classnames/bind';
import Title from 'antd/es/typography/Title';
import { use, useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';
import TextArea from 'antd/es/input/TextArea';
import TitleHeader from '../component/TitleHeader/tiltle-header';
import { seasonTableColumns } from '../component/Table/column-types';
import { Land, Product } from '../models/season-model';
import fetchListLandData from '@/services/Admin/Land/getLandsApi';
import { LandAndRiceVarietyColumns } from '../details/LandAndRiceVarietyColumn/column-types';
import fetchListProductData from '@/services/Admin/Product/getProductsApi';
import AddProductSeason from '../component/AddProductModal/add-land-and-rice-variety-modal';
import { ProductsColumns } from './component/ProductsColumn/column-types';
import { CreateProductDto } from '@/services/Admin/Product/postProductApi';
import FormItem from 'antd/es/form/FormItem';
import {
  CreateSeasonDto,
  createSeasonApi
} from '@/services/Admin/Season/createSeasonApi';
import UseAxiosAuth from '@/utils/axiosClient';
import { NotificationPlacement } from 'antd/es/notification/interface';
import { setProductsAction } from '@/redux/features/season-slice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

type Props = {};
const SeasonCreate = (props: Props) => {
  const t = useTranslations('UserManagement');
  const cx = classNames.bind(styles);
  const tM = useTranslations('Message');

  const http = UseAxiosAuth();

  const [loadingProducts, setLoadingProducts] = useState<boolean>(false);
  const [productRenders, setProductRenders] = useState<Product[] | undefined>([]);
  const [productRenderTemps, setProductRenderTemps] = useState<Product[] | undefined>([]);
  const [createProducts, setCreatedProducts] = useState<
    CreateProductDto[] | undefined | null
  >([]);

  const [createState, setCreateState] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  let productGlobal = useAppSelector(state => state.productsReducer.productGlobal);

  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);

  //form
  const [form] = Form.useForm();
  const dateFormat = 'YYYY/MM/DD';

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };



  //handle delete product item
  const [deletedProducts, setDeletedProducts] = useState<Product[] | undefined>([]);
  const [deleteState, setDeleteState] = useState<boolean>(false);
  const [deletedIds, setDeleteIds] = useState<React.Key[]>([]);

  const checkRowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: Product[]) => {
      console.log('Key: ',selectedRowKeys);
      setDeleteIds(selectedRowKeys);
    if (productRenderTemps !== undefined) {
      setProductRenderTemps(productRenderTemps?.filter(item => !selectedRowKeys?.includes(item.id ? item.id : '')));
    }
    // console.log('Product temp render row select: ', productRenderTemps);
    }
  };


  const ResetData = () => {
    setCreatedProducts([]) 
  }



  const onDelete = () => {


    // console.log(deletedIds.toLocaleString());
    // deletedIds.map((item, idx) => {
    //   setProductRenderTemps(productRenderTemps?.filter(prodItem => prodItem.id !== item));
    //ResetData();
    // })
    console.log('Product temp render: ', productRenderTemps);
    
    // setProductRenders(productRenderTemps);
    
    console.log('Product render: ', productRenders);
    
    // productRenderTemps?.map((item, idx) => {
    //   createProducts?.push({
    //     land: item.land,
    //     seed: item.seed
    //   });
    // });
    //  if (productRenderTemps !== undefined) {
    //   setProductRenderTemps(productRenderTemps?.filter(item => !deletedIds?.includes(item.id ? item.id : '')));
    // }
    console.log('Product temp render row select: ', productRenderTemps);

    updateData(productRenderTemps);
    console.log('create product: ', createProducts);
    
    setDeleteState(false);
  }
  

  const handleAddProducts = () => {
    if (productGlobal?.length !== 0) {
      productGlobal?.map((item, idx) => {
        console.log('item', item);
        if (item.land?.id) {
          console.log('a');
          productRenderTemps?.push({
            id: Math.random().toString(36).substring(2, 8),
            name: '',
            totalQuantity: 0,
            quantity: 0,
            land: item.land,
            seed: item.seed,
            season: {}
          });
        }
      });
      // form?.setFieldValue('cultivationDetail',createProducts);
      // return productRenderTemps;
      console.log('My 1: ', productRenderTemps);
      updateData(productRenderTemps);
    };
    //dispatch(setProductsAction([]));
    console.log('Products global:',productGlobal);
  };

  const updateData = (productsTemp: Product[] | undefined) => {
    ResetData();
    productsTemp?.map((item, idx) => {
      // createProducts?.filter(itemCreate => itemCreate.land?.id == item.land?.id);
      createProducts?.push({
        land: item.land,
        seed: item.seed
      });
    });
    form?.setFieldValue('cultivationDetail',createProducts);
    setProductRenders(productsTemp);

  }

  useEffect(() => {
    updateData(productRenderTemps);
  }, [productRenders]);


  useEffect(() => {
    handleAddProducts();
  }, [productGlobal]);

  //notification

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

  //handle submit form create
  const onSubmit = async (value: CreateSeasonDto) => {
    console.log(value);
    try {
      const res = await createSeasonApi(http, value);
      if (res.data) {
        openNotification('top', `${tM('update_susses')}`, 'success');

        console.log('create staff success', res.status);
      } else {
        openNotification('top', `${tM('update_error')}`, 'error');

        console.log('create staff fail', res.status);
      }
    } catch (error) {
      console.error('Error occurred while updating season:', error);
    }
  };

  return (
    <>
      {contextHolder}
      <Content style={{ padding: '20px 24px' }}>
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
            Farm Name
          </Button>
        </ConfigProvider>
        <Breadcrumb style={{ margin: '0px 24px' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Season</Breadcrumb.Item>
          <Breadcrumb.Item>Details</Breadcrumb.Item>
        </Breadcrumb>
        <TitleHeader title={'Spring Details'}></TitleHeader>

        <Form
          form={form}
          colon={false}
          layout='vertical'
          onFinish={onSubmit}
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
              name='startIn'
                label={<label>Start </label>}
            >
                <DatePicker onChange={onChange} format={dateFormat}/>
             
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
              onClick={() => setCreateState(true)}
              icon={<PlusOutlined />}
            >
              Add
            </Button>
            <AddProductSeason
              params={{
                seasonId: '',
                visible: createState,
                onCancel: () => setCreateState(false),
                isUpdate: false
              }}
            ></AddProductSeason>
            <Button
              type='primary'
              danger
              icon={<MinusOutlined />}
              onClick={() => {setDeleteState(true)}}
            >
              Delete
            </Button>
            <Modal title="Confirm Delete Product" open={deleteState} onOk={onDelete} 
            onCancel={() => {setDeleteState(false)}}></Modal>
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
              loading={loadingProducts}
              rowKey={'id'}
              columns={LandAndRiceVarietyColumns}
              bordered
              rowSelection={{
                type: 'checkbox',
                ...checkRowSelection
              }}
              scroll={{ x: 'max-content' }}
              className={cx('table_style')}
              dataSource={productRenders?.map(product => ({
                ...product
              }))}
            />
          </ConfigProvider>
          <FormItem name='cultivationDetail' style={{height:'0px'}}></FormItem>
          <Form.Item
            style={{
              margin: '30px 0px 8px 0px',
              padding: '0px 20px',
              display: 'flex',
              justifyContent: 'end'
            }}
          >
            <Button
              className={cx('bg-btn')}
              htmlType='submit'
              type='primary'
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </>
  );
};
export default SeasonCreate;
