import { Button, Dropdown, MenuProps, Modal, Space, TableColumnsType } from "antd";
import { CheckListInspectionModel } from "../../../models/checklist-inspection-model";
import dayjs from 'dayjs';
import {
    CheckOutlined,
    DeleteOutlined,
    EllipsisOutlined,
    ExclamationCircleOutlined
  } from '@ant-design/icons';

export const CheckListInspectionTableColumn: TableColumnsType<CheckListInspectionModel> = [
    {
        title: 'Inspection',
        dataIndex: '',
        render: (_, checklistItem) => {
            // const dateFormat = 'DD MMM YYYY';
            // let conductedDate = dayjs(checklistItem.dateConducted, dateFormat)
            return (
                <>
                <div>
                    <span>{checklistItem.dateConducted}</span> / 
                    <span>{checklistItem.userName}</span>
                </div>
                <span>{checklistItem.name}</span>
                </>
            )
        },
        width: 'max-content',
        fixed: 'left'
      },
      {
        title: 'Score',
        dataIndex: 'score',
        render: (_, checklistItem) => `${checklistItem.score}%`,
        width: 'max-content'
      },
      {
        title: 'Status',
        dataIndex: 'status',
        width: 'max-content'
      },
      {
        width: 'max-content',
        title: '',
        key: 'actions',
        fixed: 'right',
        align: 'right' as const,
        render: (_, checkListItem) => {
          const renderItems = (
            id: string,
            onDetailsUser: () => void,
            onRemoveUser: () => void,
            onApprovedUser: () => void
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
                      Modal.confirm({
                        title: 'Are you want to approve this user ?',
                        centered: true,
                        width: '400px',
                        onOk: () => {
                          onApprovedUser();
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
                      <CheckOutlined /> Approve
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
                        title: 'Do you really want to delete this user ?',
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
                    checkListItem.id!,
                    checkListItem.onDetails!,
                    checkListItem.onDelete!,
                    checkListItem.onUpdate!
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

    //   dayjs(`${seasonDetail?.startIn}`, dateFormat)
]
// 19 Dec 2023