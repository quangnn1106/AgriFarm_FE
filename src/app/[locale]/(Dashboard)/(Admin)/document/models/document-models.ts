export interface DocumentResponse {
    id: string
    title: string
    description: string
    url: string
    createdDate: string
    onDelete?: () => void;
    onDownload?: () => void
    onDetails?: () => void;
}
export interface CreateDocumentDto {
    title: string
    description: string
    url: string
}
export interface UpdateDocumentDto {
    title: string
    description: string
    url: string
}