import React, { useState } from "react";
import { Button, Modal, Space, Tag } from "antd";
import AdditionDetail from "../activityAdditions/additionDetail";
import { ActivityResponse, Addition } from "@/types/activities";
import dayjs from "dayjs";
import { additionsData } from "../FakeData/fakeDatesData";

interface EventModalProps {
  activity: ActivityResponse; // Assuming you have CustomEvent type defined
  onClose: () => void;
}

const ActivityDetail: React.FC<EventModalProps> = ({ activity, onClose }) => {
  const [open, setOpen] = useState(true);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState<Addition | null>(null);

  

  const showModal = () => {
    console.log("ok");
    //setOpen(true);
  };
  const handleOk = () => {
    //setOpen(false);
  };

  const handleCancel = () => {
    //setOpen(false);
    onClose();
  };

  const handleDone = () => {
    //setOpen(false);
    console.log("done");
  };

  const renderAddition = () => {
    //console.log("list is: ", addiList)
    return activity.addition?.map((id, index) => {
      const item = additionsData.find((add,i)=>i===0)//.find((e) => e.id === id);
      console.log("addition item: ", item);
      if (item) {
        return (
          <div key={item.id}>
            <a onClick={() => setSelectedDetail(item)}>{item.id}</a>
          </div>
        );
      }
    });
  };

  return (
    <>
      <Modal
        open={open}
        title={activity.title}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ top: "5%", right: 20, position: "absolute" }}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <Button onClick={handleDone}>Mark as Done</Button>
            <CancelBtn />
            <OkBtn />
          </>
        )}
        width={"40vw"}
      >
        <div style={{ height: "80vh" }}>
          <p>ID: {activity.id}</p>
          <p>Title: {activity.title}</p>
          <p>Start: {dayjs(activity.start).format("DD-MM-YYYY HH:mm:ss")}</p>
          <p>End: {dayjs(activity.start).format("DD-MM-YYYY HH:mm:ss")}</p>
          <div>
            More Details:{" "}
            {activity.descriptions.map((des, index) => {
              return (
                <div key={index}>
                  {" "}
                  {">>"} {des.name}: {des.value}
                </div>
              );
            })}
          </div>
          <div>Land: {activity.location?.name}</div>
          <div>Season: {activity.season?.title}</div>
          <div>
            Inspectors:{" "}
            {activity.inspectors.map((ins, index) => (
              <Tag color="blue" key={index}>
                @{ins.name}
              </Tag>
            ))}
          </div>
          <div>
            Participants:{" "}
            {activity.workers.map((wok, index) => (
              <Tag color="cyan" key={index}>
                @{wok.name}
              </Tag>
            ))}
          </div>
          <p>Status: {activity.isCompleted ? "Completed" : "Not yet"}</p>

          <a
            onClick={
              () => setShowDetail(!showDetail)
              //() => console.log(showDetail)
            }
          >
            Show detail
          </a>

          {showDetail && renderAddition()}
          {selectedDetail && (
            <AdditionDetail
              addition={selectedDetail}
              onClose={() => setSelectedDetail(null)}
            />
          )}
        </div>
      </Modal>
    </>
  );
};

export default ActivityDetail;
