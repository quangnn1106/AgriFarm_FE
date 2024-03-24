'use client';

import {
  Breadcrumb,
  Button,
  ConfigProvider,
  Divider,
  Flex,
  Layout,
  Table,
  TableProps,
  Tag,
  Tooltip,
  theme
} from 'antd';
import { Content } from 'antd/es/layout/layout';
import { HomeOutlined, PlusOutlined } from '@ant-design/icons';
import styles from '../adminStyle.module.scss';
import checklistStyle from './checklistStyle.module.scss';
import classNames from 'classnames/bind';
import FilterSection from './component/FilterSection/filterSection';
import { CheckListInspectionModel } from './models/checklist-inspection-model';
import { useState } from 'react';
import { CheckListInspectionTableColumn } from './component/Table/CheckListInspection/column-type';

const CheckListInspection = () => {
  const cx = classNames.bind(styles);
  const pageStyle = classNames.bind(checklistStyle);
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken();

//   const [data, setData] = useState<CheckListInspectionModel[] | undefined>([]);
  const data : CheckListInspectionModel[] = [] ;
//   setData([]);
  for (let i = 0; i < 5; i++ ){
    data?.push({
        id: "Id" +i,
        name: "Name",
        userName: "User",
        score: 4.5,
        dateConducted: "12 Dec 2024",
        status: "Done"
    })
  }

  const handleDetails = async (id: string) => {
  };
  const handleDelete = (id: string) => {};
  const handleUpdate = async (id: string) => {
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
          {' '}
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
          <Breadcrumb.Item>GlobalG.A.P Check list</Breadcrumb.Item>
        </Breadcrumb>

        <label className={cx('title-header')}> GlobalG.A.P Check list </label>
        <div className={pageStyle('checklist-info-header')}>
            <span className={cx('h2-info')}>
                IFA V4.2
            </span>
            <span>
            GGN: 739399274931847
            </span>
            <Tag color="#4CAF4F">Site Name</Tag>

        </div>
        <Divider plain style={{margin: '12px 0px 20px 0px'}} />
        <FilterSection></FilterSection>
        <Divider orientation='left' plain > Search result </Divider>
        <Flex
          justify={'flex-start'}
          align={'center'}
          className={cx('flex-space')}
          style={{ padding: '0px 24px 20px 24px' }}
        >
          <Tooltip title='Add new'>
            <Button
              className={cx('bg-btn')}
              icon={<PlusOutlined />}
              title='Add'
            >Add</Button>
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
                //   loading={loading}
                  rowKey={'id'}
                  bordered


                  rowSelection={{
                    type: 'checkbox',
                    // ...checkRowSelection
                  }}
                  columns={CheckListInspectionTableColumn}
                  dataSource={data?.map(item => ({
                    ...item,
                    onDetails: () => handleDetails(item.id!),
                    onDelete: () => handleDelete(item.id!),
                    onUpdate: () => handleUpdate(item.id!)
                  }))}
                //   onChange={onChange}
                  pagination={{
                    showTotal: total => `Total ${total} Items`,
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '20', '30'],
                    total: data?.length
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
export default CheckListInspection;
