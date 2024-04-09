import { ProductionResponse } from '@/services/Admin/Productions/Payload/response/production.response';
import { Badge, Dropdown, Space, Table, TableColumnsType, Typography } from 'antd';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { DownOutlined } from '@ant-design/icons';

interface IProps {
  productId: string;
}

export function ProductionDetailList(props: IProps) {
  const { productId } = props;
  const [list, setList] = useState<ProductionResponse[]>([]);

  useEffect(() => {
    const data: ProductionResponse[] = [];
    for (let x = 0; x < 10; ++x) {
      let i = x+1
      data.push({
        product: {
          id: i.toString(),
          name: "Rice "+i.toString()
        },
        season: {
          id: 'sasdda0-asd-asd-asad-dsads',
          name: 'spring ' + i,
          startIn: dayjs(new Date())
            .add(-3 * i, 'M')
            .toDate(),
          endIn: dayjs(new Date())
            .add(-2 * i, 'M')
            .toDate()
        },
        location: {
          id: 'sasdda0-asds-11asd-asad2d',
          name: 'Land 02'
        },
        output: 100 + i * 12,
        unit: 'kg',
        productivity: 1000,
        harvestDate: dayjs(new Date())
          .add(-2 * i, 'M')
          .toDate()
      });
    }
    // if(productId ==="sss"){

    setList(data);
    // }
  }, []);

  const items = [
    { key: '1', label: 'Action 1' },
    { key: '2', label: 'Action 2' }
  ];
  const columns: TableColumnsType<ProductionResponse> = [
    {
      title: 'Season',
      dataIndex: 'season',
      key: 'season',
      width: '15%',
      render: (_, item) => (
        <Space>
          <Typography.Link
            type='success'
            // href='#'
          >
            {item.season.name}
            <Space>
              {dayjs(item.season.startIn).format('DD/MM/YYYY') +
                ' - ' +
                dayjs(item.season.endIn).format('DD/MM/YYYY')}
            </Space>
          </Typography.Link>
        </Space>
      )
    },
    
    { title: 'Rice variety', dataIndex: 'name', key: 'name', render:(_,item)=><Space>{item.product.name}</Space>},
    {
      title: 'Output',
      dataIndex: 'output',
      key: 'output',
      render: (_, item) => (
        <Space>
          {item.output}
          {`(${item.unit})`}
        </Space>
      )
    },
    {
      title: 'Status',
      key: 'state',
      render: (_, item) => (
        <Badge
          status={item.harvestDate && dayjs(item.harvestDate).isBefore(new Date()) ? 'success' : 'warning'}
          text={item.harvestDate && dayjs(item.harvestDate).isBefore(new Date())? 'Finished' : 'Processing'}
        />
      )
    },
    {
      title: 'Harvest date',
      dataIndex: 'harvestDate',
      key: 'harvestDate',
      render: (_, item) => (
        <Space>
          <Typography.Text>
            {item.harvestDate ? dayjs(item.harvestDate).format('DD/MM/YYYY') : 'Not yet'}
          </Typography.Text>
        </Space>
      )
    }
    // {
    //   title: 'Action',
    //   key: 'operation',
    //   render: () => (
    //     <Space size='middle'>
    //       <a>Pause</a>
    //       <a>Stop</a>
    //       <Dropdown menu={{ items }}>
    //         <a>
    //           More <DownOutlined />
    //         </a>
    //       </Dropdown>
    //     </Space>
    //   )
    // }
  ];

  return (
    <Table
      //rowKey={(item)=>item.id}
      style={{
        width: '100%',
        minWidth: 600
      }}
      scroll={{ y: 200 }}
      columns={columns}
      dataSource={list}
      pagination={false}
    />
  );
}
