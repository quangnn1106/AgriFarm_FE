'use client';
import { TrainingContent } from '@/services/Admin/Training/response/training.response';
import { DeleteTwoTone, EditTwoTone, PlusOutlined } from '@ant-design/icons';
import { Button, List, Popconfirm, Space, Table, TableProps } from 'antd';
import { useState } from 'react';
import TrainingContentDetail from '../TrainingContentDetail/trainingContentDetail';
import CreateTrainingContent from '../CreateTrainingContent/createTrainingContent';
import UpdateTrainingContent from '../UpdateTrainingContent/updateTrainingContent';
import TrainingContentModal from '../TrainingContentDetail/trainingContentModal';

interface IProps {
  list: TrainingContent[] | [];
  isFetching: boolean;
  setHasChanged: (value:boolean)=>void;
}

export default function TrainingContentList(props: IProps) {
  const { list, isFetching, setHasChanged } = props;
  const [selectedContent, setSelectedContent] = useState<TrainingContent | null>(null);
  const [createOpen, setCreateOpen] = useState<boolean>(false);
  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const [detailOpen, setDetailOpen] = useState<boolean>(false);

  const renderHeader = () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>List Training Content</span>
        <Button
          icon={<PlusOutlined />}
          type='primary'
          onClick={() => setCreateOpen(true)}
        >
          New Content
        </Button>
      </div>
    );
  };

  const handleDelete = async (content: TrainingContent) => {
    //await handleDeleteActivityAction({ id: user.id })
  };

  const handleDetailClick = (content: TrainingContent) => {
    //console.log('On click, detail = ', content);
    setSelectedContent(content);
    setDetailOpen(true);

  };

  const renderDetail = () => {
    console.log('appear popup');
    return (
      <TrainingContentModal
        detail={selectedContent ?? ({} as TrainingContent)}
        onClose={() => setDetailOpen(false)}
      />
    );
  };

  const columns: TableProps<TrainingContent>['columns'] = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (_, record) => (
        <a onClick={() => handleDetailClick(record)}>{record.title}</a>
      )
    },

    {
      title: 'Content',
      key: 'content',
      dataIndex: 'content',
      render: (_, { content }) => (
        <>
          <Space>
            {content && content.length > 20
              ? content.substring(0, 20) + '...'
              : content ?? 'none'}
          </Space>
        </>
      )
    },
    {
      title: 'Reference',
      key: 'reference',
      dataIndex: 'reference',
      render: (_, { refer }) => (
        <>
          <Space>{refer ?? 'none'}</Space>
        </>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <>
          <EditTwoTone
            twoToneColor='#f57800'
            style={{ cursor: 'pointer', margin: '0 20px' }}
            onClick={() => {
              setUpdateOpen(true);
              setSelectedContent(record);
            }}
          />

          <Popconfirm
            placement='leftTop'
            title={'Do you want to delete this content?'}
            description={
              'This content will be deleted permanently after you accept this action.'
            }
            onConfirm={() => handleDelete(record)}
            okText='Accept'
            cancelText='Cancel'
          >
            <span style={{ cursor: 'pointer' }}>
              <DeleteTwoTone twoToneColor='#ff4d4f' />
            </span>
          </Popconfirm>
        </>
      )
    }
  ];

  return (
    <>
      <Table
        title={renderHeader}
        loading={isFetching}
        dataSource={list}
        rowKey={'id'}
        columns={columns}
      />
        {detailOpen && selectedContent &&
          <TrainingContentModal
            detail={selectedContent ?? ({} as TrainingContent)}
            onClose={() => {
              setDetailOpen(false)
              setHasChanged(false)
            }}
          />
        }
        {createOpen &&
          <CreateTrainingContent
            //isOpen={createOpen}
            onClose={() => setCreateOpen(false)}
          />
        }
        {updateOpen && (
          <UpdateTrainingContent
            onClose={() => setUpdateOpen(false)}
            detail={selectedContent!}
          />
        )}
    </>
  );
}
