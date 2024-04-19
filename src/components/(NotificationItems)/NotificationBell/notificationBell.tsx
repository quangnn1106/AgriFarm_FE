import { useSignalRNotification } from '@/components/context/notification/SignalRNotifyContext';
import { useRouter } from '@/navigation';
import { BellOutlined } from '@ant-design/icons';
import { Button, Col, Flex, FloatButton, List, Popover, Row, Typography } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

export default function NotificationBell() {
  const { messages } = useSignalRNotification();
  const farmRouter = useRouter();
  const [bellCount, setBellCount] = useState(messages.length);

  useEffect(() => {
    if (messages.length > bellCount) {
      setBellCount(prev => prev + 1);
    }
  }, [messages.length]);

  const resetBellCount = () => {
    setBellCount(0);
  };

  const contents = (
    <>
      <div
        style={{
          height: 300,
          width: 400,
          border: '1px solid',
          borderRadius: 10,
          overflow: 'auto'
        }}
      >
        <List
          dataSource={messages}
          renderItem={(e, i) => (
            <List.Item key={i}>
              <Row
                style={{
                  width: '100%'
                }}
              >
                <Col
                  offset={1}
                  span={3}
                >
                  {dayjs(e.date).format('HH:mm DD/MM')}
                </Col>
                <Col span={14}>
                  <Flex>
                    <Typography>{e.content}</Typography>
                  </Flex>
                </Col>
                <Col span={3}>
                  {e.ref && (
                    <Button
                      type='link'
                      onClick={() => farmRouter.push(e.ref ?? '')}
                    >
                      Chi tiết
                    </Button>
                  )}
                </Col>
              </Row>
            </List.Item>
          )}
        />
      </div>
    </>
  );

  return (
    <>
      <Popover
        style={{
          //   height: 300,
          //   width: 400,
          //   border: '1px solid',
          borderRadius: 10,
          overflow: 'auto'
          //   marginRight:'3vw'
        }}
        placement='bottomRight'
        content={contents}
        title='Your Notification Message'
        trigger='click'
      >
        <FloatButton
          onClick={() => resetBellCount()}
          style={{ right: '5vw', top: '10vh' }}
          tooltip={<div>Thông báo</div>}
          badge={{ count: bellCount }}
          icon={<BellOutlined />}
        />
      </Popover>
    </>
  );
}
