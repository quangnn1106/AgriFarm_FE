import { Property } from '@/services/Admin/Land/Payload/request/addLandPayLoad';
import { Position } from '@/services/SuperAdmin/Site/payload/response/sites';

export interface Land {
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
