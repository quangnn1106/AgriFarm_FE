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
import DetailSeedDrawer from './component/DetailsDrawer/detailSeedDrawer';

type Props = {};
const SeedManagement = (props: Props) => {
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken();

  const t = useTranslations('Common');

  //style
  const cx = classNames.bind(styles);
  const { data: session } = useSession();
  const siteId = session?.user.userInfo.siteId;
  const http = UseAxiosAuth();
  const siteName = session?.user.userInfo.siteName;

  // Navigation
  const router = useRouter();
  const pathName = usePathname();
  const breadCrumb = [
    {
      title: <Link href={`/`}>Home</Link>
    },
    {
      title: <Link href={`/seed`}>Seed</Link>
    }
  ];

  // handle loading data
  const [loading, setLoading] = useState<boolean>(true);
  const [seeds, setSeeds] = useState<Seed[] | undefined>([]);
  const checkRowSelection = {};

  const getListSeedsApi = async (http: AxiosInstance, siteId: string | undefined) => {
    try {
      const responseData = await getSeedsApi(siteId, http);
      setSeeds(responseData.data as Seed[]);
      setLoading(false);
    } catch (error) {
      console.error('Error calling API getListSeedsApi:', error);
    }
  };
  useEffect(() => {
    getListSeedsApi(http, siteId);
  }, [http, siteId]);

  //handle load details
  const [seedId, setSeedId] = useState<string>('');
  const [openDrawer, setOpenDrawer] = useState<boolean>(true);
  const handleDetails = async (id: string) => {};
  const handleSeedDetails = () => {
    setOpenDrawer(true);
  };

  //handle update seed
  const handleUpdate = async (id: string) => {};

  //handle delete
  const [deleteState, setDeleteState] = useState<boolean>(false);
  const [deleteBtnState, setDeleteBtnState] = useState<boolean>(true);
  const handleDelete = (id: string) => {};
  const deleteMultiple = () => {};
  const onChange: TableProps<Seed>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

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
          <Tooltip title={t('delete')}>
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
                  <span>Do you want to delete this seeds?</span>
                </div>
              }
              open={deleteState}
              onOk={deleteMultiple}
              onCancel={() => {
                setDeleteState(false);
              }}
              centered={true}
              cancelText={t('cancel')}
              okText={t('yes')}
              okButtonProps={{ type: 'primary', danger: true }}
            ></Modal>
          </Tooltip>
          <Tooltip title={t('add_new')}>
            <Button
              className={cx('bg-btn')}
              icon={<PlusOutlined />}
            />
          </Tooltip>
        </Flex>
        <Button type="primary" onClick={showDrawer}>
        Open
      </Button>
      {/* <Drawer title="Basic Drawer" onClose={onClose} open={open}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer> */}
     
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
                    onUpdate: () => handleUpdate(seed.id!)
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
      </Content>
    </>
  );
};
export default SeedManagement;
