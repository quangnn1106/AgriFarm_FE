import {
  getTrainingDetailService,
  getUsingDetailService
} from '@/services/Admin/Activities/additionService';
import { UsingDetail } from '@/services/Admin/Activities/Payload/response/activityAdditionResponse';
import { TrainingDetail } from '@/services/Admin/Training/response/training.response';
import UseAxiosAuth from '@/utils/axiosClient';
import { AxiosInstance } from 'axios';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface IProps {
  activityId: string;
  isFetching?: boolean;
  setIsFetching: any;
}

const TrainingAddition = (props: IProps) => {
  const { activityId, isFetching, setIsFetching } = props;
  const [detail, setDetail] = useState<TrainingDetail | null>();
  const http = UseAxiosAuth();

  const fetchAddition = async (http: AxiosInstance, activityId: string) => {
    try {
      console.log('Fetching data..');
      const responseData = await getTrainingDetailService(activityId, http);
      console.log('Data here: ', responseData);
      setDetail(responseData?.data as TrainingDetail);
      setIsFetching(false);
    } catch (error) {
      console.error('Error calling API activities:', error);
    }
  };

  useEffect(() => {
    fetchAddition(http, activityId);
  }, [activityId]);

  return (
    <>
      {detail && (
        <div>
          {detail.title && <p>Title: {detail.title}</p>}
          <p>
            Expert:{' '}
            <Link href={`/training/experts/${detail.expert.id}`}>
              {detail.expert.fullName}
            </Link>
          </p>
          <p>
            Content:{' '}
            <Link href={`/training/contents/${detail.content.id}`}>
              {detail.content.title}
            </Link>
          </p>
          <p>Description: {detail.description}</p>
        </div>
      )}
    </>
  );
};

export default TrainingAddition;
