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

import { fetchRegisterForm } from '@/services/SuperAdmin/RegisterForm/getFormService';
import { AxiosInstance } from 'axios';
import UpdateFormRegis from './update/ModalUpdate';
import { approvedRegisterForm } from '@/services/SuperAdmin/RegisterForm/approvedFormRegis';
import { STATUS_NOT_FOUND } from '@/constants/https';

const cx = classNames.bind(styles);

type Props = {};

const UserManagement = (props: Props) => {
  const [createState, setCreateState] = useState<boolean>(false);
  const [updateState, setUpdateState] = useState<boolean>(false);

  const [users, setUsers] = useState<UserModel[] | []>([]);
  const [api, contextHolder] = notification.useNotification();
  const [formModal, setFormModal] = useState<UserModel>();
  const [isFetching, setIsFetching] = useState<boolean>(true);

  const [filterUsers, setFilterUsers] = useState<UserModel[]>([]);
  const [filterMode, setFilterMode] = useState<string>('updated_at');
  const http = UseAxiosAuth();
  const fetchSubscription = async (http: AxiosInstance) => {
    try {
      const responseData = await fetchRegisterForm(http);
      //console.log(responseData);
      setUsers(responseData?.data as UserModel[]);
      setIsFetching(false);
    } catch (error) {
      console.error('Error calling API Subscription:', error);
    }
  };
  useEffect(() => {
    // (async () => {
    //   const res = await http.get(`/register/registry/get`).then(res => {
    //     const registerList = res.data.data;
    //     //          console.log('registerList: ', registerList);
    //     setUsers(registerList);
    //     setIsFetching(false);
    //     //   setPagination({
    //     //     ...pagination,
    //     //     total: res.data.count
    //     //   });
    //   });
    // })();
    fetchSubscription(http);
  }, [createState, http, formModal]);

  // console.log(users);

  const handleDelete = (id: string) => {};
  const handleApproved = async (id: string) => {
    // setUserId(id);
    // setUpdateState(true);

    setIsFetching(true);
    const responseData = await approvedRegisterForm(http, id);

    if (responseData?.status !== STATUS_NOT_FOUND) {
      api.success({
        message: 'Register Form has been approved successfully!',
        placement: 'top',
        duration: 2
      });
      fetchSubscription(http);
    } else {
      api.error({
        message: 'Approved not successfully! checked',
        placement: 'top',
        duration: 2
      });
      setIsFetching(false);
      console.log('invalid data', responseData?.message);
    }
    // await http
    //   .put(`/register/registry/put`, updateRaw, {
    //     params: {
    //       id: id
    //     }
    //   })
    //   .then(data => {
    //     api.success({
    //       message: 'Register Form has been approved successfully!',
    //       placement: 'top',
    //       duration: 2
    //     });
    //     fetchSubscription(http);
    //   })
    //   .catch(err => {
    //     api.error({
    //       message: 'Approved not successfully! checked',
    //       placement: 'top',
    //       duration: 2
    //     });
    //     setIsFetching(false);
    //     console.log('invalid data', err);
    //   });
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
      <UpdateFormRegis
        params={{
          visible: updateState,
          onCancel: () => setUpdateState(false),
          dataRow: formModal
        }}
      />
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
                      //    console.log('record row onCLick: ', record);
                      //console.log('event row onCLick: ', event);
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
                        handleDetails(record);
                      }
                    } // click row
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
                  total: users?.length
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
