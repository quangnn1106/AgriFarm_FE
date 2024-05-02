export interface ActivityResponse {
  id: string;
  season?: {
    id?: string;
    title?: string;
  };
  location?: ActivityLocation;
  materials: ActivityMaterial[]
  isWaiting: boolean,
  participants?:ActivityParticipant[]
  tag?: string;
  title?: string;
  descriptions?: ActivityDescription[] | [];
  isCompleted?: boolean;
  start: Date;
  end: Date;
  addition?: Addition;
  editAble?: boolean
  completable?: boolean,
  active?: boolean
}

export interface ActivityByMonthResponse {
  date: Date;
  activityCount: int;
}

export interface ActivityLocation {
  id: string;
  name: string;
}

export interface ActivityMaterial {
  id: string;
  name: string;
  type: string;
  img?: string;
  useVal?: number
  unit?: string
}

export interface ActivityParticipant {
  id: string;
  name: string;
  img?:string
  role: string
  isActive?:boolean
}

export interface ActivityDescription {
  name: string;
  value: string;
}

export interface Addition {
  id: string;
  type: string;
  data: any;
}

export interface RiskAdditionResponse {
  id: string;
  taskId: string;
  checkList: {
    id: string;
    riskName: string;
    riskDescription: string;
  };
}
