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
import { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { ProductionDetailList } from './productionDetailList';
import { useRouter } from '@/navigation';
import Search from 'antd/es/input/Search';
import { FakePro, fakeProduct } from '@/components/(CultivationItems)/fakeProductions';
import { useSession } from 'next-auth/react';
import { useDebounceSearch } from '@/utils/debounceSearch';
import { getFarmProductsService } from '@/services/Admin/Productions/farmProductsService';
import { Expert } from '@/services/Admin/Training/response/training.response';
import { PaginationResponse } from '@/types/pagination';
import UseAxiosAuth from '@/utils/axiosClient';
import { getPaginationResponse } from '@/utils/paginationHelper';

const fakeData: FarmProductResponse[] = fakeProduct;
const prox = FakePro;

export default function ProductList() {
  const [list, setList] = useState<FarmProductResponse[]>(fakeData);
  const farmRouter = useRouter();
  const { data: session } = useSession();
  const siteId = session?.user.userInfo.siteId;
  const siteName = session?.user.userInfo.siteName;
  const [expanded, setExpanded] = useState(true);
  const [term, setTerm] = useState<string>('');
  const [isFetching, setIsFetching] = useState(false);
  const [hasChanged, setHasChanged] = useState(true);
  const http = UseAxiosAuth();
  const [page, setPage] = useState<PaginationResponse>({
    CurrentPage: 1,
    PageSize: 5,
    TotalCount: 0,
    TotalPages: 1
  });

  const fetchData = async () => {
    try {
      console.log('Fetching data..');
      const responseData = await getFarmProductsService(
        http,
        page.CurrentPage,
        page.PageSize,
        term.length === 0 ? undefined : term
      );
      console.log('Data here: ', responseData);
      setPage(getPaginationResponse(responseData));
      setList(responseData?.data.data as FarmProductResponse[]);
      setIsFetching(false);
    } catch (error) {
      console.error('Error calling API training content:', error);
    }

  };

  const handleSearch = async (val: string) => {
    console.log('key: ', val);
    // setPage(prev=>({...prev, CurrentPage:1}))
    setTerm(val.trim().toLowerCase());
  };
  const [onSearch] = useDebounceSearch(handleSearch, 500);

  useEffect(() => {
    console.log('On fetching..');
    fetchData();
  }, [term, page.CurrentPage]);

  

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
      expandedRowRender: (record, i, expanded) => (
        <>
          {expanded ? (
            <ProductionDetailList
              productId={record.id}
              //productions={prox.filter(e => e.product.name === record.name)}
              productions={[]}
            />
          ) : (
            <></>
          )}
        </>
      )
      // rowExpandable: (record) => record.id % 2 === 0,
    };
  }, [expanded]);

  const columns: TableColumnsType<FarmProductResponse> = [
    {
      title: 'Tên sản phẩm',
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
                src={
                  record.img
                    ? record.img
                    : 'https://product.hstatic.net/1000391653/product/sun025_683685242f1542469df6ceb548168b66_120549b361d74b6fa8413bb1011a6b59_master.jpg'
                }
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
      title: 'Lưu giữ trong kho',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (_, record) => (
        <>
          <Flex gap={10}>
            <Typography>{record.quantity}</Typography>
            <Typography>({record.unit})</Typography>
          </Flex>
        </>
      )
    },
    // { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt', render: (_,record)=>(<>
    //     <Space>{dayjs(record.)}</Space>
    // </>) },
    {
      title: 'Chi tiết',
      key: 'operation',
      render: (_, e) => <a onClick={() => farmRouter.push('/products/' + e.id)}>Xem</a>
    }
  ];

  return (
    <>
      <Divider orientation='left'>
        <Typography.Title level={3}>Danh sách sản phẩm</Typography.Title>
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
          
          <Search
            allowClear
            style={{ height: 50 }}
            placeholder='Nhập từ khóa'
            // onClear={()=>setTerm('')}
            onChange={e => onSearch(e.target.value)}
            onSearch={handleSearch}
          />
        </Flex>
        <Table
          rowKey={record => record.id}
          columns={columns}
          expandable={expandableProps}
          dataSource={list}
          pagination={false}
          scroll={{ y: 600 }}
        />
      </Flex>
    </>
  );
}
