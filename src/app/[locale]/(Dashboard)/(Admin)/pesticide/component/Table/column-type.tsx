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
  WarningOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';

import { useTranslations } from 'next-intl';
import { Pesticide } from '../../models/pesticide-models';

export function PesticideTableColumns() {
  const t = useTranslations('Common');
  const p = useTranslations('Pesticide');

  const pesticideTableColumn: TableColumnsType<Pesticide> = [
    {
      title: t('Name'),
      dataIndex: 'name',
      width: 'max-content',
      render: (_, pesticideItem) => {
        return (
          <>
            <Flex
              align='center'
              gap='10px'
            >
              <Image
                style={{ borderRadius: '10%' }}
                height={40}
                src={
                  pesticideItem?.notes
                    ? 'http://ec2-3-109-154-96.ap-south-1.compute.amazonaws.com/api/v1/files/get?path=' +
                      pesticideItem?.notes
                    : 'http://ec2-3-109-154-96.ap-south-1.compute.amazonaws.com/api/v1/files/get?path=drafts/d1f1b219-6aa1_638488953544034389.png'
                }
              />
              <p style={{ color: '#009A29', fontWeight: '600' }}>{pesticideItem.name}</p>
            </Flex>
          </>
        );
      }
    },
    {
      title: t('Stock'),
      dataIndex: 'stock',
      align: 'end',
      width: 'max-content',
      render: (_, pesticideItem) => `${pesticideItem.stock} ${pesticideItem.measureUnit}`
    },
    {
      title: t('Unit_Price'),
      dataIndex: 'unitPrice',
      width: 'max-content',
      align: 'end',
      render: (_, pesticideItem) => `${pesticideItem.unitPrice.toLocaleString()} VND`
    },
    {
      width: 'max-content',
      title: '',
      key: 'actions',
      fixed: 'right',
      align: 'right' as const,
      render: (_, pesticideItem) => {
        const renderItems = (
          id: string,
          onDetailsPesticide: () => void,
          onViewHistory: () => void,
          onRemovePesticide: () => void
        ): MenuProps['items'] => {
          return [
            {
              label: (
                <a
                  onClick={() => {
                    onDetailsPesticide();
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
              label: (
                <a
                  onClick={() => {
                    onViewHistory();
                  }}
                >
                  <Space>
                    <ClockCircleOutlined /> {t('View_history')}
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
                      title: `${t('delete_confirm')} ${p('pesticides')} ?`,
                      centered: true,
                      width: '40%',
                      icon: <WarningOutlined style={{ color: 'red' }} />,
                      closable: true,
                      cancelText: t('Cancel'),
                      okText: t('Yes'),
                      okButtonProps: { type: 'primary', danger: true },
                      onOk: () => {
                        onRemovePesticide();
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
                pesticideItem.id!,
                pesticideItem.onDetails!,
                pesticideItem.onViewHistory!,
                pesticideItem.onDelete!
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
  return pesticideTableColumn;
}
