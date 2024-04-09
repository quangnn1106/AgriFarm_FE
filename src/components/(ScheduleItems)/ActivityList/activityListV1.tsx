'use client';
import { PlusOutlined, DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import { Button, Popconfirm, Space, Table, TableProps, Tag } from 'antd';
import { useEffect, useState } from 'react';
import ActivityDetail from '../ActivityDetail/activityDetail';
import CreateActivityV1 from '../CreateActivity/createActivityV1';
import UpdateActivity from '../UpdateActivity/updateAcitivity';
import { ActivityResponse } from '@/services/Admin/Activities/Payload/response/activityResponse';
import dayjs from 'dayjs';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface IProp {
  list: ActivityResponse[];
  isFetching: boolean;
  defaultVal?: string;
}

const ActivityListV1 = (props: IProp) => {
  const { list, isFetching, defaultVal } = props;
  const [selectedActivity, setSelectedActivity] = useState<ActivityResponse | null>(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [createOpen, setCreateOpen] = useState<boolean>(false);
  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const [detailOpen, setDetailOpen] = useState<boolean>(!!selectedActivity);

  useEffect(()=>{
    const val = defaultVal ? list.find(e => e.id == defaultVal) ?? null : null
    onOpenDetail(val)
  },[list])

  const renderHeader = () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>List Activity</span>
        <Button
          icon={<PlusOutlined />}
          type='primary'
          onClick={() => setCreateOpen(true)}
        >
          Add New Activity
        </Button>
      </div>
    );
  };

  const handleCloseDetail = () => {
    replace(`${pathname}`);
    setSelectedActivity(null);
    setDetailOpen(false);
  };

  const onOpenDetail = (detail: ActivityResponse | null) => {
    //console.log("On click, detail = ", detail);
    if (detail) {
      const params = new URLSearchParams(searchParams);
      params.set('a', detail.id);
      replace(`${pathname}?${params.toString()}`);
      setDetailOpen(true);
      setSelectedActivity(detail);
    }
  };

  const handleDelete = async (activity: ActivityResponse) => {
    //await handleDeleteActivityAction({ id: user.id })
  };

  const columns: TableProps<ActivityResponse>['columns'] = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (_, record) => <a onClick={() => onOpenDetail(record)}>{record.title}</a>
    },

    {
      title: 'Duration',
      key: 'duration',
      dataIndex: 'duration',
      render: (_, { start, end }) => (
        <>
          <Space>
            {dayjs(start).format('HH:mm DD/MM/YYYY')}
            {end && `- ${dayjs(end).format('HH:mm DD/MM/YYYY')}`}
          </Space>
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
              console.log('ok');
              setUpdateOpen(true);
              setSelectedActivity(record);
            }}
          />

          <Popconfirm
            placement='leftTop'
            title={'Do you want to delete this activity?'}
            description={
              'This activity will be deleted permanently after you accept this action.'
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
        columns={columns}
        rowKey={'id'}
        dataSource={list}
        loading={isFetching}
        pagination={{ pageSize: 5 }}
      />
      {detailOpen && selectedActivity && (
        <ActivityDetail
          activity={selectedActivity}
          onClose={handleCloseDetail}
        />
      )}
      {createOpen && (
        <CreateActivityV1
          //isOpen={createOpen}
          setOpen={setCreateOpen}
        />
      )}
      {updateOpen && (
        <UpdateActivity
          setOpen={setUpdateOpen}
          dataUpdate={selectedActivity!}
          setDataUpdate={setSelectedActivity}
        />
      )}
    </>
  );
};

export default ActivityListV1;
