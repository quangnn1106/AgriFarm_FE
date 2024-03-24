import React, { useState } from 'react';
import { Button, Drawer, Modal, Space, Tag } from 'antd';
import { ActivityResponse, Addition } from '@/services/Admin/Activities/Payload/response/activities';
import dayjs from 'dayjs';
import { additionsData } from '../FakeData/fakeDatesData';
import { Link } from '@/navigation';
import AdditionSection from '../activityAdditions/AdditionSection/additionSection';
import UseAxiosAuth from '@/utils/axiosClient';
import { doneScheduleService } from '@/services/Admin/Activities/scheduleService';

interface EventModalProps {
  activity: ActivityResponse; // Assuming you have CustomEvent type defined
  onClose: () => void;
}

const addData = additionsData[0];

const ActivityDetail: React.FC<EventModalProps> = ({ activity, onClose }) => {
  const [open, setOpen] = useState(true);
  const [showDetail, setShowDetail] = useState(false);
  const [additionDetail, setAdditionDetail] = useState<Addition | null>(null);
  const http = UseAxiosAuth()

  const showModal = () => {
    console.log('ok');
    //setOpen(true);
  };
  const handleOk = () => {
    //setOpen(false);
  };

  const handleCancel = () => {
    //setOpen(false);
    onClose();
  };

  const handleDone = async (activityId: string) => {
    console.log("id: ", activityId)
    const rs = await doneScheduleService(http, activityId)
    
    console.log('done, ', rs);
  };

  return (
    <>
      <Drawer
        open={open}
        title={'Activity Detail'}
        onClose={handleCancel}
        width={'40vw'}
      >
        <div style={{ height: '80vh' }}>
          {/* <p>ID: {activity.id}</p> */}
          <div>
            <h2>Title: {activity.title}</h2>
          </div>
          <p>Start: {dayjs(activity.start).format('HH:mm DD/MM/YYYY')}</p>
          <p>End: {dayjs(activity.end).format('HH:mm DD/MM/YYYY')}</p>
          <div>
            Information:{' '}
            {activity.descriptions.map((des, index) => {
              return (
                <div key={index}>
                  {' '}
                  {'-'} {des.name}: {des.value}
                </div>
              );
            })}
          </div>
          <div>
            Land: <a href={`/${activity.location?.id}`}>{activity.location?.name}</a>
          </div>
          <div>
            Season: <a href={`/${activity.season?.id}`}>{activity.season?.title}</a>
          </div>
          <div>
            Inspectors:{' '}
            {activity.inspectors.map((ins, index) => (
              <Tag
                color='blue'
                key={index}
              >
                <a href={`/${ins.id}`}>@{ins.name}</a>
              </Tag>
            ))}
          </div>
          <div>
            Participants:{' '}
            {activity.workers.map((wok, index) => (
              <Tag
                color='cyan'
                key={index}
              >
                @{wok.name}
              </Tag>
            ))}
          </div>
          <p>Status: {activity.isCompleted ? 'Completed' : 'Not yet'}</p>
          
          Detail:{' '}
          {activity.addition && (
            <AdditionSection
              activityId={activity.id}
              addition={activity.addition}
            />
          )}
          {/* {additionDetail && (
            <AdditionDetail
              addition={additionDetail}
              onClose={() => setAdditionDetail(null)}
            />
          )} */}
        </div>
        <>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button
            type='primary'
            onClick={()=>handleDone(activity.id)}
          >
            Mark as Done
          </Button>
        </>
      </Drawer>
    </>
  );
};

export default ActivityDetail;
