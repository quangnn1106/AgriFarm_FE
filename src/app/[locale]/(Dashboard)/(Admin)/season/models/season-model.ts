export type SeasonModel = {
    id? : string | '';
    title?: string | '';
    description?: string | '';
    startIn?: string | '';
    endIn?: string | '';
    onDelete?: () => void;
    onUpdate?: () => void;
    onDetails?: () => void;
}

export default interface SeasonModelDetail {
    id? : string;
    title?: string;
    description?: string;
    startIn?: string;
    endIn?: string;
}

export type Land = {
    id: string
    siteId: string
    siteName: string
    description: string
    name: string
    positions: Position[]
}

export interface Position {
    lat: number
    long: number
  }

export type RiceVariety = {
    id?: string | '';
    name?: string |'';
    stock?: number | '';
    description?: string |'';
}

export type Product = {
    id? : string | '';
    name?: string | '';
    totalQuantity?: number | '';
    quantity?: number | '';
    land: LandProd;
    seed: SeedPro;
    season: Season;
}

export type LandProd = {
    id?: string | '';  
    name?: string | '';
}

export type SeedPro = {
    id?: string | '';
    name?: string |'';
}

export type Season = {
    id? : string | '';
    name?: string | '';
}

export interface Seed {
    id: string
    stock: number
    unitPrice: number
    measureUnit: string
    name: string
    description: string
    notes: string
    properties: Property[]
  }
  
  export interface Property {
    name: string
    value: number
    unit: string
  }
  
