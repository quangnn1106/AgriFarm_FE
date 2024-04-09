import {
  Button,
  Card,
  Col,
  Divider,
  Flex,
  Form,
  Input,
  message,
  Result,
  Row,
  Space,
  Steps,
  Typography
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useState } from 'react';
import CreateEquipmentForm from './createEquipmentForm';
import SupplyEquipmentForm from './supplyEquipmentForm';
import {
  CreateEquipmentRequest,
  SupplyEquipmentRequest
} from '@/services/Admin/Equipments/Payload/request/equipmentRequests';
import UseAxiosAuth from '@/utils/axiosClient';
import {
  postEquipmentsService,
  supplyEquipmentsService
} from '@/services/Admin/Equipments/equipmentsService';
import * as equipmentResponses from '@/services/Admin/Equipments/Payload/response/equipmentResponses';
import HttpResponseCommon from '@/types/response';
import { useRouter } from '@/navigation';
import { EquipmentResponse } from '@/services/Admin/Equipments/Payload/response/equipmentResponses';

interface IProps {}

const steps = [
  {
    title: 'Add',
    content: 'First make your new equipment profile'
  },
  {
    title: 'Supply',
    content: 'Add quantity for this equipment'
  },
  {
    title: 'Complete',
    content: 'Congratulation! You have added new equipment profile'
  }
];

export default function CreateEquipment(props: IProps) {
  const [current, setCurrent] = useState(0);
  const [createForm] = useForm();
  const [supplyForm] = useForm();
  const http = UseAxiosAuth();
  const [currentId, setCurrentId] = useState<string | null>(null);
  const farmRouter = useRouter();

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map(item => ({ key: item.title, title: item.title }));

  const handleCreate = () => {
    const data = createForm.getFieldsValue() as CreateEquipmentRequest;
    //let rs: HttpResponseCommon<EquipmentResponse> | null = null;

    postEquipmentsService(http, data)
      .then(rs => {
        console.log("Cur id: ", (rs.data as any).data.id)
        if (rs.status === 201) {
          message.success('Create success!');
          setCurrentId((rs.data as any).data.id);
          next();
        } else throw new Error('invalid data');
      })
      .catch(e => {
        console.log('Error: ', e);
        message.error('Invalid! Please check your form information again.');
      });
  };

  const handleSupply = () => {
    const data = supplyForm.getFieldsValue() as SupplyEquipmentRequest;
    let rs: HttpResponseCommon<equipmentResponses.EquipmentResponse> | null = null;
    console.log("Cur id: ", currentId)
    supplyEquipmentsService(http, currentId ?? '', data)
      .then(rs => {
        console.log("Res: ",rs)
        if (rs.status === 200) {
          message.success('Supply success!');
          //setCurrentId((rs.data as equipmentResponses.EquipmentResponse).id);
          next();
        } else throw new Error('invalid data');
      })
      .catch(e => {
        console.log('Error: ', e);
        message.error('Invalid! Please check your form information again.');
      });
  };

  const handleComplete = () => {};

  const renderFormSection = () => {
    return (
      <>
        {current === 0 && <CreateEquipmentForm form={createForm} />}
        {current === 1 && <SupplyEquipmentForm form={supplyForm} />}
      </>
    );
  };

  return (
    <>
      <Flex
        vertical
        justify='center'
        align='center'
      >
        <Row>
          <Steps
            style={{ margin: 40, maxWidth: '40vw' }}
            current={current}
            items={items}
          />
        </Row>

        <Divider>
          <Typography.Text style={{ height: 50 }}>
            {steps[current].content}
          </Typography.Text>
        </Divider>
        {current !== 2 ? (
          <Col
            style={{
              margin: 50,
              border: '1px solid black',
              padding: 20,
              width: '80%',
              minHeight: 400,
              borderRadius: 20
            }}
            //justify='center'
          >
            {renderFormSection()}
          </Col>
        ) : (
          <Flex
            vertical
            justify='center'
            align='center'
            style={{
              margin: 50,

              padding: 20,
              width: '80%',
              minHeight: 400
            }}
            //justify='center'
          >
            <Result
              status='success'
              title='Successfully!'
              subTitle='Click "Back to list" to return list page.'
              
            />
          </Flex>
        )}
        <Divider orientation='right'>
          <Flex
            vertical
            align='center'
            style={{
              width: '100%'
              //marginTop: 24
              //paddingInline:'10vw'
            }}
          >
            <div>
              <Button
                style={{ margin: '0 8px' }}
                onClick={() => farmRouter.back()}
                //disabled={!(current > 0)}
              >
                Back to list
              </Button>

              {/* {current === 2 && (
                <Button
                  type='primary'
                  onClick={() => message.success('Processing complete!')}
                >
                  Done
                </Button>
              )} */}
              {current === 1 && (
                <Button
                  type='primary'
                  onClick={() => handleSupply()}
                  disabled={!(current < steps.length - 1)}
                >
                  Supply
                </Button>
              )}
              {current === 0 && (
                <Button
                  type='primary'
                  onClick={() => handleCreate()}
                  disabled={!(current < steps.length - 1)}
                >
                  Create
                </Button>
              )}
            </div>
          </Flex>
        </Divider>
      </Flex>
    </>
  );
}
