import { CloseOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Card,
  Col,
  Flex,
  Form,
  FormInstance,
  Input,
  Row,
  Select,
  Space,
  Typography
} from 'antd';
import TextArea from 'antd/es/input/TextArea';

interface IProps {
  form: FormInstance;
}

export default function CreateEquipmentForm(props: IProps) {
  const { form } = props;

  return (
    <>
      <Form form={form}>
        <Flex
          vertical
          //justify='flex-start'
          align='center'

          //style={{width:'100%'}}
        >
          <Flex
            align='center'
            justify='center'
            style={{ width: '100%', margin: 40 }}
            //gutter={16}
            //justify='space-between'
          >
            <Col span={8}>
              <Flex
                vertical
                align='start'
              >
                <Avatar
                  shape='square'
                  size={300}
                />
              </Flex>
            </Col>

            <Col span={12}>
              <Flex vertical>
                <Form.Item
                  label='Name'
                  name='name'
                >
                  <Input type='text' />
                </Form.Item>
                <Form.Item
                  label='Default Unit'
                  name='defaultUnit'
                >
                  <Select
                    defaultValue={'item'}
                    disabled
                  >
                    <Select.Option value='item'>item</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label='Description'
                  name='description'
                >
                  <TextArea
                    rows={6}
                    maxLength={3000}
                    showCount
                    style={{ height: 180, resize: 'none' }}
                  ></TextArea>
                </Form.Item>
              </Flex>
            </Col>
          </Flex>
          <Flex
            vertical
            style={{ width: '100%', paddingInline:60 }}
          >
            <Form.Item
              label='Notes'
              name='notes'
            >
              <TextArea
                rows={4}
                maxLength={3000}
                showCount
                style={{ height: 120, resize: 'none' }}
              ></TextArea>
            </Form.Item>
          </Flex>
        </Flex>

        {/* <Flex>
          <Form.Item>
            <Form.List name='properties'>
              {(fields, { add, remove }) => (
                <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
                  {fields.map(field => (
                    <Card
                      size='small'
                      title={`Item ${field.name + 1}`}
                      key={field.key}
                      extra={
                        <CloseOutlined
                          onClick={() => {
                            remove(field.name);
                          }}
                        />
                      }
                    >
                      
                    </Card>
                  ))}

                  <Button
                    type='dashed'
                    onClick={() => add()}
                    block
                  >
                    + Add Item
                  </Button>
                </div>
              )}
            </Form.List>
          </Form.Item>
        </Flex> */}

        <Form.Item
          noStyle
          shouldUpdate
        >
          {/* {() => (
            <Typography>
              <pre>{JSON.stringify(form.getFieldsValue())}</pre>
            </Typography>
          )} */}
        </Form.Item>
      </Form>
    </>
  );
}
