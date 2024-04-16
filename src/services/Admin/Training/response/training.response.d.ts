export interface Expert {
  id: string;
  fullName: string;
  description?: string;
  expertField?: string;
  img?: string;
  certificates?:{
    name: string
    reference: string
  }[]|[]
}

export interface TrainingContent {
  id: string;
  title: string;
  content: string;
  refer?: string;
}

export interface TrainingDetail {
  id: string;
  expert: {
    id: string;
    fullName: string;
    img?: string;
  };
  description?: string;
  activity: {
    id: string;
    title: string;
  };
}
