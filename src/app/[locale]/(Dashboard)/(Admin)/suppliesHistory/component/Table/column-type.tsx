import { TableColumnsType, MenuProps, Space, Button } from 'antd';
import { Supply } from '../../../supply/models/supplier-models';
import dayjs from 'dayjs';
import Link from 'next/link';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useTranslations } from 'next-intl';

export function SupplyTableColumns() {
  // const dateFormat = 'YYYY/MM/DD';
  const dateFormat = 'DD/MM/YYYY';
  const t = useTranslations('Common');

  const supplyTableColumn: TableColumnsType<Supply> = [
    {
      width: 'max-content',
      title: 'Ngày nhập',
      dataIndex: 'createdDate',
      render: (_, seedItem) => `${dayjs(seedItem.createdDate).format(dateFormat)}`
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      width: 'max-content',
      render: (_, supplyItems) => `${supplyItems.quantity} ${supplyItems.unit}`
    },
    {
      title: 'Đơn giá',
      dataIndex: 'unitPrice',
      width: 'max-content',
      render: (_, supplyItems) => `${supplyItems.unitPrice.toLocaleString()} VND`
    },
    {
      title: 'Nhà cung cấp',
      dataIndex: 'supplier',
      width: 'max-content',
      render: (_, supplyItems) => `${supplyItems.supplier.name}`
    },
    {
      title: '',
      width: 'max-content',
      key: 'actions',
      render: (_, supplyItems) => {
        return (
          <Button
            onClick={supplyItems.onDetails}
          >
            <Space>
              <ExclamationCircleOutlined /> {t('Details')}
            </Space>
          </Button>
        );
      }
    }
  ];
  return supplyTableColumn;
}
