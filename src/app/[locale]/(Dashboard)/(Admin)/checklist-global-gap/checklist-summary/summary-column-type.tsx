import { TableColumnsType } from "antd";


export type CheckListSummaryDto = {
    id: string | undefined;
    type: string | undefined;
    yesNu: number | undefined;
    noNu: number | undefined;
    NAndA: number | undefined;
    notAns: number | undefined;
    compliance: number | undefined;
}

export const summaryChecklistTableColumns: TableColumnsType<CheckListSummaryDto> = [
    {
        title: 'Type',
        dataIndex: 'type',
        width: 'max-content',
        fixed: 'left'
    },
    {
        title: 'Yes',
        dataIndex: 'yesNu',
        width: 'max-content',
    },
    {
        title: 'No',
        dataIndex: 'noNu',
        width: 'max-content',
     
    },
    {
        title: 'N/A',
        dataIndex: 'NandA',
        width: 'max-content',

    },
    {
        title: 'Not Answer',
        dataIndex: 'notAns',
        width: 'max-content',
    },
    {
        title: '%Compliance',
        dataIndex: 'compliance',
        render: (_,item) => `${item.compliance}%`,
        width: 'max-content',
    }

]