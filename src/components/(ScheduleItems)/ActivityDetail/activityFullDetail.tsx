import {
  Affix,
  Button,
  Col,
  Descriptions,
  Divider,
  Flex,
  Row,
  Segmented,
  Space,
  Tag,
  theme,
  Typography
} from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import {
  AppstoreTwoTone,
  CheckSquareTwoTone,
  CloseSquareTwoTone,
  EnvironmentTwoTone,
  FireTwoTone,
  HourglassTwoTone,
  PaperClipOutlined,
  RightSquareFilled,
  RightSquareTwoTone
} from '@ant-design/icons';
import ActivityParticipantSection from '../ActivityParticipant/activityParticipantSection';
import { useEffect, useState } from 'react';
import ActivityLocationSection from '../ActivityLocation/activityLocationSection';
import ActivityMaterialSection from '../ActivityMaterial/activityMaterialSection';
import ActivityTaskAdditionSection from '../activityAdditions/activityTaskAdditionSection';
import ActivityInviteWaitingSection from './activityInviteWaitingSection';
import { useRouter } from '@/navigation';
import { getActivityByIdService } from '@/services/Admin/Activities/activityService';
import { notFound, usePathname } from 'next/navigation';
import {
  ActivityLocation,
  ActivityParticipant,
  ActivityResponse
} from '@/services/Admin/Activities/Payload/response/activityResponse';
import UseAxiosAuth from '@/utils/axiosClient';

interface IProps {
  item: ActivityResponse;
}

export default function ActivityFullDetail(props: IProps) {
  const { item } = props;

  const viewDate = new Date();
  const farmRouter = useRouter();
  const [value, setValue] = useState(1);
  
  const [isLoading, setIsLoading] = useState(false);
  const path = usePathname();
  const { token } = theme.useToken();

  

  return (
    <>
      <Divider orientation='left'>
        <Typography.Title level={3}>Activity: {item.title}</Typography.Title>
      </Divider>
      <Flex
        style={{
          width: '60vw',
          minWidth: 800,
          marginLeft: '5vw',
          border: '1px solid black',
          borderRadius: 10,
          padding: 10,
          minHeight: '100vh',
          height: 'auto'
        }}
        vertical
      >
        <Row
          gutter={[16, 32]}
          style={{
            width: '100%',
            minHeight: 200,
            paddingInline: 20,
            overflow: 'auto'
          }}
        >
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
              {item.descriptions &&
                item.descriptions.map(e => {
                  return (
                    <div key={e.name}>
                      <Typography.Text strong>{e.name}:</Typography.Text>
                      <p>{e.value}</p>
                    </div>
                  );
                })}

              
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
            <Descriptions title='Start time' />
            <RightSquareTwoTone twoToneColor={'#00ce07'} />{' '}
            {dayjs(item.start).format('HH:mm DD/MM/YYYY')}
          </Col>
          <Col span={10}>
            <Descriptions title='Estimated end' />
            <HourglassTwoTone twoToneColor={'#edbf33'} />{' '}
            {dayjs(item.end).format('HH:mm DD/MM/YYYY')}
          </Col>
          <Col span={6}>
            <Descriptions title='Worked' />
            <FireTwoTone twoToneColor={'#ea4f44'} /> {0}
          </Col>
        </Row>
        <Divider></Divider>
        <ActivityParticipantSection 
          activityId={item.id}
          participants={item.participants??[]}
        />
        <Divider></Divider>

        <Flex
          vertical
          style={{
            width: '100%',
            //minHeight: 400,
            height:500,
            //minHeight: 400,
            padding: 20
          }}
        >
          <Segmented
            style={{
              //border: '1px solid black',
              height: '20%',
              minHeight: 30,
              marginBottom: 20
            }}
            defaultValue={1}
            options={[
              {
                value: 1,
                label: (
                  <div>
                    <AppstoreTwoTone twoToneColor={'#e84d60'} />
                    Material
                  </div>
                )
              },
              {
                value: 2,
                label: (
                  <div>
                    <EnvironmentTwoTone />
                    Location
                  </div>
                )
              },
              {
                value: 3,
                label: (
                  <div>
                    <PaperClipOutlined />
                    Addition Request
                  </div>
                )
              }
            ]}
            onChange={val => setValue(val.valueOf() as number)}
            block
          />

          <Col span={24}>
            <Flex
              vertical
              align='center'
              justify='center'
              style={{
                height: '80%'
              }}
            >
              {value === 1 && (
                <ActivityMaterialSection
                  activityId={item.id}
                  details={item.materials}
                />
              )}
              {value === 2 && (
                <ActivityLocationSection
                  activityId={item.id}
                  detail={item.location as ActivityLocation}
                  setDetail={data => {
                    item.location = data;
                  }}
                />
              )}
              {value === 3 && <ActivityTaskAdditionSection activity={item}/>}
            </Flex>
          </Col>
          {/* <Col span={24}>title</Col> */}
        </Flex>
      </Flex>
      <Flex
        gap={10}
        style={{ width: '100%', paddingBlock: 50, paddingInlineEnd: '20vw' }}
        justify='end'
      >
        <Button
          //size='large'
          //type='primary'
          onClick={() => farmRouter.push('/activities')}
        >
          Back to list
        </Button>
        <Button
          //size='large'
          disabled
          type='primary'
          onClick={() => {}}
        >
          Mark Complete
        </Button>
      </Flex>
      {!true && (
        <ActivityInviteWaitingSection
          onAccept={() => {
            console.log('Accept task');
          }}
          onReject={() => {
            console.log('Reject task');
          }}
        />
      )}
    </>
  );
}
