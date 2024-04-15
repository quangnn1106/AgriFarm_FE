export type CertificationResponse = {
    id: string;
    name: string;
    description: string;
    provider: string;
    url: string;
    onDelete?: () => void;
    onUpdate?: () => void;
    onDetails?: () => void;
  }