import { USING_ADDITION, RECORD_ADDITION } from "@/constants/additionType";
import { Button, Modal } from "antd"
import ConsumptionAddition from "./viewer/UsingAddition/usingAddition";
import { Addition } from "@/types/activities";

interface IProps{
    addition: Addition
    onClose: () => void;
}

const AdditionDetail = (props: IProps) => {

    const {
        addition,
        onClose
    } = props

    const handleOk = () => {
        
    };

    const handleCancel = () => {
        //setOpen(false);
        onClose();
    };

    const handleSubmit = () => {

    }
    
    const renderData=()=>{
        let ls : string[] = []
        for (const prop in addition.data){
            ls.push(`${prop}: ${addition.data[prop]}`)
        }
        return ls.map((item,i)=><p key={i}>{item}</p>)
    }

    const renderWithType=(type: string)=>{
        
        switch (type) {
            case USING_ADDITION:
                return <ConsumptionAddition/>
            case RECORD_ADDITION:
                return <></>
            default:
                return null
        }
    }

    return(
        <Modal
            open={true}
            title={"aaaa"}
            onOk={handleOk}
            onCancel={handleCancel}
            style={{ top: '15%', right: '40%', position: "absolute" }}
            //zIndex={100}
            footer={(_, { OkBtn, CancelBtn }) => (
            <>
                <Button type="primary" color="green" onClick={handleSubmit} >Do</Button>
                <CancelBtn />
                {/* <OkBtn /> */}
            </>
            )}
            width={"30vw"}
        >
            <div 
                style={{height: '40vh'}}
            >
            {/* <p>ID: {addition.id}</p> */}
            <p>Type: {addition.type}</p>

            <p>Data: 
            {
                renderData()
            }
            </p>
            
            {renderWithType(addition.type)}
            </div>

        </Modal>
    )
}

export default AdditionDetail