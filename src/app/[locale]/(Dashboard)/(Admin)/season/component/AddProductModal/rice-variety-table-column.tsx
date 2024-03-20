import { Radio, Table, TableColumnProps, TableColumnsType } from "antd";
import { Land, RiceVariety, Seed } from "../../models/season-model";
import { useTranslations } from 'next-intl';


export function RiceVarietyColumns() {
    const t = useTranslations('Season');
    const seedColumn : TableColumnsType<Seed> = [
        {
            title: 'ID',
            dataIndex: 'id',
            hidden: true
        },
        {
            title: t('Name'),
            dataIndex: 'name',
            width: 'max-content',
        },
        {
            title: t('Stock'),
            dataIndex: 'stock',
            width: 'max-content',
        },
        {
            title: t('Description'),
            dataIndex: 'description',
            width: 'max-content',
        },
        {
            title: t('History'),
            dataIndex: 'history',
            width: 'max-content',
        }
    ];
    return seedColumn;
}