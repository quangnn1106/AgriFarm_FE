'use client';
import styles from '../management-page.module.scss';
import React, { useEffect, useState } from 'react';
import UserList from './use-list';
import classNames from 'classnames/bind';
import BreadcrumbComponent from './components/Breadcrumb/breadCrumb';
import FilterBox from './components/FilterBox/filterBox';
import ActionBox from './components/Actions/actionBox';
import { ConfigProvider, TableProps, theme, Layout, Table } from 'antd';

import { Content } from 'antd/es/layout/layout';
import { UserModel } from './models/user-model';
import UseAxiosAuth from '@/utils/axiosClient';
import { userTableColumns } from './columnsType';
const cx = classNames.bind(styles);

type Props = {};

const UserManagement = (props: Props) => {
  const [createState, setCreateState] = useState<Boolean>(false);
  const [updateState, setUpdateState] = useState<boolean>(false);

  const [users, setUsers] = useState<UserModel[]>([]);
  const [userId, setUserId] = useState<string>('');
  const [isFetching, setIsFetching] = useState<boolean>(true);

  const [filterUsers, setFilterUsers] = useState<UserModel[]>([]);
  const [filterMode, setFilterMode] = useState<string>('updated_at');
  const http = UseAxiosAuth();

  useEffect(() => {
    (async () => {
      const res = await http.get(`/register/registry/get`).then(res => {
        const registerList = res.data.data;
        console.log('registerList: ', registerList);

        setUsers(registerList);
        setIsFetching(false);
        //   setPagination({
        //     ...pagination,
        //     total: res.data.count
        //   });
      });
    })();
  }, [http]);

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

  const onChange: TableProps<UserModel>['onChange'] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const checkRowSelection = {
    getCheckboxProps: (record: UserModel) => ({
      disabled: record.firstName === 'Disabled',
      name: record.firstName
    })
  };
  return (
    <>
      <BreadcrumbComponent />
      <FilterBox />
      <ActionBox
      // params={{ visible: createState, onCancel: () => setCreateState(false) }}
      />
      <UserList />
      {/* <ConfigProvider
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
                loading={isFetching}
                rowKey={'id'}
                rowSelection={{
                  type: 'checkbox',
                  ...checkRowSelection
                }}
                columns={userTableColumns}
                dataSource={users?.map(user => ({
                  ...user,
                  onDetails: () => handleDetails(user.id!),
                  onDelete: () => handleDelete(user.id!),
                  onUpdate: () => handleUpdate(user.id!)
                }))}
                onChange={onChange}
                pagination={{
                  showTotal: total => `Total ${total} Items`,
                  showSizeChanger: true,
                  pageSizeOptions: ['10', '20', '30'],
                  total: users.length
                }}
                scroll={{ x: 'max-content' }}
                className={cx('table_style')}
              />
            </Content>
          </Layout>
        </Content>
      </ConfigProvider> */}
    </>
  );
};

export default UserManagement;
