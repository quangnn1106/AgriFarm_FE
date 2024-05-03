import { Position } from '@/services/SuperAdmin/Site/payload/response/sites';

export interface WaterPayLoadRequest {
  name: string;
  description: string;
  notes: string;
  positions: Position[];
}
