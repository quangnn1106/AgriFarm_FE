import React from 'react';
import { App, Button, Space } from 'antd';

// Sub page
const MyPage = () => {
  const { notification } = App.useApp();

  const showNotification = () => {
    notification.info({
      message: `Notification topLeft`,
      description: 'Hello, Ant Design!!'
    });
  };

  return (
    <Space>
      <Button
        type='primary'
        onClick={showNotification}
      >
        Open notification
      </Button>
    </Space>
  );
};
