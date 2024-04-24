import { useActivityBoundary } from '@/components/(ScheduleItems)/DetailBoundary/actvityDetailBoundary';
import { useRouter } from '@/navigation';
import { getAssessmentDetailService } from '@/services/Admin/Activities/additionService';
import { AssessmentDetail } from '@/services/Admin/Activities/Payload/response/activityAdditionResponse';
import { RiskAdditionResponse } from '@/services/Admin/Activities/Payload/response/activityResponse';
import UseAxiosAuth from '@/utils/axiosClient';
import { Avatar, Button, Col, Descriptions, Flex, Row, Typography } from 'antd';
import { AxiosInstance } from 'axios';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface IProps {
  activityId: string;
  isFetching?: boolean;
  setIsFetching: any;
}

const AssessmentAddition = (props: IProps) => {
  const { activityId, isFetching, setIsFetching } = props;
  const [detail, setDetail] = useState<RiskAdditionResponse | null>();
  const http = UseAxiosAuth();
  const router = useRouter();
  const {
    activity,
    setActivity,
    setAddition,
    setLocation: setLoaction,
    location,
    setActive,
    active
  } = useActivityBoundary();

  const fetchAddition = async (http: AxiosInstance, activityId: string) => {
    try {
      // console.log('Fetching data..');
      const responseData = await getAssessmentDetailService(activityId, http);
      // console.log('Data here: ', responseData);
      setDetail(responseData?.data as RiskAdditionResponse);
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
      {detail && detail.checkList && (
        <Row>
          <Col
            offset={2}
            span={6}
          >
            <Avatar
              shape='square'
              alt=''
              size={200}
              src='https://cdn-icons-png.flaticon.com/512/7870/7870760.png'
            />
          </Col>
          <Col span={14}>
            <Flex align='baseline'>
              <Col span={5}>
                <Descriptions title={'Bảng đánh giá:'} />
              </Col>
              <Col offset={1} span={8}>
                <Typography.Text
                  type='success'
                  strong
                >
                  {detail.checkList.riskName}
                </Typography.Text>

              </Col>
              <Col span={4}>
                <Button
                  type='primary'
                  disabled={!active}
                  onClick={() =>
                    router.push('/risk-assessment/implement/' + detail?.taskId)
                  }
                >
                  Đi đến đánh giá
                </Button>
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
                  {detail.checkList.riskDescription}
                </Flex>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </>
  );
};

export default AssessmentAddition;
