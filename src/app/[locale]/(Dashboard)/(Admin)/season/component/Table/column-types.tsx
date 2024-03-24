'use client'
import {
  TableColumnsType,
  Dropdown,
  MenuProps,
  Modal,
  Space,
  Button,
  Switch,
  Tag,
  ConfigProvider,
  Popconfirm
} from 'antd';
import {
  CheckOutlined,
  DeleteOutlined,
  EllipsisOutlined,
  ExclamationCircleOutlined,
  EditOutlined,
  QuestionCircleOutlined,
  WarningOutlined
} from '@ant-design/icons';

import { SeasonModel } from '../../models/season-model';
import { useTranslations } from 'next-intl';

 export function SeasonTableColumns() {
  const t = useTranslations('Season');
  const seasonTableColumn: TableColumnsType<SeasonModel> = [
    {
      title: t('Name'),
      dataIndex: 'title',
      width: 'max-content',
      fixed: 'left'
    },
    // {
    //   title: 'Status',
    //   dataIndex: 'status',
    //   width: 'max-content',
    //   render: (_, { status }) => {
    //     let color = '';
    //     if (status == 'In progress') {
    //       color = 'processing';
    //     } else if (status == 'Pending') {
    //       color = 'warning';
    //     } else if (status == 'Done') {
    //       color = 'success';
    //     } else if (status == 'Cancel') {
    //       color = 'error';
    //     } else {
    //       color = '';
    //     }
    //     return (
    //         <Tag
    //           color={color}
    //           bordered={false}
    //         >
    //           {status}
    //         </Tag>
    //     );
    //   }
    // },
    {
      title: t('Start_Date'),
      dataIndex: 'startIn',
      width: 'max-content'
    },
    {
      title: t('End_Date'),
      dataIndex: 'endIn',
      width: 'max-content'
    },
    {
      width: 'max-content',
      title: '',
      key: 'actions',
      fixed: 'right',
      align: 'right' as const,
      render: (_, seasonItem) => {
        const renderItems = (
          id: string,
          onDetailsSeason: () => void,
          onRemoveSeason: () => void,
          onUpdateSeason: () => void
        ): MenuProps['items'] => {
          return [
            {
              label: (
                <a
                  onClick={() => {
                    onDetailsSeason();
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
                    onUpdateSeason();
                  } }
                >
                  <Space>
                    <EditOutlined /> {t('Update')}
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
                      title: t('delete_confirm_sentence'),
                      centered: true,
                      width: '40%',
                      icon: <WarningOutlined style={{ color: 'red' }} />,
                      closable: true,
                      cancelText: t('Cancel'),
                      okText: t('Yes'),
                      okButtonProps: { type: 'primary', danger: true },
                      onOk: () => {
                        onRemoveSeason();
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
                seasonItem.id!,
                seasonItem.onDetails!,
                seasonItem.onDelete!,
                seasonItem.onUpdate!
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
  return seasonTableColumn;
}
