import { CloseCircleTwoTone } from '@ant-design/icons';
import { Button, Flex, Modal, Space, Typography } from 'antd';
import { useEffect, useState } from 'react';
import AdditionAttachModal from './additionAttachModal';
import {
  ActivityResponse,
  Addition
} from '@/services/Admin/Activities/Payload/response/activityResponse';
import ActionByTypeSection from './actionByTypeSection';
import UseAxiosAuth from '@/utils/axiosClient';
import { removeActionService } from '@/services/Admin/Activities/additionService';

interface IProps {
  activity: ActivityResponse;
  curLocationId: string|null;
  editable: boolean;
}

export default function ActivityTaskAdditionSection(props: IProps) {
  const { activity, editable, curLocationId } = props;
  const http = UseAxiosAuth();
  
  const [item, setItem] = useState<Addition | null>(activity.addition ?? null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [finderOpen, setFinderOpen] = useState(false);
  const [change, setChange] = useState(false);

  useEffect(()=>{
    setItem(item)
  },[change])

  const handleDeleteDetail = () => {
    setIsLoading(true);
    removeActionService(http, activity.id)
      .then(res => {
        if (res) {
          setItem(null);
        }
      })
      .catch(err => {
        console.log('Error when delete.');
      })
      .finally(() => {
        setDeleteOpen(false);
        setIsLoading(false);
      });
  };

  const handleAddDetail = (data: any) => {
    setFinderOpen(false);
  };

  const itemDetail = (
    <>
      <Flex
        style={{
          width: '100%',
          height: '100%'
        }}
        vertical
      >
        <Flex
          style={{
            width: '100%',
            paddingInline: 10,
            paddingBlockStart: 10,
            height: '8%'
          }}
          justify='end'
          align='center'
        >
          {editable && (
            <Button
              onClick={() => setDeleteOpen(true)}
              type='text'
              shape='circle'
            >
              <CloseCircleTwoTone
                twoToneColor={'#e74040'}
                style={{ fontSize: '150%' }}
              />
            </Button>
          )}
        </Flex>
        <Flex
          vertical
          style={{ width: '100%', height: '90%' }}
          justify='center'
          align='center'
        >
          {/* <Typography.Title level={4}>
          Thu hoạch lô đất: <Typography.Text mark>{activity.location?.name}</Typography.Text>
        </Typography.Title>
        <Typography.Text strong>được chọn cho hoạt động này</Typography.Text> */}
          {item && (
            <ActionByTypeSection
              change={change}
              activityId={activity.id}
              addition={item.type}
            />
          )}
        </Flex>
      </Flex>
    </>
  );

  return (
    <>
      <Flex
        vertical
        style={{
          width: '100%',
          height: '100%',
          minHeight: 300
        }}
        align='center'
        justify='center'
      >
        <Flex
          vertical
          justify='center'
          align='center'
          style={{
            width: '100%',
            height: '100%',
            //minWidth:500,
            minHeight: 300,
            border: '1px solid black',
            borderRadius: 20
          }}
        >
          {item ? (
            itemDetail
          ) : (
            <Space
              direction='vertical'
              align='center'
            >
              <Typography.Text type='secondary'>
                Chưa có hoạt động nâng cao nào được đính kèm
              </Typography.Text>
              {editable && (
                <Button
                  type='dashed'
                  onClick={() => setFinderOpen(true)}
                >
                  Nhấn để thêm
                </Button>
              )}
            </Space>
          )}
        </Flex>
      </Flex>
      {deleteOpen && (
        <Modal
          centered
          title='Bạn có muốn xóa bỏ hành động này?'
          cancelText={'Hủy bỏ'}
          open={true}
          //onOk={()=>handleDeleteDetail()}
          onCancel={() => setDeleteOpen(false)}
          footer={(_, { OkBtn, CancelBtn }) => (
            <>
              <CancelBtn />
              <Button
                type='primary'
                style={{ background: '#e74040' }}
                onClick={() => handleDeleteDetail()}
              >
                Xác nhận
              </Button>
            </>
          )}
        ></Modal>
      )}
      {finderOpen && (
        <AdditionAttachModal
          curLocationId={curLocationId}
          curActivity={activity}
          onSelected={(data) => {
            setFinderOpen(false);
            setChange(prev => !prev);
            if(item){

              setItem({...item, type:data})
            }
          }}
          onClose={() => setFinderOpen(false)}
        />
      )}
    </>
  );
}
