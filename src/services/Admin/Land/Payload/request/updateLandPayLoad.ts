import { Position } from '@/services/SuperAdmin/Site/payload/response/sites';
import { Property } from './addLandPayLoad';

export interface LandUpdatePayLoad {
  name: string;
  description: string;
  acreage: number;
  defaultUnit: string;
  positions: Position[];
  properties?: Property[] | null;
}
