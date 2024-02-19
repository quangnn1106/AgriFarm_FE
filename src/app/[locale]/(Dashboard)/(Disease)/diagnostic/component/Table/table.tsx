import React from 'react';
import { Table } from 'antd';
import { diseaseModel } from '../../model/disease-model';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

interface TableComponentProps {
    loading: boolean,
    data: diseaseModel[];
}
const TableComponent: React.FC<TableComponentProps> = ({ data, loading }) => {
    const t = useTranslations('Disease');
    const router = useRouter();
    const columns = [
        {
            title: '#',
            dataIndex: 'no',
            key: 'no',
            width: 100,
        },
        {
            title: t('col_name_predict'),
            dataIndex: 'predictResult',
            key: 'predictResult',
            sorter: (a : any, b : any) => a.predictResult - b.predictResult,
            width: 250,
        },
        {
            title: t('col_name_description'),
            dataIndex: 'description',
            key: 'description',
            sorter: (a : any, b : any) => a.description - b.description
        },
        {
            title: t('col_name_feedback'),
            dataIndex: 'feedback',
            key: 'feedback',
            sorter: (a : any, b : any) => a.feedback - b.feedback,
            width: 300,
        },
        {
            title: t('col_name_date'),
            dataIndex: 'date',
            key: 'date',
            sorter: (a : any, b : any) => a.date - b.date,
            width: 250,
        },
    ];
    return <Table loading={loading} columns={columns} dataSource={data} onRow={(record, rowIndex) => {
            return {
                onClick: (e) => {
                    router.push(`/diagnostic-detail?id=${record.key}`);
                }
            }
        }}
    />;
};

export default TableComponent;
