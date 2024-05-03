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
import { useActivityBoundary } from '../../DetailBoundary/actvityDetailBoundary';

interface IProps {
  activityId: string;
  addition: Addition;
}

export default function AdditionSection(props: IProps) {
  // const { activityId, addition } = props;
  const { addition, setAddition, activity} = useActivityBoundary()
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState(null);
  const [isFetching, setIsFetching] = useState<boolean>(true);

  const additionSection = useRef<HTMLDivElement|null>(null)

  useEffect(()=>{
    console.log("Addtion change: ", addition)
  },[addition])

  const renderAddition = (type: string) => {
    if(activity){
      switch (type) {
      
        case TRAINING_ADDITION:
          return (
            <>
              <TrainingAddition
                activityId={activity.id}
                setIsFetching={setIsFetching}
              />
            </>
          );
        case TREATMENT_ADDITION:
          return (
            <>
              <TreatmentAddition
                activityId={activity.id}
                setIsFetching={setIsFetching}
              />
            </>
          );
        case HARVEST_ADDITION:
          return (
            <>
              <div>Harvest section</div>
              <Link href={`activities/${activity.id}/harvest`}>Show more detail</Link>
            </>
          );
        case ASSESSMENT_ADDITION:
          return (
            <>
              <div>Assessment section</div>
              <AssessmentAddition
                activityId={activity.id}
                setIsFetching={setIsFetching}
              />
            </>
          );
        default:
          return <></>;
      }
    }
    return <></>;
  };

  return <>
  <div ref={additionSection}></div>
  {addition && renderAddition(addition.type)}
  </>;
}
