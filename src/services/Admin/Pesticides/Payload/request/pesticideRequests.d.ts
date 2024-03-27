
export interface CreatePesticideRequest{
    name: string
    defaultUnit:string
    description: string
    notes: string
    referenceId?:string
    Properties?:{
        name:string
        value:number
        unit:string
    }[]
    
}
export interface SupplyPesticideRequest{
    quantity:number
    measureUnit:string
    unitPrice:number
    content?:string
    supplier:{
        id?:string
        name:string
        address: string
    }
}