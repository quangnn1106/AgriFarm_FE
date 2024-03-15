export type CheckListInspectionModel = {
    id: string | undefined;
    name: string | undefined;
    userName: string | undefined; 
    score: number | undefined;
    dateConducted: string | undefined;
    status: string | undefined;
    onDelete?: () => void;
    onUpdate?: () => void;
    onDetails?: () => void;
}