import {
  getTrainingDetailService,
  getTreatmentDetailService
} from '@/services/Admin/Activities/additionService';
import { TreatmentDetail } from '@/services/Admin/Activities/Payload/response/activityAdditionResponse';
import { TrainingDetail } from '@/services/Admin/Training/response/training.response';
import UseAxiosAuth from '@/utils/axiosClient';
import { AxiosInstance } from 'axios';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import TrainingAddition from '../TrainingDetail/trainingAddition';
import { Row, Col, Avatar, Flex, Descriptions, Typography } from 'antd';
import { FarmObjective } from '@/components/(ScheduleItems)/converter/FarmOjective';

interface IProps {
  activityId: string;
  isFetching?: boolean;
  setIsFetching: any;
}

const TreatmentAddition = (props: IProps) => {
  const { activityId, isFetching, setIsFetching } = props;
  const [detail, setDetail] = useState<TreatmentDetail | null>();
  const http = UseAxiosAuth();
  const objs = FarmObjective;

  const fetchAddition = async (http: AxiosInstance, activityId: string) => {
    try {
      // console.log('Fetching data..');
      const responseData = await getTreatmentDetailService(activityId, http);
      // console.log('Data here: ', responseData);
      setDetail(responseData?.data as TreatmentDetail);
      setIsFetching(false);
    } catch (error) {
      console.error('Error calling API treatment:', error);
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
            offset={2}
            span={6}
          >
            <Avatar
              shape='square'
              alt=''
              size={200}
              src='https://cdn4.iconfinder.com/data/icons/farm-and-garden-6/64/farm-harvest-work-farming-farming_and_gardening-architecture_and_city-combine_harvester-transportati-512.png'
            />
          </Col>
          <Col span={14}>
            <Flex align='baseline'>
              <Col span={5}>
                <Descriptions title={'Đối tượng xử lý:'} />
              </Col>
              <Col span={12}>
                {/* <Typography.Link strong href={`/training/experts/${detail.expert.id}`}> */}
                <Typography.Text type='success' strong>
                  {objs.find(e => e.value === detail.target)?.label ?? ''}
                </Typography.Text>
                {/* </Typography.Link> */}
              </Col>
            </Flex>
            <Row>
              <Col span={7}>
                <Descriptions title={'Phương pháp xử lý:'} />
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
                  {detail.method}
                </Flex>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </>
  );
};

export default TreatmentAddition;
