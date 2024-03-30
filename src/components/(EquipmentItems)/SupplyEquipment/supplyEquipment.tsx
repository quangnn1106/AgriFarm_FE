import { EquipmentResponse } from '@/services/Admin/Equipments/Payload/response/equipmentResponses';
import { Button, Flex, message, Modal } from 'antd';
import SupplyEquipmentForm from '../CreateEquipment/supplyEquipmentForm';
import { useForm } from 'antd/es/form/Form';
import { SupplyEquipmentRequest } from '@/services/Admin/Equipments/Payload/request/equipmentRequests';
import { supplyEquipmentsService } from '@/services/Admin/Equipments/equipmentsService';
import UseAxiosAuth from '@/utils/axiosClient';

interface IProps {
  item: EquipmentResponse;
  onClose: () => void;
}

export default function SupplyEquipmentModal(props: IProps) {
  const { item, onClose } = props;
  const [supplyForm] = useForm();
  const http = UseAxiosAuth();

  const handleSubmit = () => {
    const data = supplyForm.getFieldsValue() as SupplyEquipmentRequest;
    //console.log('Send id: ' + item.id + ' supply detail: ' + data);
    supplyEquipmentsService(http, item.id, data).then(rs => {
      if (rs.status === 200) {
        message.success(`Supply success`);
        onClose();
      } else {
        message.error(`Invalid information. Please try again.`);
      }
    });
  };

  return (
    <Modal
      open={true}
      onCancel={() => onClose()}
      title={'Supply for item ' + item.name}
      style={{ padding: 40 }}
      width={'40vw'}
      footer={(_, { OkBtn, CancelBtn }) => (
        <>
          <CancelBtn />
          <Button onClick={() => handleSubmit()}>Supply</Button>
        </>
      )}
    >
      <div style={{ margin: 20 }}>
        <SupplyEquipmentForm form={supplyForm} />
      </div>
    </Modal>
  );
}
