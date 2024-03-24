import { TrainingContent } from '@/services/Admin/Training/response/training.response';
import { Col, Flex, Layout, Modal, Row, Space } from 'antd';

interface IProps {
  detail: TrainingContent;
  
}

export default function TrainingContentDetail(props: IProps) {
  const { detail } = props;

  return (
    <>
      <Layout style={{ height: '50vh' }}>
        <h3>Title: {detail.title}</h3>
        <Col>
          <Row>
            <div>Content:</div>
          </Row>
          <Row>
            <Space>
              {'  '}
              {detail.content ?? 'none'}
            </Space>
          </Row>
        </Col>
        <Col>
          <Row>
            <div>References:</div>
          </Row>
          <Row>
            <Space>
              {'  '}
              {detail.refer ?? 'none'}
            </Space>
          </Row>
        </Col>
      </Layout>
    </>
  );
}
