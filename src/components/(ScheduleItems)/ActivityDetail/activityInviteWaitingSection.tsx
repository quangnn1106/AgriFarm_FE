import {
  CheckSquareTwoTone,
  CloseSquareTwoTone,
  NotificationTwoTone
} from '@ant-design/icons';
import { Affix, Flex, Col, Typography, Button, Modal } from 'antd';
import { useState } from 'react';

interface IProps {
  onAccept: () => void;
  onReject: () => void;
}

export default function ActivityInviteWaitingSection(props: IProps) {
  const { onAccept, onReject } = props;
  const [modalOn, setModalOn] = useState(false);
  const [isAccept, setIsAccept] = useState(0);

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
              'Confirm'
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
                  if (isAccept === 1) onAccept();
                  if (isAccept === 2) onReject();
                  setIsAccept(0);
                }}
                type='primary'
              >
                Confirm
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
