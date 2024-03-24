"use client"

import { Button, Modal } from "antd"

interface IProps{
    
    onClose: () => void

}

export default function CreateTrainingContent(props: IProps){
    const {onClose} = props
    const handleSubmit=(e: any)=>{
        console.log("Send data: ", e)
    }

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
                
            </Modal>
        </>
    )
}