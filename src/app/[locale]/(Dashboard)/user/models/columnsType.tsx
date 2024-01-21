import { ColumnsType } from 'antd/es/table';
import { UserModel } from './user-model';
import { Dropdown, MenuProps, Modal, Space, Button, Switch, Tag, TableColumnsType } from 'antd';
import { EditOutlined, DeleteOutlined, EllipsisOutlined } from '@ant-design/icons';
import React, { useRef, useState } from 'react';

export const userTableColumns: TableColumnsType<UserModel> = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 'max-content',
    fixed: 'left',
  },
  {
    title: 'Full Name',
    dataIndex: 'full_name',
    render: (_, userItem) => `${userItem.first_name} ${userItem.last_name}`,
    width: 'max-content',
    fixed: 'left',
  },
  {
    title: 'Phone Number',
    dataIndex: 'phone_number',
    width: 'max-contentt'
  },
  {
    title: 'Email',
    dataIndex: 'email',
    width: 'max-content'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    filters: [
      {
        text: 'London',
        value: 'London',
      },
      {
        text: 'New York',
        value: 'New York',
      },
    ],
    filterMode: 'tree',
    filterSearch: true,
    onFilter: (value: string, record)=> record.address.startsWith(value),
    width: 'max-content',
  },
  {
    title: 'Site',
    dataIndex: 'site_name'
  },
  {
    title: 'Role',
    dataIndex: 'role_name',
    filters: [
      {
        text: 'Admin',
        value: 'Admin',
      },
      {
        text: 'Manager',
        value: 'Manager',
      },
      {
        text: 'Member',
        value: 'Member',
      },
    ],
    filterMode: 'tree',
    filterSearch: true,
    onFilter: (value: string, record)=> record.role_name.startsWith(value),
    width: 'max-content'
  },
  {
    title: 'Is Active',
    dataIndex: 'is_active',
    sorter: true,
    // filterMode: 'tree',
    // onFilter: (value: boolean, record)=> record.is_active.,
    render: (_, { is_active }) => {
      let color = is_active == true ? 'blue' : 'grey';
      let key = is_active == true ? 'Active' : 'Inactive';
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
        onUpdateUser: () => void
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
                  <EditOutlined /> Details
                </Space>
              </a>
            ),
            key: '0'
          },

          {
            label: (
              <a
                onClick={() => {
                  onUpdateUser();
                }}
              >
                <Space>
                  <EditOutlined /> Update
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
              userItem.id,
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
