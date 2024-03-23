import { isDraft } from "@reduxjs/toolkit";

export interface RiskItemDef {
    riskItemTile: string;
    riskItemDiv: number;
    riskItemType: number;
    riskItemContent: string;
    must: number;
}
export interface RiskMasterInputDef {
    riskName: string;
    riskDescription: string;
    isDraft: boolean;
    createBy: string;
}
export interface RiskItemContentsResponseDef {
    anwser: string;
}
export interface RiskItemResponseDef {
    riskItemTitle: string;
    riskItemDiv: number;
    riskItemType: number;
    riskItemContent: string;
    must: number;
    riskItemContents: RiskItemContentsResponseDef[];
}
export interface RiskMasterResponseDef {
    riskName: string;
    riskDescription: string;
    isDraft: boolean;
    riskItems: RiskItemResponseDef[]
}

export interface SearchConditionDef {
    keyword?: string;
    isDraft?: boolean;
    perPage?: number;
    pageId?: number;
}

export interface RiskMasterListDef {
    key: string;
    id: string;
    riskName: string;
    riskDescription: string;
    isDraft: boolean;
    createdDate: string;
}
