"use client"

import FileUploadDragger from "@/components/(ImageItem)/fileUploadDragger"
import { Button, Form, Input, Modal } from "antd"
import { useForm } from "antd/es/form/Form"
import FormItem from "antd/es/form/FormItem"

interface IProps{
    
    onClose: () => void

}

export default function CreateExpert(props: IProps){
    const {onClose} = props
    const handleSubmit=(e: any)=>{
        console.log("Send data: ", e)
    }
    const [form] = useForm()

    return(
        <>
            <Modal
                title="Add new training content"
                open={true}
                //onOk={}
                onCancel={() => onClose()}
                maskClosable={false}
                
                width={"50vw"}
                footer={(_, { OkBtn, CancelBtn }) => (
                  <>
                    <CancelBtn/>
                    <Button onClick={(e) => handleSubmit(e)}>Create</Button>
                  </>
                )}
            >
                <FileUploadDragger
                    setPath={(path)=>console.log(path)}
                    prefix="123"
                />
                <Form 
                layout="vertical"
                form={form}>
                    <Form.Item
                        label="avatar"
                        name="avatar"
                    >
                        <Input type="text"/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}