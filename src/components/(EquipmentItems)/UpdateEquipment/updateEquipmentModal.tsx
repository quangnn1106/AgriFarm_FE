import { updateEquipmentsService } from '@/services/Admin/Equipments/equipmentsService';
import { UpdateEquipmentRequest } from '@/services/Admin/Equipments/Payload/request/equipmentRequests';
import { EquipmentResponse } from '@/services/Admin/Equipments/Payload/response/equipmentResponses';
import UseAxiosAuth from '@/utils/axiosClient';
import { Button, Flex, Form, Input, message, Modal } from 'antd';
import { useForm } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';

interface IProps {
  item: EquipmentResponse;
  onClose: () => void;
}

export default function UpdateEquipmentModal(props: IProps) {
  const { item, onClose } = props;
  const [form] = useForm();
  const http = UseAxiosAuth();

  const handleSubmit = () => {
    const data = form.getFieldsValue() as UpdateEquipmentRequest;
    data.name = data.name??item.name
    data.description = data.description??item.description
    data.notes = data.notes??item.notes
    //console.log(">data: ",data)

    updateEquipmentsService(http, item.id, data).then(rs => {
      if (rs) {
        message.success(`${'Update Success'}`);
        onClose();
      } else message.error(`${'Invalid information. Please try again!'}`);
    });
  };

  return (
    <>
      <Modal
        width={'50vw'}
        //style={{padding:40}}
        centered
        open={true}
        onCancel={onClose}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            <Button type='primary' onClick={()=>handleSubmit()}>Save</Button>
          </>
        )}
      >
        <Form
          style={{ margin: 30 }}
          form={form}
        >
          <Flex
            vertical
            justify='start'
            //align='center'
            style={{ width: '100%' }}
          >
            <Form.Item
              label={'Name'}
              name='name'
            >
              <Input type='text' defaultValue={item.name}/>
            </Form.Item>
            <Form.Item
              label={'Description'}
              name='description'
            >
              <TextArea
                defaultValue={item.description}
                rows={4}
                maxLength={3000}
                showCount
                style={{ height: 120, resize: 'none' }}
              ></TextArea>
            </Form.Item>
            <Form.Item
              label={'Notes'}
              name='notes'
            >
              <TextArea
                defaultValue={item.notes}
                rows={4}
                maxLength={3000}
                showCount
                style={{ height: 120, resize: 'none' }}
              ></TextArea>
            </Form.Item>
          </Flex>
        </Form>
      </Modal>
    </>
  );
}
