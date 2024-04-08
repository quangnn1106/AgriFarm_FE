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
import styles from '../adminStyle.module.scss';
import stylesFertilizerManagement from './fertilizerStyle.module.scss';
import classNames from 'classnames/bind';
import UseAxiosAuth from '@/utils/axiosClient';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from '@/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { AxiosInstance } from 'axios';
import { Fertilizer } from './models/fertilizer-models';
import getFertilizersApi from '@/services/Admin/Fertilizer/getFertilizersApi';
import { deleteFertilizerApi } from '@/services/Admin/Fertilizer/deleteFertilizerApi';
import FilterSection from './component/FilterSection/filterSection';
import { FertilizerTableColumns } from './component/Table/column-type';
import UpdateFertilizerFormDrawer from './component/UpdateFertilizerDrawer/update-fertilizer-drawer';
import AddFertilizerFormDrawer from './component/AddFertilizerDrawer/add-fertilizer-drawer';
import { redirect } from 'next/navigation';



type Props = {};
const FertilizerManagement = (props: Props) => {
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken();

  const t = useTranslations('Common');

  //style
  const cx = classNames.bind(styles);
  const styleFertilizerManagement = classNames.bind(stylesFertilizerManagement);

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
      title: <Link href={`/fertilizer`}>Fertilizer</Link>
    }
  ];

  // handle loading data
  const [loading, setLoading] = useState<boolean>(true);
  const [fertilizers, setFertilizers] = useState<Fertilizer[] | undefined>([]);

  const getListFertilizersApi = async (http: AxiosInstance, siteId: string | undefined) => {
    try {
      const responseData = await getFertilizersApi(siteId, http);
      setFertilizers(responseData.data as Fertilizer[]);
      setLoading(false);
    } catch (error) {
      console.error('Error calling API getListFertilizersApi:', error);
    }
  };


  //handle load details
  const [fertilizerId, setFertilizerId] = useState<string>('');
  const [openFertilizerDetailDrawer, setOpenFertilizerDetailDrawer] = useState<boolean>(false);

 
  const handleDetails = async (id: string) => {
    setFertilizerId(id)
    setOpenFertilizerDetailDrawer(true);
  };
  const closeFertilizerDetailDrawer = () => {
    setOpenFertilizerDetailDrawer(false);
  };

  
  //handle update fertilizer
  // const [openFertilizerUpdateDrawer, setOpenFertilizerUpdateDrawer] = useState<boolean>(false);
  const handleViewHisrory = async (id: string) => {
    setFertilizerId(id)
    // redirect(`/suppliesHistory/fertilizer/${id}`);
    router.replace(`/suppliesHistory/fertilizer/${id}`);
  };


  //handle delete
  const [deleteState, setDeleteState] = useState<boolean>(false);
  const [deleteBtnState, setDeleteBtnState] = useState<boolean>(true);
  const [deletedFertilizers, setDeleteFertilizers] = useState<React.Key[]>([]);

  const deleteFertilizer = async (http: AxiosInstance, seasonId?: string) => {
    try {
      const res = await deleteFertilizerApi(http, seasonId);
      getListFertilizersApi (http, siteId);
    } catch (error) {
      console.error('Error calling API Delete Season:', error);
    }
  }

  const checkRowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: Fertilizer[]) => {
      if (selectedRowKeys.length > 0) {
        setDeleteBtnState(false);
        setDeleteFertilizers(selectedRowKeys);
      } else {
        setDeleteBtnState(true);
      }
    }
  };
  const handleDelete = (id: string) => {
    deleteFertilizer(http, id);
  };
  const deleteMultiple = () => {
    deletedFertilizers.map(function (item) {
      deleteFertilizer(http, item.toString());
    });
    setDeleteState(false);
    setDeleteBtnState(true);
  };
  const onChange: TableProps<Fertilizer>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  //handle add fertilizer
  const [openAddFertilizer, setOpenAddFertilizer] = useState(false);

  const showAddFertilizerDrawer = () => {
    setOpenAddFertilizer(true);
  };

  const closeAddFertilizerDrawer = () => {
    setOpenAddFertilizer(false);
  };

  useEffect(() => {
    getListFertilizersApi(http, siteId);
  }, [http, siteId, openAddFertilizer, openFertilizerDetailDrawer]);

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
                  <span>Do you want to delete this fertilizers?</span>
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
              onClick={showAddFertilizerDrawer}
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
                  columns={FertilizerTableColumns()}
                  dataSource={fertilizers?.map(fertilizer => ({
                    ...fertilizer,
                    onDetails: () => handleDetails(fertilizer.id!),
                    onDelete: () => handleDelete(fertilizer.id!),
                    onViewHistory: () => handleViewHisrory(fertilizer.id!)
                  }))}
                  onChange={onChange}
                  pagination={{
                    showTotal: total => `Total ${total} Items`,
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '20', '30'],
                    total: fertilizers?.length
                  }}
                  scroll={{ x: 'max-content' }}
                  className={cx('table_style')}
                />
              </Content>
            </Layout>
          </Content>
        </ConfigProvider>
        <Drawer
        title="Details Fertilizer"
        placement="right"
        onClose={closeFertilizerDetailDrawer}
        open={openFertilizerDetailDrawer}
        className={styleFertilizerManagement('drawer-width')}
      >
       <UpdateFertilizerFormDrawer params={{
            fertilizerId: fertilizerId
          }}></UpdateFertilizerFormDrawer>
      </Drawer>
      <Drawer
        title="Thêm giống mới"
        placement="right"
        onClose={closeAddFertilizerDrawer}
        open={openAddFertilizer}
        className={styleFertilizerManagement('drawer-width')}
      >
        <AddFertilizerFormDrawer></AddFertilizerFormDrawer>
      </Drawer>
      </Content>
    </>
  );
};
export default FertilizerManagement;
