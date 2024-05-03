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
                  size={400}
                  src={'https://cdn.vectorstock.com/i/preview-1x/77/22/farmer-avatar-icon-vector-32077722.jpg'}
                />
              </Flex>
            </Col>
            <Col
              span={16}
              style={{ paddingInline: '5vw' }}
            >
              <Descriptions title='Tên' />
              <Form.Item
                //label='Name'
                name='fullName'
                rules={[{ required: true, message: "Hãy nhập tên" }]}
              >
                <Input
                  type='text'
                  placeholder='Tên chuyên gia'
                />
              </Form.Item>
              <Descriptions title='Lĩnh vực chuyên môn' />
              <Form.Item
                //label='Name'
                rules={[{ required: true, message: "Hãy nhập lĩnh vực" }]}
                name='expertField'
              >
                <Input
                  type='text'
                  placeholder='Hãy nhập lĩnh vực'
                />
              </Form.Item>
              <Descriptions title='Mô tả' />
              <Form.Item
                //label='Description'
                rules={[{ required: true, message: "Hãy nhập mô tả" }]}
                name='description'
              >
                <TextArea
                  placeholder='Hãy nhập mô tả'
                  //autoSize={{ minRows: 6, maxRows: 8 }}
                  rows={4}
                  style={{ resize: 'none' }}
                  showCount
                  maxLength={500}
                />
              </Form.Item>
              
            </Col>
          </Row>
        </Form>
      </Col>
    </>
  );
}
{/* <Descriptions title='Liên kết hồ sơ ngoài' />
              <Form.List name='externalProfiles'>
                {(fields, { add, remove }) => ( */
              // }
                // <>
                // {
                  /* <Flex
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
                {/* <Flex
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
                          rules={[{ required: true, message: 'Hãy nhập tên' }]}
                        >
                          <Input placeholder='Tên hồ sơ' />
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
                    type='default'
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Thêm
                  </Button>
                </Form.Item> */}
                {/* </Flex> */}
              {/* </> */}
            {/* )} */}
          {/* </Form.List> */}