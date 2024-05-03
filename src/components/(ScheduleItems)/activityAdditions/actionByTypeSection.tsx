import {
  TRAINING_ADDITION,
  TREATMENT_ADDITION,
  HARVEST_ADDITION,
  ASSESSMENT_ADDITION
} from '@/constants/additionType';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import AssessmentAddition from './viewer/AssessmentDetail/assessmentAddition';
import TrainingAddition from './viewer/TrainingDetail/trainingAddition';
import TreatmentAddition from './viewer/TreatmentDetail/treatmentAddition';
import HarvestAddition from './viewer/HarvestDetail/harvestAddition';
import { useActivityBoundary } from '../DetailBoundary/actvityDetailBoundary';

interface IProps {
  activityId: string;
  addition: string;
  change: boolean;
}

export default function ActionByTypeSection(props: IProps) {
  // const { activityId, addition, change } = props;
  const { activity, addition, setAddition } = useActivityBoundary();
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState(null);
  const [isFetching, setIsFetching] = useState<boolean>(true);

  useEffect(()=>{
    console.log("rerender")
  },[addition])

  const renderAddition = (type: string) => {
    if (activity) {
      switch (type) {
        case TRAINING_ADDITION:
          return (
            <>
              <TrainingAddition
                // change={change}
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
              <HarvestAddition
                activityId={activity.id}
                setIsFetching={setIsFetching}
              />
            </>
          );
        case ASSESSMENT_ADDITION:
          return (
            <>
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
  };

  return <>{addition && renderAddition(addition.type)}</>;
}
