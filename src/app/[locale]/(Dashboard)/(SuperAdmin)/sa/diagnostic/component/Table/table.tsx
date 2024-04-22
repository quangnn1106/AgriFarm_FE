'use client'
import React, { useState } from 'react';
import { Empty, Table, TablePaginationConfig, TableProps } from 'antd';
import { diseaseModel } from '../../model/disease-model';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

interface TableComponentProps {
    loading: boolean,
    data: diseaseModel[];
    searchAction: (pagination: TablePaginationConfig) => void;
    tablePag: TableParams;
}
interface TableParams {
    pagination?: TablePaginationConfig;
}
const TableComponent: React.FC<TableComponentProps> = ({ data, loading , searchAction, tablePag}) => {
    const t = useTranslations('Disease');
    const tCom = useTranslations('common');
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
            width: '15%',
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
    const handleTableChange: TableProps['onChange'] = (pagination) => {
        searchAction(pagination);
      };
    return (
        <Table
            loading={loading}
            columns={columns}
            dataSource={data}
            onRow={(record) => {
                return {
                    onClick: (e) => {
                        router.push(`/sa/diagnostic/detail/${record.key}`);
                    }
                }
            }}
            pagination={
                {
                    ...tablePag.pagination,
                    showTotal: total => tCom('result_text').replace('%%ITEM%%', total.toString()),
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '20', '30'],
                    locale: {
                      items_per_page: `/${tCom('page')}`,
                    },
                }
            }
            onChange={handleTableChange}
            locale={
                {
                    emptyText: () => {
                        return <Empty description={tCom('no_data')}/>;
                    }
                }
            }
        />
    );
};

export default TableComponent;
