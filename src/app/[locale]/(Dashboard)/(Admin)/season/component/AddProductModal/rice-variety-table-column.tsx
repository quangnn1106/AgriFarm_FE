import { Radio, Table, TableColumnProps, TableColumnsType } from "antd";
import { Land, RiceVariety } from "../../models/season-model";
import { useTranslations } from 'next-intl';
import { Seed } from "../../../seed/models/seed-models";


export function RiceVarietyColumns() {
    const t = useTranslations('Common');
    const tSeason = useTranslations('Season');
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
            title: tSeason('Stock'),
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