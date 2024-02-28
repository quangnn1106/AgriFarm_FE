import { UserModel } from './models/user-model';
import { Dropdown, MenuProps, Modal, Space, Button, Tag, TableColumnsType } from 'antd';
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
    title: 'Full Name',
    dataIndex: 'firstName',
    render: (_, userItem) => `${userItem.firstName} ${userItem.lastName}`,
    width: 'max-content',
    fixed: 'left'
  },
  {
    title: 'Site Code',
    dataIndex: 'siteCode'
  },
  {
    title: 'Address',
    dataIndex: 'address',

    width: 'max-content'
  },
  {
    title: 'Phone Number',
    dataIndex: 'phoneNumber',
    width: 'max-content'
  },
  {
    title: 'Email',
    dataIndex: 'email',
    width: 'max-content'
  },

  {
    title: 'Role',
    dataIndex: 'role',

    width: 'max-content'
  },
  {
    title: 'Status',
    dataIndex: 'isLockout',
    sorter: true,
    // filterMode: 'tree',
    // onFilter: (value: boolean, record)=> record.is_active.,
    render: (_, { isLockout }) => {
      let color = isLockout == false ? 'red' : 'green';
      let key = isLockout == true ? 'Lockout' : 'Active';
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
        onDetailsUser: () => void,
        onRemoveUser: () => void,
        onApprovedUser: () => void
      ): MenuProps['items'] => {
        return [
          {
            label: (
              <a
                onClick={() => {
                  onDetailsUser();
                }}
              >
                <Space>
                  <ExclamationCircleOutlined /> Details
                </Space>
              </a>
            ),
            key: '0'
          },
          {
            type: 'divider'
          },
          {
            label: (
              <a
                onClick={() => {
                  Modal.confirm({
                    title: 'Are you want to approve this user ?',
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
                  <CheckOutlined /> Approve
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
                    title: 'Do you really want to delete this user ?',
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
                  <DeleteOutlined /> Delete
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
              userItem.onDetails!,
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
