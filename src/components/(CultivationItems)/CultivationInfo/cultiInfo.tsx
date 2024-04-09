import { ProductionDetailList } from '@/components/(ProductionItems)/ProductList/productionDetailList';
import { Button, Col, Descriptions, Divider, Flex, Row, Typography } from 'antd';
import { Bar } from '../Chart/charts';

export default function CultivationInfo() {
  return (
    <>
      <Divider orientation='left'>
        <Typography.Title level={3}>Cultivation Record</Typography.Title>
      </Divider>
      <Flex
        vertical
        style={{
          width: '70vw',
          paddingLeft: '5vw'
        }}
      >
        <Flex
          vertical
          align='end'
          style={{ width: '100%' }}
        >
          <Col span={20}>
            <Button type='primary'>Export</Button>
          </Col>
        </Flex>
        <Col>
          <Descriptions title='Production' />
          <ProductionDetailList productId='sadsada' />
        </Col>
        <Flex
          vertical
          align='center'
          justify='center'
          style={{
            width: 600,
            height: 400
          }}
        >
          <p></p>
          {/* <Bar/> */}
        </Flex>
      </Flex>
    </>
  );
}
