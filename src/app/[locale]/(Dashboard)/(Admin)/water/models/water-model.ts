import { Property } from '@/services/Admin/Land/Payload/request/addLandPayLoad';
import { Position } from '@/services/SuperAdmin/Site/payload/response/sites';

export interface Water {
  id: string;
  name: string;
  description: string;
  note: string;
  positions: Position[];
  onDelete?: () => void;
  onUpdate?: () => void;
  onDetails?: () => void;
}
