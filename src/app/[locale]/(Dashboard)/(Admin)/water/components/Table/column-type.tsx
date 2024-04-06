/* eslint-disable jsx-a11y/alt-text */
'use client';
import {
  TableColumnsType,
  Dropdown,
  MenuProps,
  Modal,
  Space,
  Button,
  Image,
  Flex
} from 'antd';
import {
  DeleteOutlined,
  EllipsisOutlined,
  ExclamationCircleOutlined,
  WarningOutlined
} from '@ant-design/icons';

import { useTranslations } from 'next-intl';
import { Water } from '../../models/water-model';
import { LandResponse } from '@/services/Admin/Land/Payload/response/landPayLoadResponse';

export function WaterTableColumn() {
  const t = useTranslations('Common');

  const landTableColumn: TableColumnsType<Water> = [
    {
      title: t('Name'),
      dataIndex: 'name',
      width: 'max-content',
      render: (_, fertilizerItem) => {
        return (
          <>
            <Flex
              align='center'
              gap='10px'
            >
              {/* <Image
                style={{ borderRadius: '50%' }}
                height={40}
                src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
              /> */}
              <p style={{ color: '#009A29', fontWeight: '600' }}>{fertilizerItem.name}</p>
            </Flex>
          </>
        );
      }
    },

    {
      title: 'Description',
      dataIndex: 'description',
      width: 'max-content'
      //    render: (_,fertilizerItem) => `${fertilizerItem.unitPrice} VND`
    },
    {
      title: 'Note',
      dataIndex: 'notes',
      width: 'max-content'
      //    render: (_,fertilizerItem) => `${fertilizerItem.unitPrice} VND`
    },
    {
      width: 'max-content',
      title: '',
      key: 'actions',
      fixed: 'right',
      align: 'right' as const,
      render: (_, item) => {
        const renderItems = (
          id: string,
          onDetailsItem: () => void,
          onRemoveItem: () => void
        ): MenuProps['items'] => {
          return [
            {
              label: (
                <a
                  onClick={() => {
                    onDetailsItem();
                  }}
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
                      title: 'Do you want to delete this row',
                      centered: true,
                      width: '40%',
                      icon: <WarningOutlined style={{ color: 'red' }} />,
                      closable: true,
                      cancelText: t('Cancel'),
                      okText: t('Yes'),
                      okButtonProps: { type: 'primary', danger: true },
                      onOk: () => {
                        onRemoveItem();
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
              items: renderItems(item.id!, item.onDetails!, item.onDelete!)
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
  return landTableColumn;
}
