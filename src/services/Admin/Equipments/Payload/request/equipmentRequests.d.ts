export interface CreateEquipmentRequest {
  name: string;
  defaultUnit: string;
  description?: string;
  notes?: string;
  //referenceId?:string
  Properties?: {
    name: string;
    value: number;
    unit: string;
  }[];
}

export interface UpdateEquipmentRequest {
  name: string;
  description?: string;
  notes?: string;
}

export interface SupplyEquipmentRequest {
  quantity: number;
  unit: string;
  unitPrice: number;
  content?: string;
  validFrom?: Date;
  validTo?: Date;
  supplier: {
    id?: string;
    name: string;
    address: string;
  };
}
