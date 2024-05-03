import {
  USING_ADDITION,
  TRAINING_ADDITION,
  ASSESSMENT_ADDITION,
  TREATMENT_ADDITION,
  HARVEST_ADDITION
} from '@/constants/additionType';
import {
  createAssessmentActionService,
  createHarvestActionService,
  createTrainingActionService,
  createTreatmentActionService
} from '@/services/Admin/Activities/additionService';
import {
  ActivityResponse,
  Addition
} from '@/services/Admin/Activities/Payload/response/activityResponse';
import { getExpertsService } from '@/services/Admin/Training/expertService';
import { Expert } from '@/services/Admin/Training/response/training.response';
import riskAssessmentListMasterApi from '@/services/RiskAssessment/riskAssessmentListMasterApi';
import UseAxiosAuth from '@/utils/axiosClient';
import { useDebounceSearch } from '@/utils/debounceSearch';
import { getPaginationResponse } from '@/utils/paginationHelper';
import {
  Modal,
  Button,
  Flex,
  Col,
  Typography,
  Input,
  Avatar,
  Divider,
  Descriptions,
  Form,
  Row,
  Select,
  Space,
  Radio,
  Checkbox,
  message
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from 'react';
import { FarmObjective } from '../converter/FarmOjective';
import { ActivityRiskResponse } from '@/services/Admin/Activities/Payload/response/activityAdditionResponse';
import { useActivityBoundary } from '../DetailBoundary/actvityDetailBoundary';

interface IProps {
  curActivity: ActivityResponse;
  curLocationId: string | null;
  // addition: Addition;
  onSelected: (type: string) => void;
  onClose: () => void;
}

export default function AdditionAttachModal(props: IProps) {
  const {
    onClose,
    onSelected,
    curActivity,
    curLocationId
    //addition
  } = props;
  
  const target = FarmObjective;
  const [type, setType] = useState<string>(ASSESSMENT_ADDITION);
  const [experts, setExperts] = useState<Expert[]>([]);
  const { activity, addition, setAddition, location, setLocation } = useActivityBoundary();
  const [chooseAble, setChooseAble] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Addition | null>(null);
  const [confirmable, setConfirmable] = useState(true);
  const [isWaste, setIsWaste] = useState(false);
  const [list, setList] = useState<Addition[]>([]);
  const [risks, setRisks] = useState<ActivityRiskResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  const http = UseAxiosAuth();
  const [actionForm] = useForm();
  // const [page, setPage] = useState<PaginationResponse>({
  //   CurrentPage: 1,
  //   PageSize: 0,
  //   TotalCount: 1,
  //   TotalPages: 1
  // });

  const fetchRisk = async () => {
    setIsLoading(true);
    try {
      const responseData = await riskAssessmentListMasterApi(http, {
        perPage: 100,
        pageId: 1
      });
      const data = responseData?.data as ActivityRiskResponse[];
      console.log(data);
      setRisks([...data]);
    } catch (e) {
      console.log('fetch error');
    }

    setIsLoading(false);
  };

  const fetchExpert = async () => {
    setIsLoading(true);
    try {
      const responseData = await getExpertsService(http, 1, 100);
      const data = responseData?.data.data as Expert[];
      // console.log(data);
      setExperts(prev => [...data]);
    } catch (e) {
      console.log('fetch error');
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (initLoading) {
      fetchRisk();

      fetchExpert();
      setInitLoading(false);
    }
    return () => {
      setInitLoading(false);
    };
  }, []);

  const handleConfirm = async () => {
    setIsLoading(true);
    actionForm.validateFields();
    const data = actionForm.getFieldsValue();

    switch (type) {
      case TREATMENT_ADDITION:
        const treatment = { ...(data as TreatmentCreateRequest), isWaste: isWaste };

        console.log(treatment);
        const resTreat = await createTreatmentActionService(http, curActivity.id, treatment)
          
            if (resTreat.status === 202 && activity) {
              console.log("Reset data: ",{ ...addition, type: type })
              setAddition({ id: activity.id, type: type, data:"" });
            }
        break;
      case HARVEST_ADDITION:
        if (location) {
          console.log(location.id);
          const resHarvest = await createHarvestActionService(http, curActivity.id, { landId: location.id })
            
              if (resHarvest.status === 202 && activity) {
                console.log("Reset data: ",{ ...addition, type: type })
                setAddition({ id: activity.id, type: type, data:"" });
              }else if(resHarvest.status == 400 && resHarvest.message === 'There no production to harvest'){
                message.error("Khu vực này hiện không canh tác")
              }
            // })
            // .catch(err => {});
        }

        break;
      case ASSESSMENT_ADDITION:
        const assessment = data as AssessmentCreateRequest;
        console.log(assessment);

        const resAssessment = await createAssessmentActionService(http, curActivity.id, assessment)
          // .then(res => {
            console.log("data: ",resAssessment)
            if (resAssessment.status === 202 && activity) {
              console.log("Reset data: ",{ ...addition, type: type })
              setAddition({ id: activity.id, type: type, data:"" });
            }
          // })
          // .catch(err => {});
        break;
      case TRAINING_ADDITION:
        const training = data as TrainingCreateRequest;
        console.log(training);
        const resTrain = await createTrainingActionService(http, curActivity.id, training)
        if (resTrain.status === 202 && activity) {
          console.log("Reset data: ",{ ...addition, type: type })
          setAddition({ id: activity.id, type: type, data:"" });
        }
        break;
    }
    setIsLoading(false);
    onSelected(type);
  };

  const renderByType = () => {
    switch (type) {
      case TRAINING_ADDITION:
        return (
          <>
            <Flex vertical>
              <Descriptions title='Nội dung tập huấn'></Descriptions>
              <Form.Item
                //label=''
                name={'description'}
                rules={[{ required: true, message: 'Hãy nhập nội dung.' }]}
              >
                <TextArea
                  placeholder={'Nội dung'}
                  rows={4}
                  minLength={10}
                  maxLength={3000}
                  showCount
                  style={{ resize: 'none' }}
                ></TextArea>
              </Form.Item>
              <Descriptions title='Chuyên gia'></Descriptions>
              <Form.Item
                name={'expertId'}
                rules={[{ required: true, message: 'Hãy chọn chuyên gia' }]}
              >
                <Select
                  //value={}
                  //onChange={hanldeChooseItem}
                  placeholder='Chọn chuyên gia'
                  options={experts.map(e => ({ value: e.id, label: e.fullName }))}
                ></Select>
              </Form.Item>
            </Flex>
          </>
        );
      case ASSESSMENT_ADDITION:
        return (
          <>
            <Descriptions title='Bảng đánh giá'></Descriptions>
            <Form.Item
              // label=''
              name={'checkListId'}
              rules={[{ required: true, message: 'Hãy chọn bảng đánh giá.' }]}
            >
              <Select
                //value={}
                // onChange={hanldeChooseItem}
                placeholder='Chọn bảng đánh giá'
                options={risks.map(e => ({ value: e.id, label: e.riskName }))}
              ></Select>
            </Form.Item>
          </>
        );
      case HARVEST_ADDITION:
        return (
          <>
            <Flex>
              {location ? (
                <Flex vertical>
                  Lô đất thu hoạch là
                  <Typography.Title level={3}>
                    {location.name}
                  </Typography.Title>
                </Flex>
              ) : (
                <Space>
                  <Typography.Text type='secondary'>
                    Bạn phải chọn lô đất mới có thể thu hoạch
                  </Typography.Text>
                </Space>
              )}
            </Flex>
          </>
        );
      case TREATMENT_ADDITION:
        return (
          <>
            <Descriptions title='Đối tượng xử lý'></Descriptions>
            <Form.Item
              label=''
              name={'target'}
              rules={[{ required: true, message: 'Hãy chọn đối tượng xử lý' }]}
            >
              <Select
                //value={}
                // onChange={hanldeChooseItem}
                placeholder='Chọn đối tượng xử lý'
                // disabled={!chooseAble}
                options={target}
                // dropdownRender={menu => (
                //   <>
                //     {menu}
                //     {items.length == 0 && (
                //       <Space style={{ padding: '0 8px 4px' }}>
                //         <Button>Click here to Add more</Button>
                //       </Space>
                //     )}
                //   </>
                // )}
              ></Select>
            </Form.Item>
            <Flex
              gap={10}
              align='baseline'
            >
              <Col span={8}>
                <Descriptions title='Xử lý chất thải'></Descriptions>
              </Col>
              <Form.Item
                label=''
                name={'isWaste'}
                //rules={[{ required: true, message: 'Hãy chọn đối tượng xử lý' }]}
              >
                <Radio.Group
                  value={isWaste}
                  onChange={e => setIsWaste(e.target.value)}
                  defaultValue={false}
                >
                  <Radio value={false}>Không</Radio>
                  <Radio value={true}>Có</Radio>
                </Radio.Group>
              </Form.Item>
            </Flex>
            <Descriptions title='Phương pháp xử lý'></Descriptions>
            <FormItem
              name={'method'}
              rules={[{ required: true, message: 'Hãy chọn phương pháp xử lý' }]}
            >
              <TextArea
                placeholder={'Nội dung'}
                rows={4}
                minLength={20}
                maxLength={3000}
                showCount
                style={{ resize: 'none' }}
              ></TextArea>
            </FormItem>
          </>
        );
      default:
        return <></>;
    }
  };

  return (
    <>
      <Modal
        open
        width={700}
        // style={{
        //   minWidth: 500
        // }}
        centered
        cancelText={'Hủy bỏ'}
        onCancel={() => onClose()}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            <Button
              disabled={!confirmable}
              type='primary'
              onClick={() => handleConfirm()}
            >
              Xác nhận
            </Button>
          </>
        )}
      >
        <Flex
          vertical
          align='center'
          // justify=''
          style={{
            width: 600,
            minHeight: 500,
            // height: '40vh',
            marginTop: 30,
            padding: 20,
            border: '1px solid',
            borderRadius: 10
          }}
        >
          <Row
            justify='start'
            style={{
              marginTop: 20,
              width: '80%'
            }}
          >
            <Descriptions title={'Loại hành động'} />
            <Select
              // name='type'
              value={type}
              // buttonStyle='solid'
              onChange={e => {
                //form.setFieldValue('addition', null);
                if (e === HARVEST_ADDITION && !curActivity.location) {
                  setConfirmable(false);
                }
                setType(e);
              }}
              defaultValue={type}
              style={{ width: '100%' }}
            >
              <Select.Option
                checked={true}
                value={ASSESSMENT_ADDITION}
              >
                Đánh giá
              </Select.Option>
              <Radio.Button value={HARVEST_ADDITION}>Thu hoạch</Radio.Button>
              <Radio.Button value={TRAINING_ADDITION}>Tập huấn</Radio.Button>
              <Radio.Button value={TREATMENT_ADDITION}>Xử lý</Radio.Button>
            </Select>
          </Row>

          <Flex
            vertical
            // justify='center'
            // align='center'
            style={{
              width: 400,
              height: 300,
              padding: 10,
              marginTop: 20
            }}
          >
            <Form form={actionForm}>{renderByType()}</Form>
          </Flex>
          {/* </Col> */}
        </Flex>
      </Modal>
    </>
  );
}
