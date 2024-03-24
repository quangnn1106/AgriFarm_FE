'use client';
import { Expert } from '@/services/Admin/Training/response/training.response';
import { DeleteTwoTone, EditTwoTone, PlusOutlined } from '@ant-design/icons';
import { Button, Image, List, Popconfirm, Space, Table, TableProps } from 'antd';
import { useState } from 'react';
import ExpertDetail from '../ExpertDetail/expertDetail';
import CreateExpert from '../CreateExpert/createExpert';
import UpdateExpert from '../UpdateExpert/updateExpert';
import AgriImage from '@/components/(ImageItem)/AgriImage/agriImage';

interface IProps {
  list: Expert[] | [];
  isFetching: boolean;
  setHasChanged: (value: boolean) => void;
}

export default function ExpertList(props: IProps) {
  const { list, isFetching, setHasChanged } = props;
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [createOpen, setCreateOpen] = useState<boolean>(false);
  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const [detailOpen, setDetailOpen] = useState<boolean>(false);

  const renderHeader = () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>Expert Profiles</span>
        <Button
          icon={<PlusOutlined />}
          type='primary'
          onClick={() => setCreateOpen(true)}
        >
          Add Expert
        </Button>
      </div>
    );
  };

  const handleDelete = async (content: Expert) => {
    //await handleDeleteActivityAction({ id: user.id })
  };

  const handleDetailClick = (content: Expert) => {
    //console.log('On click, detail = ', content);
    setSelectedExpert(content);
    setDetailOpen(true);
  };

  const renderDetail = () => {
    console.log('appear popup');
    return (
      <ExpertDetail
        detail={selectedExpert ?? ({} as Expert)}
        onClose={() => setDetailOpen(false)}
      />
    );
  };

  const columns: TableProps<Expert>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => (
        <a onClick={() => handleDetailClick(record)}>{record.fullName}</a>
      )
    },

    {
      title: 'Description',
      key: 'description',
      dataIndex: 'description',
      render: (_, { description }) => (
        <>
          <Space>
            {description && description.length > 20
              ? description.substring(0, 20) + '...'
              : description ?? 'none'}
          </Space>
        </>
      )
    },
    {
      title: 'Profession',
      key: 'profession',
      dataIndex: 'profession',
      render: (_, { expertField }) => (
        <>
          <Space>{expertField ?? 'none'}</Space>
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
              setSelectedExpert(record);
            }}
          />

          <Popconfirm
            placement='leftTop'
            title={'Do you want to delete this expert information?'}
            description={
              'This expert information will be deleted permanently after you accept this action.'
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
      <div>
        <AgriImage
          height={200}
          width={200}
          path='123/41347038-ecc3_bg.png'
          alt='ok'
        />
      </div>
      {detailOpen && selectedExpert && (
        <ExpertDetail
          detail={selectedExpert ?? ({} as Expert)}
          onClose={() => {
            setDetailOpen(false);
            setHasChanged(false);
          }}
        />
      )}
      {createOpen && (
        <CreateExpert
          //isOpen={createOpen}
          onClose={() => setCreateOpen(false)}
        />
      )}
      {updateOpen && (
        <UpdateExpert
          onClose={() => {
            setUpdateOpen(false);
          }}
          detail={selectedExpert ?? ({} as Expert)}
        />
      )}
    </>
  );
}
