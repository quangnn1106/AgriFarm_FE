'use client';

import VirtualList from 'rc-virtual-list';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Expert } from '@/services/Admin/Training/response/training.response';
import {
  DeleteTwoTone,
  EditOutlined,
  EditTwoTone,
  EllipsisOutlined,
  ExclamationCircleOutlined,
  HomeOutlined,
  PlusOutlined,
  SettingOutlined,
  UnorderedListOutlined
} from '@ant-design/icons';
import {
  Avatar,
  Breadcrumb,
  Button,
  Card,
  Col,
  ConfigProvider,
  Descriptions,
  Divider,
  Flex,
  Image,
  Input,
  List,
  Modal,
  Popconfirm,
  Popover,
  Row,
  Skeleton,
  Space,
  Table,
  TableProps,
  Typography
} from 'antd';
import { useEffect, useState } from 'react';
import ExpertDetail from '../ExpertDetail/expertDetail';
import AddExpert from '../CreateExpert/addExpert';
import UpdateExpert from '../UpdateExpert/updateExpert';
import AgriImage from '@/components/(ImageItem)/AgriImage/agriImage';
import { AxiosInstance } from 'axios';
import UseAxiosAuth from '@/utils/axiosClient';
import {
  deleteExpertsService,
  getExpertsService
} from '@/services/Admin/Training/expertService';
import Meta from 'antd/es/card/Meta';
import { PaginationResponse } from '@/types/pagination';
import { useRouter } from '@/navigation';
import { Span } from 'next/dist/trace';
import { Content } from 'antd/es/layout/layout';
import { useSession } from 'next-auth/react';
import { getPaginationResponse } from '@/utils/paginationHelper';
import { useDebounceSearch } from '@/utils/debounceSearch';
import Search from 'antd/es/input/Search';

interface IProps {
  list?: Expert[];
  isFetching?: boolean;
  setIsFetching?: (val: boolean) => void;
  setHasChanged?: (value: boolean) => void;
}

