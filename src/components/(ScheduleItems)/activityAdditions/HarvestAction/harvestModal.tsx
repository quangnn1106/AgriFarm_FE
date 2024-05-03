import { harvestProductService } from '@/services/Admin/Activities/activitySubService';
import UseAxiosAuth from '@/utils/axiosClient';
import { Col, Descriptions, Flex, Form, Input, Modal, Space } from 'antd';
import { useForm } from 'antd/es/form/Form';

interface IProps {
  activityId: string;
    productionId: string
  onCancel: () => void;
  onSubmit: (data: HarvestProductRequest) => void;
}

export default function HarvestModal(props: IProps) {
  const { onCancel, onSubmit, activityId, productionId } = props;
  const [form] = useForm();
  const http = UseAxiosAuth()

  const handleHarvest = () => {
    form.validateFields();
    const data = form.getFieldsValue() as HarvestProductRequest;
    data.activityId = activityId
    data.unit = "kg"
    console.log("Request: ",data)
    harvestProductService(http, productionId, data)
    .then(res=>{
        if(res){
            onSubmit(data)
        }
    })
    .catch(err=>{})
    .finally(()=>{
        onCancel()
    })
  };

  return (
    <>
      <Modal
        open
        centered
        title={'Hãy nhập số lượng thu hoạch'}
        width={400}
        onCancel={() => onCancel()}
        onOk={() => handleHarvest()}
        okText={'Thu hoạch'}
        cancelText={'Hủy bỏ'}
      >
        <Flex>
          <Form form={form}>
            {/* <Descriptions title='Quantity'></Descriptions> */}
            <Flex gap={10}>
              <Col span={16}>
                <Form.Item name='output'>
                  <Input
                    type='number'
                    placeholder='Số lượng'
                  />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item name='unit'>
                  <Input
                    type='text'
                    disabled
                    defaultValue={'kg'}
                    value={'kg'}
                  />
                </Form.Item>
              </Col>
            </Flex>
          </Form>
        </Flex>
      </Modal>
    </>
  );
}
