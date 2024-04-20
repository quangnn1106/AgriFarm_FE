'use client';

import { renderPath } from '@/app/[locale]/(Auth)/login/loginform';
import ErrorPage from '@/app/[locale]/(Result)/error/page';
import NotFound from '@/app/not-found';
import ActivityFullDetail from '@/components/(ScheduleItems)/ActivityDetail/activityFullDetail';
import { DASH_BOARD_PATH } from '@/constants/routes';
import { useRouter } from '@/navigation';
import { getActivityByIdService } from '@/services/Admin/Activities/activityService';
import { ActivityResponse } from '@/services/Admin/Activities/Payload/response/activityResponse';
import UseAxiosAuth from '@/utils/axiosClient';
import { Button, Result } from 'antd';
import { useSession } from 'next-auth/react';
import { notFound } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function ActivityFullDetailPage(props: any) {
  const http = UseAxiosAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  const [activity, setActivity] = useState<ActivityResponse | null>(null);
  const detailId = props.params.id;
  const router = useRouter();
  const { data: session } = useSession();
  const role = session?.user.userInfo.role as string;
  const fectchActivity = async (id: string) => {
    setIsLoading(true);
    try {
      const res = await getActivityByIdService(http, id);
      if (res.status !== 200) {
        return notFound();
      }
      console.log('res: ', res);
      setActivity(res.data as ActivityResponse);
    } catch (e) {
      console.log('error fetching: ', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initLoading) {
      console.log('start fetching...');
      fectchActivity(detailId);
    }
    return () => {
      setInitLoading(false);
    };
  }, []);

  return (
    <>
      {!initLoading && activity && <ActivityFullDetail item={activity} />}
      {!initLoading && !activity && (
        <Result
          status='404'
          title='404'
          subTitle='Trang không tồn tại'
          extra={
            <Button
              type='primary'
              onClick={() => {
                router.push(renderPath(role));
              }}
            >
              Màn hình chính
            </Button>
          }
        />
      )}
    </>
  );
}
