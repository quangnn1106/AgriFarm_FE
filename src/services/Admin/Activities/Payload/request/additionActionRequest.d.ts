interface HarvestCreateRequest {
  productionId: string;
}

interface TrainingCreateRequest {
  expertId: string;
  description: string;
}

interface TreatmentCreateRequest {
  method: string;
  isWasteProcess: boolean;
}

interface AssessmentCreateRequest {
  checkListId: string;
}
