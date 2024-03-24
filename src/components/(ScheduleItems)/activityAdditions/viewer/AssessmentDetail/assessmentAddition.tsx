import { useRouter } from '@/navigation';
import { getAssessmentDetailService } from '@/services/Admin/Activities/additionService';
import { AssessmentDetail } from '@/services/Admin/Activities/Payload/request/activity-detail';
import { RiskAdditionResponse } from '@/services/Admin/Activities/Payload/response/activities';
import UseAxiosAuth from '@/utils/axiosClient';
import { Button } from 'antd';
import { AxiosInstance } from 'axios';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface IProps {
  activityId: string;
  isFetching?: boolean;
  setIsFetching: any;
}

const AssessmentAddition = (props: IProps) => {
  const { activityId, isFetching, setIsFetching } = props;
  const [detail, setDetail] = useState<RiskAdditionResponse | null>();
  const http = UseAxiosAuth();
  const router = useRouter();

  const fetchAddition = async (http: AxiosInstance, activityId: string) => {
    try {
      console.log('Fetching data..');
      const responseData = await getAssessmentDetailService(activityId, http);
      console.log('Data here: ', responseData);
      setDetail(responseData?.data as RiskAdditionResponse);
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
      {detail && detail.checkList && (
        <div>
          <p>
            Checklist:{' '}
            <Link href={`/training/experts/${detail.checkList.id}`}>
              {detail.checkList.riskName}
            </Link>
          </p>
          <p>
            Description: <p>{detail.checkList.riskDescription}</p>
          </p>
        </div>
      )}
      <Button
        onClick={() => router.push('/risk-assessment/implement?taskId=' + detail?.id)}
      >
        Go to assess
      </Button>
    </>
  );
};

export default AssessmentAddition;
