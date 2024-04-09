import { Solution } from '@/types/admin';

export type BillModel = {
  id?: string | '';
  subscription?: string | '';
  date?: string | '';
  billAmount?: number | '';
  isLockout?: boolean;
  // solution?: Solution;
  onDelete?: () => void;
  onUpdate?: () => void;
  onDetails?: () => void;
};