export default function ExpertList(props: IProps) {
  const [experts, setExperts] = useState<Expert[] | []>();
  const [isFetching, setIsFetching] = useState(false);
  const [hasChanged, setHasChanged] = useState(true);
  const [term, setTerm] = useState<string>('');
  const [page, setPage] = useState<PaginationResponse>({
    CurrentPage: 1,
    PageSize: 5,
    TotalCount: 0,
    TotalPages: 1
  });

  const farmRouter = useRouter();
  const { data: session } = useSession();
  const siteId = session?.user.userInfo.siteId;
  const siteName = session?.user.userInfo.siteName;
  const http = UseAxiosAuth();

  const fetchExperts = async () => {
    try {
      console.log('Fetching data..');
      const responseData = await getExpertsService(
        http,
        page.CurrentPage,
        page.PageSize,
        term.length === 0 ? undefined : term
      );
      console.log('Data here: ', responseData);
      setPage(getPaginationResponse(responseData));
      setExperts(responseData?.data.data as Expert[]);
      setIsFetching(false);
    } catch (error) {
      console.error('Error calling API training content:', error);
    }
  };

  // useEffect(() => {
  //   fetchExperts();
  // }, [http, hasChanged]);

  useEffect(() => {
    console.log('On fetching..');
    fetchExperts();
  }, [term, page.CurrentPage]);

  // useEffect(() => {
  //   console.log('On paging..');
  //   fetchExperts();
  // }, [page]);

  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);

  const handleDelete = async (content: Expert) => {
    try {
      const rs = await deleteExpertsService(http, content.id);

      if (experts && rs) {
        setExperts(experts.filter(e => e.id !== content.id));
      }
    } catch {}

    setDeleteOpen(false);
    setSelectedExpert(null);
  };

  const handleSearch = async (val: string) => {
    console.log('key: ', val);
    setPage(prev=>({...prev, CurrentPage:1}))
    setTerm(val.trim().toLowerCase());

    
  };
  const [onSearch] = useDebounceSearch(handleSearch, 500);

  const handleDetailClick = (content: Expert) => {
    setSelectedExpert(content);
    //setDetailOpen(true);
    farmRouter.push('experts/sdas-dads-q243-asd412-das1');
  };

  const loadMoreData = () => {
    console.log('Page: ', page);
    if (isFetching) {
      return;
    }
    setIsFetching(true);
    console.log('Start Fetching');
    getExpertsService(http)
      .then(res => res.data)
      .then(body => {
        console.log('body ', body);
        setExperts([...(body.data as Expert[]), ...(experts as Expert[])]);
        setIsFetching(false);
      })
      .catch(() => {
        setIsFetching(false);
      });
  };

  const columns: TableProps<Expert>['columns'] = [
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      render: (_, e) => (
        <Col>
          <Flex
            justify='flex-start'
            align='center'
            gap={30}
            onClick={() => handleDetailClick(e)}
          >
            <Avatar
              //shape='square'
              size={100}
              src={
                'https://cdn.vectorstock.com/i/preview-1x/77/22/farmer-avatar-icon-vector-32077722.jpg'
              }
            />
            {e.fullName}
          </Flex>
        </Col>
      )
    },
    {
      title: 'Lĩnh vực',
      dataIndex: 'age',
      key: 'age',
      render: (_, e) => <Space>{e.expertField}</Space>
    },
    {
      title: 'Mô tả',
      dataIndex: 'address',
      key: 'address',
      width: '30%',
      render: (_, e) => <Space>{e.description?.substring(0, 20) + '...'}</Space>
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
      width: '10%',
      render: (_, e) => (
        <Popover
          content={() => (
            <>
              <Flex
                gap={5}
                align='start'
                justify='start'
                vertical
              >
                <Button
                  type='text'
                  // block
                  icon={<ExclamationCircleOutlined />}
                  onClick={() => {
                    // handleDetailClick(e);
                    farmRouter.push('/training/experts/' + e.id);
                  }}
                >
                  Chi tiết
                </Button>
                <Button
                  type='text'
                  // block
                  icon={<EditOutlined />}
                  onClick={() => {
                    setSelectedExpert(e);
                    setUpdateOpen(true);
                  }}
                >
                  Sửa
                </Button>
                <Button
                  type='text'
                  // block
                  icon={<DeleteTwoTone twoToneColor={'#df544a'} />}
                  onClick={() => {
                    setSelectedExpert(e);
                    setDeleteOpen(true);
                  }}
                >
                  Xóa
                </Button>
              </Flex>
            </>
          )}
          // title='Title'
          placement='bottom'
          // trigger='click'
        >
          <Button
            type='link'
            // onClick={() => handleDetailClick(e)}
          >
            <UnorderedListOutlined style={{ fontSize: '150%' }} />
          </Button>
        </Popover>
      )
    }
  ];

  const delelteModal = (
    <>
      <Modal
        centered
        open
        onCancel={() => setDeleteOpen(false)}
        onOk={() => {
          if (selectedExpert) handleDelete(selectedExpert);
        }}
        title={'Bạn có muốn xóa hồ sơ này không?'}
        okType='danger'
        okText={'Xác nhận'}
        cancelText={'Hủy bỏ'}
      ></Modal>
    </>
  );

  return (
    <>
      <Content style={{ padding: '20px 0px' }}>
        <ConfigProvider
          theme={{
            components: {
              Button: {
                contentFontSizeLG: 24,
                fontWeight: 700,
                groupBorderColor: 'transparent',
                onlyIconSizeLG: 24,
                paddingBlockLG: 0,
                defaultBorderColor: 'transparent',
                defaultBg: 'transparent',
                defaultShadow: 'none',
                primaryShadow: 'none',
                linkHoverBg: 'transparent',
                paddingInlineLG: 24,
                defaultGhostBorderColor: 'transparent'
              }
            }
          }}
        >
          {' '}
          <Button
            //className={cx('home-btn')}
            href='#'
            size={'large'}
          >
            <HomeOutlined style={{ color: 'green' }} />
            {siteName}
          </Button>
        </ConfigProvider>
        <Breadcrumb style={{ margin: '0px 24px' }}>
          <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
          <Breadcrumb.Item>Thông tin chuyên gia</Breadcrumb.Item>
        </Breadcrumb>
        <Divider orientation='left'>
          <Typography.Title level={3}>Thông tin chuyên gia</Typography.Title>
        </Divider>

        <div style={{ marginLeft: 50, width: '70vw' }}>
          <Row style={{ width: '100%', marginBlock: 20 }}>
            <Col
              offset={22}
              span={1}
            >
              <Button
                onClick={() => farmRouter.push('/training/experts/add')}
                type='primary'
                block
              >
                <PlusOutlined />
              </Button>
            </Col>
          </Row>
          <Flex style={{ marginBottom: 50 }}>
            <Search
              allowClear
              // onClear={()=>setTerm('')}
              onChange={e => onSearch(e.target.value)}
              onSearch={handleSearch}
            />
          </Flex>
          <div style={{ minHeight: 500 }}>
          <Table
            style={{
              height: 500,
              // overflow: 'auto'
            }}
            bordered
            // size='large'
            rowKey={e => e.id}
            dataSource={experts}
            columns={columns}
            // pagination={false}
            pagination={{
              //showTotal: total => `${total} hồ sơ`,
              showSizeChanger: false,
              pageSize: 5, //page.PageSize,
              current: page.CurrentPage,
              onChange:(number)=>setPage({...page, CurrentPage:number}),
              //pageSizeOptions: ['10', '20', '30'],
              total: page.TotalCount
            }}
            scroll={{ y: 500 }}
          ></Table>
          </div>
        </div>

        {updateOpen && selectedExpert && (
          <UpdateExpert
            onSubmit={data => {
              const newList = experts?.map(e => {
                if (e.id === data.id) {
                  return data;
                } else return e;
              });
              setExperts(newList);
              setHasChanged(prev => !prev);
            }}
            onClose={() => {
              setUpdateOpen(false);
            }}
            detail={selectedExpert}
          />
        )}
        {deleteOpen && delelteModal}
      </Content>
    </>
  );
}

