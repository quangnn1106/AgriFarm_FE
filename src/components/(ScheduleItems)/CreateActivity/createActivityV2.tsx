import { postActivitiesService } from '@/services/Admin/Activities/activityService';
import UseAxiosAuth from '@/utils/axiosClient';
import {
  CloseCircleTwoTone,
  CloseOutlined,
  ExpandAltOutlined,
  MinusCircleOutlined,
  MinusCircleTwoTone,
  PlusOutlined,
  SwapOutlined
} from '@ant-design/icons';
import {
  Avatar,
  Button,
  Col,
  DatePicker,
  Descriptions,
  Divider,
  Flex,
  Form,
  Input,
  message,
  Modal,
  Row,
  Space,
  Typography
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
import { useState } from 'react';
import ActivityLocationFinderModal from '../ActivityLocation/activityLocationFinderModal';
import {
  ActivityLocation,
  ActivityResponse
} from '@/services/Admin/Activities/Payload/response/activityResponse';
import { CreateActivityRequest } from '@/services/Admin/Activities/Payload/request/activityRequest';
import { useRouter } from '@/navigation';

export default function CreateActivityV2() {
  const http = UseAxiosAuth();
  const [infoForm] = Form.useForm();
  const farmRouter = useRouter();
  const { RangePicker } = DatePicker;
  const [isLoading, setIsLoading] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<ActivityLocation | null>(null);

  const handleInfoSubmit = () => {
    const data = infoForm.getFieldsValue() as CreateActivityRequest;
    data.locationId = selectedLocation?.id;

    setIsLoading(true);
    postActivitiesService(http, data)
      .then(rs => {
        if (rs && rs.data) {
          console.log('data: ', rs.data);
          const body = rs.data as ActivityResponse;
          console.log(body);
          message.success('Create success');
          farmRouter.push('/activities/' + body.id);
        }
      })
      .catch(e => {
        message.error('Invalid information. Try again!');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const descriptionListInput = (
    <>
      <Form.List
        name='descriptions'
        rules={[
          {
            validator: async (_, descriptions) => {
              if (descriptions && (descriptions.length > 5 || descriptions.length < 0)) {
                return Promise.reject(new Error('1 - 5 description items can add.'));
              }
            }
          }
        ]}
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            <Flex
              justify='flex-start'
              align='baseline'
            >
              <Col span={4}>
                <Descriptions title={'Description'} />
              </Col>
              <Col span={4}>
                <Button
                  type='primary'
                  disabled={fields.length >= 5}
                  onClick={() => add()}
                  //style={{ width: '60%' }}
                  icon={<PlusOutlined />}
                >
                  Add
                </Button>
              </Col>
            </Flex>
            <Flex
              style={{
                height: '30vh',
                minHeight: 300,
                border: '1px solid',
                borderRadius: 10,
                padding: 10
              }}
            >
              <Flex
                vertical
                gap={10}
                align='center'
                style={{
                  height: '100%',
                  width: '100%',
                  overflow: 'auto'
                }}
              >
                {fields.length === 0 && (
                  <Flex
                    vertical
                    align='center'
                    justify='center'
                    style={{
                      width: '100%',
                      height: '100%'
                    }}
                  >
                    <Typography.Text type='secondary'>
                      Click {'"Add"'} to add more
                    </Typography.Text>
                  </Flex>
                )}
                {fields.map((field, index) => (
                  <>
                    <Flex
                      vertical
                      align='center'
                      justify='start'
                      //gutter={[16, 16]}
                      style={{
                        width: '70%',
                        height: '100%',
                        minHeight: 230,
                        border: '1px solid',
                        borderRadius: 10,
                        padding: 20
                      }}
                    >
                      <Flex
                        style={{
                          width: '100%',
                          height: '100%'
                        }}
                        vertical
                        gap={10}
                      >
                        <Flex
                          align='end'
                          justify='end'
                          style={{
                            width: '100%'
                          }}
                        >
                          <CloseCircleTwoTone
                            twoToneColor={'#f44336'}
                            className='dynamic-delete-button'
                            onClick={() => remove(field.name)}
                          />
                        </Flex>
                        <Row>
                          <Col
                            offset={2}
                            span={20}
                          >
                            <Form.Item
                              name={[field.name, 'name']}
                              validateTrigger={['onChange', 'onBlur']}
                              rules={[
                                {
                                  required: true,
                                  whitespace: true,
                                  message:
                                    'Please input descriptions title or delete this field.'
                                }
                              ]}
                              noStyle
                            >
                              <Input placeholder='Title' />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row>
                          <Col
                            offset={2}
                            span={20}
                          >
                            <Form.Item
                              name={[field.name, 'value']}
                              validateTrigger={['onChange', 'onBlur']}
                              rules={[
                                {
                                  required: true,
                                  whitespace: true,
                                  message:
                                    'Please input descriptions value or delete this field.'
                                }
                              ]}
                              noStyle
                            >
                              <TextArea
                                placeholder={'Content here'}
                                rows={4}
                                maxLength={500}
                                showCount
                                style={{ resize: 'none' }}
                              ></TextArea>
                            </Form.Item>
                            <Form.Item>
                              <Form.ErrorList errors={errors} />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Flex>
                    </Flex>
                  </>
                ))}
              </Flex>
            </Flex>
          </>
        )}
      </Form.List>
    </>
  );

  const infoSection = (
    <>
      <Descriptions title={'Title'} />
      <Form form={infoForm}>
        <Form.Item
          name='title'
          rules={[{ required: true, message: 'Please input name for title!' }]}
        >
          <Col span={12}>
            <Input
              type='text'
              placeholder={'Activity name'}
            />
          </Col>
        </Form.Item>
        <Descriptions title={'Start to End'} />
        <Form.Item
          name='duration'
          rules={[{ required: true, message: 'Please input duration time!' }]}
        >
          <RangePicker
            format='DD-MM-YYYY HH:mm'
            showTime={{
              hideDisabledOptions: true,
              format: 'HH:mm',
              defaultValue: [dayjs('09:00', 'HH:mm'), dayjs('10:00', 'HH:mm')]
            }}
          />
        </Form.Item>
        <Form.Item
          name='notes'
          rules={[{ required: true, message: 'Please input duration time!' }]}
        >
          {descriptionListInput}
        </Form.Item>
        {/* <Form.Item
          noStyle
          shouldUpdate
        >
          {() => (
            <Typography>
              <pre>{JSON.stringify(infoForm.getFieldsValue())}</pre>
            </Typography>
          )}
        </Form.Item> */}
      </Form>
    </>
  );

  const locationSection = (
    <>
      <Row
        gutter={16}
        style={{
          width: '100%',
          height: '100%',
          paddingBottom: 20
        }}
      >
        <Col
          offset={2}
          span={14}
        >
          <Flex
            vertical
            style={{
              width: '100%',
              height: '100%',
              minHeight: 200,
              border: '1px dashed',
              borderRadius: 20
            }}
            align='center'
            justify='center'
          >
            {!selectedLocation ? (
              <Flex
                vertical
                gap={5}
              >
                <Button
                  onClick={() => setLocationOpen(true)}
                  type='dashed'
                >
                  Click here
                </Button>
                <Typography.Text type='secondary'>to add a location.</Typography.Text>
              </Flex>
            ) : (
              <Flex
                align='center'
                justify='space-around'
                style={{
                  width: '80%',
                  height: '80%'
                  // border: '1px dashed',
                  // borderRadius: 20
                }}
              >
                <Avatar
                  size={200}
                  shape='square'
                />
                <p>{selectedLocation.name}</p>
              </Flex>
            )}
          </Flex>
        </Col>
        <Col span={6}>
          <Flex
            gap={10}
            style={{ height: '100%', paddingBlock: 20 }}
            justify='space-between'
            vertical
          >
            <Space direction='vertical'>
              <Button
                block
                disabled={!selectedLocation}
                onClick={() => setSelectedLocation(null)}
              >
                <CloseOutlined style={{ color: 'red' }} />
                Clear Location
              </Button>
              <Button
                block
                onClick={() => setLocationOpen(true)}
                disabled={!selectedLocation}
              >
                <SwapOutlined style={{ color: '#1480e0' }} />
                Change Other
              </Button>
            </Space>

            <Button
              disabled
              type='primary'
            >
              <ExpandAltOutlined />
              Preview Land
            </Button>
          </Flex>
        </Col>
      </Row>
    </>
  );

  return (
    <>
      <Divider orientation='left'>
        <Typography.Title level={3}>Create new farm activity</Typography.Title>
      </Divider>
      <Flex
        vertical
        gap={10}
        style={{
          width: '60vw',

          minHeight: 800,
          //border: '1px solid',
          marginBlockStart: '5vw',
          marginInlineStart: '5vw'
        }}
        align='center'
        justify='flex-start'
      >
        <Flex
          vertical
          align='center'
          style={{
            width: '100%',
            minHeight: 650,
            height: '70vh',
            border: '1px solid',
            borderRadius: 10,
            padding: 20
          }}
        >
          <Descriptions title={'Activity Information'} />
          <Col
            offset={1}
            span={22}
          >
            {infoSection}
          </Col>
        </Flex>
        <Flex
          vertical
          align='center'
          justify='center'
          style={{
            width: '100%',
            height: '30vh',
            minHeight: 400,
            border: '1px solid',
            borderRadius: 10,
            padding: 20
          }}
        >
          <Descriptions title={'Work Location'} />

          {locationSection}
        </Flex>
        <Flex
          style={{
            width: '100%',
            marginBlock: '5vh',
            marginInlineEnd: '3vw'
          }}
          align='end'
          justify='end'
          gap={10}
        >
          <Button onClick={() => farmRouter.back()}>Back to list</Button>
          <Button
            type='primary'
            onClick={() => handleInfoSubmit()}
          >
            Create
          </Button>
        </Flex>
      </Flex>
      {locationOpen && (
        <ActivityLocationFinderModal
          onSelected={data => {
            setSelectedLocation(data);
            setLocationOpen(false);
          }}
          onClose={() => setLocationOpen(false)}
        />
      )}
    </>
  );
}
