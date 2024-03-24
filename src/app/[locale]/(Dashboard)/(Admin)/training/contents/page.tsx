"use client"
import TrainingContentList from '@/components/(TrainingItems)/contents/TrainingContentList/trainingContentList';
import { TrainingContent } from '@/services/Admin/Training/response/training.response';
import { getTrainingContentsService } from '@/services/Admin/Training/trainingContentService';
import UseAxiosAuth from '@/utils/axiosClient';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { AxiosInstance } from 'axios';
import { useEffect, useState } from 'react';

export default function TrainingContentsPage() {
  const [contents, setContents] = useState<TrainingContent[]|[]>();
  const [isFetching, setIsFetching] = useState(true);
  const [hasChanged, setHasChanged] = useState(true);
  
  const http = UseAxiosAuth();

  const fetchContents = async (http: AxiosInstance) => {
    try {
      console.log('Fetching data..');
      const responseData = await getTrainingContentsService(http);
      console.log('Data here: ', responseData);
      setContents(responseData?.data as TrainingContent[]);
      setIsFetching(false);
    } catch (error) {
      console.error('Error calling API training content:', error);
    }
  };

  useEffect(() => {
    fetchContents(http)
  }, [http]);

  


  return (
    <>
      <TrainingContentList
        isFetching={isFetching}
        setHasChanged={setHasChanged}
        list={contents?contents:[]}

      />
    </>
  );
}