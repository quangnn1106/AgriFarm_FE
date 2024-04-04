import { Position } from "@/services/SuperAdmin/Site/payload/response/sites";

export interface LandPayLoad {
    name:        string;
    description: string;
    acreage:     number;
    defaultUnit: string;
    properties:  Property[];
    positions:   Position[];
}



export interface Property {
    name:  string;
    value: number;
    unit:  string;
}
