'use client';
import { Col, Form, Input, Modal, Row, notification } from 'antd';

import styles from '../add/add.module.scss';
import TextArea from 'antd/es/input/TextArea';
import { NotificationPlacement } from 'antd/es/notification/interface';
import LabelFormItem from '../component/LabelFormItem';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};

const AddUser = ({
  params
}: {
  params: { visible: boolean; onCancel: () => void };
}) => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
//   const useInstance = UseAxiosAuth();

//   const onFinish = (values: any) => {
//     const addUserBody: AddUser = {
//       ...values,
//       is_active: true,
//       status: 'string'
//     };
//     useInstance
//       .post('/accounts/', addUserBody)
//       .then(data => {
//         if (data.status === 201) {
//           // Assuming 201 indicates successful creation
//           openNotification('top', 'has been created successfully!', 'success');
//           params.onCancel();
//           form.resetFields();
//         } else {
//           openNotification(
//             'top',
//             'has been created failed! Please try again later',
//             'error'
//           );
//           params.onCancel();
//           form.resetFields();
//         }
//       })
//       .catch(e => {
//         console.error(e);
//       });
//   };

  const openNotification = (
    placement: NotificationPlacement,
    status: string,
    type: 'success' | 'error'
  ) => {
    api[type]({
      message: `Account ${status}`,
      placement,
      duration: 2
    });
  };

  return (
    <Modal
      open={params.visible}
      title='Add new user'
      width='80%'
      style={{ top: 40, maxWidth: 1000 }}
      keyboard
      onOk={form.submit}
      onCancel={() => {
        params.onCancel();
        //openNotification('top', 'create process have been cancel!', 'error');
      }}
    >
      {contextHolder}
      <hr style={{ border: '1px solid #eee' }}></hr>
      <Form
        {...formItemLayout}
        form={form}
        colon={false}
        scrollToFirstError
        style={{ overflowY: 'auto', maxHeight: 'calc(63vh)', marginTop: '50px' }}
      >
        <Row style={{ paddingRight: '50px' }}>
          <Col span={24}>
            <Form.Item
              name='firstName'
              label={<LabelFormItem name='First Name' />}
              rules={[
                {
                  required: true,
                  message: 'Please input First Name!'
                }
              ]}
            >
              <Input className={styles.bigblue} />
            </Form.Item>

            <Form.Item
              name='lastName'
              label={<LabelFormItem name='Last Name' />}
              rules={[
                {
                    required: true,
                  message: 'Please input Last Name!'
                }
              ]}
            >
              <Input className={styles.bigblue} />
            </Form.Item>
            <Form.Item
              name='userName'
              label={<LabelFormItem name='User Name' />}
              rules={[
                {
                    required: true,
                  message: 'Please input User Name!'
                }
              ]}
            >
              <Input className={styles.bigblue} />
            </Form.Item>

            <Form.Item
              name='password'
              label={<LabelFormItem name='Password' />}
              rules={[{ required: true, message: 'Password is required' }]}
            >
              <Input.Password />
            </Form.Item>


            <Form.Item
              name='confirmPassword'
              label={<LabelFormItem name='Confirm Password' />}
              rules={[{ required: true, message: 'Confirm Password is required' }]}
            >
              <Input.Password />
            </Form.Item>

          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
export default AddUser;
