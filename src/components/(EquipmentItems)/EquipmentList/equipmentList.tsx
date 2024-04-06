import { Link, usePathname, useRouter } from '@/navigation';
import { EquipmentResponse } from '@/services/Admin/Equipments/Payload/response/equipmentResponses';
import {
  deleteEquipmentsService,
  getEquipmentsService
} from '@/services/Admin/Equipments/equipmentsService';
import { PaginationResponse } from '@/types/pagination';
import UseAxiosAuth from '@/utils/axiosClient';
import { getPaginationResponse } from '@/utils/paginationHelper';
import {
  DeleteTwoTone,
  EditOutlined,
  EditTwoTone,
  EllipsisOutlined,
  PlusOutlined,
  SettingOutlined,
  ShoppingOutlined
} from '@ant-design/icons';
import {
  Flex,
  Divider,
  Typography,
  Col,
  Input,
  Button,
  Avatar,
  Card,
  List,
  Skeleton,
  Popconfirm,
  Popover,
  message
} from 'antd';
import { AxiosInstance } from 'axios';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import EquipmentDetailDrawer from '../EquipmentDetail/equipmentDetailDrawer';
import SupplyEquipmentModal from '../SupplyEquipment/supplyEquipment';
import EquipSupplyDetailDrawer from '../EquipSupplyDetail/equipSupplyDetailDrawer';
import UpdateEquipmentModal from '../UpdateEquipment/updateEquipmentModal';
import InDomDrawer from './inDomDrawer';
import EquipSupplyDetailList from '../EquipSupplyDetail/equipmentSupplyDetailList';

interface IProps {}

