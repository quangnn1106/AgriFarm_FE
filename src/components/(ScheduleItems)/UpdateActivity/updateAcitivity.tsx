import { ActivityResponse } from "@/services/Admin/Activities/Payload/response/activityResponse";
import { Col, Form, Input, Modal, Row, message } from "antd";


interface IProps {
    setOpen: (param: boolean) => void;
    dataUpdate: ActivityResponse;
    setDataUpdate: (data: ActivityResponse|null) => void;
}


const UpdateActivity = (props: IProps) =>{
    
    const {
        setOpen,
        dataUpdate, 
        setDataUpdate
    } = props;

    const [form] = Form.useForm();

    const handleClose = () => {
        form.resetFields()
        setOpen(false);
        setDataUpdate(null)
    }

    const onFinish = async (values: any) => {
        const { title, start, end } = values;
        if (dataUpdate) {
            const data = {
                id: dataUpdate.id, //undefined
                title,
                start,
                end
            }

            //await handleUpdateAction(data)
            handleClose();
            message.success("Update user succeed")
        }
    };



    return(
        <>
        <Modal
            title="Update activity"
            open={true}
            onOk={() => form.submit()}
            onCancel={() => handleClose()}
            maskClosable={false}
        >
            <Form
                name="basic"
                onFinish={onFinish}
                layout="vertical"
                form={form}
            >
                <Row gutter={[15, 15]}>
                    <Col span={24} md={20}>
                        <Form.Item
                            label="Title"
                            name="title"
                            rules={[{ required: true, message: 'Please input name for title!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={24} md={12}>
                        <Form.Item
                            label="Start Date"
                            name="start"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input type='email' />
                        </Form.Item>
                    </Col>
                    <Col span={24} md={12}>
                        <Form.Item
                            label="End Date"
                            name="end"
                            //rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input type='email' />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>


        </>
    )
}

export default UpdateActivity