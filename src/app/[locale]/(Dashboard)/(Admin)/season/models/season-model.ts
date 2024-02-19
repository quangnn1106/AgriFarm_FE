export type SeasonModel = {
    id? : string | '';
    name?: string | '';
    startDate?: string | '';
    endDate?: string | '';
    status?: string | '';
    description?: string | '';
    land?: Land[];
    onDelete?: () => void;
    onUpdate?: () => void;
    onDetails?: () => void;
}

export type Land = {
    id?: string | '';  
    name?: string | '';
    square?: string | '';
    description?: string | '';
    riceVarietyID?: RiceVariety;
}

export type RiceVariety = {
    id?: string | '';
    name?: string |'';
    type?: string | '';
    description?: string |'';
}

