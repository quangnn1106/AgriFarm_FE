import { TableColumnsType } from 'antd';
import { Land } from '../../models/season-model';

export const LandAndRiceVarietyColumns: TableColumnsType<Land> = [
  {
    title: 'Land Name',
    dataIndex: 'name',
    width: 'max-content',
  },
  {
    title: 'Rice Variety',
    dataIndex: 'riceVariety',
    width: 'max-content',
  }
];


