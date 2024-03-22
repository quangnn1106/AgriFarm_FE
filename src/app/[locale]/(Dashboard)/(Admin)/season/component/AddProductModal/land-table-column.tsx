import { Radio, Table, TableColumnProps, TableColumnsType } from "antd";
import { Land } from "../../models/season-model";

import { useTranslations } from 'next-intl';

// eslint-disable-next-line react-hooks/rules-of-hooks


export function LandColumn() {
    const t = useTranslations('Common');
    const tSeason = useTranslations('Season')
    const landTableColumn: TableColumnsType<Land> = [
        {
            title: 'ID',
            dataIndex: 'id',
            hidden: true
        },
        {
            title: tSeason('Land_name'),
            dataIndex: 'name',
            width: 'max-content',
        },
        // {
        //     title: 't('Square')',
        //     dataIndex: 'square',
        //     width: 'max-content',
        // },
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
    return landTableColumn;
}