export default function EquipmentList(props: IProps) {
  const [pesticides, setEquipments] = useState<EquipmentResponse[] | []>();
  const [isFetching, setIsFetching] = useState(false);
  const [hasChanged, setHasChanged] = useState(true);

  const [page, setPage] = useState<PaginationResponse>({
    CurrentPage: 1,
    PageSize: 0,
    TotalCount: 1,
    TotalPages: 1
  });
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentResponse | null>(
    null
  );
  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const [detailOpen, setDetailOpen] = useState<boolean>(false);
  const [supplyOpen, setSupplyOpen] = useState<boolean>(false);
  const [supplyDetailsOpen, setSupplyDetailsOpen] = useState<boolean>(false);

  const pathname = usePathname();
  const farmRouter = useRouter();
  const http = UseAxiosAuth();

  const fetchEquipments = async (http: AxiosInstance) => {
    try {
      //console.log('Fetching data..');
      const responseData = await getEquipmentsService(http);
      //console.log('>Paging: ', getPaginationResponse(responseData));
      setPage(getPaginationResponse(responseData));
      //console.log('Data here: ', responseData);
      setEquipments(responseData?.data.data as EquipmentResponse[]);
      setIsFetching(false);
    } catch (error) {
      console.error('Error calling API training content:', error);
    }
  };

  useEffect(() => {
    fetchEquipments(http);
  }, [http, hasChanged]);

  const handleDelete = async (content: EquipmentResponse) => {
    deleteEquipmentsService(http, content.id).then(rs => {
      if (rs) {
        message.success(`Deleted ${content.name} success`);
        setHasChanged(!hasChanged);
      } else {
        message.success(`Something went wrong try again!`);
      }
    });
  };

  const handleDetailClick = (content: EquipmentResponse) => {
    setSelectedEquipment(content);
    setDetailOpen(true);
  };

  const loadMoreData = () => {
    console.log('Page: ', page);
    if (isFetching) {
      return;
    }
    setIsFetching(true);
    console.log('Start Fetching');
    const nextPage =
      page.CurrentPage + 1 > page.TotalPages ? page.TotalPages : page.CurrentPage + 1;
    getEquipmentsService(http, nextPage)
      .then(res => {
        console.log('>paging: ', getPaginationResponse(res));
        return res.data;
      })
      .then(body => {
        console.log('body ', body);

        setEquipments([
          ...(pesticides as EquipmentResponse[]),
          ...(body.data as EquipmentResponse[])
        ]);
        setIsFetching(false);
      })
      .catch(() => {
        setIsFetching(false);
      });
  };

  const renderDetail = () => {
    console.log('appear popup');
    return <></>;
  };

  const renderHeader = () => {
    return (
      <>
        <Flex
          vertical
          gap={20}
          justify='space-between'
          style={{ margin: '1rem' }}
        >
          <Divider orientation='left'>
            <Typography.Title level={3}>Equipment Management</Typography.Title>
          </Divider>

          <Flex
            style={{ marginLeft: '5%' }}
            justify='flex-start'
            align='center'
          >
            <Col span={20}>
              <Input type='text' />
            </Col>
            <Col span={4}>
              <Button type='primary'>Search</Button>
            </Col>
          </Flex>

          <Flex
            style={{ paddingRight: '10vw' }}
            justify='end'
            align='right'
          >
            <Button
              icon={<PlusOutlined />}
              type='primary'
              onClick={() => farmRouter.push(pathname + '/add')}
            >
              Add
            </Button>
          </Flex>
        </Flex>
      </>
    );
  };
  const renderListSection = () => {
    return (
      <div
        id='scrollableDiv'
        style={{
          height: '70vh',
          overflow: 'auto',
          padding: '0 16px',
          border: '1px solid rgba(140, 140, 140, 0.35)'
        }}
      >
        <InfiniteScroll
          dataLength={page.PageSize}
          next={loadMoreData}
          hasMore={!!pesticides && pesticides?.length < page.TotalCount}
          loader={
            <Skeleton
              avatar
              paragraph={{ rows: 1 }}
              active
            />
          }
          endMessage={
            page.TotalCount > 0 ? (
              <Divider plain>It is all, nothing more</Divider>
            ) : (
              <Divider>No thing to display! Please add more.</Divider>
            )
          }
          scrollableTarget='scrollableDiv'
        >
          <List
            itemLayout='horizontal'
            dataSource={pesticides}
            renderItem={(item, index) => (
              <List.Item
                key={index}
                style={{ minHeight: 100 }}
              >
                <Card
                  style={{
                    width: '100%',
                    //width: 500,
                    //height: 200,
                    marginTop: 16
                  }}
                  loading={isFetching}
                  bordered={true}
                >
                  <Flex justify='space-between'>
                    {/* infor section */}
                    <Flex
                      style={{ width: '30%' }}
                      justify='start'
                      gap={30}
                    >
                      <Avatar
                        //size={}
                        shape='square'
                        alt='avatar'
                        src='#'
                        style={{ width: 100, height: 100, display: 'block' }}
                      />
                      <Flex
                        vertical
                        align='space-between'
                        justify='center'
                        //style={{ padding: 10 }}
                      >
                        <Typography.Title level={5}>
                          <a onClick={() => handleDetailClick(item)}>{item.name}</a>
                        </Typography.Title>
                        <Typography.Paragraph>
                          <div
                            style={{
                              height: 50
                            }}
                          >
                            {item.description && item.description.length > 30
                              ? `${item.description?.substring(0, 30)}...`
                              : item.description ?? 'No thing to display'}
                          </div>
                        </Typography.Paragraph>
                      </Flex>
                    </Flex>
                    {/* quantity section */}
                    <Flex
                      justify='start'
                      align='center'
                      style={{ width: '30%' }}
                    >
                      <Typography.Title level={5}>
                        Quantity: {item.stock}
                        {`(${item.measureUnit})`}
                      </Typography.Title>
                    </Flex>
                    {/* action section */}
                    <Flex
                      //vertical
                      style={{ width: '35%' }}
                      align='center'
                      justify='space-between'
                    >
                      <Button
                        style={{
                          width: '15%',
                          height: 50,
                          cursor: 'pointer',
                          margin: '0 20px'
                        }}
                        size='large'
                        onClick={() => {
                          setSelectedEquipment(item);
                          setSupplyOpen(true);
                        }}
                      >
                        <ShoppingOutlined
                          //style={{ height: 140 }}
                          key='supply more'
                          placeholder='Supply more'
                          alt='aaaaa'
                        />
                      </Button>
                      <Button
                        style={{
                          width: '15%',
                          height: 50,
                          cursor: 'pointer',
                          margin: '0 20px'
                        }}
                        size='large'
                        onClick={() => {
                          setSelectedEquipment(item);
                          setUpdateOpen(true);
                        }}
                      >
                        <EditTwoTone twoToneColor='#f57800' />
                      </Button>

                      <Popconfirm
                        placement='leftTop'
                        title={'Do you want to delete this item?'}
                        description={
                          'This item will be deleted permanently after you accept this action.'
                        }
                        onConfirm={() => handleDelete(item)}
                        okText='Accept'
                        cancelText='Cancel'
                      >
                        <Button
                          style={{
                            width: '15%',
                            height: 50,
                            cursor: 'pointer',
                            margin: '0 20px'
                          }}
                          size='large'
                        >
                          <DeleteTwoTone twoToneColor='#ff4d4f' />
                        </Button>
                      </Popconfirm>
                      <Popover
                        placement='bottomRight'
                        title={'More actions'}
                        content={() => {
                          return (
                            <Flex vertical>
                              <Button href={'#'}>Upload new avatar</Button>
                              <Button href={'#'}>Update properties</Button>
                              <Button
                                onClick={() => {
                                  setSelectedEquipment(item);
                                  setSupplyDetailsOpen(true);
                                }}
                              >
                                View supply histories
                              </Button>
                              <Button href={'#'}>Go to detail page</Button>
                            </Flex>
                          );
                        }}
                      >
                        <Button
                          style={{ width: '15%', height: 50 }}
                          size='large'
                        >
                          <EllipsisOutlined key='ellipsis' />
                        </Button>
                      </Popover>
                    </Flex>
                  </Flex>
                </Card>
              </List.Item>
            )}
          ></List>
        </InfiniteScroll>

        {/* <InDomDrawer/> */}
      </div>
    );
  };

  return (
    <>
      {renderHeader()}
      {renderListSection()}
      {/*  */}
      {detailOpen && selectedEquipment && (
        <EquipmentDetailDrawer
          item={selectedEquipment}
          onClose={() => {
            setDetailOpen(false);
            setSelectedEquipment(null);
          }}
        />
      )}
      {supplyOpen && selectedEquipment && (
        <SupplyEquipmentModal
          item={selectedEquipment}
          onClose={() => {
            setSupplyOpen(false);
            setSelectedEquipment(null);

            setHasChanged(!hasChanged);
          }}
        />
      )}
      {updateOpen && selectedEquipment && (
        <UpdateEquipmentModal
          item={selectedEquipment}
          onClose={() => {
            setUpdateOpen(false);
            setSelectedEquipment(null);

            setHasChanged(!hasChanged);
          }}
        />
      )}
      {selectedEquipment && supplyDetailsOpen && (
        <EquipSupplyDetailDrawer
          item={selectedEquipment}
          isOpen={supplyDetailsOpen}
          onClose={() => {
            setSupplyDetailsOpen(false);
            setSelectedEquipment(null);

            // setHasChanged(!hasChanged)
          }}
        />
      )}
    </>
  );
}
