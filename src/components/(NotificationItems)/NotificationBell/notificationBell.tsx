import { useSignalRNotification } from '@/components/context/notification/SignalRNotifyContext';
import { BellOutlined } from '@ant-design/icons';
import { Col, Flex, FloatButton, List, Popover, Row, Typography } from 'antd';
import dayjs from 'dayjs';

export default function NotificationBell() {
  const { messages } = useSignalRNotification();

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
                  span={5}
                >
                  {dayjs(e.date).format('HH:mm DD/MM/YY')}
                </Col>
                <Col span={17}>
                  <Flex>
                    <Typography>{e.title}</Typography>
                  </Flex>
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
          overflow: 'auto',
        //   marginRight:'3vw'
        }}
        placement="bottomRight"
        content={contents}
        title='Your Notification Message'
        trigger='click'
      >
        <FloatButton
          style={{ right: '5vw', top: '10vh' }}
          tooltip={<div>Notify</div>}
          badge={{ count: messages.length }}
          icon={<BellOutlined />}
        />
      </Popover>
    </>
  );
}
