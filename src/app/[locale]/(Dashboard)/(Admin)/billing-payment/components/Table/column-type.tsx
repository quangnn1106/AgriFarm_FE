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
  Flex,
  Tag
} from 'antd';
import {
  DeleteOutlined,
  EllipsisOutlined,
  ExclamationCircleOutlined,
  WarningOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';

import { useTranslations } from 'next-intl';
import { BillModel } from '../../models/bill-model';

export function BillPaymentTableColumns() {
  const t = useTranslations('Common');

  const billPaymentTableColumn: TableColumnsType<BillModel> = [
    {
      title: 'Gói',
      dataIndex: 'subscription',
      width: 'max-content'
    },
    {
      title: 'Ngày',
      dataIndex: 'date',
      width: 'max-content',
      align: 'start'
    },
    {
      title: t('Unit_Price'),
      dataIndex: 'billAmount',
      render: (_, item) => `$${item.billAmount}`,
      width: 'max-content',
      align: 'start'
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'isLockout',

      // filterMode: 'tree',
      // onFilter: (value: boolean, record)=> record.is_active.,
      render: (_, { isLockout }) => {
        let color = isLockout == false ? 'red' : 'green';
        let key = isLockout == true ? 'Successful' : 'Cancel';
        return (
          <Tag
            color={color}
            key={key}
          >
            {key}
          </Tag>
        );
      },
      width: 'max-content',
      align: 'start'
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
          onDetailsBill: () => void,

          onRemoveBill: () => void
        ): MenuProps['items'] => {
          return [
            {
              label: (
                <a
                  onClick={() => {
                    onDetailsBill();
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
                      title: 'Do you want to delete this Bill Payment',
                      centered: true,
                      width: '40%',
                      icon: <WarningOutlined style={{ color: 'red' }} />,
                      closable: true,
                      cancelText: t('Cancel'),
                      okText: t('Yes'),
                      okButtonProps: { type: 'primary', danger: true },
                      onOk: () => {
                        onRemoveBill();
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
              key: '2'
            }
          ];
        };
        return (
          <Dropdown
            menu={{
              items: renderItems(
                item.id!,
                item.onDetails!,

                item.onDelete!
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
  return billPaymentTableColumn;
}
