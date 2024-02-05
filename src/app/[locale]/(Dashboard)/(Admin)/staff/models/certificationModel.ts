export type CertificationModel = {
    id: string;
    certification_name: string;
    expired_time: string;
    link_certification: string;
    onDelete?: () => void;
    onUpdate?: () => void;
    onDetails?: () => void;
};