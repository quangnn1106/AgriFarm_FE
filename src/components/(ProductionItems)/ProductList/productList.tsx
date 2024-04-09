import { FarmProductResponse } from '@/services/Admin/Productions/Payload/response/production.response';
import {
  Avatar,
  Col,
  Divider,
  Flex,
  Input,
  Space,
  Table,
  TableColumnsType,
  TableProps,
  Typography
} from 'antd';
import { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { ProductionDetailList } from './productionDetailList';
import { useRouter } from '@/navigation';
import Search from 'antd/es/input/Search';

const fakeData: FarmProductResponse[] = Array.from({ length: 10 }, (_, i) => ({
  id: 'asdis' + i * 5 + i * 8,
  name: 'p0' + i,
  quantity: 100 + 23 * i,
  seedRef: {
    id: 'asdis' + i * 4 + i * 9,
    name: 'seed -0' + i
  },
  unit: 'kg'
}));

export default function ProductList() {
  const [list, setList] = useState<FarmProductResponse[]>(fakeData);
  const farmRouter = useRouter();
  const [expanded, setExpanded] = useState(true);
  //   const selected
  const expandableProps = useMemo<TableProps<FarmProductResponse>['expandable']>(() => {
    if (!expanded) {
      return undefined;
    }

    return {
      columnWidth: 48,
      onExpand(expanded, record) {
        // console.log(expanded);
      },
      defaultExpandAllRows: false,
      expandedRowRender: record => <ProductionDetailList productId={record.id} />
      // rowExpandable: (record) => record.id % 2 === 0,
    };
  }, [expanded]);

  const columns: TableColumnsType<FarmProductResponse> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '50%',
      render: (_, record) => (
        <>
          <Flex
            justify='start'
            align='center'
          >
            <Col
              offset={4}
              span={10}
            >
              <Avatar
                shape='square'
                src={record.img ? '/../' + record.img : '#'}
                alt={record.name}
                size={100}
              />
            </Col>
            <Col span={8}>
              <Typography.Link onClick={() => farmRouter.push('/products/id')}>
                {record.name}
              </Typography.Link>
            </Col>
          </Flex>
        </>
      )
    },
    {
      title: 'Stock',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (_, record) => (
        <>
          <Flex gap={10}>
            <Typography>{record.quantity}</Typography>
            <Typography>{record.unit}</Typography>
          </Flex>
        </>
      )
    },
    // { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt', render: (_,record)=>(<>
    //     <Space>{dayjs(record.)}</Space>
    // </>) },
    {
      title: 'Action',
      key: 'operation',
      render: () => <a onClick={() => farmRouter.push('/products/id')}>Detail</a>
    }
  ];

  return (
    <>
      <Divider orientation='left'>
        <Typography.Title level={3}>Product List</Typography.Title>
      </Divider>

      <Flex
        gap={20}
        vertical
        style={{
          marginTop: '5vh',
          marginLeft: '5vw',
          padding: 20,
          width: '60vw',
          minWidth: 700,
          border: '1px solid',
          borderRadius: 10
        }}
      >
        <Flex>
          <Search type='text' style={{ height:50}} placeholder='search keyword here'/>
        </Flex>
        <Table
          rowKey={record => record.id}
          columns={columns}
          expandable={expandableProps}
          dataSource={fakeData}
          pagination={false}
          scroll={{ y: 600 }}
        />
      </Flex>
    </>
  );
}
