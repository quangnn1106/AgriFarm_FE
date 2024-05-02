import { Link } from '@/navigation';
import { ActivityLocation } from '@/services/Admin/Activities/Payload/response/activityResponse';
import {
  CloseOutlined,
  LoadingOutlined,
  PlusOutlined,
  SwapOutlined
} from '@ant-design/icons';
import {
  Avatar,
  Button,
  Col,
  Descriptions,
  Flex,
  message,
  Modal,
  Row,
  Space,
  Typography
} from 'antd';
import { LegacyButtonType } from 'antd/es/button/button';
import { useState } from 'react';
import ActivityLocationFinderModal from './activityLocationFinderModal';
import {
  removeLocationService,
  setLocationService
} from '@/services/Admin/Activities/activitySubService';
import UseAxiosAuth from '@/utils/axiosClient';
import { useActivityBoundary } from '../DetailBoundary/actvityDetailBoundary';

interface IProps {
  activityId: string;
  detail: ActivityLocation | null;
  setDetail: (location: ActivityLocation) => void;
  editable: boolean;
}

export default function ActivityLocationSection(props: IProps) {
  const { detail, setDetail, activityId, editable } = props;
  // const [locationDetail, setLocationDetail] = useState<ActivityLocation | null>(
  //   detail ?? null
  // );
  const {activity, setActivity, setAddition, setLocation, location} = useActivityBoundary()
  const [locationOpen, setLocationOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const http = UseAxiosAuth();
  const [confirmModal, setConfirmModal] = useState<{
    title: string;
    onOk: () => void;
    okType?: LegacyButtonType;
  }>({
    title: 'Confirm',
    onOk: () => {}
  });
  const handleDelete = async () => {
    setIsLoading(true);
    if (location) {
      try {
        const res = await removeLocationService(http, activityId, location?.id);
        if (res) {
          setLocation(null);
        } else throw new Error();
      } catch {
        message.error('Something went wrong. Try again!');
      } finally {
        setIsLoading(false);
      }
    }
    setConfirmOpen(false);
  };
  const handleSetNewLocation = async (data: ActivityLocation) => {
    setIsLoading(true);
    try {
      const res = await setLocationService(http, activityId, {
        id: data.id,
        name: data.name
      });
      if (res) {
        setLocation(data);
        setLocationOpen(false);
      } else throw new Error();
    } catch {
      message.error('Something went wrong. Try again!');
    } finally {
      setIsLoading(false);
    }
  };

  const confirmPopup = (
    <Modal
      centered
      okType={'danger'}
      okButtonProps={{ type: 'primary' }}
      okText={'Xác nhận'}
      cancelText={'Hủy bỏ'}
      open={true}
      onCancel={() => setConfirmOpen(false)}
      onOk={() => confirmModal.onOk()}
      title={'Bạn có muốn xóa khu vực hoạt động này khỏi tác vụ không?'}
    ></Modal>
  );

  return (
    <>
      <Flex
        vertical
        style={{
          width: '100%',
          height: '100%',
          minHeight: 400
        }}
        align='center'
        justify='center'
      >
        <Row>
          <Col
            offset={2}
            span={12}
          >
            <Descriptions title='Lô đất thực hiện' />
          </Col>
        </Row>
        <Row
          style={{
            width: '100%'
            //height: '100%'
          }}
        >
          <Col
            offset={2}
            span={15}
          >
            <Flex
              vertical
              align='center'
              justify='center'
              style={{
                minWidth: 400,
                width: '80%',
                height: 200,
                border: '1px solid black',
                borderRadius: 20,
                padding: 30
              }}
            >
              {!isLoading &&
                (location ? (
                  <Flex
                    //vertical
                    align='center'
                    justify='flex-start'
                    gap={30}
                    style={{
                      width: 400,
                      height: 200,
                      padding: 30
                    }}
                  >
                    <Avatar
                      shape='square'
                      size={150}
                    />
                    <div>
                      Lô đất:{' '}
                      <Typography.Text strong>
                        {/* M02 */}

                        {location.name}
                      </Typography.Text>
                    </div>
                  </Flex>
                ) : (
                  <Flex>
                    <Typography.Text type='secondary'>
                      {/* No location set */}
                      Không có vị trí được chọn
                    </Typography.Text>
                  </Flex>
                ))}
              {isLoading && (
                <Flex>
                  <LoadingOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                </Flex>
              )}
            </Flex>
          </Col>
          <Col span={4}>
            {editable && (
              <Flex
                vertical
                gap={10}
              >
                <Button
                  onClick={() => {
                    setLocationOpen(true);
                  }}
                  type='primary'
                  style={{ backgroundColor: '#1b8ef5' }}
                  disabled={!!location}
                  loading={isLoading}
                  block
                >
                  <PlusOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                  {/* Add */}
                  Thêm
                </Button>
                <Button
                  disabled={!location}
                  onClick={() => {
                    setLocationOpen(true);
                  }}
                  type='primary'
                  block
                  loading={isLoading}
                >
                  <SwapOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                  {/* Change */}
                  Đổi
                </Button>
                <Button
                  loading={isLoading}
                  onClick={() => {
                    setConfirmModal({
                      title: 'Do you want to remove this land',
                      onOk: () => handleDelete(),
                      okType: 'danger'
                    });
                    setConfirmOpen(true);
                  }}
                  type='primary'
                  disabled={!location}
                  style={{ backgroundColor: 'red' }}
                  block
                >
                  <CloseOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                  {/* Remove */}
                  Gỡ
                </Button>
              </Flex>
            )}
          </Col>
        </Row>
        <Row
          style={{
            width: '100%'
            //height: '100%'
          }}
        >
          <Col
            offset={11}
            span={12}
          >
            <Link href={'#'}>
              <Typography.Link
                strong
                underline
              >
                {/* Go to view detail */}
              </Typography.Link>
            </Link>
          </Col>
        </Row>
      </Flex>
      {confirmOpen && confirmPopup}
      {locationOpen && (
        <ActivityLocationFinderModal
          onSelected={data => {
            handleSetNewLocation(data);
            setLocationOpen(false);
          }}
          onClose={() => setLocationOpen(false)}
        />
      )}
    </>
  );
}
