export type updateStaffPayLoad = {
  firstName: string;
  lastName: string;
  email?: string | null;
  avatar?: string | null;
  identificationCard?: string | null;
  phoneNumber?: string | null;
  address?: string | null;
  gender?: string | null;
  education?: string | null;
  isLockout?: boolean;
  role?: string | null;
  dob?: string | null;
  changePassObject?: ChangePassPayload | null;
  //certificates?: any[];
};
