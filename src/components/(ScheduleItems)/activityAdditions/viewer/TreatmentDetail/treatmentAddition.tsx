import {
  getTrainingDetailService,
  getTreatmentDetailService
} from '@/services/Admin/Activities/additionService';
import { TreatmentDetail } from '@/services/Admin/Activities/Payload/response/activityAdditionResponse';
import { TrainingDetail } from '@/services/Admin/Training/response/training.response';
import UseAxiosAuth from '@/utils/axiosClient';
import { AxiosInstance } from 'axios';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import TrainingAddition from '../TrainingDetail/trainingAddition';

interface IProps {
  activityId: string;
  isFetching?: boolean;
  setIsFetching: any;
}

const TreatmentAddition = (props: IProps) => {
  const { activityId, isFetching, setIsFetching } = props;
  const [detail, setDetail] = useState<TreatmentDetail | null>();
  const http = UseAxiosAuth();

  const fetchAddition = async (http: AxiosInstance, activityId: string) => {
    try {
      console.log('Fetching data..');
      const responseData = await getTreatmentDetailService(activityId, http);
      console.log('Data here: ', responseData);
      setDetail(responseData?.data as TreatmentDetail);
      setIsFetching(false);
    } catch (error) {
      console.error('Error calling API treatment:', error);
    }
  };

  useEffect(() => {
    fetchAddition(http, activityId);
  }, [activityId]);

  return (
    <>
      {detail && (
        <div>
          <p>
            Item:{' '}
            <Link href={`/${detail.item.type}/${detail.item.id}`}>
              {detail.item.name}
            </Link>
          </p>
          <p>Method: {detail.method}</p>
        </div>
      )}
    </>
  );
};

export default TreatmentAddition;
