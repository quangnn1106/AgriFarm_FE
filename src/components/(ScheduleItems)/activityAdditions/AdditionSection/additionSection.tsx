import {
  ASSESSMENT_ADDITION,
  HARVEST_ADDITION,
  TRAINING_ADDITION,
  TREATMENT_ADDITION,
  USING_ADDITION
} from '@/constants/additionType';
import { Link } from '@/navigation';
import { Addition } from '@/services/Admin/Activities/Payload/response/activityResponse';
import UseAxiosAuth from '@/utils/axiosClient';
import { useEffect, useRef, useState } from 'react';
import { Button } from 'antd';
import { AxiosInstance } from 'axios';
import TrainingAddition from '../viewer/TrainingDetail/trainingAddition';
import TreatmentAddition from '../viewer/TreatmentDetail/treatmentAddition';
import AssessmentAddition from '../viewer/AssessmentDetail/assessmentAddition';

interface IProps {
  activityId: string;
  addition: Addition;
}

export default function AdditionSection(props: IProps) {
  const { activityId, addition } = props;
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState(null);
  const [isFetching, setIsFetching] = useState<boolean>(true);

  const renderAddition = (type: string) => {
    switch (type) {
      
      case TRAINING_ADDITION:
        return (
          <>
            <TrainingAddition
              change={true}
              activityId={activityId}
              setIsFetching={setIsFetching}
            />
          </>
        );
      case TREATMENT_ADDITION:
        return (
          <>
            <TreatmentAddition
              activityId={activityId}
              setIsFetching={setIsFetching}
            />
          </>
        );
      case HARVEST_ADDITION:
        return (
          <>
            <div>Harvest section</div>
            <Link href={`activities/${activityId}/harvest`}>Show more detail</Link>
          </>
        );
      case ASSESSMENT_ADDITION:
        return (
          <>
            <div>Assessment section</div>
            <AssessmentAddition
              activityId={activityId}
              setIsFetching={setIsFetching}
            />
          </>
        );
      default:
        return <></>;
    }
  };

  return <>{renderAddition(addition.type)}</>;
}
