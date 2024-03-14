import { Button, Col, Form, Input, Row } from "antd";

interface IProps {}

const UsingAddition = (props: IProps) => {
  const [form] = Form.useForm();

  return (
    <Col span={24} md={24}>
      <Form
        {...{ labelCol: { span: 4 }, wrapperCol: { span: 14 } }}
        layout={"vertical"}
        form={form}
        //={{ layout: "vertical" }}
        //onValuesChange={onFormLayoutChange}
        //style={{ maxWidth: 600 }}
      >
        
          
        
       

        <Form.Item
          label="Was Used"
          name=""
          //rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Item target (ppp, fert,...)"
          name=""
          //rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Use detail1"
          name=""
          //rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Use detail2"
          name=""
          //rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Col>
  );
};

export default UsingAddition;
