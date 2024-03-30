
import { EquipmentResponse } from '@/services/Admin/Equipments/Payload/response/equipmentResponses';
import { Drawer, Flex, Col, Typography, Avatar, Row } from 'antd';

interface IProps {
  item: EquipmentResponse;
  onClose: () => void;
}

export default function EquipmentDetailDrawer(props: IProps) {
  const { item, onClose } = props;

  const handleCancel = () => {
    //setOpen(false);
    onClose();
  };

  return (
    <Drawer
      open={true}
      title={'Equipment Detail'}
      onClose={handleCancel}
      width={'30vw'}
    >
      <Flex
        vertical
        align='center'
        style={{ marginInline: 10 }}
      >
        <Flex
          style={{ width: '100%' }}
          justify='space-between'
        >
          <Col span={10}>
            <Flex
              vertical
              justify='center'
              align='start'
            >
              <Typography.Title level={4}>{item.name}</Typography.Title>
            </Flex>
          </Col>
          <Col span={12}>
            <Flex
              justify='start'
              align='center'
            >
              <Avatar
                //size={}
                shape='square'
                alt='avatar'
                src='#'
                size={210}
                //style={{ width: 200, height: 200, display: 'block' }}
              />
            </Flex>
          </Col>
        </Flex>
        {/* <Divider plain orientationMargin={10}></Divider> */}
        <Row gutter={[16, 4]}>
          <Col span={24} style={{minHeight:150}}>
            <Typography.Title level={5}>Description</Typography.Title>
            {item.description}
          </Col>
          <Col span={10}>
            <Typography.Title level={5}>Stock</Typography.Title>
          </Col>
          <Col span={8}>
            <Typography.Title level={5}>Unit</Typography.Title>
          </Col>
          <Col span={10}>{item.stock}</Col>
          <Col span={8}>{item.measureUnit}</Col>
          <Col span={16}>
            <Typography.Title level={5}>Price</Typography.Title>
            {item.unitPrice} (VND)
          </Col>
          <Col span={16}>
            <i>(This is the latest price recorded.)</i>
          </Col>
          <Col span={24}>
            <Typography.Title level={5}>Note</Typography.Title>
            {item.notes ?? 'nothing to display'}
          </Col>
        </Row>
      </Flex>
    </Drawer>
  );
}
