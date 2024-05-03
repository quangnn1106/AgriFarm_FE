import { Expert } from '@/services/Admin/Training/response/training.response';
import { Col, Flex, Layout, Modal, Row, Space } from 'antd';

interface IProps {
  detail: Expert;
  onClose: () => void
}

export default function ExpertDetail(props: IProps) {
  const { detail, onClose } = props;

  return (
    <>
      <Modal
        title="Detail"
        open={true}
        onOk={()=>console.log("Go")}
        onCancel={() => onClose()}
        maskClosable={false}
        
        width={"30vw"}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn/>
            <OkBtn/>
          </>
        )}
      >
        <Layout
          style={{height: '50vh', overflow:'auto'}}
          
        >
        <h3>Title: {detail.fullName}</h3>
        <Col>
          <Row><div>Field:</div></Row>
          <Row><Space>{"  "}{detail.expertField??"none"}</Space></Row>
        </Col>
        <Col>
          <Row><div>Description:</div></Row>
          <Row><Space>{"  "}{detail.description??"none"}</Space></Row>
        </Col>
        </Layout>
        
      </Modal>
    </>
  );
}
