'use client';

import NotFound from '@/app/not-found';
import ActivityFullDetail from '@/components/(ScheduleItems)/ActivityDetail/activityFullDetail';
import { getActivityByIdService } from '@/services/Admin/Activities/activityService';
import { ActivityResponse } from '@/services/Admin/Activities/Payload/response/activityResponse';
import UseAxiosAuth from '@/utils/axiosClient';
import { notFound } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function ActivityFullDetailPage(props: any) {
  const http = UseAxiosAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  const [activity, setActivity] = useState<ActivityResponse | null>(null);
  const detailId = props.params.id;

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
        console.log('start fetching...')
      fectchActivity(detailId);
    }
    return () => {
      setInitLoading(false);
    };
  }, []);

  return (
    <>
      {!initLoading && activity && <ActivityFullDetail item={activity} />}
      {/* {!initLoading && !activity && <NotFound />} */}
    </>
  );
}
