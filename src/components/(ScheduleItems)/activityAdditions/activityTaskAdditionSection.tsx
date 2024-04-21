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
import { useActivityBoundary } from '../DetailBoundary/actvityDetailBoundary';
import { useRouter } from '@/navigation';

interface IProps {
  // activity: ActivityResponse;
  // curLocationId: string | null;
  // editable: boolean;
}

export default function ActivityTaskAdditionSection(props: IProps) {
  // const { activity, editable, curLocationId } = props;
  const http = UseAxiosAuth();
  const { activity, addition, setAddition } = useActivityBoundary();
  const farmRouter = useRouter()

  // [addition, setAddition] = useState<Addition | null>(activity?.addition ?? null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [finderOpen, setFinderOpen] = useState(false);
  const [change, setChange] = useState(false);

  useEffect(() => {
    // if (addition) {
      //setAddition(addition);
      console.log("addition change: ",addition)
      if (addition) {
              
        // setAddition({ ...addition, type: data });
        // console.log("has change: ",{ ...addition, type: data })
        // farmRouter.push("/activities/"+activity.id)
      }

    // }
  }, [addition]);

  const handleDeleteDetail = () => {
    setIsLoading(true);
    if(activity){
      removeActionService(http, activity.id)
      .then(res => {
        if (res) {
          setAddition(null);
        }
      })
      .catch(err => {
        console.log('Error when delete.');
      })
      .finally(() => {
        setDeleteOpen(false);
        setIsLoading(false);
      });
    }
    
  };

  const handleAddDetail = (data: any) => {
    setFinderOpen(false);
  };

  const additionDetail =()=> (
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
          {activity && activity.editAble && (
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
          {activity && addition && (
            <ActionByTypeSection
              change={change}
              activityId={activity.id}
              addition={addition.type}
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
          {addition ? (
            additionDetail()
          ) : (
            <Space
              direction='vertical'
              align='center'
            >
              <Typography.Text type='secondary'>
                Chưa có hoạt động nâng cao nào được đính kèm
              </Typography.Text>
              {activity && activity.editAble && (
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
      {finderOpen && activity && activity.location && (
        <AdditionAttachModal
          curLocationId={activity.location.id}
          curActivity={activity}
          onSelected={data => {
            setFinderOpen(false);
            //setChange(prev => !prev);
            
          }}
          onClose={() => setFinderOpen(false)}
        />
      )}
    </>
  );
}
