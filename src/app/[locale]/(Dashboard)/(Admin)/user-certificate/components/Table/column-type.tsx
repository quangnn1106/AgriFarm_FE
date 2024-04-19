'use client';
import { TableColumnsType, Dropdown, MenuProps, Modal, Space, Button, Tag } from 'antd';
import { DeleteOutlined, EllipsisOutlined, CheckOutlined } from '@ant-design/icons';

import { useTranslations } from 'next-intl';
import { CertificationResponse } from '@/services/Admin/Certificates/payload/response/certificate';

export function CerTableColumns() {
  const t = useTranslations('Common');
  //const s = useTranslations('Seed');

  const cerTableColumn: TableColumnsType<CertificationResponse> = [
    {
      title: 'Tên chứng chỉ',
      dataIndex: 'name',
      width: 'max-content',
      fixed: 'left'
    },
    {
      title: 'Mô Tả',
      dataIndex: 'description',
      width: 'max-content'
    },
    {
      title: 'Đường dẫn chứng chỉ',
      dataIndex: 'url',
      width: 'max-content',
      render: (link: string) => <a>{link}</a>
    },
    {
      title: 'Trạng thái',
      dataIndex: 'decison',

      // filterMode: 'tree',
      // onFilter: (value: boolean, record)=> record.is_active.,
      render: (_, { decison }) => {
        let color = decison === 1 ? 'blue' : 'grey';
        let key = decison === 1 ? 'Approved' : 'Waiting';
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
      render: (_, cerItem) => {
        const renderItems = (
          id: string,

          onRemoveCer: () => void,
          onUpdateCer: () => void
        ): MenuProps['items'] => {
          return [
            // {
            //   label: (
            //     <a
            //       onClick={() => {
            //         onDetailsCer();
            //       }}
            //     >
            //       <Space>
            //         <ExclamationCircleOutlined /> Details
            //       </Space>
            //     </a>
            //   ),
            //   key: '0'
            // },
            {
              type: 'divider'
            },
            {
              label: (
                <a
                  onClick={() => {
                    onUpdateCer();
                  }}
                >
                  <Space>
                    <CheckOutlined /> Duyệt
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
                      title: 'Bạn muốn xóa chứng chỉ này?',
                      centered: true,
                      width: '400px',
                      onOk: () => {
                        onRemoveCer();
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
                cerItem.id,

                cerItem.onDelete!,
                cerItem.onUpdate!
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
  return cerTableColumn;
}
