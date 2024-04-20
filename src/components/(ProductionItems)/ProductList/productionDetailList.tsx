import { ProductionResponse } from '@/services/Admin/Productions/Payload/response/production.response';
import {
  Badge,
  Breadcrumb,
  Button,
  ConfigProvider,
  Dropdown,
  Space,
  Table,
  TableColumnsType,
  Typography
} from 'antd';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { DownOutlined, HomeOutlined } from '@ant-design/icons';
import ProductionDetailModal from './productionDetailModal';
import { truncate } from 'lodash';
import { Content } from 'antd/es/layout/layout';
import { getProductionsByProductService } from '@/services/Admin/Productions/farmProductsService';
import UseAxiosAuth from '@/utils/axiosClient';
import { PaginationResponse } from '@/types/pagination';
import { getPaginationResponse } from '@/utils/paginationHelper';

interface IProps {
  productId?: string;
  productName?: string;
  productions: ProductionResponse[];
}

export function ProductionDetailList(props: IProps) {
  const { productId, productions, productName } = props;
  const [list, setList] = useState<ProductionResponse[]>(productions);
  const [item, setItem] = useState<ProductionResponse | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [hasChanged, setHasChanged] = useState(true);
  const [open, setOpen] = useState(false);
  const http = UseAxiosAuth();
  const [page, setPage] = useState<PaginationResponse>({
    CurrentPage: 1,
    PageSize: 5,
    TotalCount: 0,
    TotalPages: 1
  });

  const fetchProduction = async () => {
    if (productId) {
      try {
        console.log('Fetching data..');
        const responseData = await getProductionsByProductService(
          http,
          productId,
          page.CurrentPage,
          page.PageSize
        );
        console.log('Data here: ', responseData);
        setPage(getPaginationResponse(responseData));
        setList(responseData?.data.data as ProductionResponse[]);
        setIsFetching(false);
      } catch (error) {
        console.error('Error calling API training content:', error);
      }
    }
  };

  useEffect(() => {
    const data: ProductionResponse[] = [];
    fetchProduction();
    // for (let x = 0; x < 10; ++x) {
    //   let i = x + 1;
    //   data.push({
    //     product: {
    //       id: i.toString(),
    //       name: 'Rice ' + i.toString()
    //     },
    //     season: {
    //       id: 'sasdda0-asd-asd-asad-dsads',
    //       name: 'spring ' + i,
    //       startIn: dayjs(new Date())
    //         .add(-3 * i, 'M')
    //         .toDate(),
    //       endIn: dayjs(new Date())
    //         .add(-2 * i, 'M')
    //         .toDate()
    //     },
    //     location: {
    //       id: 'sasdda0-asds-11asd-asad2d',
    //       name: 'Land 02'
    //     },
    //     output: 100 + i * 12,
    //     unit: 'kg',
    //     productivity: 1000,
    //     harvestDate: dayjs(new Date())
    //       .add(-2 * i, 'M')
    //       .toDate()
    //   });
    // }
    // if(productId ==="sss"){
    // setList(data);
    // }
  }, [page.CurrentPage]);

  const items = [
    { key: '1', label: 'Action 1' },
    { key: '2', label: 'Action 2' }
  ];
  const columns: TableColumnsType<ProductionResponse> = [
    {
      title: 'Mùa vụ',
      dataIndex: 'season',
      key: 'season',
      width: '15%',
      render: (_, item) => (
        <Space>
          <Typography.Link
            type='success'
            // href='#'
          >
            {item.season.name} {`(${dayjs(item.season.startIn).year()})`}
            <Space>
              {dayjs(item.season.startIn).format('DD/MM') +
                ' - ' +
                dayjs(item.season.endIn).format('DD/MM')}
            </Space>
          </Typography.Link>
        </Space>
      )
    },

    {
      title: 'Lô đất',
      dataIndex: 'name',
      key: 'name',
      render: (_, item) => <Space>{item.land.name}</Space>
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'name',
      key: 'name',
      render: (_, item) => <Space>{productName ?? item.product.name}</Space>
    },

    {
      title: 'Sản lượng',
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
      title: 'Tình trạng canh tác',
      key: 'state',
      render: (_, item) => (
        <Badge
          status={
            item.harvestDate && dayjs(item.harvestDate).isBefore(new Date())
              ? 'success'
              : 'warning'
          }
          text={
            item.harvestDate && dayjs(item.harvestDate).isBefore(new Date())
              ? 'Hoàn thành'
              : 'Đang diễn ra'
          }
        />
      )
    },
    {
      title: 'Ngày thu hoạch',
      dataIndex: 'harvestDate',
      key: 'harvestDate',
      render: (_, item) => (
        <Space>
          <Typography.Text>
            {item.harvestDate
              ? dayjs(item.harvestDate).format('DD/MM/YYYY')
              : 'Chưa thu hoạch'}
          </Typography.Text>
        </Space>
      )
    },
    {
      title: 'Chi tiết canh tác',
      dataIndex: 'name',
      key: 'name',
      render: (_, item) => (
        <Button
          type='link'
          onClick={() => {
            setItem(item);
            setOpen(true);
          }}
        >
          Xem{' '}
        </Button>
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
    <>
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
      {open && item && (
        <ProductionDetailModal
          detail={item}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
