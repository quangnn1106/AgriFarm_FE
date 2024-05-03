"use client"
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Mentions,
  Modal,
  Radio,
  Row,
  Typography,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import CreateActivityFormV1 from "./createActivityFormV1";
import useAxios from "@/utils/axiosClient";



interface IProps {
  //isOpen : boolean;
  setOpen: (param: boolean) => void;
}

interface Description {
  name: string;
}

interface CreateForm {
  title: string;
  duration: string[];
  unit: string;
  type: string;
  descriptions: Description[];
  workers: string[];
  inspectors: string[];
  locationId: string;
  seasonId: string;
  addition: any
}

const basePath = "/schedule/activities"

const CreateActivityV1 = (props: IProps) => {
  var { setOpen } = props;
  const [form] = Form.useForm<CreateForm>();
  const http = useAxios()
  

  const handleClose = () => {
    form.resetFields();
    setOpen(false);
  };

  const handleSubmit = async () => {
    
    const data = form.getFieldsValue()
    const submitData: CreateForm = {
      ...data,
      type: !data.type || data.type === ""?"none":data.type
    }
    console.log("Form detail: ",submitData);

    console.log("Addition: ", form.getFieldValue("addition"))
    //form.submit()
    var rs = await http.post(basePath + "/post",submitData)
    console.log("Your post response here: ", rs)
  };

  const onFinish = async () => {
    console.log("Success:");
    // const res = await handleCreateUserAction(values);
    // if (res?.id) {
    //     handleCloseCreateModal();
    //     message.success("Create succeed!")
    // }
  };


  return (
    <>
      <Modal
        title="Add new activity"
        open={true}
        //onOk={}
        onCancel={() => handleClose()}
        maskClosable={false}
        width={"50vw"}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn/>
            <Button onClick={() => handleSubmit()}>Create</Button>
          </>
        )}
      >
        <CreateActivityFormV1
          form={form}
          onFinish={onFinish}
          //onSubmit={}
        />
        
      </Modal>
    </>
  );
};

export default CreateActivityV1;
