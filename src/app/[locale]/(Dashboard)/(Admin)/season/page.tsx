'use client';
import { useState } from 'react';
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

type Props = {};
const SeasonManagement = (props: Props) => {
  const cx = classNames.bind(styles);

  const [data, setData] = useState<SeasonModel[]>([]);
  const [loading, setLoading] = useState(false);

  const [createState, setCreateState] = useState<Boolean>(false);
  const [updateState, setUpdateState] = useState<boolean>(false);

  const [seasons, setSeasons] = useState<SeasonModel[]>([]);
  const [userId, setUserId] = useState<string>('');

  const [filterUsers, setFilterUsers] = useState<SeasonModel[]>([]);
  const [filterMode, setFilterMode] = useState<string>('updated_at');
  const http = UseAxiosAuth();

  const handleDelete = (id: string) => {};
  const handleUpdate = async (id: string) => {
    setUserId(id);
    setUpdateState(true);
  };
  const handleDetails = async (id: string) => {
    setUserId(id);
    setUpdateState(true);
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
      disabled: record.name === 'Disabled',
      name: record.name
    })
  };

  for (let i = 0; i < 4; i++) {
    data.push({
      id: 'ID1' + i,
      name: 'Spring',
      startDate: '20/01/2024',
      endDate: '20/4/2024',
      status: 'Done',
      land: []
    });
    data.push({
      id: 'ID2' + i,
      name: 'Spring',
      startDate: '20/01/2024',
      endDate: '20/4/2024',
      status: 'Cancel',
      land: []
    });
    data.push({
      id: 'ID3' + i,
      name: 'Spring',
      startDate: '20/01/2024',
      endDate: '20/4/2024',
      status: 'Pending',
      land: []
    });
    data.push({
      id: 'ID4' + i,
      name: 'Spring',
      startDate: '20/01/2024',
      endDate: '20/4/2024',
      status: 'In progress',
      land: []
    });
  }

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
          style={{paddingRight: '24px'}}
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
                  dataSource={data?.map(season => ({
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
