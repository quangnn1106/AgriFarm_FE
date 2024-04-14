'use client';
import {
  Breadcrumb,
  Button,
  ConfigProvider,
  Divider,
  Drawer,
  Flex,
  Form,
  FormInstance,
  Layout,
  Modal,
  Space,
  Table,
  Input,
  TableProps,
  Tooltip,
  theme
} from 'antd';
import { Content } from 'antd/es/layout/layout';
import {
  HomeOutlined,
  PlusOutlined,
  MinusOutlined,
  WarningOutlined,
  SearchOutlined
} from '@ant-design/icons';
import styles from '../adminStyle.module.scss';
import stylesPesticideManagement from './pesticideStyle.module.scss';
import classNames from 'classnames/bind';
import pesticideStyle from './pesticideStyle.module.scss';
import UseAxiosAuth from '@/utils/axiosClient';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from '@/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { AxiosInstance } from 'axios';
import { Pesticide } from './models/pesticide-models';
import getPesticidesApi from '@/services/Admin/Pesticide/getPesticidesApi';
import { deletePesticideApi } from '@/services/Admin/Pesticide/deletePesticideApi';
import FilterSection from './component/FilterSection/filterSection';
import { PesticideTableColumns } from './component/Table/column-type';
import UpdatePesticideFormDrawer from './component/UpdatePesticideDrawer/update-pesticide-drawer';
import AddPesticideFormDrawer from './component/AddPesticideDrawer/add-pesticide-drawer';

interface SearchForm {
  keyword: string
}

