import { Descriptions, Flex, Form, Input, Modal, Space } from "antd";
import { useForm } from "antd/es/form/Form";

interface IProps{
    activityId: string
    onCancel:()=>void
    onSubmit:()=>void
}

export default function HarvestModal(props: IProps){

    const {onCancel, onSubmit, activityId} = props
    const [form] = useForm()

    return(<>
        <Modal
            open
            centered
            width={400}
            onCancel={()=>onCancel()}
        >
            <Flex>
                <Form form={form}>
                <Descriptions title='Quantity'></Descriptions>
                <Space>
                <Form.Item
                        name='output'
                    >
                        <Input type="number"/>
                    </Form.Item>
                    <Form.Item
                        name='unit'
                    >
                        <Input disabled value={'kg'} />
                    </Form.Item>
                </Space>
                    
                </Form>

            </Flex>
        </Modal>
    </>)
}