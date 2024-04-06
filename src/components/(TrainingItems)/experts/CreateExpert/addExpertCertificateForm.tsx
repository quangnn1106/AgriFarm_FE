import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  Descriptions,
  Flex,
  Form,
  FormInstance,
  Input,
  Row,
  Typography
} from 'antd';

interface IProps {
  form: FormInstance;
}

export default function AddExpertCertificateForm(props: IProps) {
  const { form } = props;

  return (
    <>
      <Form form={form}>
        <Flex
          vertical
          align='center'
        >
          <div
            style={{
              //height: '50vh',
              marginTop: 30,
              width: '60vw'
              //marginInline: '10vw'
              //paddingInline: 20
            }}
          >
            <Descriptions title='Certificate' />

            <Form.List name='certificates'>
              {(fields, { add, remove }) => (
                <>
                  <Flex
                    vertical
                    justify='space-between'
                    style={{
                      border: '1px solid black',
                      borderRadius: 20,
                      padding: 20,
                      height: '50vh',
                      overflow: 'auto'
                    }}
                  >
                    <Row style={{ paddingLeft: 90 }}>
                      <Col span={8}>
                        <Descriptions title='Name' />
                      </Col>
                      <Col span={12}>
                        <Descriptions title='Reference Link' />
                      </Col>
                    </Row>
                    {fields.length === 0 && (
                      <Flex
                        vertical
                        align='center'
                      >
                        <Typography.Text
                          type='secondary'
                          italic
                        >
                          There no certificate to show.
                        </Typography.Text>
                      </Flex>
                    )}
                    <Flex
                      vertical
                      style={{
                        //border: '1px solid black',
                        borderRadius: 30,
                        padding: 20,
                        height: '30vh',
                        width: '100%',
                        overflow: 'auto'
                      }}
                      //align='center'
                    >
                      {fields.map(({ key, name, ...restField }) => (
                        <Flex
                          key={key}
                          style={{ width: '100%' }}
                          justify='space-between'
                          align='baseline'
                        >
                          <Col span={8}>
                            <Form.Item
                              {...restField}
                              name={[name, 'name']}
                              rules={[{ required: true, message: 'Missing first name' }]}
                            >
                              <Input placeholder='Certificate name' />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                              {...restField}
                              name={[name, 'reference']}
                              rules={[{ required: true, message: 'Missing last name' }]}
                            >
                              <Input placeholder='Link' />
                            </Form.Item>
                          </Col>
                          <Col span={2}>
                            <MinusCircleOutlined onClick={() => remove(name)} />
                          </Col>
                        </Flex>
                      ))}
                    </Flex>
                    <Form.Item
                    //style={{height:'20%'}}
                    >
                      <Button
                        type='primary'
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add field
                      </Button>
                    </Form.Item>
                  </Flex>
                </>
              )}
            </Form.List>
          </div>
        </Flex>
      </Form>
    </>
  );
}
