export type SeasonModel = {
    id? : string | '';
    title?: string | '';
    startIn?: string | '';
    endIn?: string | '';
    description?: string | '';
    onDelete?: () => void;
    onUpdate?: () => void;
    onDetails?: () => void;
}

export type Land = {
    id?: string | '';  
    name?: string | '';
    square?: number | '';
    description?: string | '';
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
    seed: RiceVarietyPro;
    season: Season;
}

export type LandProd = {
    id?: string | '';  
    name?: string | '';
}

export type RiceVarietyPro = {
    id?: string | '';
    name?: string |'';
}

export type Season = {
    id? : string | '';
    name?: string | '';
}


