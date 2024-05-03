
export interface ChecklistMasterDef {
    name: string;
    checklistVersion: number;
    isDraft: boolean;
    id: string;
    createdDate: string;
    lastModify: string;
}

export interface ChecklistMappingDef {
    key: string;
    checklistName: string;
    checklistMasterId: string;
    userId: string;
    status: number;
    startDate: string;
    endDate: string;
    id: string;
    createdDate: string;
    lastModify: string;
    checklistMaster: ChecklistMasterDef
}

export interface SearchConditionDef {
    perPage?: number;
    pageId?: number;
    userId?: string;
    keyword?: string;
    searchByDate?: string[];
    status?: number[];
}
export interface ChecklistItemResponsesDef {
    checklistItemId: string;
    checklistMappingId: string;
    level: number;
    result: number;
    note: string | null;
    attachment: string | null;
    id: string;
}
export interface ChecklistItemDef {
    checklistMasterId: string;
    orderNo: number | null;
    afNum: number | null;
    title: string;
    levelRoute: string;
    content: string;
    isResponse: boolean;
    id: string;
    checklistItemResponses: ChecklistItemResponsesDef[]
}
export interface ChecklistDataDef {
    name: string;
    version: number;
    id: string;
    checklistItems: ChecklistItemDef[]
}
