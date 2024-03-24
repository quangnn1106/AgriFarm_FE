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
    id? : string;
    name?: string | '';
    totalQuantity?: number | '';
    quantity?: number | '';
    land: LandProd | null;
    seed: SeedPro | null;
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

  
