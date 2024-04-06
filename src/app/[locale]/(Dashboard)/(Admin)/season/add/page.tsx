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
import { HomeOutlined, PlusOutlined, MinusOutlined, SaveOutlined } from '@ant-design/icons';

import styles from '../../adminStyle.module.scss';
import classNames from 'classnames/bind';
import Title from 'antd/es/typography/Title';
import { use, useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';
import TextArea from 'antd/es/input/TextArea';
import TitleHeader from '../component/TitleHeader/tiltle-header';
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
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { getURL } from 'next/dist/shared/lib/utils';
import { redirect } from 'next/navigation';
import { useRouter } from '@/navigation';

type Props = {};
const SeasonCreate = (props: Props) => {
  const t = useTranslations('Common');
  const tSeason = useTranslations('Season');
  const cx = classNames.bind(styles);
  const tM = useTranslations('Message');
  const router = useRouter();

  const http = UseAxiosAuth();
  const { data: session } = useSession();
  const siteId = session?.user.userInfo.siteId;
  const siteName = session?.user.userInfo.siteName;

  const [productRenders, setProductRenders] = useState<Product[] | undefined>([]);
  const [productRenderTemps, setProductRenderTemps] = useState<Product[] | undefined>([]);
  const [createProducts, setCreatedProducts] = useState<
    CreateProductDto[] | undefined | null
  >([]);

  const [createState, setCreateState] = useState<boolean>(false);
  let productGlobal = useAppSelector(state => state.productsReducer.productGlobal);

  //breadcrumb
  // const HOMEURL = getURL();
  const breadCrumb = [
    {
        title: <Link href={`/`}>{t('home')}</Link>
    },
    {
        title: <Link href={`/season`}>{t('season')}</Link>
    },
    {
        title: t('Add_new')
    }
];

  //form
  const [form] = Form.useForm();
  const dateFormat = 'YYYY/MM/DD';

  //handle change date picker
  const handleChangeStartIn: DatePickerProps['onChange'] = (date, dateString) => {
  };
  const handleChangeEndIn: DatePickerProps['onChange'] = (date, dateString) => {
  };

  const ResetData = () => {
    setCreatedProducts([]) 
  }

  //handle delete product item
  const [deleteState, setDeleteState] = useState<boolean>(false);
  const [deleteBtnState, setDeleteBtnState] = useState<boolean>(true);


  const checkRowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: Product[]) => {
      if (selectedRowKeys.length > 0) {
        setDeleteBtnState(false);
      } else {
        setDeleteBtnState(true);
      }
      if (productRenderTemps !== undefined) {
        setProductRenderTemps(productRenderTemps?.filter(item => !selectedRowKeys?.includes(item.id ? item.id : '')));
      }
    }
  };

  const onDelete = () => {
    updateData(productRenderTemps);
    setDeleteState(false);
    setDeleteBtnState(true)
  }


  // handle add product item
  const handleAddProducts = () => {
    if (productGlobal?.length !== 0) {
      productGlobal?.map((item, idx) => {
        if (item.land?.id) {
          console.log('a');
          productRenderTemps?.push({
            id: Math.random().toString(36).substring(2, 8),
            name: '',
            totalQuantity: 0,
            currentQuanlity: 0,
            land: item.land,
            seed: item.seed,
            season: {}
          });
        }
      });
      updateData(productRenderTemps);
    };
  };

  const updateData = (productsTemp: Product[] | undefined) => {
    ResetData();
    productsTemp?.map((item, idx) => {
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
      message: `${status}`,
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
        openNotification('top', t('Create_successfully'), 'success');

        console.log('create staff success', res.status);
      } else {
        openNotification('top', t('Create_fail'), 'error');

        console.log('create staff fail', res.status);

      }
      router.push(`/season`);
      console.log(router.push(`/season`));
    } catch (error) {
      console.error('Error occurred while updating season:', error);
    }
  };

  //handle change title
  const [seasonTitle, setSeasonTitle] = useState<string>('');
  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSeasonTitle(e.target.value);
  }

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
            {siteName}
          </Button>
        </ConfigProvider>
        <Breadcrumb style={{ margin: '0px 24px' }} items={breadCrumb}>
        </Breadcrumb>
        <TitleHeader title={seasonTitle}></TitleHeader>

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
            label={t('Title')}
            rules={[{ required: true, message: tSeason('Please_input_season_title!') }]} 
          >
            <Input value={seasonTitle} onChange={handleChangeTitle}/>
          </Form.Item>
          <Form.Item
            style={{
              maxWidth: '100%',
              margin: '0px 0px 8px 0px',
              padding: '0px 0px'
            }}
            name='description'
            label={t('Description')}
          >
            <TextArea rows={4} />
          </Form.Item>

          <label>{t('Period')}</label>
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
              label={<label>{t('Start')}</label>}
              rules={[{ required: true, message: t('Please_select_start_date!') }]} 
            >
                <DatePicker onChange={handleChangeStartIn} format={dateFormat}/>
             
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
                label={<label>{t('End')}</label>}
                rules={[{ required: true, message: t('Please_select_end_date!') }]} 
              >
                {/* <Flex
                  align='center'
                  justify='center'
                  gap={10}
                > */}
                  <DatePicker onChange={handleChangeEndIn} format={dateFormat}/>
                {/* </Flex> */}
              </Form.Item>
          </Flex>

          <label>{tSeason('Land_&_Seed')}</label>
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
              {t('Add')}
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
              disabled={deleteBtnState}
            >
              Delete
            </Button>
            <Modal title={t('delete_product_confirm')} open={deleteState} onOk={onDelete} 
            onCancel={() => {setDeleteState(false)}} centered={true} okText={t('Yes')} cancelText={t('Cancel')}></Modal>
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
              rowKey={'id'}
              columns={LandAndRiceVarietyColumns()}
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
              icon={<SaveOutlined />}
            >
              {t('Submit')}
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </>
  );
};
export default SeasonCreate;
