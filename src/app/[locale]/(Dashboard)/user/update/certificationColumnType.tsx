import { Button, Dropdown, MenuProps, Modal, Space, TableColumnsType } from "antd";
import { CertificationModel } from "../models/certificationModel";
import { EditOutlined, DeleteOutlined, EllipsisOutlined, ExclamationCircleOutlined } from '@ant-design/icons';


export const certificationTableColumn: TableColumnsType<CertificationModel> = [
    {
        title: 'Certification Name',
        dataIndex: 'certification_name',
        width: 'max-content',
        fixed: 'left',
    },
    {
        title: 'Expired Date',
        dataIndex: 'expired_time',
        width: 'max-content',
    },
    {
        title: 'Link Certification',
        dataIndex: 'link_certification',
        width: 'max-content',
        render: (link: string) => <a>{link}</a>,
    },
    {
        width: 'max-content',
        title: '',
        key: 'actions',
        fixed: 'right',
        align: 'right' as const,
        render: (_, userItem) => {
          const renderItems = (
            id: string,
            onDetailsUser: () => void,
            onRemoveUser: () => void,
            onUpdateUser: () => void
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
                      onUpdateUser();
                    }}
                  >
                    <Space>
                      <EditOutlined /> Update
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
                        title: 'Do you really want to delete this certification ?',
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
                  userItem.id,
                  userItem.onDetails!,
                  userItem.onDelete!,
                  userItem.onUpdate!
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
]