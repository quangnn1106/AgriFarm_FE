import { Link } from '@/navigation';
import { ActivityParticipant } from '@/services/Admin/Activities/Payload/response/activityResponse';
import { PlusOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Col,
  Descriptions,
  Flex,
  List,
  message,
  Modal,
  Popover,
  Row,
  theme,
  Typography
} from 'antd';
import { useEffect, useState } from 'react';
import ActivityParticipantFinderModal from './activityParticipantFinderModal';
import UseAxiosAuth from '@/utils/axiosClient';
import {
  removeParticipantService,
  setParticipantService
} from '@/services/Admin/Activities/activitySubService';

interface IProps {
  activityId: string;
  participants: ActivityParticipant[];
}

export default function ActivityParticipantSection(props: IProps) {
  const { participants, activityId } = props;
  const [selectedUser, setSelectedUser] = useState<ActivityParticipant | null>(null);
  const [list, setList] = useState<ActivityParticipant[]>(participants);
  const [roleType, setRoleType] = useState<number | null>(null);
  const [assigner, setAssigner] = useState<ActivityParticipant[]>([]);
  const [inspector, setInspector] = useState<ActivityParticipant[]>([]);
  const [worker, setWorker] = useState<ActivityParticipant[]>([]);
  const [findOpen, setFindOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
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
        setRoleType(null);
        const newList: ActivityParticipant[] = list;
        newList.push(data);
        await setList(newList);
      } else throw new Error();
    } catch {
      message.error('Something went wrong. Try again!');
    } finally {
      setIsLoading(false);
      setFindOpen(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    if (selectedUser) {
      try {
        const res = await removeParticipantService(
          http,
          activityId,
          selectedUser.id,
          roleType ?? 2
        );
        if (res) {
          setSelectedUser(null);
          const newList = list.filter(e => e.id !== selectedUser.id);
          setList(newList);
        } else throw new Error();
      } catch {
        message.error('Something went wrong. Try again!');
      } finally {
        setIsLoading(false);
      }
    }
    setConfirmOpen(false);
  };

  // useEffect(() => {
  //   console.log('data');
  //   setList(list);
  // }, [isLoading]);

  const removeConfirmPopup = (
    <Modal
      centered
      okType={'danger'}
      open={true}
      onCancel={() => setConfirmOpen(false)}
      onOk={() => handleDelete()}
      title={`Do you want remove this user?`}
    ></Modal>
  );

  return (
    <>
      {/* {list.length > -1 && ( */}
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
                style={{
                  minHeight: 20
                }}
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
                {list
                  .filter(e => e.role === 'Assigner')
                  .map(e => (
                    <div key={'z'}>
                      <Popover
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
                          key={e.id.toLowerCase().substring(0, 7)}
                          size={60}
                          src={`#`}
                        />
                      </Popover>
                    </div>
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
                style={{
                  minHeight: 20
                }}
              >
                <Typography.Text
                  type='secondary'
                  strong
                >
                  Inspector
                </Typography.Text>
                <Button
                  shape='circle'
                  size='small'
                  onClick={() => {
                    setRoleType(3);
                    setFindOpen(true);
                  }}
                  type='primary'
                >
                  <PlusOutlined />
                </Button>
              </Flex>
              {/* <Flex
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
              > */}
              <List
                style={{
                  //borderInlineEnd: '1px solid ' + token.colorBgMask
                  maxHeight: 230,
                  overflow: 'auto',
                  padding: 10,
                  width: '100%',
                  minWidth:200
                }}
                grid={{ gutter: 16, column: 2}}
                dataSource={list.filter(e => e.role === 'Inspector')}
                renderItem={e => (
                  <List.Item>
                    <Popover
                      key={'i' + e.id}
                      content={() => {
                        return (
                          <>
                            <Flex
                              gap={5}
                              align='baseline'
                            >
                              <Link href={'#'}>Go to detail</Link>
                              <Button
                                onClick={() => {
                                  setSelectedUser(e);
                                  setConfirmOpen(true);
                                }}
                                type='link'
                              >
                                Remove
                              </Button>
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
                  </List.Item>
                )}
              />
              {/* {list
                  .filter(e => e.role === 'Inspector')
                  .map(e => (
                    
                  ))} */}
            </Flex>
            {/* </Flex> */}
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
                style={{
                  minHeight: 20
                }}
              >
                <Typography.Text
                  type='secondary'
                  strong
                >
                  Follower
                </Typography.Text>
                <Button
                  shape='circle'
                  size='small'
                  onClick={() => {
                    setRoleType(2);
                    setFindOpen(true);
                  }}
                  type='primary'
                >
                  <PlusOutlined />
                </Button>
              </Flex>

              {/* <Flex
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
              > */}
              <List
                style={{
                  //borderInlineEnd: '1px solid ' + token.colorBgMask
                  maxHeight: 230,
                  overflow: 'auto',
                  padding: 10,
                  width: '100%'
                }}
                grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }}
                dataSource={list.filter(e => e.role === 'Assignee')}
                renderItem={e => (
                  <List.Item>
                    <Popover
                      key={'w' + e.id}
                      content={() => {
                        return (
                          <>
                            <Flex
                              gap={5}
                              align='baseline'
                            >
                              <Link href={'#'}>Go to detail</Link>
                              <Button
                                onClick={() => {
                                  setSelectedUser(e);
                                  setConfirmOpen(true);
                                }}
                                type='link'
                              >
                                Remove
                              </Button>
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
                  </List.Item>
                )}
              />
            </Flex>
            {/* </Flex> */}
          </Col>
        </Row>
      </Flex>
      {/* )} */}
      {findOpen && roleType && (
        <ActivityParticipantFinderModal
          onSelected={data => {
            handleSetNewParticipant(data);
            setFindOpen(false);
          }}
          onClose={() => setFindOpen(false)}
          type={roleType}
          init={list}
        />
      )}
      {confirmOpen && selectedUser && removeConfirmPopup}
      {/* {list.map(e => (
        <div key={e.id}>{e.name}</div>
      ))} */}
    </>
  );
}
