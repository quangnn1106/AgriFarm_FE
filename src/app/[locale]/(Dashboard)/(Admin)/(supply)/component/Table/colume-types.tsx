'use client'
import {
  TableColumnsType,
  Dropdown,
  MenuProps,
  Modal,
  Space,
  Button,
} from 'antd';
import {
  DeleteOutlined,
  EllipsisOutlined,
  ExclamationCircleOutlined,
  WarningOutlined
} from '@ant-design/icons';

import { useTranslations } from 'next-intl';
import { SupplierResponse } from '../../models/supplier-models';


 export function SupplierTableColumns() {
  const t = useTranslations('Common');
  const sup = useTranslations('Supplier');

  const supplierTableColumn: TableColumnsType<SupplierResponse> = [
    {
      title: t('Name'),
      dataIndex: 'name',
      width: 'max-content',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: 'max-content',
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
        width: 'max-content',
      },
    {
      width: 'max-content',
      title: '',
      key: 'actions',
      fixed: 'right',
      align: 'right' as const,
      render: (_, supplierItem) => {
        const renderItems = (
          id: string,
          onDetailsSupplier: () => void,
          onRemoveSupplier: () => void,
        ): MenuProps['items'] => {
          return [
            {
              label: (
                <a
                  onClick={() => {
                    onDetailsSupplier();
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
                      title: sup('Do_you_want_to_delete_this_suppliers'),
                      centered: true,
                      width: '40%',
                      icon: <WarningOutlined style={{ color: 'red' }} />,
                      closable: true,
                      cancelText: t('Cancel'),
                      okText: t('Yes'),
                      okButtonProps: { type: 'primary', danger: true },
                      onOk: () => {
                        onRemoveSupplier();
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
                supplierItem.id!,
                supplierItem.onDetails!,
                supplierItem.onDelete!
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
  return supplierTableColumn;
}
