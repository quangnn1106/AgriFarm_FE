export type CertificationResponse = {
  id: string;
  name: string;
  description: string;
  provider: string;
  url: string;
  decison: number;
  member: MemberResponse;
  onDelete?: () => void;
  onUpdate?: () => void;
  onDetails?: () => void;
};

export interface MemberResponse {
  id: string;
  name: string;
}
