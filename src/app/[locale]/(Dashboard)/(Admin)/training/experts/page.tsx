"use client"
import ExpertList from '@/components/(TrainingItems)/experts/ExpertList/expertList';
import TrainingContentList from '@/components/(TrainingItems)/experts/ExpertList/expertList';
import { getExpertsService } from '@/services/Admin/Training/expertService';
import { Expert, TrainingContent } from '@/services/Admin/Training/response/training.response';
import UseAxiosAuth from '@/utils/axiosClient';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { AxiosInstance } from 'axios';
import { useEffect, useState } from 'react';

export default function ExpertsPage() {
  const [experts, setExperts] = useState<Expert[]|[]>();
  const [isFetching, setIsFetching] = useState(true);
  const [hasChanged, setHasChanged] = useState(true);
  
  const http = UseAxiosAuth();

  const fetchExperts = async (http: AxiosInstance) => {
    try {
      console.log('Fetching data..');
      const responseData = await getExpertsService(http);
      console.log('Data here: ', responseData);
      setExperts(responseData?.data as Expert[]);
      setIsFetching(false);
    } catch (error) {
      console.error('Error calling API training content:', error);
    }
  };

  useEffect(() => {
    fetchExperts(http)
  }, [http, hasChanged]);

  


  return (
    <>
      <ExpertList
        isFetching={isFetching}
        setHasChanged={setHasChanged}
        list={experts?experts:[]}

      />
    </>
  );
}
