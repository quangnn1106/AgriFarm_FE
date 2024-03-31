export interface EquipmentResponse {
  id: string;
  name: string;
  description?: string;
  stock: number;
  unitPrice: number;
  measureUnit: string;
  notes?: string;
  InUse?: number;
  expiredIn?: Date;
  img?: string;
}

export interface SupplierResponse {
  id: string;
  name: string;
  address?: string;
  img?: string;
}

export interface SupplyDetailResponse{
  id: string
  supplier: {
    id: string
    name: string
  }
  unitPrice: number
  quantity: number
  unit?: string
  validFrom?: Date
  validTo?: Date
  createdDate?: Date

}