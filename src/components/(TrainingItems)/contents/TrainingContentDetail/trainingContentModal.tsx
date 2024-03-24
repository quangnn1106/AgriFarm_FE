import { TrainingContent } from '@/services/Admin/Training/response/training.response';
import { Col, Flex, Layout, Modal, Row, Space } from 'antd';
import TrainingContentDetail from './trainingContentDetail';

interface IProps {
  detail: TrainingContent;
  onClose: () => void
}

export default function TrainingContentModal(props: IProps) {
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
        <TrainingContentDetail
          detail={detail}
          
        />
        
      </Modal>
    </>
  );
}
