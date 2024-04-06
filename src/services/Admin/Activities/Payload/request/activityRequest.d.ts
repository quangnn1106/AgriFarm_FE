import { ActivityDescription } from '@/services/Admin/Activities/Payload/response/activityResponse';

export interface CreateActivityRequest {
  title: string;
  duration: string[];
  descriptions: {
    name: string;
    value: string;
  }[];
  locationId?: string;
}

export interface SetLocationRequest {
  id: string;
  name: string;
}

export interface AddParticipantRequest {
  id: string;
  name: string;
  role: number;
}

export interface AddMaterialRequest {
  id: string;
  name: string;
  useValue: number;
  unit: string;
}
