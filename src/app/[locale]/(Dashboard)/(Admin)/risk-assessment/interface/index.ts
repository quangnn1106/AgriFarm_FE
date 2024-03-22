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