import { NotificationContextProvider } from '@/components/context/notification/SignalRNotifyContext';
import MessageBox from './notiChild';
import { Button, Flex } from 'antd';
import UseAxiosAuth from '@/utils/axiosClient';
import NotificationBell from '../NotificationBell/notificationBell';

export default function CheckMessageNotification() {
  const http = UseAxiosAuth();
  const handleClick = async () => {
    console.log('Sending');
    const rs = await http.get('https://localhost:7012/api/hubs/check');
    console.log(rs);
  };

  const checkSection = (
    <>
      <Button
        type='primary'
        onClick={() => handleClick()}
      >
        Check
      </Button>
    </>
  );

  return (
    <>
      <NotificationContextProvider>
        <Flex vertical>
          {/* <NotificationBell /> */}
          {checkSection}
          <MessageBox />
        </Flex>
      </NotificationContextProvider>
    </>
  );
}
