import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
  FormInstance,
  Form,
  Avatar,
  Col,
  Descriptions,
  Flex,
  Input,
  Row,
  Button
} from 'antd';
import TextArea from 'antd/es/input/TextArea';

interface IProps {
  form: FormInstance;
}

export default function AddExpertInformationForm(props: IProps) {
  const { form } = props;

  return (
    <>
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
        <Form form={form}>
          <Row
            gutter={[16, 16]}
            style={{ marginInline: '5vw', marginTop: '3vh' }}
          >
            <Col span={8}>
              {/* <FileUploadDragger
            setPath={path => console.log(path)}
            prefix='123'
          /> */}

              <Flex
                vertical
                align='center'
                justify='center'
              >
                <Avatar
                  shape='square'
                  size={300}
                />
              </Flex>
            </Col>
            <Col
              span={16}
              style={{ paddingInline: '5vw' }}
            >
              <Descriptions title='Name' />
              <Form.Item
                //label='Name'
                name='fullName'
              >
                <Input
                  type='text'
                  placeholder='Expert Name'
                />
              </Form.Item>
              <Descriptions title='Expert field' />
              <Form.Item
                //label='Name'
                name='expertField'
              >
                <Input
                  type='text'
                  placeholder='Expert field'
                />
              </Form.Item>
              <Descriptions title='Description' />
              <Form.Item
                //label='Description'
                name='description'
              >
                <TextArea
                  placeholder='Expert Description'
                  //autoSize={{ minRows: 6, maxRows: 8 }}
                  rows={4}
                  style={{ resize: 'none' }}
                  showCount
                  maxLength={500}
                />
              </Form.Item>
              <Descriptions title='External profile' />
              <Form.List name='externalProfiles'>
                {(fields, { add, remove }) => (
                  <>
                    {/* <Flex
                    vertical
                    justify='space-between'
                    style={{
                      //border: '1px solid black',
                      //borderRadius: 20,
                      padding: 20,
                      height: '35vh',
                      overflow: 'auto'
                    }}
                  > */}
                    {/* <Row style={{ paddingLeft: 90 }}>
                      <Col span={8}>
                        <Descriptions title='Name' />
                      </Col>
                      <Col span={12}>
                        <Descriptions title='Reference Link' />
                      </Col>
                    </Row> */}
                    <Flex
                      vertical
                      style={{
                        //border: '1px solid black',
                        //borderRadius: 30,
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
                        type='default'
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Click to add more
                      </Button>
                    </Form.Item>
                    {/* </Flex> */}
                  </>
                )}
              </Form.List>
            </Col>
          </Row>
        </Form>
      </Col>
    </>
  );
}
