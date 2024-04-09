export interface DocumentResponse {
    id: string
    name: string
    fileLink: string
    createdDate: string
    type: string
    onDelete?: () => void;
    onDownload?: () => void
    onDetails?: () => void;
}
export interface CreateDocumentDto {
    name: string
    fileLink: string
    createdDate: string
    type: string
}
export interface UpdateDocumentDto {
    name: string
    fileLink: string
    createdDate: string
    type: string
}