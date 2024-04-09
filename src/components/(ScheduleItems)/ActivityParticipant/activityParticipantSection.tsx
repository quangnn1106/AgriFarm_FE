import { Link } from '@/navigation';
import { ActivityParticipant } from '@/services/Admin/Activities/Payload/response/activityResponse';
import { PlusOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Col,
  Descriptions,
  Flex,
  message,
  Popover,
  Row,
  theme,
  Typography
} from 'antd';
import { useEffect, useState } from 'react';
import ActivityParticipantFinderModal from './activityParticipantFinderModal';
import UseAxiosAuth from '@/utils/axiosClient';
import { setParticipantService } from '@/services/Admin/Activities/activitySubService';

interface IProps {
  activityId: string;
  participants: ActivityParticipant[];
}

export default function ActivityParticipantSection(props: IProps) {
  const { participants, activityId } = props;
  const [list, setList] = useState<ActivityParticipant[]>(participants);
  const [roleType, setRoleType] = useState<number | null>(null);
  const [assigner, setAssigner] = useState<ActivityParticipant[]>([]);
  const [inspector, setInspector] = useState<ActivityParticipant[]>([]);
  const [worker, setWorker] = useState<ActivityParticipant[]>([]);
  const [findOpen, setFindOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = theme.useToken();
  const http = UseAxiosAuth();

  const handleSetNewParticipant = async (data: ActivityParticipant) => {
    setIsLoading(true);
    try {
      const res = await setParticipantService(http, activityId, {
        id: data.id,
        name: data.name,
        role: roleType ?? 2
      });
      if (res) {
        const l2 = list;
        l2.push(data);
        console.log('data add: ', data);
        console.log('data add: ', l2);
        const asgn = l2.filter(e => e.role === 'Assigner');
        setAssigner(asgn);
        const insp = l2.filter(e => e.role === 'Inspector');
        setInspector(insp);
        const wrk = l2.filter(e => e.role === 'Assignee');
        setList(l2);
        setFindOpen(false);
      } else throw new Error();
    } catch {
      message.error('Something went wrong. Try again!');
    } finally {
      setIsLoading(false);
      setRoleType(null);
    }
  };

  useEffect(() => {
    console.log('refresh');
    const asgn = list.filter(e => e.role === 'Assigner');
    setAssigner(asgn);
    const insp = list.filter(e => e.role === 'Inspector');
    setInspector(insp);
    const wrk = list.filter(e => e.role === 'Assignee');
    setWorker(wrk);
  }, [list]);

  return (
    <>
      <Flex>
        <Row
          gutter={[16, 16]}
          style={{
            width: '100%',
            height: 300,
            padding: 20
            //border: '1px solid black'
          }}
        >
          {/* <Col span={24}>
            <Descriptions title='Participants' />
          </Col> */}
          <Col span={6}>
            <Flex
              style={{
                borderInlineEnd: '2px solid ' + token.colorBgTextHover,
                height: '100%',
                paddingInline: 20
              }}
              vertical
              justify='flex-start'
              align='center'
            >
              <Flex
                gap={10}
                align='center'
              >
                <Typography.Text
                  type='secondary'
                  strong
                >
                  Assigner
                </Typography.Text>
                {/* <Button
                onClick={()=>{
                  setRoleType(2)
                  setFindOpen(true)
                }}
                 type='primary'>
                  <PlusOutlined />
                </Button> */}
              </Flex>
              <Flex
                style={{
                  //borderInlineEnd: '1px solid ' + token.colorBgMask
                  maxHeight: 230,
                  overflow: 'auto',
                  padding: 10,
                  width: '100%'
                }}
                wrap='wrap'
                gap={20}
                justify='flex-start'
                align='start'
              >
                {assigner.map(e => (
                  <Popover
                    key={e.id}
                    content={() => {
                      return (
                        <>
                          <Flex
                            gap={5}
                            align='baseline'
                          >
                            <Link href={'#'}>Go to detail</Link>
                            {/* <Button type='link'>Remove</Button> */}
                          </Flex>
                        </>
                      );
                    }}
                    title={e.name}
                  >
                    <Avatar
                      size={60}
                      src={`#`}
                    />
                  </Popover>
                ))}
              </Flex>
            </Flex>
          </Col>
          <Col span={8}>
            <Flex
              style={{
                borderInlineEnd: '2px solid ' + token.colorBgTextHover,
                height: '100%',
                paddingInline: 20
              }}
              vertical
              justify='flex-start'
              align='center'
            >
              <Flex
                gap={10}
                align='center'
              >
                <Typography.Text
                  type='secondary'
                  strong
                >
                  Inspector
                </Typography.Text>
                <Button
                  onClick={() => {
                    setRoleType(3);
                    setFindOpen(true);
                  }}
                  type='primary'
                >
                  <PlusOutlined />
                </Button>
              </Flex>
              <Flex
                style={{
                  //borderInlineEnd: '1px solid ' + token.colorBgMask
                  maxHeight: 230,
                  overflow: 'auto',
                  padding: 10,
                  width: '100%'
                }}
                wrap='wrap'
                gap={20}
                justify='flex-start'
              >
                {inspector.map(e => (
                  <Popover
                    key={e.id}
                    content={() => {
                      return (
                        <>
                          <Flex
                            gap={5}
                            align='baseline'
                          >
                            <Link href={'#'}>Go to detail</Link>
                            <Button type='link'>Remove</Button>
                          </Flex>
                        </>
                      );
                    }}
                    title={e.name}
                  >
                    <Avatar
                      size={60}
                      src={`#`}
                    />
                  </Popover>
                ))}
              </Flex>
            </Flex>
          </Col>
          <Col span={10}>
            <Flex
              style={{
                height: '100%',
                paddingInline: 10
              }}
              vertical
              justify='flex-start'
              align='center'
            >
              <Flex
                gap={10}
                align='center'
              >
                <Typography.Text
                  type='secondary'
                  strong
                >
                  Follower
                </Typography.Text>
                <Button
                  onClick={() => {
                    setRoleType(2);
                    setFindOpen(true);
                  }}
                  type='primary'
                >
                  <PlusOutlined />
                </Button>
              </Flex>

              <Flex
                style={{
                  //borderInlineEnd: '1px solid ' + token.colorBgMask
                  maxHeight: 230,
                  overflow: 'auto',
                  padding: 10,
                  width: '100%'
                }}
                justify='flex-start'
                wrap='wrap'
                gap={20}
              >
                {worker.map(e => (
                  <Popover
                    key={e.id}
                    content={() => {
                      return (
                        <>
                          <Flex
                            gap={5}
                            align='baseline'
                          >
                            <Link href={'#'}>Go to detail</Link>
                            <Button type='link'>Remove</Button>
                          </Flex>
                        </>
                      );
                    }}
                    title={e.name}
                  >
                    <Avatar
                      size={60}
                      src={`#`}
                    />
                  </Popover>
                ))}
              </Flex>
            </Flex>
          </Col>
        </Row>
      </Flex>
      {findOpen && roleType && (
        <ActivityParticipantFinderModal
          onSelected={data => {
            handleSetNewParticipant(data);
            setFindOpen(false);
          }}
          onClose={() => setFindOpen(false)}
          type={roleType}
        />
      )}
    </>
  );
}
