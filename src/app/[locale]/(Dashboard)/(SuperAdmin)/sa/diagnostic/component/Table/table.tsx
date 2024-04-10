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
            width: '5%',
        },
        {
            title: t('col_name_predict'),
            dataIndex: 'predictResult',
            key: 'predictResult',
            width: '10%',
        },
        {
            title: t('col_name_description'),
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: t('col_name_feedback'),
            dataIndex: 'feedback',
            key: 'feedback',
            width: '25%',
        },
        {
            title: t('col_name_date'),
            // dataIndex: 'date',
            key: 'date',
            width: '10%',
            render: (_: any, item: any) => {
                const date = new Date(item.date);
                const year = date.getFullYear();
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const day = date.getDate().toString().padStart(2, '0');
                return `${year}-${month}-${day}`;
            }
        },
    ];
    return <Table loading={loading} columns={columns} dataSource={data} onRow={(record, rowIndex) => {
            return {
                onClick: (e) => {
                    router.push(`/sa/diagnostic/detail/${record.key}`);
                }
            }
        }}
    />;
};

export default TableComponent;
