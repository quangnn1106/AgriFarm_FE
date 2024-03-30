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
import { Pesticide } from '../../models/pesticide-models';

 export function PesticideTableColumns() {
  const t = useTranslations('Common');

  const pesticideTableColumn: TableColumnsType<Pesticide> = [
    {
      title: t('Name'),
      dataIndex: 'name',
      width: 'max-content',
      render: (_, pesticideItem) => {
        return (
          <>
          <Flex align='center' gap='10px'>
          <Image
              style={{borderRadius: '50%'}}
              height={40}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
            <p style={{color:'#009A29', fontWeight:'600'}} >{pesticideItem.name}</p>
            </Flex>  
          </>
        );
      }
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      width: 'max-content',
      render: (_,pesticideItem) => `${pesticideItem.stock} ${pesticideItem.measureUnit}`
    },
    {
        title: 'Price',
        dataIndex: 'unitPrice',
        width: 'max-content',
        render: (_,pesticideItem) => `${pesticideItem.unitPrice} VND`
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
          onRemovePesticide: () => void,
        ): MenuProps['items'] => {
          return [
            {
              label: (
                <a
                  onClick={() => {
                    onDetailsPesticide();
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
                      title:'Do you want to delete this Pesticides',
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
                pesticideItem.id!,
                pesticideItem.onDetails!,
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
