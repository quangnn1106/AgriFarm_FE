import { Dropdown, MenuProps, Modal, Space, Button, Tag, TableColumnsType } from 'antd';
import {
  CheckOutlined,
  DeleteOutlined,
  EllipsisOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import React, { useRef, useState } from 'react';
import { Sites } from '@/services/SuperAdmin/Site/payload/response/sites';

export const sitesTableColumns: TableColumnsType<Sites> = [
  // {
  //   title: 'ID',
  //   dataIndex: 'id',
  //   width: 'max-content',
  //   fixed: 'left'
  // },
  {
    title: 'Site Code',
    dataIndex: 'siteCode',

    width: 'max-content',
    fixed: 'left'
  },

  {
    title: 'Name',
    dataIndex: 'name',
    width: 'max-content'
  },

  {
    title: 'Avatar',
    dataIndex: 'avatar',

    width: 'max-content'
  },
  {
    title: 'Description',
    dataIndex: 'description',
    width: 'max-content'
  },
  {
    title: 'Status',
    dataIndex: 'isLockout',

    // filterMode: 'tree',
    // onFilter: (value: boolean, record)=> record.is_active.,
    render: (_, { isActive }) => {
      let color = isActive == true ? 'green' : 'red';
      let key = isActive == false ? 'Lockout' : 'Active';
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
    render: (_, sitesItem) => {
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
              sitesItem.id!,
              sitesItem.onDetails!,
              sitesItem.onDelete!,
              sitesItem.onUpdate!
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
