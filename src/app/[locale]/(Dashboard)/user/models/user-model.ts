
export type UserModel = {
    id: string;
    full_name: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    address: string;
    created_date: Date;
    updated_date: Date;
    site_name: string;
    role_name: string;
    is_active: boolean;
    onDelete?: () => void;
    onUpdate?: () => void;
    onDetails?: () => void;
};