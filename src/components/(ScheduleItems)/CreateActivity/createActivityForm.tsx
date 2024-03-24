

import dayjs from "dayjs";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  FormInstance,
  Input,
  Mentions,
  Radio,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import { useState } from "react";
import FormItem from "antd/es/form/FormItem";
import { USING_ADDITION, TRAINING_ADDITION, ASSESSMENT_ADDITION, TREATMENT_ADDITION } from "@/constants/additionType";
const { RangePicker } = DatePicker;

interface IProps {
  onFinish?: () => void;
  onSubmit?: (values: any) => void;
  form: FormInstance;
}

export default function CreateActivityForm(props: IProps) {
  const { form, onFinish } = props;
  const [chooseAble, setChooseAble] = useState(false);

  const [type, setType] = useState<string>("");
  const [contents, setContents] = useState([
    {
      label: "None",
      value: "none",
    },
    {
      label: "Expert recommend",
      value: "79fff957-9464-4745-8150-73faca8d55d5",
    },
    {
      label: "How to start season",
      value: "cc0f8c70-b4f7-4cf7-9de5-83c4f5c8396f",
    },
    {
      label: "03",
      value: "03",
    },
  ]);
  const [experts, setExperts] = useState([
    {
      label: "None",
      value: "none",
    },
    {
      label: "Expert 02",
      value: "7a7a8916-c767-4ad6-b98c-10775ba4a86c",
    },
    {
      label: "Expert 01",
      value: "b7119c1e-f585-4a9c-b22d-f8441d350963",
    },
    {
      label: "03",
      value: "03",
    },
  ]);
  const [checklists, setChecklists] = useState([
    {
      label: "None",
      value: "none",
    },
    {
      label: "01",
      value: "01",
    },
    {
      label: "02",
      value: "02",
    },
    {
      label: "03",
      value: "03",
    },
  ]);
  const [items, setItems] = useState([
    {
      label: "Seed 01",
      value: "559ac487-62ff-493f-8898-9d23c18c8718",
    },
    {
      label: "01",
      value: "01",
    },
    {
      label: "02",
      value: "02",
    },
    {
      label: "03",
      value: "03",
    },
  ]);
  const [seasons, setSeasons] = useState([
    {
      label: "None",
      value: null,
    },
    {
      label: "Spring",
      value: "9929dad3-61ae-49c7-a398-7995357dca1e",
    },
    {
      label: "02",
      value: "02",
    },
    {
      label: "03",
      value: "03",
    },
  ]);
  const [lands, setLands] = useState([
    {
      label: "None",
      value: null,
    },
    { 
      label: "Land 01",
      value: "25589208-3089-465f-a852-83c07b60185b",
    },
    {
      label: "02",
      value: "02",
    },
    {
      label: "03",
      value: "03",
    },
  ]);
  const [inspectors, setInspectors] = useState([
    
    {
      label: "Admin",
      value: "8c412e0d-4de2-48bc-9a5c-8482cad10dde",
    },
    {
      label: "02",
      value: "02",
    },
    {
      label: "03",
      value: "03",
    },
  ]);
  const [workers, setWorkers] = useState([
    {
      label: "user 02",
      value: "fb80655e-cb2c-4680-9c61-fe6a30c8d95f",
    },
    {
      label: "User User1",
      value: "65bc6b9a-6664-4275-a79b-33694251c405",
    }
  ]);

  const hanldeChooseItem = async (value: string) => {
    console.log(">U have choose item: ", value);
    const data = (await onFetchItems(value)) as any[];
    console.log(">and data item: ", data);
    // setItems(
    //   data.map((i) => {
    //     return {
    //       label: i.name,
    //       value: i.id,
    //     };
    //   })
    // );

    if (data) {
      if (data.length === 0) {
        console.log("Item: empty");
      }
      setChooseAble(true);
    }
  };

  const onFetchItems = async (itemType: string) => {
    return workers;
  };

  const renderBasicFields = () => {
    return (
      <>
        <Col span={24} md={22}>
          <Form.Item
            label="Title"
            name="title"
            rules={[
              { required: true, message: "Please input name for title!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Start to End"
            name="duration"
            rules={[{ required: true, message: "Please input duration time!" }]}
          >
            <RangePicker
              format="DD-MM-YYYY HH:mm:ss"
              showTime={{
                hideDisabledOptions: true,
                defaultValue: [
                  dayjs("00:00:00", "HH:mm:ss"),
                  dayjs("11:59:59", "HH:mm:ss"),
                ],
              }}
            />
          </Form.Item>
          <Form.Item
            label="Worker"
            name="workers"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            //rules={[{ required: true, validator: checkMention }]}
          >
            <Select
              mode="multiple"
              maxCount={1}
              //tagRender={tagRender}
              //defaultValue={["gold", "cyan"]}
              style={{
                width: "100%",
              }}
              options={workers}
            />
          </Form.Item>
          <Form.Item
            label="Inspector"
            name="inspectors"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            //rules={[{ required: true, validator: checkMention }]}
          >
            <Select
              mode="multiple"
              maxCount={1}
              //tagRender={tagRender}
              //defaultValue={["gold", "cyan"]}
              style={{
                width: "100%",
              }}
              options={inspectors}
            />
          </Form.Item>
          <Form.Item
            label="Season"
            name="seasonId"
            //rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Select
              //tagRender={tagRender}
              //defaultValue={["gold", "cyan"]}
              style={{
                width: "100%",
              }}
              options={seasons}
            />
          </Form.Item>
          <Form.Item
            label="Place"
            name="locationId"
            //rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Select
              //tagRender={tagRender}
              //defaultValue={["gold", "cyan"]}
              style={{
                width: "100%",
              }}
              options={lands}
            />
          </Form.Item>
        </Col>
      </>
    );
  };

  const renderDescriptionsListSection = () => {
    return (
      <>
        <Form.Item label="Descriptions">
          <Form.List
            name="descriptions"
            rules={[
              {
                validator: async (_, descriptions) => {
                  if (
                    descriptions &&
                    (descriptions.length > 5 || descriptions.length < 0)
                  ) {
                    return Promise.reject(
                      new Error("1 - 5 description items can add.")
                    );
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }, { errors }) => (
              <>
                <Row gutter={[15, 15]}>
                  {fields.map((field, index) => (
                    <>
                      <Col span={24} md={22} key={index}>
                        <Form.Item required={false}>
                          <Form.Item
                            //{...field}
                            name={[field.name, "name"]}
                            validateTrigger={["onChange", "onBlur"]}
                            rules={[
                              {
                                required: true,
                                whitespace: true,
                                message:
                                  "Please input descriptions name or delete this field.",
                              },
                            ]}
                            noStyle
                          >
                            <Input
                              placeholder="name"
                              style={{ width: "40%" }}
                            />
                          </Form.Item>
                          <Form.Item
                            name={[field.name, "value"]}
                            validateTrigger={["onChange", "onBlur"]}
                            rules={[
                              {
                                required: true,
                                whitespace: true,
                                message:
                                  "Please input descriptions value or delete this field.",
                              },
                            ]}
                            noStyle
                          >
                            <Input
                              placeholder="value"
                              style={{ width: "50%" }}
                            />
                          </Form.Item>
                          {fields.length > 0 ? (
                            <MinusCircleOutlined
                              className="dynamic-delete-button"
                              onClick={() => remove(field.name)}
                            />
                          ) : null}
                        </Form.Item>
                      </Col>
                    </>
                  ))}
                </Row>

                {fields.length < 5 ? (
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      style={{ width: "60%" }}
                      icon={<PlusOutlined />}
                    >
                      Add field
                    </Button>

                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                ) : null}
              </>
            )}
          </Form.List>
        </Form.Item>
      </>
    );
  };

  const renderByType = () => {
    
    switch (type) {
      case USING_ADDITION:
        return (
          <>
            <Form.Item
              label="Item type"
              name={["addition", "itemType"]}
              //rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Select
                //value={}
                onChange={hanldeChooseItem}
                placeholder="Select item type"
                options={[
                  { value: "pesticide", label: "Pesticide" },
                  { value: "seed", label: "Seed" },
                  { value: "fertilize", label: "Fertilize" },
                ]}
              ></Select>
            </Form.Item>
            <Form.Item
              label="Using Item"
              name={["addition", "useItem"]}
              //rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Select
                //value={}
                onChange={hanldeChooseItem}
                placeholder="Select item"
                disabled={!chooseAble}
                options={items}
                dropdownRender={(menu) => (
                  <>
                    {menu}
                    {items.length == 0 && (
                      <Space style={{ padding: "0 8px 4px" }}>
                        <Button>Click here to Add more</Button>
                      </Space>
                    )}
                  </>
                )}
              ></Select>
            </Form.Item>
            <Row gutter={[2, 0]}>
              <Col span={24} md={12}>
                <Form.Item
                  label="Using Quantity"
                  name={["addition", "quantity"]}
                  //rules={[{ required: true, message: 'Please input your email!' }]}
                >
                  <Input type="number" />
                </Form.Item>
              </Col>
              <Col span={24} md={6}>
                <Form.Item
                  label="Unit"
                  name={["addition", "unit"]}
                  //rules={[{ required: true, message: 'Please input your email!' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </>
        );
      case TRAINING_ADDITION:
        return (
          <>
            <Form.Item
              label="Training Content"
              name={["addition", "content"]}
              //rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Select
                //value={}
                //onChange={hanldeChooseItem}
                placeholder="Select item type"
                options={contents}
              ></Select>
            </Form.Item>
            <Form.Item
              label="Trainer Expert"
              name={["addition", "expert"]}
              //rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Select
                //value={}
                //onChange={hanldeChooseItem}
                placeholder="Select item type"
                options={experts}
              ></Select>
            </Form.Item>
          </>
        );
      case ASSESSMENT_ADDITION:
        return (
          <>
            <Form.Item
              label="Risk Checklist"
              name={["addition", "checkList"]}
              //rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Select
                //value={}
                onChange={hanldeChooseItem}
                placeholder="Select item type"
                options={checklists}
              ></Select>
            </Form.Item>
          </>
        );
      case TREATMENT_ADDITION:
        return (
          <>
            <Form.Item
              label="Item type"
              name={["addition", "itemType"]}
              //rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Select
                //value={}
                onChange={hanldeChooseItem}
                placeholder="Select item type"
                options={[
                  { value: "pesticide", label: "Pesticide" },
                  { value: "fertilize", label: "Fertilize" },
                  { value: "seed", label: "Seed" },
                  { value: "water", label: "Water Source" },
                  { value: "land", label: "Soil" },
                  { value: "equipment", label: "Equipment" },
                ]}
              ></Select>
            </Form.Item>
            <Form.Item
              label="Treatment Item"
              name={["addition", "treatmentItem"]}
              //rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Select
                //value={}
                onChange={hanldeChooseItem}
                placeholder="Select item"
                disabled={!chooseAble}
                options={items}
                dropdownRender={(menu) => (
                  <>
                    {menu}
                    {items.length == 0 && (
                      <Space style={{ padding: "0 8px 4px" }}>
                        <Button>Click here to Add more</Button>
                      </Space>
                    )}
                  </>
                )}
              ></Select>
            </Form.Item>
            <FormItem label="Treatment Method" name={["addition", "method"]}>
              <Input type="text" />
            </FormItem>
          </>
        );
      default:
        return <></>;
    }
  };

  return (
    <Form
      name="basic"
      onFinish={onFinish}
      layout="vertical"
      form={form}
      //style={{maxHeight: '60vh'}}
    >
      <Row gutter={[20, 20]}>
        <Col span={24} md={12}>
          <Row gutter={[15, 15]}>{renderBasicFields()}</Row>
        </Col>
        <Col span={24} md={12}>
          <Form.Item
            label="Type"
            name="type"
            //rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Radio.Group
              name="type"
              value={type}
              
              onChange={(e) => {
                form.setFieldValue("addition", null);
                setType(e.target.value);
              }}
              defaultValue={type}
            >
              <Radio.Button checked={true} value="">None</Radio.Button>
              <Radio.Button value={USING_ADDITION}>Use</Radio.Button>
              <Radio.Button value={ASSESSMENT_ADDITION}>
                Assessment
              </Radio.Button>
              <Radio.Button value={TRAINING_ADDITION}>Training</Radio.Button>
              <Radio.Button value={TREATMENT_ADDITION}>Treatment</Radio.Button>
            </Radio.Group>
          </Form.Item>

          {renderByType()}
          {renderDescriptionsListSection()}
        </Col>
      </Row>
      
      <Form.Item noStyle shouldUpdate>
        {() => (
          <Typography>
            <pre>{JSON.stringify(form.getFieldsValue())}</pre>
          </Typography>
        )}
      </Form.Item>
    </Form>
  );
}
