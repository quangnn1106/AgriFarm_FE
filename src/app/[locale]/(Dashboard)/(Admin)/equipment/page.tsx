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
  Input,
  Form,
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
import stylesEquipmentManagement from './equipmentStyle.module.scss';
import classNames from 'classnames/bind';
import UseAxiosAuth from '@/utils/axiosClient';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from '@/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { AxiosInstance } from 'axios';

import { redirect } from 'next/navigation';
import { Equipment } from './models/equipment-models';
import getEquipmentsApi from '@/services/Admin/Equipment/getEquipmentsApi';
import { deleteEquipmentApi } from '@/services/Admin/Equipment/deleteEquipmentApi';
import { EquipmentTableColumns } from './component/Table/column-type';
import UpdateEquipmentFormDrawer from './component/UpdateEquipmentDrawer/update-equipment-drawer';
import AddEquipmentFormDrawer from './component/AddEquipmentDrawer/add-equipment-drawer';

interface SearchForm {
  keyword: string
}

type Props = {};
const EquipmentManagement = (props: Props) => {
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken();

  const t = useTranslations('Common');

  //style
  const cx = classNames.bind(styles);
  const styleEquipmentManagement = classNames.bind(stylesEquipmentManagement);

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
      title: <Link href={`/equipment`}>Trang thiết bị</Link>
    }
  ];

  // handle loading data
  const [loading, setLoading] = useState<boolean>(true);
  const [equipments, setEquipments] = useState<Equipment[] | undefined>([]);

  const getListEquipmentsApi = async (http: AxiosInstance, siteId: string | undefined, keySearch?: string) => {
    try {
      let responseData:any;
      if(keySearch=="" || keySearch?.trim()=="" || keySearch==undefined || keySearch==null) {
        responseData = await getEquipmentsApi(http);
      } else {
        responseData = await getEquipmentsApi(http, keySearch);
      }
      
      setEquipments(responseData.data as Equipment[]);
      setLoading(false);
      onResetSearchSubmit();
    } catch (error) {
      console.error('Error calling API getListEquipmentsApi:', error);
    }
  };

    //handle search
    const [searchSubmit, setSearchSubmit] = useState(false);
    const onSearchSubmit = () => {
      setSearchSubmit(true)
    }
    const onResetSearchSubmit = () => {
      setSearchSubmit(false)
    }


  //handle load details
  const [equipmentId, setEquipmentId] = useState<string>('');
  const [openEquipmentDetailDrawer, setOpenEquipmentDetailDrawer] = useState<boolean>(false);

 
  const handleDetails = async (id: string) => {
    setEquipmentId(id)
    setOpenEquipmentDetailDrawer(true);
  };
  const closeEquipmentDetailDrawer = () => {
    setOpenEquipmentDetailDrawer(false);
  };

  
  //handle update equipment
  // const [openequipmentUpdateDrawer, setOpenequipmentUpdateDrawer] = useState<boolean>(false);
  const handleViewHisrory = async (id: string) => {
    setEquipmentId(id)
    // redirect(`/suppliesHistory/equipment/${id}`);
    router.replace(`/suppliesHistory/equipment/${id}`);
  };


  //handle delete
  const [deleteState, setDeleteState] = useState<boolean>(false);
  const [deleteBtnState, setDeleteBtnState] = useState<boolean>(true);
  const [deletedEquipments, setDeleteEquipments] = useState<React.Key[]>([]);

  const deleteEquipment = async (http: AxiosInstance, seasonId?: string) => {
    try {
      const res = await deleteEquipmentApi(http, seasonId);
      getListEquipmentsApi (http, siteId);
    } catch (error) {
      console.error('Error calling API Delete Season:', error);
    }
  }

  const checkRowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: Equipment[]) => {
      if (selectedRowKeys.length > 0) {
        setDeleteBtnState(false);
        setDeleteEquipments(selectedRowKeys);
      } else {
        setDeleteBtnState(true);
      }
    }
  };
  const handleDelete = (id: string) => {
    deleteEquipment(http, id);
  };
  const deleteMultiple = () => {
    deletedEquipments.map(function (item) {
      deleteEquipment(http, item.toString());
    });
    setDeleteState(false);
    setDeleteBtnState(true);
  };
  const onChange: TableProps<Equipment>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  //handle add equipment
  const [openAddEquipment, setOpenAddEquipment] = useState(false);

  const showAddEquipmentDrawer = () => {
    setOpenAddEquipment(true);
  };

  const closeAddEquipmentDrawer = () => {
    setOpenAddEquipment(false);
  };

  useEffect(() => {
    getListEquipmentsApi(http, siteId, form.getFieldValue('keyword'));
  }, [http, siteId, openAddEquipment, openEquipmentDetailDrawer, searchSubmit]);

  return (
    <>
      
      <Content style={{ padding: '20px 20px' }}>
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
          className={styleEquipmentManagement('margin-form-item')}
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

        {/* <FilterSection></FilterSection> */}
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
                  <span>Bạn có muốn xóa những trang thiết bị này?</span>
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
              onClick={showAddEquipmentDrawer}
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
                  columns={EquipmentTableColumns()}
                  dataSource={equipments?.map(equipment => ({
                    ...equipment,
                    onDetails: () => handleDetails(equipment.id!),
                    onDelete: () => handleDelete(equipment.id!),
                    onViewHistory: () => handleViewHisrory(equipment.id!)
                  }))}
                  onChange={onChange}
                  pagination={{
                    showTotal: total => `Total ${total} Items`,
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '20', '30'],
                    total: equipments?.length
                  }}
                  scroll={{ x: 'max-content' }}
                  className={cx('table_style')}
                />
              </Content>
            </Layout>
          </Content>
        </ConfigProvider>
        <Drawer
        title="Chi tiết trang thiết bị"
        placement="right"
        onClose={closeEquipmentDetailDrawer}
        open={openEquipmentDetailDrawer}
        className={styleEquipmentManagement('drawer-width')}
      >
       <UpdateEquipmentFormDrawer params={{
            equipmentId: equipmentId
          }}></UpdateEquipmentFormDrawer>
      </Drawer>
      <Drawer
        title="Thêm trang thiết bị mới"
        placement="right"
        onClose={closeAddEquipmentDrawer}
        open={openAddEquipment}
        className={styleEquipmentManagement('drawer-width')}
      >
        <AddEquipmentFormDrawer></AddEquipmentFormDrawer>
      </Drawer>
      </Content>
    </>
  );
};
export default EquipmentManagement;
