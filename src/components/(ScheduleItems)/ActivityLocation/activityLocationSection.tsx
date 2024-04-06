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

interface IProps {
  activityId: string;
  detail: ActivityLocation | null;
  setDetail: (location: ActivityLocation) => void;
}

export default function ActivityLocationSection(props: IProps) {
  const { detail, setDetail, activityId } = props;
  const [locationDetail, setLocationDetail] = useState<ActivityLocation | null>(detail ?? null);
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
    if (locationDetail) {
      try {
        const res = await removeLocationService(http, activityId, locationDetail?.id);
        if (res) {
          setLocationDetail(null);
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
        setLocationDetail(data);
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
      okType={confirmModal.okType ?? 'default'}
      open={true}
      onCancel={() => setConfirmOpen(false)}
      onOk={() => confirmModal.onOk()}
      title={confirmModal.title}
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
            <Descriptions title='Land' />
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
                (locationDetail ? (
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
                    <div>{locationDetail.name}</div>
                  </Flex>
                ) : (
                  <Flex>
                    <Typography.Text type='secondary'>No location set</Typography.Text>
                  </Flex>
                ))}
              {isLoading && (
                <Flex>
                  <LoadingOutlined />
                </Flex>
              )}
            </Flex>
          </Col>
          <Col span={4}>
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
                disabled={!!locationDetail}
                loading={isLoading}
                block
              >
                <PlusOutlined />
                Add
              </Button>
              <Button
                disabled={!locationDetail}
                onClick={() => {
                  setLocationOpen(true);
                }}
                type='primary'
                block
                loading={isLoading}
              >
                <SwapOutlined /> Change
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
                disabled={!locationDetail}
                style={{ backgroundColor: 'red' }}
                block
              >
                <CloseOutlined />
                Remove
              </Button>
            </Flex>
          </Col>
        </Row>
        <Row
          style={{
            width: '100%'
            //height: '100%'
          }}
        >
          <Col offset={11} span={12}>
            <Link href={'#'}>
              <Typography.Link
                strong
                underline
              >
                Go to view detail
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
