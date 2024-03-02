'use client';
import styles from '../management-page.module.scss';
import React, { useEffect, useState } from 'react';

import { PlusOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import BreadcrumbComponent from './components/Breadcrumb/breadCrumb';
import FilterBox from './components/FilterBox/filterBox';
import ActionBox from './components/Actions/actionBox';

import {
  Button,
  ConfigProvider,
  Layout,
  Table,
  TableProps,
  notification,
  theme
} from 'antd';
import AddUser from './add/modalAdd';
import { UserModel } from './models/user-model';
import UseAxiosAuth from '@/utils/axiosClient';
import { Content } from 'antd/es/layout/layout';
import { userTableColumns } from './columnsType';
import { getStaffsService } from '@/services/Admin/getStaffsService';
import Staffs from '@/services/Admin/Payload/response/staffs';
import { fetchRegisterForm } from '@/services/SuperAdmin/getFormService';
import { AxiosInstance } from 'axios';

import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from '@/navigation';

const cx = classNames.bind(styles);

type Props = {};

const UserManagement = (props: Props) => {
  const { data: session } = useSession();
  const [createState, setCreateState] = useState<boolean>(false);
  const [updateState, setUpdateState] = useState<boolean>(false);

  const [users, setUsers] = useState<Staffs[] | []>([]);
  const [api, contextHolder] = notification.useNotification();
  const [formModal, setFormModal] = useState<UserModel>();
  const [isFetching, setIsFetching] = useState<boolean>(true);

  const [filterUsers, setFilterUsers] = useState<Staffs[]>([]);
  const [filterMode, setFilterMode] = useState<string>('updated_at');
  const http = UseAxiosAuth();
  const sideId = session?.user.userInfo.siteId;
  const router = useRouter();
  const pathName = usePathname();
  
  const fetchStaff = async (http: AxiosInstance, sideId?: string) => {
    try {
      const responseData = await getStaffsService(sideId, http);
      //console.log(responseData);
      setUsers(responseData?.data as Staffs[]);
      setIsFetching(false);
    } catch (error) {
      console.error('Error calling API Staffs:', error);
    }
  };
  useEffect(() => {
    fetchStaff(http, sideId);
  }, [createState, http, formModal, sideId]);

  // console.log(users);

  const handleDelete = (id: string) => {};
  const handleApproved = async (id: string) => {
    // setUserId(id);
    // setUpdateState(true);
    console.log('user id: ', id);

    setIsFetching(true);
  };
  const handleDetails = async (record: UserModel) => {
    setFormModal(record);
    setUpdateState(true);
  };

  const onChange: TableProps<UserModel>['onChange'] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken();

  const checkRowSelection = {
    getCheckboxProps: (record: UserModel) => ({
      disabled: record.firstName === 'Disabled',
      name: record.firstName
    })
  };

  return (
    <>
      {contextHolder}
      <BreadcrumbComponent />
      <FilterBox />

      <ActionBox>
        <Button
          onClick={() => setCreateState(true)}
          className={cx('bg-btn')}
          icon={<PlusOutlined />}
        />
        <AddUser
          params={{
            visible: createState,
            onCancel: () => setCreateState(false)
          }}
        />
      </ActionBox>

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
                loading={isFetching}
                rowKey={'id'}
                bordered
                rowSelection={{
                  type: 'checkbox',
                  ...checkRowSelection
                }}
                onRow={(record, rowIndex) => {
                  return {
                    onClick: event => {
                      console.log('record row onCLick: ', record);
                      console.log('event row onCLick: ', event);
                      router.push(`${pathName}/update/${record.id}`);
                    }
                  };
                }}
                columns={userTableColumns}
                dataSource={users?.map(user => ({
                  ...user
                  //onDetails: () => handleDetails(user.id!),
                  // onDelete: () => handleDelete(user.id!),
                  // onUpdate: () => handleApproved(user.id!)
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
      </ConfigProvider>
    </>
  );
};

export default UserManagement;
