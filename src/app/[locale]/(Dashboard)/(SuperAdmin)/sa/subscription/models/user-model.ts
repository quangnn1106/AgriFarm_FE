import { Solution } from '@/types/admin';

export type UserModel = {
  id?: string | '';
  firstName?: string | '';
  lastName?: string | '';
  phone?: string | '';
  email?: string | '';
  address?: string | '';
  siteCode?: string | '';
  siteName?: string | '';
  isApprove?: number | 0;
  solution: Solution;
  cost?: number | 0;
  paymentDetail?: string | '';
  onDelete?: () => void;
  onUpdate?: () => void;
  onDetails?: () => void;
};
