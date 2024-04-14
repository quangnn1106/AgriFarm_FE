import { CloseCircleTwoTone } from '@ant-design/icons';
import { Button, Flex, Modal, Space, Typography } from 'antd';
import { useState } from 'react';
import AdditionAttachModal from './additionAttachModal';
import { ActivityResponse } from '@/services/Admin/Activities/Payload/response/activityResponse';

interface IProps {
  activity: ActivityResponse;
}

export default function ActivityTaskAdditionSection(props: IProps) {
  const { activity } = props;
  const fakeItem = {
    value: 1,
    title: 'wqwqwq'
  };
  const [item, setItem] = useState<typeof fakeItem | null>(fakeItem);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [finderOpen, setFinderOpen] = useState(false);

  const handleDeleteDetail = () => {
    setItem(null);
    setDeleteOpen(false);
  };

  const handleAddDetail = (data: any) => {
    setFinderOpen(false);
  };

  const itemDetail = (
    <Flex
      vertical
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
      <Flex
        style={{ width: '100%', paddingInline: 10, paddingBlockStart: 10 }}
        justify='end'
        align='center'
      >
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
      </Flex>
      <Flex
        vertical
        style={{ width: '100%', height: '100%' }}
        justify='center'
        align='center'
      >
        <Typography.Text strong>
          Bạn đã chọn thu hoạch lô đất: {activity.location?.name}
        </Typography.Text>
        <Typography.Text strong>cho hoạt động này</Typography.Text>
      </Flex>
    </Flex>
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
            <Button
              type='dashed'
              onClick={() => setFinderOpen(true)}
            >
              Nhấn để thêm
            </Button>
          </Space>
        )}
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
          curActivity={activity}
          onSelected={() => {}}
          onClose={() => setFinderOpen(false)}
        />
      )}
    </>
  );
}
