import { TRAINING_ADDITION, TREATMENT_ADDITION, HARVEST_ADDITION, ASSESSMENT_ADDITION } from "@/constants/additionType";
import Link from "next/link";
import { useState } from "react";
import AssessmentAddition from "./viewer/AssessmentDetail/assessmentAddition";
import TrainingAddition from "./viewer/TrainingDetail/trainingAddition";
import TreatmentAddition from "./viewer/TreatmentDetail/treatmentAddition";
import HarvestAddition from "./viewer/HarvestDetail/harvestAddition";

interface IProps {
    activityId: string;
    addition: string;
    change: boolean 
  }
  
  export default function ActionByTypeSection(props: IProps) {
    const { activityId, addition, change } = props;
    const [open, setOpen] = useState(false);
    const [detail, setDetail] = useState(null);
    const [isFetching, setIsFetching] = useState<boolean>(true);
  
    const renderAddition = (type: string) => {
      switch (type) {
        
        case TRAINING_ADDITION:
          return (
            <>
              <TrainingAddition
                change={change}
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
              <HarvestAddition
                activityId={activityId}
                setIsFetching={setIsFetching}
              />
            </>
          );
        case ASSESSMENT_ADDITION:
          return (
            <>
            
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
  
    return <>{renderAddition(addition)}</>;
  }