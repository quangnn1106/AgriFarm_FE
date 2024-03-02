export default interface StaffsDetails {
  id: string;
  firstName?: string;
  lastName: string;
  email: string;
  avatar: null;
  identificationCard: string;
  phoneNumber: string;
  address: string;
  gender: number;
  education: string;
  isLockout: boolean;
  role: string;
  dob?: string | null;
  onboarding: string;
  certificates?: any[] | [];
}
