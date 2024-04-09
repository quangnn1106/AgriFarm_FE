import { Position } from '@/services/SuperAdmin/Site/payload/response/sites';
import { Property } from '../request/addLandPayLoad';

export interface LandResponse {
  id: string;
  siteId: string;
  siteName: null;
  name: string;
  description: string;
  acreage: number;
  properties: Property[];
  positions: Position[];
  onDelete?: () => void;
  onUpdate?: () => void;
  onDetails?: () => void;
}
