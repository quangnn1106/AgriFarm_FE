import {
  getTrainingDetailService,
  getAssessmentDetailService
} from '@/services/Admin/Activities/additionService';
import { UsingDetail } from '@/services/Admin/Activities/Payload/response/activityAdditionResponse';
import { TrainingDetail } from '@/services/Admin/Training/response/training.response';
import UseAxiosAuth from '@/utils/axiosClient';
import { Avatar, Col, Descriptions, Flex, Row, Typography } from 'antd';
import { AxiosInstance } from 'axios';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface IProps {
  activityId: string;
  isFetching?: boolean;
  setIsFetching: any;
  change: boolean;
}

const TrainingAddition = (props: IProps) => {
  const { activityId, isFetching, setIsFetching, change } = props;
  const [detail, setDetail] = useState<TrainingDetail | null>();
  const http = UseAxiosAuth();

  const fetchAddition = async (http: AxiosInstance, activityId: string) => {
    try {
      // console.log('Fetching data..');
      const responseData = await getTrainingDetailService(activityId, http);
      console.log('Data here: ', responseData);
      setDetail(responseData?.data as TrainingDetail);
      setIsFetching(false);
    } catch (error) {
      console.error('Error calling API activities:', error);
    }
  };

  useEffect(() => {
    fetchAddition(http, activityId);
  }, [activityId, change]);

  return (
    <>
      {detail && (
        <Row>
          <Col
            offset={2}
            span={6}
          >
            <Avatar
              shape='square'
              alt=''
              size={200}
              src='https://cdn-icons-png.flaticon.com/512/1945/1945958.png'
            />
          </Col>
          <Col span={14}>
            <Flex align='baseline'>
              <Col span={8}>
                <Descriptions title={'Người hướng dẫn:'} />
              </Col>
              <Col span={12}>
                <Typography.Link strong href={`/training/experts/${detail.expert.id}`}>
                  {detail.expert.fullName}
                </Typography.Link>
              </Col>
            </Flex>
            <Row>
              <Col span={7}>
                <Descriptions title={'Nội dung:'} />
              </Col>
              <Col span={24}>
                <Flex style={{ width: '100%', height: '100%', maxHeight:'30vh', overflow:'auto' }}>
                  {/* {detail.description} */}
                  {detail.description}
                </Flex>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </>
  );
};

export default TrainingAddition;