{
  /* <div>
        <AgriImage
          height={200}
          width={200}
          path='123/41347038-ecc3_bg.png'
          alt='ok'
        />
      </div> */
}

// const renderListSection = () => {
//   return (
//     <div
//       id='scrollableDiv'
//       style={{
//         height: '80vh',
//         width: '100%',
//         overflow: 'auto',
//         padding: '0 16px',
//         border: '1px solid rgba(140, 140, 140, 0.35)'
//       }}
//     >
//       <InfiniteScroll
//         dataLength={page.PageSize}
//         next={loadMoreData}
//         hasMore={!!experts && experts?.length < page.TotalCount}
//         loader={
//           <Skeleton
//             avatar
//             paragraph={{ rows: 1 }}
//             active
//           />
//         }
//         endMessage={
//           page.TotalCount > 0 ? (
//             <Divider plain>It is all, nothing more</Divider>
//           ) : (
//             <Divider>No thing to display! Please add more.</Divider>
//           )
//         }
//         scrollableTarget='scrollableDiv'
//       >
//         <List
//           itemLayout='horizontal'
//           dataSource={experts}
//           renderItem={(item, index) => (
//             <List.Item
//               key={index}
//               style={{ minHeight: 100 }}
//             >
//               <Card
//                 style={{
//                   width: '100%',
//                   //width: 500,
//                   //height: 200,
//                   marginTop: 16
//                 }}
//                 loading={isFetching}
//                 bordered={true}
//               >
//                 <Flex justify='space-between'>
//                   <Flex
//                     justify='start'
//                     gap={30}
//                   >
//                     <Avatar
//                       alt='avatar'
//                       src='#'
//                       style={{ width: 100, height: 100, display: 'block' }}
//                     />
//                     <Flex
//                       vertical
//                       align='space-between'
//                       justify='center'
//                       //style={{ padding: 10 }}
//                     >
//                       <Typography.Title level={5}>
//                         <a onClick={() => handleDetailClick(item)}>{item.fullName}</a>
//                       </Typography.Title>
//                       <Typography.Paragraph>
//                         <div
//                           style={{
//                             height: 50
//                           }}
//                         >
//                           {item?.description?.length ?? 0 > 30
//                             ? `${item.description?.substring(0, 30)}...`
//                             : item.description ?? 'No thing to display'}
//                         </div>
//                       </Typography.Paragraph>
//                     </Flex>
//                   </Flex>

//                   <Flex
//                     vertical
//                     style={{ width: '5%' }}
//                     align='center'
//                     justify='space-between'
//                   >
//                     <SettingOutlined key='setting' />
//                     <EditOutlined key='edit' />
//                     <EllipsisOutlined key='ellipsis' />
//                   </Flex>
//                 </Flex>
//               </Card>
//             </List.Item>
//           )}
//         />
//       </InfiniteScroll>
//     </div>
//   );
// };
