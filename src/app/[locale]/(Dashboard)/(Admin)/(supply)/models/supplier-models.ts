export interface SupplierResponse {
    id: string
    name: string
    description: string
    phone: string
    email: string
    notes: string
    address: string
    onDelete?: () => void;
    onDetails?: () => void;
}
export interface UpdateSupplierDto {
    name: string
    description: string
    phone: string
    email: string
    notes: string
    address: string
}
export interface CreateSupplierDto {
    name: string
    description: string
    phone: string
    email: string
    notes: string
    address: string
}