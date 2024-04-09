'use client';
import {
  Breadcrumb,
  Button,
  ConfigProvider,
  Divider,
  Drawer,
  Flex,
  Layout,
  Modal,
  Space,
  Table,
  TableProps,
  Tooltip,
  theme
} from 'antd';
import { Content } from 'antd/es/layout/layout';
import {
  HomeOutlined,
  PlusOutlined,
  MinusOutlined,
  WarningOutlined
} from '@ant-design/icons';
import styles from '../../adminStyle.module.scss';
import stylesSupplierManagement from '../supplierStyle.module.scss';
import classNames from 'classnames/bind';
import UseAxiosAuth from '@/utils/axiosClient';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from '@/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { AxiosInstance } from 'axios';
import FilterSection from '../component/FilterSection/filterSection';
import { SupplierResponse } from '../models/supplier-models';
import getSuppliersApi from '@/services/Admin/Supply/getSuppliersApi';
import { deleteSupplierApi } from '@/services/Admin/Supply/deleteSupplierApi';
import { SupplierTableColumns } from '../component/Table/colume-types';
import UpdateSupplierDrawer from '../component/UpdateSupplierDrawer/update-supplier-drawer';
import AddSupplierDrawer from '../component/CreateSupplierDrawer/create-supplier-drawer';


type Props = {};
const SupplierManagement = (props: Props) => {
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken();

  const t = useTranslations('Common');
  const sup = useTranslations('Supplier');


  //style
  const cx = classNames.bind(styles);
  const styleSupplierManagement = classNames.bind(stylesSupplierManagement);

  const { data: session } = useSession();
  const siteId = session?.user.userInfo.siteId;
  const http = UseAxiosAuth();
  const siteName = session?.user.userInfo.siteName;

  // Navigation
  const router = useRouter();
  const pathName = usePathname();
  const breadCrumb = [
    {
      title: <Link href={`/`}>{t('home')}</Link>
    },
    {
      title: <Link href={`/Supplier`}>{sup('Supplier')}</Link>
    }
  ];

  // handle loading data
  const [loading, setLoading] = useState<boolean>(true);
  const [suppliers, setSuppliers] = useState<SupplierResponse[] | undefined>([]);

  const getListSuppliersApi = async (http: AxiosInstance) => {
    try {
      const responseData = await getSuppliersApi(http);
      setSuppliers(responseData.data as SupplierResponse[]);
      setLoading(false);
    } catch (error) {
      console.error('Error calling API getListSuppliersApi:', error);
    }
  };


  //handle load details
  const [supplierId, setSupplierId] = useState<string>('');
  const [openSupplierDetailDrawer, setOpenSupplierDetailDrawer] = useState<boolean>(false);

 
  const handleDetails = async (id: string) => {
    setSupplierId(id)
    setOpenSupplierDetailDrawer(true);
  };
  const closeSupplierDetailDrawer = () => {
    setOpenSupplierDetailDrawer(false);
  };


  //handle update supplier
  const [openSupplierUpdateDrawer, setOpenSupplierUpdateDrawer] = useState<boolean>(false);
  const handleUpdate = async (id: string) => {
    setSupplierId(id)
    setOpenSupplierUpdateDrawer(true);
  };
  const closeSupplierUpdateDrawer = () => {
    setOpenSupplierUpdateDrawer(false);
  };


  //handle delete
  const [deleteState, setDeleteState] = useState<boolean>(false);
  const [deleteBtnState, setDeleteBtnState] = useState<boolean>(true);
  const [deletedSuppliers, setDeleteSuppliers] = useState<React.Key[]>([]);

  const deleteSupplier = async (http: AxiosInstance, seasonId?: string) => {
    try {
      const res = await deleteSupplierApi(http, seasonId);
      getListSuppliersApi (http);
    } catch (error) {
      console.error('Error calling API Delete Season:', error);
    }
  }

  const checkRowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: SupplierResponse[]) => {
      if (selectedRowKeys.length > 0) {
        setDeleteBtnState(false);
        setDeleteSuppliers(selectedRowKeys);
      } else {
        setDeleteBtnState(true);
      }
    }
  };
  const handleDelete = (id: string) => {
    deleteSupplier(http, id);
  };
  const deleteMultiple = () => {
    deletedSuppliers.map(function (item) {
      deleteSupplier(http, item.toString());
    });
    setDeleteState(false);
    setDeleteBtnState(true);
  };
  const onChange: TableProps<SupplierResponse>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  //handle add Supplier
  const [openAddSupplier, setOpenAddSupplier] = useState(false);

  const showAddSupplierDrawer = () => {
    setOpenAddSupplier(true);
  };

  const closeAddSupplierDrawer = () => {
    setOpenAddSupplier(false);
  };

  useEffect(() => {
    getListSuppliersApi(http);
  }, [http, siteId, openAddSupplier, openSupplierDetailDrawer, openSupplierUpdateDrawer]);

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

        <FilterSection></FilterSection>
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
                  <span>{sup('Do_you_want_to_delete_this_suppliers')}</span>
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
              onClick={showAddSupplierDrawer}
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
                  columns={SupplierTableColumns()}
                  dataSource={suppliers?.map(supplier => ({
                    ...supplier,
                    onDetails: () => handleDetails(supplier.id!),
                    onDelete: () => handleDelete(supplier.id!)
                  }))}
                  onChange={onChange}
                  pagination={{
                    showTotal: total => `Total ${total} Items`,
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '20', '30'],
                    total: suppliers?.length
                  }}
                  scroll={{ x: 'max-content' }}
                  className={cx('table_style')}
                />
              </Content>
            </Layout>
          </Content>
        </ConfigProvider>
        <Drawer
        title="Details Supplier"
        placement="right"
        onClose={closeSupplierDetailDrawer}
        open={openSupplierDetailDrawer}
        className={styleSupplierManagement('drawer-width')}
      >
       <UpdateSupplierDrawer params={{
            supplierId: supplierId
          }}></UpdateSupplierDrawer>
      </Drawer>
      <Drawer
        title="Thêm giống mới"
        placement="right"
        onClose={closeAddSupplierDrawer}
        open={openAddSupplier}
        className={styleSupplierManagement('drawer-width')}
      >
        <AddSupplierDrawer></AddSupplierDrawer>
      </Drawer>
      </Content>
    </>
  );
};
export default SupplierManagement;
