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
            <Descriptions title='Chứng nhận' />

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
                      <Col offset={2} span={8}>
                        <Descriptions title='Tên' />
                      </Col>
                      <Col offset={4} span={8}>
                        <Descriptions title='Liên kết' />
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
                          Chưa có chứng nhận để hiển thị
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
                              rules={[{ required: true, message: 'Hãy nhập tên' }]}
                            >
                              <Input placeholder='Tên chứng nhận' />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                              {...restField}
                              name={[name, 'reference']}
                              rules={[{ required: true, message: 'Hãy nhập liên kết' }]}
                            >
                              <Input placeholder='Liên kết' />
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
                        Thêm
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
