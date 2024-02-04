export type SeasonModel = {
    id? : string | '';
    name?: string | '';
    startDate?: string | '';
    endDate?: string | '';
    status?: string | '';
    land?: Land[];
}

export type Land = {
    id?: string | '';
    name?: string | '';
    riceVarietyID?: RiceVariety;
}

export type RiceVariety = {
    id?: string | '';
    name?: string |'';
}