/* eslint-disable jsx-a11y/alt-text */
'use client'
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
import { Fertilizer } from '../../models/fertilizer-models';

 export function FertilizerTableColumns() {
  const t = useTranslations('Common');

  const fertilizerTableColumn: TableColumnsType<Fertilizer> = [
    {
      title: t('Name'),
      dataIndex: 'name',
      width: 'max-content',
      render: (_, fertilizerItem) => {
        return (
          <>
          <Flex align='center' gap='10px'>
          <Image
              style={{borderRadius: '50%'}}
              height={40}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
            <p style={{color:'#009A29', fontWeight:'600'}} >{fertilizerItem.name}</p>
            </Flex>  
          </>
        );
      }
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      width: 'max-content',
      render: (_,fertilizerItem) => `${fertilizerItem.stock} ${fertilizerItem.measureUnit}`
    },
    {
        title: 'Price',
        dataIndex: 'unitPrice',
        width: 'max-content',
        render: (_,fertilizerItem) => `${fertilizerItem.unitPrice} VND`
      },
    {
      width: 'max-content',
      title: '',
      key: 'actions',
      fixed: 'right',
      align: 'right' as const,
      render: (_, fertilizerItem) => {
        const renderItems = (
          id: string,
          onDetailsFertilizer: () => void,
          onViewHistory: () => void,
          onRemoveFertilizer: () => void,
        ): MenuProps['items'] => {
          return [
            {
              label: (
                <a
                  onClick={() => {
                    onDetailsFertilizer();
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
              label: (
                <a
                  onClick={() => {
                    onViewHistory();
                  } }
                >
                  <Space>
                    <ExclamationCircleOutlined /> Xem lịch sử
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
                      title:'Do you want to delete this Fertilizers',
                      centered: true,
                      width: '40%',
                      icon: <WarningOutlined style={{ color: 'red' }} />,
                      closable: true,
                      cancelText: t('Cancel'),
                      okText: t('Yes'),
                      okButtonProps: { type: 'primary', danger: true },
                      onOk: () => {
                        onRemoveFertilizer();
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
              key: '2'
            }
          ];
        };
        return (
          <Dropdown
            menu={{
              items: renderItems(
                fertilizerItem.id!,
                fertilizerItem.onDetails!,
                fertilizerItem.onViewHistory!,
                fertilizerItem.onDelete!

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
  return fertilizerTableColumn;
}
