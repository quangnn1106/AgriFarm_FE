export interface Fertilizer {
    id: string
    stock: number
    unitPrice: number
    measureUnit: string
    name: string
    description: string
    notes: string
    properties: Property[],
    onDelete?: () => void;
    onViewHistory?: () => void;
    onDetails?: () => void;
  }
  export interface Property {
    name: string
    value: number
    unit: string
  }

  export interface CreateFertilizerDto {
    name: string
    description: string
    defaultUnit: string
    notes: string
    properties: Property[]
  }

  export interface CreateSupplyDto {
    quantity: number
    unitPrice: number
    measureUnit: string
    content: string
    supplier: Supplier
  }

  export interface Supplier {
    id: string
    name: string
    address: string
  }

  export interface UpdateFertilizerInfoDto {
    name: string
    description: string
    notes: string
  }
  
  export interface CreateSupplierMapper {
    quantity: number
    unitPrice: number
    measureUnit: string
    content: string
    supplierId: string
    supplierName: string
    address: string
  }

  export interface CreateAllInfoOfFertilizerMapperDto {
    name: string
    description: string
    notes: string
    defaultUnit: string
    properties: Property[]
    quantity: number
    unitPrice: number
    measureUnit: string
    content: string
    supplierId: string
    supplierName: string
    address: string
  }