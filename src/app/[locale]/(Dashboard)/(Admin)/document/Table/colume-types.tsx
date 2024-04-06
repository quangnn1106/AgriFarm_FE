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
import { DocumentResponse } from '../models/document-models';
import Link from 'next/link';


 export function DocumentTableColumns() {
  const t = useTranslations('Common');


  const documentTableColumn: TableColumnsType<DocumentResponse> = [
    {
      title: '#',
      dataIndex: 'index',
      width: 'max-content',
      render: (_, item, idx) => `${idx}`
    },
    {
      title: t('Name'),
      dataIndex: 'name',
      width: 'max-content',
    },
    {
      title: 'Link File',
      dataIndex: 'fileLink',
      width: 'max-content',
      render: (_, item) => {
        return <Link href={item.fileLink}>{item.fileLink}</Link>;
      }
    },
    {
        title: 'Created date',
        dataIndex: 'createdDate',
        width: 'max-content',
      },
      {
        title: 'Type',
        dataIndex: 'type',
        width: 'max-content',
      },
    {
      width: 'max-content',
      title: '',
      key: 'actions',
      fixed: 'right',
      align: 'right' as const,
      render: (_, documentItem) => {
        const renderItems = (
          id: string,
          onDetailsDocument: () => void,
          onRemoveDocument: () => void,
          onDownloadDocument: () => void,
        ): MenuProps['items'] => {
          return [
            {
              label: (
                <a
                  onClick={() => {
                    onDetailsDocument();
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
                    onDownloadDocument();
                  } }
                >
                  <Space>
                    <ExclamationCircleOutlined /> Download
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
                      title:'Do you want to delete this Documents',
                      centered: true,
                      width: '40%',
                      icon: <WarningOutlined style={{ color: 'red' }} />,
                      closable: true,
                      cancelText: t('Cancel'),
                      okText: t('Yes'),
                      okButtonProps: { type: 'primary', danger: true },
                      onOk: () => {
                        onRemoveDocument();
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
                documentItem.id!,
                documentItem.onDetails!,
                documentItem.onDownload!,
                documentItem.onDelete!
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
  return documentTableColumn;
}
