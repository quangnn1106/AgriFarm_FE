export type UserModel = {
  id: string | '';
  firstName: string | '';
  lastName: string | '';
  avatarImg?: string | null;
  phoneNumber?: string | null;
  address?: string | null;
  email?: string | '';
  role: string | '';
  isLockout?: boolean;
  onDelete?: () => void;
  onUpdate?: () => void;
  onDetails?: () => void;
};
