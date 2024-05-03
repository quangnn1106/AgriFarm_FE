export interface ExpertRequest {
  fullName: string;
  description?: string;
  expertField: string;
  externalProfile?: {
    name: string;
    value: string;
  }[];
}

export interface ExpertCertificateRequest {
  certificates?: {
    name: string;
    reference?: string;
  }[];
}

export interface TrainingContentRequest {
  title: string;
  content: string;
  resource: string;
  avatar?: string;
}
