import {
  TableColumnsType,
  Dropdown,
  MenuProps,
  Modal,
  Space,
  Button,
  Switch,
  Tag
} from 'antd';
import {
  CheckOutlined,
  DeleteOutlined,
  EllipsisOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';

import { SeasonModel } from '../../models/season-model';

export const seasonTableColumns: TableColumnsType<SeasonModel> = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: 'max-content',
    fixed: 'left'
  },
  {
    title: 'Status',
    dataIndex: 'status',
    width: 'max-content'
  },
  {
    title: 'Start Date',
    dataIndex: 'startDate',
    width: 'max-content'
  },
  {
    title: 'End Date',
    dataIndex: 'startDate',
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
                    onUpdateSeason();
                  }}
                >
                  <Space>
                    <ExclamationCircleOutlined /> Details
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
                    title: 'Do you really want to delete this season ?',
                    centered: true,
                    width: '400px',
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
