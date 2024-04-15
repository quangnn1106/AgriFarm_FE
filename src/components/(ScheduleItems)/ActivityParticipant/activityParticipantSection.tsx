import { Link } from '@/navigation';
import { ActivityParticipant } from '@/services/Admin/Activities/Payload/response/activityResponse';
import { CloseOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
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
  editable: boolean;
}

export default function ActivityParticipantSection(props: IProps) {
  const { participants, activityId, editable } = props;
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

  useEffect(() => {
    const ins = list.filter(e => e.role === 'Inspector');
    setInspector(ins);
    const asne = list.filter(e => e.role === 'Assignee');
    setWorker(asne);
    // console.log("Set change")
  }, [list]);

  // useEffect(()=>{
  //   // console.log("ok")
  // },[worker, inspector])

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
        const newList = [...list, data];
        // const newList: ActivityParticipant[] = list;
        // newList.push(data);
        setList(newList);
        const ins = newList.filter(e => e.role === 'Inspector');
        setInspector(ins);
        const asne = newList.filter(e => e.role === 'Assignee');
        setWorker(asne);
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

  const removeConfirmPopup = (
    <Modal
      centered
      okType={'danger'}
      okText={'Xác nhận'}
      cancelText={'Hủy bỏ'}
      okButtonProps={{ type: 'primary' }}
      open={true}
      onCancel={() => setConfirmOpen(false)}
      onOk={() => handleDelete()}
      title={`Bạn có muốn gỡ người tham dự này khỏi tác vụ không?`}
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
          <Col span={6}>
            <Flex
              style={{
                // borderInlineEnd: '2px solid ' + token.colorBgTextHover,
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
                  {/* Assigner */}
                  Người giao nhiệm vụ
                </Typography.Text>
              </Flex>
              <Flex
                style={{
                  //borderInlineEnd: '1px solid ' + token.colorBgMask
                  // marginTop:1,
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
                        showArrow={false}
                        key={e.id}
                        content={() => {
                          return (
                            <>
                              <Flex
                                gap={15}
                                justify='center'
                                align='baseline'
                              >
                                {/* <Link href={'#'}>Go to detail</Link> */}
                                <Link href={'#'}>
                                  {e.name}
                                  {/* Nguyễn Văn An */}
                                </Link>
                                
                              </Flex>
                            </>
                          );
                        }}
                        // title={e.name}
                      >
                        <Avatar
                          size={60}
                          src={`https://static-00.iconduck.com/assets.00/user-avatar-icon-512x512-vufpcmdn.png`}
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
                  {/* Inspector */}
                  Người giám sát
                </Typography.Text>
                {editable && (
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
                )}
              </Flex>
              <Flex
                style={{
                  //borderInlineEnd: '1px solid ' + token.colorBgMask
                  height: 230,
                  border: '1px solid',
                  overflow: 'auto',
                  padding: 10,
                  width: '100%'
                }}
                wrap='wrap'
                gap={20}
                justify='flex-start'
                align='start'
              >
                {inspector.map(e => (
                  <Popover
                    showArrow={false}
                    key={e.id}
                    content={() => {
                      return (
                        <>
                          <Flex
                            gap={15}
                            key={e.id}
                            justify='center'
                            align='baseline'
                          >
                            {/* <Link href={'#'}>Go to detail</Link> */}
                            <Link href={'#'}>
                              {e.name}
                              {/* Nguyễn Văn An */}
                            </Link>
                            {editable && (
                              <Button
                                onClick={() => {
                                  setSelectedUser(e);
                                  setConfirmOpen(true);
                                }}
                                type='primary'
                                shape='circle'
                                danger
                              >
                                {/* Remove */}
                                <MinusOutlined />
                                {/* Gỡ */}
                              </Button>
                            )}
                          </Flex>
                        </>
                      );
                    }}
                    // title={e.name}
                  >
                    <Avatar
                      size={60}
                      src={`https://static-00.iconduck.com/assets.00/user-avatar-icon-512x512-vufpcmdn.png`}
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
                style={{
                  minHeight: 20
                }}
              >
                <Typography.Text
                  type='secondary'
                  strong
                >
                  {/* Follower */}
                  Người thực hiện
                </Typography.Text>
                {editable && (
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
                )}
              </Flex>

              <Flex
                style={{
                  //borderInlineEnd: '1px solid ' + token.colorBgMask
                  height: 230,
                  border: '1px solid',
                  overflow: 'auto',
                  padding: 10,
                  width: '30vw'
                }}
                wrap='wrap'
                gap={20}
                justify='flex-start'
                align='start'
              >
                {worker.map(e => (
                  <Popover
                    showArrow={false}
                    key={e.id}
                    content={() => {
                      return (
                        <>
                          <Flex
                            key={e.id}
                            gap={15}
                            justify='center'
                            align='baseline'
                          >
                            {/* <Link href={'#'}>Go to detail</Link> */}
                            <Link href={'#'}>
                              {e.name}
                              {/* Nguyễn Văn An */}
                            </Link>
                            {editable && (
                            <Button
                              onClick={() => {
                                setSelectedUser(e);
                                setConfirmOpen(true);
                              }}
                              type='primary'
                              shape='circle'
                              danger
                            >
                              {/* Remove */}
                              <MinusOutlined />
                              {/* Gỡ */}
                            </Button>
                            )}
                          </Flex>
                        </>
                      );
                    }}
                    // title={e.name}
                  >
                    <Avatar
                      size={60}
                      src={`https://static-00.iconduck.com/assets.00/user-avatar-icon-512x512-vufpcmdn.png`}
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
