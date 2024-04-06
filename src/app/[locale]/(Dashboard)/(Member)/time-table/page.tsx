"use client"

import Schedule from '@/components/(ScheduleItems)/Schedule/schedule';
import { ActivityResponse } from '@/services/Admin/Activities/Payload/response/activityResponse';
import { getScheduleService } from '@/services/Admin/Activities/scheduleService';

import UseAxiosAuth from '@/utils/axiosClient';
import { AxiosInstance } from 'axios';
import { useEffect, useState } from 'react';

const CalendarPage = () => {
  const [activities, setActivities] = useState<ActivityResponse[] | []>([]);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const http = UseAxiosAuth();
  const fetchActivities = async (http: AxiosInstance) => {
    try {
      console.log('Fetching data..');
      const responseData = await getScheduleService(http);
      console.log('Data here: ', responseData);
      setActivities(responseData?.data as ActivityResponse[]);
      setIsFetching(false);
    } catch (error) {
      console.error('Error calling API schedule:', error);
    }
  };

  useEffect(() => {
    fetchActivities(http);
  }, [http]);

  return (
    <>
      <Schedule
        allActivities={activities}
        isFetching={isFetching}
      />
    </>
  );
};

export default CalendarPage;
