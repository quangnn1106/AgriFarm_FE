export interface SupplierResponse {
    id: string
    name: string
    description: string
    phone: string
    email: string
    notes: string
    address: string
}
export interface Supply {
    id: string
    supplier: SupplierResponseList
    unitPrice: number
    quantity: number
    unit: string
    validFrom: any
    validTo: any
    createdDate: string
    onDetails?: () => void;
  }
  
  export interface SupplierResponseList {
    id: string
    name: string
  }

  export interface Item {
    id: string
    stock: number
    unitPrice: number
    measureUnit: string
    name: string
    description: string
    notes: string
    properties: Property[],
    onDelete?: () => void;
    onUpdate?: () => void;
    onDetails?: () => void;
  }
  export interface Property {
    name: string
    value: number
    unit: string
  }