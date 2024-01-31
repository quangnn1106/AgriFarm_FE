export default interface Admin {
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
}

export interface Solution {
  id?: string;
  name?: string;
  description?: string;
  price?: number;
  durationInMonth?: number;
}
