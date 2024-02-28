export type UserModel = {
  id: string | '';
  firstName: string | '';
  lastName: string | '';
  avatarImg?: null;
  phoneNumber?: null;
  address?: 'Can Tho';
  email: string | '';
  role: string | '';
  isLockout?: boolean;
  onDelete?: () => void;
  onUpdate?: () => void;
  onDetails?: () => void;
};
