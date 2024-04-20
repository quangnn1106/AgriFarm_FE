interface HarvestCreateRequest {
  landId: string;
}

interface TrainingCreateRequest {
  expertId: string;
  description: string;
}

interface TreatmentCreateRequest {
  target: string;
  method: string;
  isWasteProcess: boolean;
}

interface AssessmentCreateRequest {
  checkListId: string;
}


interface HarvestProductRequest{
  output:number
  activityId: string
  unit: string
}