type Props = {};
const PesticideManagement = (props: Props) => {
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken();

  const t = useTranslations('Common');
  const p = useTranslations('Pesticide');

  //style
  const cx = classNames.bind(styles);
  const st = classNames.bind(pesticideStyle);
  const stylePesticideManagement = classNames.bind(stylesPesticideManagement);

  const { data: session } = useSession();
  const siteId = session?.user.userInfo.siteId;
  const http = UseAxiosAuth();
  const siteName = session?.user.userInfo.siteName;

  const [form] = Form.useForm<SearchForm>();


  // Navigation
  const router = useRouter();
  const pathName = usePathname();
  const breadCrumb = [
    {
      title: <Link href={`/`}>{t('home')}</Link>
    },
    {
      title: <Link href={`/pesticide`}>{p('Pesticide')}</Link>
    }
  ];

  // handle loading data
  const [loading, setLoading] = useState<boolean>(true);
  const [pesticides, setPesticides] = useState<Pesticide[] | undefined>([]);

  const getListPesticidesApi = async (http: AxiosInstance, keySearch?: string) => {
    try {
      // let responseData = await getPesticidesApi(http);
      let responseData:any;
      if(keySearch=="" || keySearch?.trim()=="" || keySearch==undefined || keySearch==null) {
        responseData = await getPesticidesApi(http);
      } else {
        responseData = await getPesticidesApi(http, keySearch);
      }
      setPesticides(responseData.data as Pesticide[]);
      setLoading(false);
      onResetSearchSubmit();
    } catch (error) {
      console.error('Error calling API getListPesticidesApi:', error);
    }
  };


  //handle load details
  const [pesticideId, setPesticideId] = useState<string>('');
  const [openPesticideDetailDrawer, setOpenPesticideDetailDrawer] = useState<boolean>(false);

 
  const handleDetails = async (id: string) => {
    setPesticideId(id)
    setOpenPesticideDetailDrawer(true);
  };
  const closePesticideDetailDrawer = () => {
    setOpenPesticideDetailDrawer(false);
  };


  //handle update pesticide
  const [openPesticideUpdateDrawer, setOpenPesticideUpdateDrawer] = useState<boolean>(false);
  const handleViewHistory = async (id: string) => {
    setPesticideId(id)
    router.replace(`/suppliesHistory/pesticide/${id}`);
  };


  //handle delete
  const [deleteState, setDeleteState] = useState<boolean>(false);
  const [deleteBtnState, setDeleteBtnState] = useState<boolean>(true);
  const [deletedPesticides, setDeletePesticides] = useState<React.Key[]>([]);

  const deletePesticide = async (http: AxiosInstance, pesticideId?: string) => {
    try {
      const res = await deletePesticideApi(http, pesticideId);
      getListPesticidesApi (http);
    } catch (error) {
      console.error('Error calling API Delete Season:', error);
    }
  }

  const checkRowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: Pesticide[]) => {
      if (selectedRowKeys.length > 0) {
        setDeleteBtnState(false);
        setDeletePesticides(selectedRowKeys);
      } else {
        setDeleteBtnState(true);
      }
    }
  };
  const handleDelete = (id: string) => {
    deletePesticide(http, id);
  };
  const deleteMultiple = () => {
    deletedPesticides.map(function (item) {
      deletePesticide(http, item.toString());
    });
    setDeleteState(false);
    setDeleteBtnState(true);
  };
  const onChange: TableProps<Pesticide>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  //handle add pesticide
  const [openAddPesticide, setOpenAddPesticide] = useState(false);

  const showAddPesticideDrawer = () => {
    setOpenAddPesticide(true);
  };

  const closeAddPesticideDrawer = () => {
    setOpenAddPesticide(false);
  };

  //handle search
  const [searchSubmit, setSearchSubmit] = useState(false);
  const onSearchSubmit = () => {
    setSearchSubmit(true)
  }
  const onResetSearchSubmit = () => {
    setSearchSubmit(false)
  }

  useEffect(() => {
    getListPesticidesApi(http, form?.getFieldValue('keyword'));
  }, [http, siteId, openAddPesticide, openPesticideDetailDrawer, openPesticideUpdateDrawer, searchSubmit]);

  return (
    <>
      
      <Content style={{ padding: '20px 0px' }}>
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
        <Breadcrumb
          style={{ margin: '0px 24px' }}
          items={breadCrumb}
        ></Breadcrumb>
        <Divider
          orientation='left'
          plain
          style={{ margin: '0px' }}
        >
          {t('search_condition')}
        </Divider>
        <ConfigProvider
        theme={{
          components: {
            Form: {
              itemMarginBottom: 8
            }
          }
        }}
      >
        <Form
          form={form}
          name='basic'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          autoComplete='off'
          className={st('margin-form-item')}
          style={{padding: '0px 24px'}}
          
        >
          <Form.Item
            label={t('keyword')}
            name='keyword'
          >
            <Input
              placeholder={t('Input_search_text')}
              style={{ width: '50%' }}
            ></Input>
          </Form.Item>
          <Form.Item label=''>
            <Flex
              align='center'
              justify='center'
            >
              <Button
                htmlType='submit'
                className={cx('bg-btn')}
                icon={<SearchOutlined />}
                onClick={onSearchSubmit}
              >
                {t('Search')}
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </ConfigProvider>
        {/* <FilterSection form={form}></FilterSection> */}
        <Divider
          orientation='left'
          plain
        >
          {t('search_result')}
        </Divider>
        <Flex
          justify={'flex-end'}
          align={'center'}
          className={cx('flex-space')}
          style={{ paddingRight: '24px' }}
        >
          <Tooltip title={t('Delete')}>
            <Button
              type='primary'
              danger
              icon={<MinusOutlined />}
              disabled={deleteBtnState}
              onClick={() => {
                setDeleteState(true);
              }}
            />
            <Modal
              title={
                <div>
                  <WarningOutlined style={{ color: 'red', paddingRight: '4px' }} />
                  <span>{t('delete_confirm')} {p('pesticides')} ?</span>
                </div>
              }
              open={deleteState}
              onOk={deleteMultiple}
              onCancel={() => {
                setDeleteState(false);
              }}
              centered={true}
              cancelText={t('Cancel')}
              okText={t('Yes')}
              okButtonProps={{ type: 'primary', danger: true }}
            ></Modal>
          </Tooltip>
          <Tooltip title={t('Add_new')}>
            <Button
              className={cx('bg-btn')}
              icon={<PlusOutlined />}
              onClick={showAddPesticideDrawer}
            />
          </Tooltip>
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
          <Content style={{ padding: '0px' }}>
            <Layout
              style={{
                padding: '0px 0',
                background: colorBgContainer,
                borderRadius: borderRadiusLG
              }}
            >
              <Content style={{ padding: '0 24px', minHeight: 280 }}>
                <Table
                  loading={loading}
                  rowKey={'id'}
                  bordered
                  rowSelection={{
                    type: 'checkbox',
                    ...checkRowSelection
                  }}
                  columns={PesticideTableColumns()}
                  dataSource={pesticides?.map(pesticide => ({
                    ...pesticide,
                    onDetails: () => handleDetails(pesticide.id!),
                    onDelete: () => handleDelete(pesticide.id!),
                    onViewHistory: () => handleViewHistory(pesticide.id!)
                  }))}
                  onChange={onChange}
                  pagination={{
                    showTotal: total => `Total ${total} Items`,
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '20', '30'],
                    total: pesticides?.length
                  }}
                  scroll={{ x: 'max-content' }}
                  className={cx('table_style')}
                />
              </Content>
            </Layout>
          </Content>
        </ConfigProvider>
        <Drawer
        title={p('Details_Pesticide')}
        placement="right"
        onClose={closePesticideDetailDrawer}
        open={openPesticideDetailDrawer}
        className={stylePesticideManagement('drawer-width')}
      >
       <UpdatePesticideFormDrawer params={{
            pesticideId: pesticideId
          }}></UpdatePesticideFormDrawer>
      </Drawer>
      <Drawer
        title={p('Create_new_pesticide')}
        placement="right"
        onClose={closeAddPesticideDrawer}
        open={openAddPesticide}
        className={stylePesticideManagement('drawer-width')}
      >
        <AddPesticideFormDrawer></AddPesticideFormDrawer>
      </Drawer>
      </Content>
    </>
  );
};
export default PesticideManagement;
