"use client"
import { TrainingContent } from "@/services/Admin/Training/response/training.response"
import { Modal } from "antd"

interface IProps{
    detail?: TrainingContent 
    onClose: (value: boolean) => void
}

export default function UpdateTrainingContent(props: IProps){
    const {detail, onClose} = props

    return(
        <>
            <Modal>
                <div>Update Form</div>
            </Modal>
        </>
    )
}