export interface UsingDetail {
  item: {
    id: string;
    name: string;
    type: string;
  };
  useValue: string;
}

export interface TreatmentDetail {
  // item: {
  //   id: string;
  //   name: string;
  //   type: string;
  // };
  target: string;
  method: string;
}

export interface ActivityRiskResponse{
  id: string;
  riskName: string;
}

export interface AssessmentDetail {
  id: string;
  checklist: {
    id: string;
    name: string;
  };
}

export interface HarvestDetail {
  id: string
  product: {
    id: string;
    name: string;
  };
  land: {
    id: string;
    name: string;
  };

  total: number;
  unit: string;
  harvestDate?: Date
}
