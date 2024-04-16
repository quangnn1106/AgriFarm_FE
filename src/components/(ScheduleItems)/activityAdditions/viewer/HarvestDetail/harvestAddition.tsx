import { useRouter } from '@/navigation';
import { getAssessmentDetailService, getHarvestDetailService } from '@/services/Admin/Activities/additionService';
import { AssessmentDetail, HarvestDetail } from '@/services/Admin/Activities/Payload/response/activityAdditionResponse';
import { RiskAdditionResponse } from '@/services/Admin/Activities/Payload/response/activityResponse';
import UseAxiosAuth from '@/utils/axiosClient';
import { Avatar, Button, Col, Descriptions, Flex, Row, Typography } from 'antd';
import { AxiosInstance } from 'axios';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs'
import HarvestModal from '../../HarvestAction/harvestModal';

interface IProps {
  activityId: string;
  isFetching?: boolean;
  setIsFetching: any;
}

const HarvestAddition = (props: IProps) => {
  const { activityId, isFetching, setIsFetching } = props;
  const [detail, setDetail] = useState<HarvestDetail | null>();
  const [open, setOpen] = useState(false)
  const http = UseAxiosAuth();
  const router = useRouter();

  const fetchAddition = async (http: AxiosInstance, activityId: string) => {
    try {
      // console.log('Fetching data..');
      const responseData = await getHarvestDetailService(activityId, http);
      console.log('Data here: ', responseData);
      setDetail(responseData?.data as HarvestDetail);
      setIsFetching(false);
    } catch (error) {
      console.error('Error calling API activities:', error);
    }
  };

  useEffect(() => {
    fetchAddition(http, activityId);
  }, [activityId]);

  return (
    <>
      {detail && (
        <Row>
          <Col
            offset={3}
            span={6}
          >
            <Avatar
              shape='square'
              alt=''
              size={200}
              src='https://cdn-icons-png.flaticon.com/512/9921/9921058.png'
            />
          </Col>
          <Col offset={2} span={10}>
            <Flex align='baseline'>
              <Col span={4}>
                <Descriptions title={'Sản phẩm:'} />
              </Col>
              <Col offset={1} span={8}>
                <Typography.Text
                  type='success'
                  strong
                >
                  {detail.product.name}
                </Typography.Text>

              </Col>
              
            </Flex>
            <Row>
              <Col span={7}>
                <Descriptions title={'Mô tả:'} />
              </Col>
              <Col span={24}>
                <Flex
                  style={{
                    width: '100%',
                    height: '100%',
                    maxHeight: '30vh',
                    overflow: 'auto'
                  }}
                >
                  {/* {detail.description} */}
                  Ngày thu hoạch: {detail.harvestDate?dayjs(detail.harvestDate).format("DD/MM/YYYY"):"Chưa thu hoạch"}
                </Flex>
              </Col>
              <Col span={24}>
                <Flex
                  style={{
                    width: '100%',
                    height: '100%',
                    maxHeight: '30vh',
                    overflow: 'auto'
                  }}
                >
                  Sản lượng thu hoạch: {detail.total+` (${detail.unit})`}
                </Flex>
              </Col>
              <Col style={{marginTop:20}} span={24}>
                <Flex
                  style={{
                    width: '100%',
                    height: '100%',
                    maxHeight: '30vh',
                    overflow: 'auto'
                  }}
                >
                  <Button type='primary' onClick={()=>setOpen(true)}> Thu hoạch</Button>
                </Flex>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
      {open && detail && <HarvestModal
        productionId={detail?.id}
        activityId={activityId}
        onCancel={()=>{setOpen(false)}}
        onSubmit={(data)=>{
          setDetail(({...detail, total: data.output, harvestDate: new Date()}))
          setOpen(false)
        }}
      />}
    </>
  );
};

export default HarvestAddition;
