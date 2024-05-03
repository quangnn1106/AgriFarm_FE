'use client';

import ActivityListV1 from '@/components/(ScheduleItems)/ActivityList/activityListV1';
import ActivityListV2 from '@/components/(ScheduleItems)/ActivityList/activityListV2';
import { useAppSelector } from '@/redux/hooks';
import { getActivitiesService } from '@/services/Admin/Activities/activityService';
import { ActivityResponse } from '@/services/Admin/Activities/Payload/response/activityResponse';
import UseAxiosAuth from '@/utils/axiosClient';
import { Select } from 'antd';
import { AxiosInstance } from 'axios';
import { useEffect, useState } from 'react';

const ActivityListPage = (props: any) => {
  const defaultVal = props?.searchParams?.a;
  const [activities, setActivities] = useState<ActivityResponse[] | []>([]);
  const http = UseAxiosAuth();
  const [seasons, setSeasons] = useState([
    {
      label: 'Fall',
      value: '33177d84-7368-40d4-882d-8d7fc00ff32b'
    },
    {
      label: 'Spring',
      value: '9929dad3-61ae-49c7-a398-7995357dca1e'
    }
  ]);
  

  return (
    <>
      <ActivityListV2/>
    </>
  );
};

export default ActivityListPage;

