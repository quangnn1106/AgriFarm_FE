export interface Equipment {
    id: string
    stock: number
    unitPrice: number
    measureUnit: string
    name: string
    description: string
    url: string,
    expiredIn: string,
    inUse: number,
    onDelete?: () => void;
    onViewHistory?: () => void;
    onDetails?: () => void;
  }

  export interface CreateEquipmentDto {
    name: string
    description: string
    notes: string
  }

  export interface CreateSupplyDto {
    price: number
    content: string
    supplier: Supplier
    validFrom: string
    validTo: string
  }

  export interface Supplier {
    id: string
    name: string
    address: string
  }

  export interface UpdateEquipmentInfoDto {
    name: string
    description: string
    notes: string
    unitPrice: number
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

  export interface CreateAllInfoOfEquipmentMapperDto {
    name: string
    description: string
    notes: string
    defaultUnit: string
    quantity: number
    unitPrice: number
    measureUnit: string
    content: string
    supplierId: string
    supplierName: string
    address: string
  }