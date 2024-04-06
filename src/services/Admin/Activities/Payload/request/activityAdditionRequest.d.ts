export interface UsingDetail {
  item: {
    id: string;
    name: string;
    type: string;
  };
  useValue: string;
}

export interface TreatmentDetail {
  item: {
    id: string;
    name: string;
    type: string;
  };
  method: string;
}

export interface AssessmentDetail {
  id: string
  checklist: {
    id: string;
    name: string;
  };
}

export interface HarvestDetail {
  product: {
    id: string;
    name: string;
  };
  land: {
    id: string;
    name: string;
  };

  quantity: number;
  unit: string;
}



