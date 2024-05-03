import { ColumnsType } from 'antd/es/table';
import { UserModel } from './models/user-model';
import {
  Dropdown,
  MenuProps,
  Modal,
  Space,
  Button,
  Switch,
  Tag,
  TableColumnsType
} from 'antd';
import {
  CheckOutlined,
  DeleteOutlined,
  EllipsisOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import React, { useRef, useState } from 'react';
import Admin from '@/types/admin';

export const userTableColumns: TableColumnsType<UserModel> = [
  // {
  //   title: 'ID',
  //   dataIndex: 'id',
  //   width: 'max-content',
  //   fixed: 'left'
  // },
  {
    title: 'Họ Tên',
    dataIndex: 'firstName',
    render: (_, userItem) => `${userItem.firstName} ${userItem.lastName}`,
    width: 'max-content',
    fixed: 'left'
  },
  // {
  //   title: 'Phone Number',
  //   dataIndex: 'phone',
  //   width: 'max-contentt'
  // },
  {
    title: 'Email',
    dataIndex: 'email',
    width: 'max-content'
  },
  {
    title: 'Địa chỉ',
    dataIndex: 'address',

    // filterMode: 'tree',
    // filterSearch: true,
    // onFilter: (value: string, record)=> record.address.startsWith(value),
    width: 'max-content'
  },
  // {
  //   title: 'Site Code',
  //   dataIndex: 'siteCode'
  // },
  // {
  //   title: 'Site Name',
  //   dataIndex: 'siteName'
  // },
  // {
  //   title: 'Role',
  //   dataIndex: 'role_name',
  //   filters: [
  //     {
  //       text: 'Admin',
  //       value: 'Admin'
  //     },
  //     {
  //       text: 'Manager',
  //       value: 'Manager'
  //     },
  //     {
  //       text: 'Member',
  //       value: 'Member'
  //     }
  //   ],
  //   // filterMode: 'tree',
  //   // filterSearch: true,
  //   // onFilter: (value: string, record)=> record.role_name.startsWith(value),
  //   width: 'max-content'
  // },
  {
    title: 'Trạng thái',
    dataIndex: 'isApprove',
    // sorter: true,
    // filterMode: 'tree',
    // onFilter: (value: boolean, record)=> record.is_active.,
    render: (_, { isApprove }) => {
      let color = isApprove === 1 ? 'blue' : 'grey';
      let key = isApprove === 1 ? 'Đã duyệt' : 'Chờ';
      return (
        <Tag
          color={color}
          key={key}
        >
          {key}
        </Tag>
      );
    },
    width: 'max-content'
  },
  {
    width: 'max-content',
    title: '',
    key: 'actions',
    fixed: 'right',
    align: 'right' as const,
    render: (_, userItem) => {
      const renderItems = (
        id: string,
        // onDetailsUser: () => void,
        onRemoveUser: () => void,
        onApprovedUser: () => void
      ): MenuProps['items'] => {
        return [
          // {
          //   label: (
          //     <a
          //       onClick={() => {
          //         onDetailsUser();
          //       }}
          //     >
          //       <Space>
          //         <ExclamationCircleOutlined /> Chi tiết
          //       </Space>
          //     </a>
          //   ),
          //   key: '0'
          // },
          // {
          //   type: 'divider'
          // },
          {
            label: (
              <a
                onClick={() => {
                  Modal.confirm({
                    title: 'Bạn muốn duyệt người dùng này vào hệ thống?',
                    centered: true,
                    width: '400px',
                    onOk: () => {
                      onApprovedUser();
                    },
                    footer: (_, { OkBtn, CancelBtn }) => (
                      <>
                        <CancelBtn />
                        <OkBtn />
                      </>
                    )
                  });
                }}
              >
                <Space>
                  <CheckOutlined /> Duyệt
                </Space>
              </a>
            ),
            key: '1'
          },
          {
            type: 'divider'
          },
          {
            label: (
              <a
                onClick={() => {
                  Modal.confirm({
                    title: 'Bạn muốn xóa người dùng này?',
                    centered: true,
                    width: '400px',
                    onOk: () => {
                      onRemoveUser();
                    },
                    footer: (_, { OkBtn, CancelBtn }) => (
                      <>
                        <CancelBtn />
                        <OkBtn />
                      </>
                    )
                  });
                }}
              >
                <Space>
                  <DeleteOutlined /> Xóa
                </Space>
              </a>
            ),
            key: '2'
          }
        ];
      };
      return (
        <Dropdown
          menu={{
            items: renderItems(
              userItem.id!,
              // userItem.onDetails!,
              userItem.onDelete!,
              userItem.onUpdate!
            )
          }}
        >
          <a onClick={e => e.preventDefault()}>
            <Space>
              <Button
                type='text'
                icon={<EllipsisOutlined />}
              ></Button>
            </Space>
          </a>
        </Dropdown>
      );
    }
  }
];
