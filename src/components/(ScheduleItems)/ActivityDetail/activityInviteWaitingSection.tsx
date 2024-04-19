import { useRouter } from '@/navigation';
import { checkInviteActivitiesService } from '@/services/Admin/Activities/activityService';
import UseAxiosAuth from '@/utils/axiosClient';
import {
  CheckSquareTwoTone,
  CloseSquareTwoTone,
  NotificationTwoTone
} from '@ant-design/icons';
import { Affix, Flex, Col, Typography, Button, Modal, message } from 'antd';
import { useState } from 'react';

interface IProps {
  activityId: string;
  onAccept: () => void;
  onReject: () => void;
}

export default function ActivityInviteWaitingSection(props: IProps) {
  const { onAccept, onReject, activityId } = props;
  const [modalOn, setModalOn] = useState(false);
  const [isAccept, setIsAccept] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const farmRouter = useRouter();

  const http = UseAxiosAuth();

  const handleSubmit = () => {
    setIsFetching(true);
    const rep = isAccept === 1;
    checkInviteActivitiesService(http, activityId, rep)
      .then(res => {
        if (res) {
          if (rep) {
            onAccept();
          } else {
            onReject();
            farmRouter.push("/home")
          }
        }else throw new Error()
      })
      .catch(err => {
        message.error('Xảy ra lỗi, vui lòng thử lại!');
      })
      .finally(() => setIsFetching(false));
  };

  return (
    <>
      <Affix
        offsetBottom={100}
        style={{
          marginInline: '12vw',
          marginLeft: '3vw'
        }}
      >
        <Flex
          style={{
            //marginLeft: 20,
            width: '100%',
            backgroundColor: 'white',
            padding: 20,
            border: '1px solid',
            borderRadius: 20
          }}
          align='center'
          justify='center'
        >
          <Col span={2}>
            <NotificationTwoTone
              style={{ fontSize: '200%' }}
              twoToneColor={'#ddbf64'}
            />
          </Col>
          <Col span={12}>
            <Flex
              style={{ width: '100%' }}
              align='center'
              justify='center'
            >
              <Typography.Text strong>
                Bạn được mời tham gia hoạt động này, xác nhận tham gia?
              </Typography.Text>
            </Flex>
          </Col>
          <Col
            offset={4}
            span={2}
          >
            <Button
              loading={isFetching}
              disabled={isFetching}
              type='text'
              onClick={() => {
                setModalOn(true);
                setIsAccept(1);
              }}
            >
              <Typography.Text type='success'>Đồng ý</Typography.Text>
              <CheckSquareTwoTone twoToneColor='#8fce00' />
            </Button>
          </Col>
          <Col span={1}></Col>
          <Col span={2}>
            <Button
              loading={isFetching}
              disabled={isFetching}
              type='text'
              onClick={() => {
                setModalOn(true);
                setIsAccept(2);
              }}
            >
              <Typography.Text type='danger'>Từ chối</Typography.Text>
              <CloseSquareTwoTone twoToneColor='#d52727' />
            </Button>
          </Col>
        </Flex>
      </Affix>
      {modalOn && (
        <Modal
          centered
          okText={'Xác nhận'}
          cancelText={'Hủy bỏ'}
          open={true}
          title={
            isAccept === 1 ? (
              <Typography.Text
                strong
                type='success'
              >
                Bạn xác nhận tham gia nhiệm vụ?
              </Typography.Text>
            ) : isAccept === 2 ? (
              <Typography.Text
                strong
                type='danger'
              >
                Bạn xác nhận từ chối nhiệm vụ?
              </Typography.Text>
            ) : (
              'Xác nhận'
            )
          }
          onCancel={() => {
            setModalOn(false);
            setIsAccept(0);
          }}
          footer={(_, { OkBtn, CancelBtn }) => (
            <>
              <CancelBtn />
              <Button
                onClick={() => {
                  setModalOn(false);
                  // if (isAccept === 1) onAccept();
                  // if (isAccept === 2) onReject();
                  handleSubmit();
                  setIsAccept(0);
                }}
                type='primary'
              >
                Xác nhận
              </Button>
            </>
          )}
        >
          {isAccept === 1 && (
            <div>
              <Typography.Text
                type='secondary'
                italic
              >
                {/* Sau đó */}
              </Typography.Text>
            </div>
          )}
          {isAccept === 2 && (
            <div>
              <Typography.Text
                type='secondary'
                italic
              >
                {/* After you reject, this activity detail will disappear. */}
              </Typography.Text>
            </div>
          )}
        </Modal>
      )}
    </>
  );
}
