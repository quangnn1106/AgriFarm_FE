"use client"
import { Expert } from "@/services/Admin/Training/response/training.response"
import { Modal } from "antd"

interface IProps{
    detail?: Expert 
    onClose: () => void
}

export default function UpdateExpert(props: IProps){
    const {detail, onClose} = props

    return(
        <>
            <Modal
                title="Detail"
                open={true}
                onOk={()=>console.log("Go")}
                onCancel={() => onClose()}
                maskClosable={false}
                
                width={"30vw"}
                footer={(_, { OkBtn, CancelBtn }) => (
                  <>
                    <CancelBtn/>
                    <OkBtn/>
                  </>
                )}
            >
                <div>Update Form</div>
            </Modal>
        </>
    )
}