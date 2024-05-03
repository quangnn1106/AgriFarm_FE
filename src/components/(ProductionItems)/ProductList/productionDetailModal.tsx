import { ProductionResponse } from '@/services/Admin/Productions/Payload/response/production.response';
import { Col, Descriptions, Drawer, Flex, Modal, Row, Typography } from 'antd';
import dayjs from 'dayjs'

interface IProps {
  detail: ProductionResponse;
  onClose: () => void;
}

export default function ProductionDetailModal(props: IProps) {
  const { onClose, detail } = props;

  return (
    <>
      <Modal
        open
        title={'Chi tiết mùa vụ'}
        centered
        cancelButtonProps={{disabled:true, style:{display:'none'}}}
        width={'20vw'}
        onCancel={() => onClose()}
        onOk={() => onClose()}
      >
        <Flex
        style={{
            
            width:'100%',
            height:'100%',
            paddingLeft:40,
            margin:30,
            //backgroundColor:'gray',
            borderRadius:20
        }}
        vertical
        gap={20}
        align='start'
        justify='center'
        >
          <Flex gap={10}>
            <Typography.Text strong>Mùa vụ</Typography.Text> {detail.season.name}
            {` (${dayjs(detail.season.startIn).year()})`}
          </Flex>
          <Flex gap={10}>
            <Typography.Text strong>Vị trí lô</Typography.Text> {detail.land.name}
          </Flex>
          <Flex gap={10}>
            <Typography.Text strong>Diện tích</Typography.Text> {`100 (${'m2'})`}
          </Flex>
          <Flex gap={10}>
            <Typography.Text strong>Năng suất</Typography.Text> {`${detail.output/100} (kg/${'m2'})`}
          </Flex>
          <Flex gap={10}>
            <Typography.Text strong>Sản lượng</Typography.Text> {`${detail.output} (${'kg'})`}
          </Flex>
        </Flex>
      </Modal>
    </>
  );
}
