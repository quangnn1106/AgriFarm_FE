import { getEquipmentSupplyDetailsService } from "@/services/Admin/Equipments/equipmentsService";
import { EquipmentResponse, SupplyDetailResponse } from "@/services/Admin/Equipments/Payload/response/equipmentResponses";
import { PaginationResponse } from "@/types/pagination";
import UseAxiosAuth from "@/utils/axiosClient";
import { getPaginationResponse } from "@/utils/paginationHelper";
import { Button, Skeleton, Row, Col, Flex, List } from "antd";
import { useState, useEffect } from "react";
import dayjs from 'dayjs';
import { Link } from "@/navigation";


interface IProps {
    item: EquipmentResponse;
  }
  
  export default function EquipSupplyDetailList(props: IProps) {
    const { item} = props;
    const [details, setDetails] = useState<SupplyDetailResponse[]>([]);
    const [initLoading, setInitLoading] = useState(true);
    const [page, setPage] = useState<PaginationResponse>({
      CurrentPage: 1,
      PageSize: 10,
      TotalCount: 1,
      TotalPages: 1
    });
    const [loading, setLoading] = useState(false);
    const http = UseAxiosAuth();
  
    useEffect(() => {
      getEquipmentSupplyDetailsService(http, item.id)
        .then(res => {
          setPage(getPaginationResponse(res));
          return res.data.data as SupplyDetailResponse[];
        })
        .then(res => {
          setInitLoading(false);
          setDetails(res);
        });
    }, []);
  
    const onLoadMore = () => {
      setLoading(true);
      // setList(
      //   data.concat([...new Array(count)].map(() => ({ loading: true, name: {}, picture: {} }))),
      // );
      const nextPage =
        page.CurrentPage + 1 > page.TotalPages ? page.TotalPages : page.CurrentPage + 1;
      getEquipmentSupplyDetailsService(http, item.id, nextPage)
        .then(res => {
          const rsPage = getPaginationResponse(res);
          setPage(rsPage);
          return res.data.data as SupplyDetailResponse[];
        })
        .then(body => {
          setDetails([...details, ...body]);
          //   setData(newData);
          //   setList(newData);
          setLoading(false);
          // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
          // In real scene, you can using public method of react-virtualized:
          // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
          //window.dispatchEvent(new Event('resize'));
        });
    };
  
    const loadMore =
      !initLoading && !loading && details.length< page.TotalCount ? (
        <div
          style={{
            textAlign: 'center',
            marginTop: 12,
            height: 32,
            lineHeight: '32px'
          }}
        >
          <Button onClick={onLoadMore}>loading more</Button>
        </div>
      ) : null;
  
    return (
      <>
        <List
          //className='demo-loadmore-list'
          loading={initLoading}
          itemLayout='horizontal'
          loadMore={loadMore}
          dataSource={details}
          renderItem={detail => (
            <List.Item actions={[<a key='list-loadmore-more'>more</a>]}>
              <Skeleton
                avatar
                title={false}
                loading={loading}
                active
              >
                {/* <List.Item.Meta
                  //avatar={<Avatar src={i.large} />}
                  title={<Link href={`/.../${detail.id}`}>{}</Link>}
                  description='Ant Design, a design language for background applications, is refined by Ant UED Team'
                /> */}
  
                <Row gutter={16}
                  style={{ width: '100%' }}
                  justify='space-between'
                >
                  <Col span={6}>{dayjs(detail.createdDate).format('HH:mm DD/MM/YYYY')}</Col>
                  <Col span={6}>
                    Quantity: {detail.quantity} ({detail.unit ?? 'item'})
                  </Col>
                  
                  <Col span={6}>
                    At:{' '}
                    <Link href={`/suppliers/${detail.supplier.id}`}>
                      {detail.supplier.name}
                    </Link>
                  </Col>
                  <Col span={6}>Total: {detail.quantity*detail.unitPrice} (VND)</Col>
                </Row>
              </Skeleton>
            </List.Item>
          )}
        />
        {!initLoading && details && details.length === 0 &&(
          <Flex justify='center'>There no history to show. Supply more!</Flex>
        )}
      </>
    );
  }