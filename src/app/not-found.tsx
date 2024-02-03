'use client';
import { DASH_BOARD_PATH } from '@/constants/routes';
import { Button, Result } from 'antd';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  return (
    <html lang='en'>
      <body>
        <Result
          status='404'
          title='404'
          subTitle='Sorry, the page you visited does not exist.'
          extra={
            <Button
              type='primary'
              onClick={() => {
                router.push(DASH_BOARD_PATH);
              }}
            >
              Back Home
            </Button>
          }
        />
      </body>
    </html>
  );
}
