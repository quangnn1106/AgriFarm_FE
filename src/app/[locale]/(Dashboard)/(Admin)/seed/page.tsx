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
import stylesSeedManagement from './seedStyle.module.scss';
import classNames from 'classnames/bind';
import UseAxiosAuth from '@/utils/axiosClient';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from '@/navigation';
import Link from 'next/link';
import FilterSection from './component/FilterSection/filterSection';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { SeedTableColumns } from './component/Table/column-type';
import { Seed } from './models/seed-models';
import { AxiosInstance } from 'axios';
import getSeedsApi from '@/services/Admin/Seed/getSeedsApi';
import AddSeedFormDrawer from './component/AddSeedDrawer/add-seed-drawer';
import UpdateSeedFormDrawer from './component/UpdateSeedDrawer/update-seed-drawer';
import { deleteSeedApi } from '@/services/Admin/Seed/deleteSeedApi';

interface SearchForm {
  keyword: string
}

type Props = {};
const SeedManagement = (props: Props) => {
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken();

  const t = useTranslations('Common');
  const s = useTranslations('Seed');

  //style
  const cx = classNames.bind(styles);
  const styleSeedManagement = classNames.bind(stylesSeedManagement);

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
      title: <Link href={`/seed`}>{s('Seed')}</Link>
    }
  ];

  // handle loading data
  const [loading, setLoading] = useState<boolean>(true);
  const [seeds, setSeeds] = useState<Seed[] | undefined>([]);

  const getListSeedsApi = async (http: AxiosInstance, siteId: string | undefined, keySearch?: string) => {
    try {
      let responseData:any;
      if(keySearch=="" || keySearch?.trim()=="" || keySearch==undefined || keySearch==null) {
        responseData = await getSeedsApi(siteId, http);
      } else {
        responseData = await getSeedsApi(siteId, http, keySearch);
      }
      setSeeds(responseData.data as Seed[]);
      setLoading(false);
      onResetSearchSubmit();
    } catch (error) {
      console.error('Error calling API getListSeedsApi:', error);
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
  const [seedId, setSeedId] = useState<string>('');
  const [openSeedDetailDrawer, setOpenSeedDetailDrawer] = useState<boolean>(false);

 
  const handleDetails = async (id: string) => {
    setSeedId(id)
    setOpenSeedDetailDrawer(true);
  };
  const closeSeedDetailDrawer = () => {
    setOpenSeedDetailDrawer(false);
  };


  //handle update seed
  const [openSeedUpdateDrawer, setOpenSeedUpdateDrawer] = useState<boolean>(false);
  const onViewHistory = async (id: string) => {
    setSeedId(id)
    router.replace(`/suppliesHistory/seed/${id}`);
  }
  //handle delete
  const [deleteState, setDeleteState] = useState<boolean>(false);
  const [deleteBtnState, setDeleteBtnState] = useState<boolean>(true);
  const [deletedSeeds, setDeleteSeeds] = useState<React.Key[]>([]);

  const deleteSeed = async (http: AxiosInstance, seasonId?: string) => {
    try {
      const res = await deleteSeedApi(http, seasonId);
      getListSeedsApi (http, siteId);
    } catch (error) {
      console.error('Error calling API Delete Season:', error);
    }
  }

  const checkRowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: Seed[]) => {
      if (selectedRowKeys.length > 0) {
        setDeleteBtnState(false);
        setDeleteSeeds(selectedRowKeys);
      } else {
        setDeleteBtnState(true);
      }
    }
  };
  const handleDelete = (id: string) => {
    deleteSeed(http, id);
  };
  const deleteMultiple = () => {
    deletedSeeds.map(function (item) {
      deleteSeed(http, item.toString());
    });
    setDeleteState(false);
    setDeleteBtnState(true);
  };
  const onChange: TableProps<Seed>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  //handle add seed
  const [openAddSeed, setOpenAddSeed] = useState(false);

  const showAddSeedDrawer = () => {
    setOpenAddSeed(true);
  };

  const closeAddSeedDrawer = () => {
    setOpenAddSeed(false);
  };

  useEffect(() => {
    getListSeedsApi(http, siteId, form.getFieldValue('keyword'));
  }, [http, siteId, openAddSeed, openSeedDetailDrawer, openSeedUpdateDrawer, searchSubmit]);

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
          className={styleSeedManagement('margin-form-item')}
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
                  <span>{s('Do_you_want_to_delete_this_seeds')}?</span>
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
              onClick={showAddSeedDrawer}
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
                  columns={SeedTableColumns()}
                  dataSource={seeds?.map(seed => ({
                    ...seed,
                    onDetails: () => handleDetails(seed.id!),
                    onDelete: () => handleDelete(seed.id!),
                    onViewHistory: () => onViewHistory(seed.id!)
                  }))}
                  onChange={onChange}
                  pagination={{
                    showTotal: total => `Total ${total} Items`,
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '20', '30'],
                    total: seeds?.length
                  }}
                  scroll={{ x: 'max-content' }}
                  className={cx('table_style')}
                />
              </Content>
            </Layout>
          </Content>
        </ConfigProvider>
        <Drawer
        title={s('Details_Seed')}
        placement="right"
        onClose={closeSeedDetailDrawer}
        open={openSeedDetailDrawer}
        className={styleSeedManagement('drawer-width')}
      >
       <UpdateSeedFormDrawer params={{
            seedId: seedId
          }}></UpdateSeedFormDrawer>
      </Drawer>
      <Drawer
        title="Thêm giống mới"
        placement="right"
        onClose={closeAddSeedDrawer}
        open={openAddSeed}
        className={styleSeedManagement('drawer-width')}
      >
        <AddSeedFormDrawer></AddSeedFormDrawer>
      </Drawer>
      </Content>
    </>
  );
};
export default SeedManagement;
