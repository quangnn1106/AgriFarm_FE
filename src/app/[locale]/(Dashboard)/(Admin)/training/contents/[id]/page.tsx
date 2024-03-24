'use client';

import TrainingContentDetail from '@/components/(TrainingItems)/contents/TrainingContentDetail/trainingContentDetail';
import { TrainingContent } from '@/services/Admin/Training/response/training.response';
import { getTrainingContentByIdService } from '@/services/Admin/Training/trainingContentService';
import UseAxiosAuth from '@/utils/axiosClient';
import { AxiosInstance } from 'axios';
import { useState, useEffect } from 'react';

export default function TrainingContentDetailPage(props: any) {
  const [content, setContent] = useState<TrainingContent | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [hasChanged, setHasChanged] = useState(true);
  const { params, _ } = props;

  const http = UseAxiosAuth();

  const fetchContents = async (http: AxiosInstance) => {
    if (params.id) {
      try {
        console.log('Fetching data..');
        const responseData = await getTrainingContentByIdService(http, params.id);
        console.log('Data here: ', responseData);
        setContent(responseData?.data as TrainingContent);
        setIsFetching(false);
      } catch (error) {
        console.error('Error calling API training content:', error);
      }
    }
  };

  useEffect(() => {
    fetchContents(http);
  }, [http]);

  return (
    <>
      <div>Content here</div>
      {content && <TrainingContentDetail detail={content} />}
      
    </>
  );
}
