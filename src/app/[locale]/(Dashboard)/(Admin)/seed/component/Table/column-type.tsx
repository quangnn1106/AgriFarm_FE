'use client'
import {
  TableColumnsType,
  Dropdown,
  MenuProps,
  Modal,
  Space,
  Button,
  Switch,
  Tag,
  ConfigProvider,
  Popconfirm,
  Drawer,
  theme
} from 'antd';
import {
  CheckOutlined,
  DeleteOutlined,
  EllipsisOutlined,
  ExclamationCircleOutlined,
  EditOutlined,
  QuestionCircleOutlined,
  WarningOutlined
} from '@ant-design/icons';

import { useTranslations } from 'next-intl';
import { Seed } from '../../models/seed-models';
import { useState } from 'react';
import { truncate } from 'fs';

 export function SeedTableColumns() {
  const t = useTranslations('Common');
  const [openDrawer, setOpenDrawer] = useState(false);

  const { token } = theme.useToken();

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    height: 200,
    padding: 48,
    overflow: 'hidden',
    background: token.colorFillAlter,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  const showDrawer = () => {
    setOpenDrawer(true);
  };
  const hiddenDrawer = () => {
    setOpenDrawer(false);
    console.log('hidden',openDrawer);
  };

  const seedTableColumn: TableColumnsType<Seed> = [
    {
      title: t('Name'),
      dataIndex: 'name',
      width: 'max-content',
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      width: 'max-content',
      render: (_,seedItem) => `${seedItem.stock} ${seedItem.measureUnit}`
    },
    {
        title: 'Price',
        dataIndex: 'unitPrice',
        width: 'max-content',
        render: (_,seedItem) => `${seedItem.unitPrice} VND`
      },
    {
      width: 'max-content',
      title: '',
      key: 'actions',
      fixed: 'right',
      align: 'right' as const,
      render: (_, seedItem) => {
        const renderItems = (
          id: string,
          onDetailsSeed: () => void,
          onRemoveSeed: () => void,
          onUpdateSeed: () => void
        ): MenuProps['items'] => {
          return [
            {
              label: (
                <a
                  onClick={() => {
                    onDetailsSeed();
                  } }
                >
                  <Space>
                    <ExclamationCircleOutlined /> {t('Details')}
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
                      title:'Do you want to delete this seeds',
                      centered: true,
                      width: '40%',
                      icon: <WarningOutlined style={{ color: 'red' }} />,
                      closable: true,
                      cancelText: t('Cancel'),
                      okText: t('Yes'),
                      okButtonProps: { type: 'primary', danger: true },
                      onOk: () => {
                        onRemoveSeed();
                      },
                      footer: (_, { OkBtn, CancelBtn }) => (
                        <>
                          <CancelBtn />
                          <OkBtn />
                        </>
                      )
                    });
                  } }
                >
                  <Space>
                    <DeleteOutlined /> {t('Delete')}
                  </Space>
                </a>
              ),
              key: '1'
            }
          ];
        };
        return (
          <Dropdown
            menu={{
              items: renderItems(
                seedItem.id!,
                seedItem.onDetails!,
                seedItem.onDelete!,
                seedItem.onUpdate!
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
  return seedTableColumn;
}
