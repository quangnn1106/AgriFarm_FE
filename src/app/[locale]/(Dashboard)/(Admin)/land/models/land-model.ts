import { Position } from '@/services/SuperAdmin/Site/payload/response/sites';

export interface Land {
  id: string;
  siteId: string;
  siteName: string;
  description: string;
  name: string;
  acreage: string;
  positions: Position[];
  onDelete?: () => void;
  onUpdate?: () => void;
  onDetails?: () => void;
}
