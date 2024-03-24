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