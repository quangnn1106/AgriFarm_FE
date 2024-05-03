import { ActivityResponse } from '@/services/Admin/Activities/Payload/response/activityResponse';
import {
  Button,
  Col,
  DatePicker,
  Descriptions,
  Flex,
  Form,
  Input,
  Modal,
  Row,
  Typography
} from 'antd';
import CreateActivityV2 from '../CreateActivity/createActivityV2';
import dayjs from 'dayjs';
import { PlusOutlined, CloseCircleTwoTone } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { putActivitiesService } from '@/services/Admin/Activities/activityService';
import { EditActivityRequest } from '@/services/Admin/Activities/Payload/request/activityRequest';
import UseAxiosAuth from '@/utils/axiosClient';
import { useState } from 'react';
import { useRouter } from '@/navigation';
import { title } from 'process';

interface IProps {
  detail: ActivityResponse;
  onClose: () => void;
  onOk:(data: ActivityResponse)=>void
}

const { RangePicker } = DatePicker;
export default function EditActivityInfoModal(props: IProps) {
  const { detail, onClose, onOk } = props;
  const [infoForm] = Form.useForm();
  const http = UseAxiosAuth();
  const [isLoading, setIsLoading] = useState(false);
  const farmRouter = useRouter()


  const handleUpdate=async ()=>{
    const data = infoForm.getFieldsValue() as EditActivityRequest;
    console.log("edit: ",{...data})
    console.log("edit: ",detail.descriptions??[])
    
    const edit = {
      descriptions:data.descriptions?data.descriptions:(detail.descriptions?? []),
      // duration: data.duration?data.duration: ([detail.start., detail.end]),
      title: data.title?data.title: detail.title??""
    }

    var rs = await putActivitiesService(http,detail.id ,edit)

    if(rs){
      // farmRouter.push('/activities/'+detail.id)
      onOk({...detail,title: edit.title, descriptions: edit.descriptions})
    }
  }

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
                  icon={<PlusOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />}
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
                            onClick={() => remove(field.name)} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                          />
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
      <Descriptions title={'Tiêu đề'} />
      <Form form={infoForm}>
        <Form.Item
          name='title'
          rules={[{ required: true, message: 'Please input name for title!' }]}
        >
          <Col span={12}>
            <Input
              type='text'
              defaultValue={detail.title}
              placeholder={'Tên hoạt động'}
            />
          </Col>
        </Form.Item>
        {/* <Descriptions title={'Bắt đầu và kết thúc'} />
        <Form.Item
          name='duration'
          rules={[{ required: true, message: 'Please input duration time!' }]}
        >
          <RangePicker
            format='DD-MM-YYYY HH:mm'
            defaultValue={[dayjs(detail.start), dayjs(detail.end)]}
            showTime={{
              hideDisabledOptions: true,
              format: 'HH:mm',
              defaultValue: [dayjs('09:00', 'HH:mm'), dayjs('10:00', 'HH:mm')]
            }}
          />
        </Form.Item> */}
        <Form.Item
          name='notes'
          rules={[{ required: true, message: 'Please input!' }]}
        >
          {/* {descriptionListInput} */}
          {Array.from({ length: 1 }, (_, i) => {
            if (i === 0) {
              return (
                <>
                  <Flex vertical>
                    <Input
                      type='text'
                      value={detail.descriptions ? detail.descriptions[0].name : ''}
                    />
                    <TextArea
                      placeholder={'Content here'}
                      rows={4}
                      maxLength={500}
                      showCount
                      style={{ resize: 'none' }}
                      value={detail.descriptions ? detail.descriptions[0].value : ''}
                    ></TextArea>
                  </Flex>
                </>
              );
            } else if (i === 1) {
              return (
                <>
                  <Flex vertical>
                    <Input
                      type='text'
                      value={detail.descriptions ? detail.descriptions[1].name : ''}
                    />
                    <TextArea
                      placeholder={'Content here'}
                      rows={4}
                      maxLength={500}
                      showCount
                      style={{ resize: 'none' }}
                      value={detail.descriptions ? detail.descriptions[1].value : ''}
                    ></TextArea>
                  </Flex>
                </>
              );
            }
            return <></>;
          })}
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

  return (
    <>
      <Modal
        okText={'Lưu'}
        cancelText={'Hủy bỏ'}
        open
        width={'40vw'}
        centered
        onOk={()=>{
          handleUpdate()
        }}
        onCancel={() => onClose()}
      >
        {infoSection}
      </Modal>
    </>
  );
}
