import React, { useState } from 'react';
import {
  Badge,
  Button,
  Col,
  Descriptions,
  Divider,
  Drawer,
  Flex,
  Modal,
  Row,
  Space,
  Tag,
  Typography
} from 'antd';
import {
  ActivityResponse,
  Addition
} from '@/services/Admin/Activities/Payload/response/activityResponse';
import dayjs from 'dayjs';
// import { additionsData } from '../FakeData/fakeDatesData';
import { Link, useRouter } from '@/navigation';
import AdditionSection from '../activityAdditions/AdditionSection/additionSection';
import UseAxiosAuth from '@/utils/axiosClient';
import { doneScheduleService } from '@/services/Admin/Activities/scheduleService';
import { RightSquareTwoTone, HourglassTwoTone, FireTwoTone } from '@ant-design/icons';

interface EventModalProps {
  activity: ActivityResponse; // Assuming you have CustomEvent type defined
  onClose: () => void;
}

// const addData = additionsData[0];

const ActivityDetail: React.FC<EventModalProps> = ({ activity, onClose }) => {
  const [open, setOpen] = useState(true);
  const [showDetail, setShowDetail] = useState(false);
  const [additionDetail, setAdditionDetail] = useState<Addition | null>(null);
  const http = UseAxiosAuth();
  const [complete, setComplete] = useState(activity.isCompleted);
  const farmRouter = useRouter()

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
    console.log('id: ', activityId);
    const rs = await doneScheduleService(http, activityId);
    if (rs) {
      setComplete(true);
    }
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
          <div>
            <h2>Activity: {activity.title}</h2>
          </div>
          <Row
            gutter={[16, 32]}
            style={{
              width: '100%',
              minHeight: 200,
              paddingInline: 20,
              overflow: 'auto'
            }}
          >
            <Col span={4}>
              <Descriptions title='Status' />
            </Col>
            <Col span={8}>
              <Badge
                status={complete ? 'success' : 'warning'}
                text={complete ? 'Completed' : 'Not yet'}
              />
            </Col>
            <Col span={24}>
              <Descriptions title='Description' />
              <Flex
                vertical
                style={{
                  maxHeight: '30vh',
                  overflow: 'auto',
                  paddingLeft: 10
                }}
              >
                {activity.descriptions && activity.descriptions.length > 0 ? (
                  activity.descriptions.map(e => {
                    return (
                      <div key={e.name}>
                        <Typography.Text strong>{e.name}:</Typography.Text>
                        <p>{e.value}</p>
                      </div>
                    );
                  })
                ) : (
                  <div>
                    <Typography.Text type='secondary'>Chưa có nội dung</Typography.Text>
                  </div>
                )}
              </Flex>
            </Col>

            {/* <Col span={24}>
            <Descriptions title='Tag' />
            <Space>
              <Tag color='green-inverse'>abc</Tag>
              <Tag color='green-inverse'>ax1</Tag>
              <Tag color='green-inverse'>sda2</Tag>
              <Tag color='green-inverse'>342wz</Tag>
            </Space>
          </Col> */}
            <Col span={8}>
              <Descriptions title='Thời gian bắt đầu' />
              <RightSquareTwoTone twoToneColor={'#00ce07'} />{' '}
              {dayjs(activity.start).format('HH:mm DD/MM/YYYY')}
            </Col>
            <Col span={10}>
              <Descriptions title='Dự kiến hoàn thành' />
              <HourglassTwoTone twoToneColor={'#edbf33'} />{' '}
              {dayjs(activity.end).format('HH:mm DD/MM/YYYY')}
            </Col>
            <Col span={6}>
              <Descriptions title='Kết thúc vào' />
              <FireTwoTone twoToneColor={'#ea4f44'} />{' '}
              {activity.isCompleted
                ? dayjs(activity.end).format('HH:mm DD/MM/YYYY')
                : 'Chưa kết thúc'}
            </Col>
            <Col>
              <Flex
                style={{ width: '100%' }}
                justify='center'
              >
                <Row>
                  <Descriptions title='Season'></Descriptions>

                  {activity.season?.title}
                </Row>
                <Row>
                  <Descriptions title='Location'></Descriptions>
                  {activity.location ? activity.location.name : 'none'}
                </Row>
              </Flex>
            </Col>
          </Row>

          
          <Flex
            justify='end'
            style={{ marginTop: 20 }}
          >
            {/* <Button onClick={handleCancel}>Back</Button> */}
            <Button
              disabled={activity.isCompleted}
              style={{ marginLeft: 10 }}
              type='primary'
              onClick={() => farmRouter.push("/activities/"+activity.id)}
            >
              Xem chi tiết
            </Button>
          </Flex>
        </div>
      </Drawer>
    </>
  );
};

export default ActivityDetail;
/*

*/
