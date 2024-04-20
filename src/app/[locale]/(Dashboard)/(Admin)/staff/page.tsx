'use client';
import styles from '../adminStyle.module.scss';
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
import { getStaffsService } from '@/services/Admin/Staffs/getStaffsService';
import Staffs from '@/services/Admin/Staffs/Payload/response/staffs';

import { AxiosInstance } from 'axios';

import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from '@/navigation';
import { upgradeRoleMan } from '@/services/Admin/Staffs/assignRole';
import { STATUS_NOT_FOUND } from '@/constants/https';

const cx = classNames.bind(styles);

type Props = {};

const UserManagement = (props: Props) => {
  const { data: session } = useSession();
  const siteName = session?.user.userInfo.siteName;
  const [createState, setCreateState] = useState<boolean>(false);
  const [updateState, setUpdateState] = useState<boolean>(false);

  const [users, setUsers] = useState<Staffs[] | []>([]);
  const [api, contextHolder] = notification.useNotification();
  const [formModal, setFormModal] = useState<UserModel>();
  const [isFetching, setIsFetching] = useState<boolean>(true);

  const [filterUsers, setFilterUsers] = useState<Staffs[]>([]);
  const [filterMode, setFilterMode] = useState<string>('updated_at');
  const http = UseAxiosAuth();
  const siteId = session?.user.userInfo.siteId;

  const router = useRouter();
  const pathName = usePathname();

  const fetchStaff = async (http: AxiosInstance, siteId?: string) => {
    try {
      // const key = 'User';
      const responseData = await getStaffsService(siteId, http);
      //console.log(responseData);
      setUsers(responseData?.data as Staffs[]);
      setIsFetching(false);
    } catch (error) {
      console.error('Error calling API Staffs:', error);
    }
  };
  useEffect(() => {
    fetchStaff(http, siteId);
  }, [createState, http, formModal, siteId]);

  // console.log(users);

  const handleDelete = (id: string) => {};
  const handleApproved = async (id: string) => {
    // setUserId(id);
    // setUpdateState(true);
    console.log('user id: ', id);
    setIsFetching(false);

    const res = await upgradeRoleMan(http, id);

    if (res?.status !== STATUS_NOT_FOUND) {
      api.success({
        message: 'Nhân viên đã được cấp quyền lên quản lý',
        placement: 'top',
        duration: 2
      });
      fetchStaff(http, siteId);
    } else {
      api.error({
        message: 'Không cấp quyền quản lí được, có lỗi xảy ra',
        placement: 'top',
        duration: 2
      });
    }
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
            siteId: siteId,
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
                      //   console.log('record row onCLick: ', record);
                      //  console.log('event row onCLick: ', event);
                      const target = event.target as HTMLElement;
                      const isWithinLink = target.tagName === 'A' || target.closest('a');

                      const isWithinAction =
                        target.closest('td')?.classList.contains('ant-table-cell') &&
                        !target
                          .closest('td')
                          ?.classList.contains('ant-table-selection-column') &&
                        !target
                          .closest('td')
                          ?.classList.contains('ant-table-cell-fix-right');

                      if (isWithinAction && !isWithinLink) {
                        console.log('record land: ', record);

                        router.push(`${pathName}/update/${record.id}`);
                      }
                    }
                  };
                }}
                columns={userTableColumns}
                dataSource={users?.map(user => ({
                  ...user,
                  //onDetails: () => handleDetails(user.id!),
                  onDelete: () => handleDelete(user.id!),
                  onUpdate: () => handleApproved(user.id!)
                }))}
                onChange={onChange}
                pagination={{
                  showTotal: total => `Total ${total} Items`,
                  showSizeChanger: true,
                  pageSizeOptions: ['10', '20', '30'],
                  total: users.length
                }}
                scroll={{ x: 'max-content' }}
                className='table_style'
              />
            </Content>
          </Layout>
        </Content>
      </ConfigProvider>
    </>
  );
};

export default UserManagement;
