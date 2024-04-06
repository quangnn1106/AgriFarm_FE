'use client';

import FileUploadDragger from '@/components/(ImageItem)/fileUploadDragger';
import { useRouter } from '@/navigation';
import UseAxiosAuth from '@/utils/axiosClient';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Col,
  Descriptions,
  Divider,
  Flex,
  Form,
  Input,
  message,
  Modal,
  Result,
  Row,
  Space,
  Steps,
  Typography
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';
import AddExpertInformationForm from './addExpertForm';
import AddExpertCertificateForm from './addExpertCertificateForm';
import { postExpertService } from '@/services/Admin/Training/expertService';

interface IProps {
  //onClose?: () => void;
}

const steps = [
  {
    title: 'Information',
    content: 'First add new expert profile'
  },
  {
    title: 'Certificate',
    content: 'Add certificates for this expert'
  },
  {
    title: 'Complete',
    content: 'Congratulation! You have added new expert profile'
  }
];

export default function AddExpert(props: IProps) {
  //const { onClose } = props;

  const http = UseAxiosAuth();
  const farmRouter = useRouter();
  const [current, setCurrent] = useState(0);
  const [createForm] = useForm();
  const [certForm] = useForm();
  const [currentId, setCurrentId] = useState<string | null>(null);
  const items = steps.map(item => ({ key: item.title, title: item.title }));

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleInforSubmit = () => {
    const data = createForm.getFieldsValue();
    console.log('Send data: ', data);
    postExpertService(http, data)
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

  const handleCertificateSubmit = () => {
    const data = certForm.getFieldsValue();
    console.log('Send data: ', data);

    next();
  };

  const renderFormSection = () => {
    return (
      <>
        {current === 0 && <AddExpertInformationForm form={createForm} />}
        {current === 1 && <AddExpertCertificateForm form={certForm} />}
      </>
    );
  };

  return (
    <>
      <Divider orientation='left'>
        <Typography.Title level={3}>Add New Expert Profile</Typography.Title>
      </Divider>
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
          renderFormSection()
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
                <>
                  <Button
                    type='default'
                    style={{ marginInline: 10 }}
                    onClick={() => next()}
                    disabled={!(current < steps.length - 1)}
                  >
                    Skip
                  </Button>
                  <Button
                    type='primary'
                    style={{ marginInline: 10 }}
                    onClick={() => handleCertificateSubmit()}
                    disabled={!(current < steps.length - 1)}
                  >
                    Add
                  </Button>
                </>
              )}
              {current === 0 && (
                <Button
                  type='primary'
                  onClick={() => handleInforSubmit()}
                  disabled={!(current < steps.length - 1)}
                >
                  Add
                </Button>
              )}
            </div>
          </Flex>
        </Divider>
      </Flex>
    </>
  );
}

{
  /* <Flex
        style={{ width: '100%', minHeight: '80vh' }}
        vertical
        justify='space-between'
      >
        <Form
          //layout='vertical'
          style={{
            width: '100%'
            //minHeight:'100vh'
          }}
          form={form}
        >
          {renderInformationSection()}
          {renderCertificationSection()}
          <Form.Item
            noStyle
            shouldUpdate
          >
            {() => (
              <Typography>
                <pre>{JSON.stringify(form.getFieldsValue())}</pre>
              </Typography>
            )}
          </Form.Item>
        </Form>
        <Flex
          justify='end'
          align='center'
          style={{ width: '100%', paddingRight: '20vw', marginTop: 30 }}
        >
          <Row gutter={16}>
            <Col>
              <Button onClick={() => farmRouter.back()}>Back to list</Button>
            </Col>
            <Col>
              <Button
                type='primary'
                onClick={() => handleSubmit()}
              >
                Save
              </Button>
            </Col>
          </Row>
        </Flex>
      </Flex> */
}
