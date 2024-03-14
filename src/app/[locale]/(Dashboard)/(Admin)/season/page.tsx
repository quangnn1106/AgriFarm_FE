/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import { useEffect, useState } from 'react';
import SeasonTableComponent from './component/Table/table';
import { SeasonModel } from './models/season-model';
import UseAxiosAuth from '@/utils/axiosClient';
import {
  Breadcrumb,
  Button,
  ConfigProvider,
  Divider,
  Flex,
  Layout,
  Table,
  TableProps,
  Tooltip,
  theme
} from 'antd';
import { Content } from 'antd/es/layout/layout';
import { seasonTableColumns } from './component/Table/column-types';

import { HomeOutlined, PlusOutlined } from '@ant-design/icons';

import styles from '../adminStyle.module.scss';
import classNames from 'classnames/bind';
import FilterSection from './component/FilterSection/filterSection';
import getListSeasonApi from '@/services/Admin/Season/getSeasonsApi';
import { usePathname, useRouter } from '@/navigation';
import { AxiosInstance } from 'axios';
import { useSession } from 'next-auth/react';


type Props = {};
const SeasonManagement = (props: Props) => {
//style 
  const cx = classNames.bind(styles);

// get id user
  const { data: session } = useSession();
  const sideId = session?.user.userInfo.siteId;

// list
  const [loading, setLoading] = useState(true);
  const [seasons, setSeasons] = useState<SeasonModel[]>([]);
//  details
  const [seasonId, setSeasonId] = useState<string>('');
// action add, update, filter
  const [createState, setCreateState] = useState<Boolean>(false);
  const [updateState, setUpdateState] = useState<boolean>(false);
  const [filterUsers, setFilterUsers] = useState<SeasonModel[]>([]);
  const [filterMode, setFilterMode] = useState<string>('updated_at');

  const http = UseAxiosAuth();

// Navigation
  const router = useRouter();
  const pathName = usePathname();


// Get list Season Data
  const getDataListSeason = async (http: AxiosInstance, sideId?: string) => {
    try {
      const responseData = await getListSeasonApi(sideId, http);
      setSeasons(responseData.data as SeasonModel[]);
      console.log(responseData.data);
      setLoading(false);
    } catch (error) {
      console.error('Error calling API getListSeasons:', error);
    }
  };
  useEffect(() => {
    getDataListSeason(http, sideId);
  }, [createState, http, sideId]);

  // const fetchStaff = async (http: AxiosInstance, sideId?: string) => {
  //   try {
  //     const responseData = await getStaffsService(sideId, http);
  //     //console.log(responseData);
  //     setUsers(responseData?.data as Staffs[]);
  //     setIsFetching(false);
  //   } catch (error) {
  //     console.error('Error calling API Staffs:', error);
  //   }
  // };
  // useEffect(() => {
  //   fetchStaff(http, sideId);
  // }, [createState, http, formModal, sideId]);

  const handleDelete = (id: string) => {};
  const handleUpdate = async (id: string) => {
    setSeasonId(id);
    setUpdateState(true);
  };
  const handleDetails = async (id: string) => {
    setSeasonId(id);
    router.push(`${pathName}/details/${id}`);
  };

  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken();

  const onChange: TableProps<SeasonModel>['onChange'] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const checkRowSelection = {
    getCheckboxProps: (record: SeasonModel) => ({
      disabled: record.title === 'Disabled',
      name: record.title
    })
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
        </Breadcrumb>

        <Divider
          orientation='left'
          plain
        >
          Search condition
        </Divider>
        <FilterSection></FilterSection>
        <Divider
          orientation='left'
          plain
        >
          Search result
        </Divider>
        <Flex
          justify={'flex-end'}
          align={'center'}
          className={cx('flex-space')}
          style={{ paddingRight: '24px' }}
        >
          <Tooltip title='Add new'>
            <Button
              className={cx('bg-btn')}
              icon={<PlusOutlined />}
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
                  columns={seasonTableColumns}
                  dataSource={seasons?.map(season => ({
                    ...season,
                    onDetails: () => handleDetails(season.id!),
                    onDelete: () => handleDelete(season.id!),
                    onUpdate: () => handleUpdate(season.id!)
                  }))}
                  onChange={onChange}
                  pagination={{
                    showTotal: total => `Total ${total} Items`,
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '20', '30'],
                    total: seasons.length
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
export default SeasonManagement;
