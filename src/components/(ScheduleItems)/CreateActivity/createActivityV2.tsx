import { postActivitiesService } from '@/services/Admin/Activities/activityService';
import UseAxiosAuth from '@/utils/axiosClient';
import {
  CloseCircleTwoTone,
  CloseOutlined,
  ExpandAltOutlined,
  HomeOutlined,
  MinusCircleOutlined,
  MinusCircleTwoTone,
  PlusOutlined,
  SwapOutlined
} from '@ant-design/icons';
import {
  Avatar,
  Breadcrumb,
  Button,
  Col,
  ConfigProvider,
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
import { useSession } from 'next-auth/react';
import { Content } from 'antd/es/layout/layout';

export default function CreateActivityV2() {
  const http = UseAxiosAuth();
  const [infoForm] = Form.useForm();
  const farmRouter = useRouter();
  const { data: session } = useSession();
  const siteId = session?.user.userInfo.siteId;
  const siteName = session?.user.userInfo.siteName;
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
          message.success('Tạo thành công');
          farmRouter.push('/activities/' + body.id);
        }
      })
      .catch(e => {
        message.error('Có lỗi xảy ra!');
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
              if (descriptions && (descriptions.length > 1 || descriptions.length < 0)) {
                return Promise.reject(new Error('1 description items can add.'));
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
                <Descriptions title={'Thông tin thêm'} />
              </Col>
              <Col span={4}>
                <Button
                  type='primary'
                  disabled={fields.length >= 5}
                  onClick={() => add()}
                  //style={{ width: '60%' }}
                  icon={<PlusOutlined />}
                >
                  Thêm
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
                      Hãy nhập thêm
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
                                    'Hãy nhập thông tin!'
                                }
                              ]}
                              noStyle
                            >
                              <Input placeholder='Tiêu đề' />
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
                                    'Hãy nhập nội dung!'
                                }
                              ]}
                              noStyle
                            >
                              <TextArea
                                placeholder={'Nội dung'}
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
      <Descriptions title={'Tiêu đề'} />
      <Form form={infoForm}>
        <Form.Item
          name='title'
          rules={[{ required: true, message: 'Hãy nhập tiêu đề!' }]}
        >
          <Col span={12}>
            <Input
              type='text'
              placeholder={'Tên hoạt động'}
            />
          </Col>
        </Form.Item>
        <Descriptions title={'Bắt đầu và kết thúc'} />
        <Form.Item
          name='duration'
          rules={[{ required: true, message: 'Hãy nhập đúng thời gian!' }]}
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
          // rules={[{ required: true, message: 'Please input duration time!' }]}
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
                  Nhấn vào đây
                </Button>
                <Typography.Text type='secondary'>để thêm vị trí làm việc.</Typography.Text>
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
                loading={isLoading}
                disabled={!selectedLocation}
                onClick={() => setSelectedLocation(null)}
              >
                <CloseOutlined style={{ color: 'red' }} />
                Xóa
              </Button>
              {/* <Button
                block
                loading={isLoading}
                onClick={() => setLocationOpen(true)}
                disabled={!selectedLocation}
              >
                <SwapOutlined style={{ color: '#1480e0' }} />
                Change Other
              </Button> */}
            </Space>

            {/* <Button
              loading={isLoading}
              disabled
              type='primary'
            >
              <ExpandAltOutlined />
              Preview Land
            </Button> */}
          </Flex>
        </Col>
      </Row>
    </>
  );

  return (
    <>
    <Content style={{ padding: '20px 0px' }}>
        <ConfigProvider
          theme={{
            components: {
              Button: {
                contentFontSizeLG: 24,
                fontWeight: 700,
                groupBorderColor: 'transparent',
                onlyIconSizeLG: 24,
                paddingBlockLG: 0,
                defaultBorderColor: 'transparent',
                defaultBg: 'transparent',
                defaultShadow: 'none',
                primaryShadow: 'none',
                linkHoverBg: 'transparent',
                paddingInlineLG: 24,
                defaultGhostBorderColor: 'transparent'
              }
            }
          }}
        >
          {' '}
          <Button
            //className={cx('home-btn')}
            href='#'
            size={'large'}
          >
            <HomeOutlined style={{ color: 'green' }} />
            {siteName}
          </Button>
        </ConfigProvider>
        <Breadcrumb style={{ margin: '0px 24px' }}>
          <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
          <Breadcrumb.Item>Quản lý hoạt động</Breadcrumb.Item>
        </Breadcrumb>
      <Divider orientation='left'>
        <Typography.Title level={3}>Thêm hoạt động mới</Typography.Title>
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
          <Descriptions title={'Thông tin chính'} />
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
          <Descriptions title={'Vị trí thực hiện'} />

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
          <Button loading={isLoading} onClick={() => farmRouter.back()}>Quay lại</Button>
          <Button
            loading={isLoading}
            type='primary'
            onClick={() => handleInfoSubmit()}
          >
            Tạo
          </Button>
        </Flex>
      </Flex>
      </Content>
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
