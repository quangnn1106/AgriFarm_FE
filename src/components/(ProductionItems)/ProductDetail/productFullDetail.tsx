import { useRouter } from '@/navigation';
import {
  FarmProductResponse,
  ProductionResponse,
  ProductSeedResponse
} from '@/services/Admin/Productions/Payload/response/production.response';
import {
  Avatar,
  Button,
  Col,
  Descriptions,
  Divider,
  Flex,
  Image,
  Row,
  Space,
  Typography
} from 'antd';
import { useEffect, useState } from 'react';
import { ProductionDetailList } from '../ProductList/productionDetailList';
import { PushpinTwoTone } from '@ant-design/icons';
import { FakePro } from '@/components/(CultivationItems)/fakeProductions';

interface IProps {
  detail: FarmProductResponse;
}

const prox = FakePro

export default function FullProductDetail(props: IProps) {
  const { detail } = props;
  const [productions, setProductions] = useState<ProductionResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const farmRouter = useRouter();

  const [seed, setSeed] = useState<ProductSeedResponse | null>(null);

  useEffect(() => {
    setSeed(detail.seedRef as any
    //   {
    //   id: '4994-asdasd043-32432-sadas',
    //   name: 'Gạo Đài Loan',
    //   description: 'asdasd jdjadjasjdajd kakjdkajdajsdj'
    // }
  );
  }, []);

  const SeedInfoSection = (item: ProductSeedResponse) => {
    return (
      <>
        <Flex
          vertical
          gap={10}
          style={{
            width: '80%',
            minWidth: 200,
            height: '30vh',
            minHeight: 500
          }}
        >
          <Flex
            vertical
            align='start'
            justify='flex-start'
            //gap={20}
            style={{
              height: 10,
              width: '100%'
              //border: '1px solid',
              //borderRadius: 10
            }}
          >
            {/* <Col
              offset={4}
              span={7}
            >
              <Avatar
                src={item.img ? '/../' + item.img : '#'}
                shape='square'
                size={80}
              />
            </Col> */}
            <Col
              //offset={3}
              span={10}
            >
              <Typography.Text strong>
                <PushpinTwoTone />
                {item.name}
              </Typography.Text>
            </Col>
          </Flex>
          {/* <Flex
            style={{ width: '100' }}
            justify='end'
          >
            <Button
              type='link'
              onClick={() => farmRouter.push('')}
            >
              {/* {'Go to seed detail page'} */}
          {/* </Button> */}
          {/* </Flex> */}
        </Flex>
      </>
    );
  };

  return (
    <>
      <Divider orientation='left'>
        <Typography.Title level={3}>{'Chi tiết sản phẩm'}</Typography.Title>
      </Divider>
      <Flex
        vertical
        style={{
          width: '60vw',
          minWidth: 600,
          //height: '50vh',
          minHeight: 300,
          marginLeft: '5vw'
          //padding:10
        }}
        gap={30}
      >
        <Flex
          vertical
          justify='space-between'
          align='center'
          style={{
            width: '100%',
            minWidth: 600,
            height: '100%',
            padding: 20,
            border: '1px solid',
            borderRadius: 10,
            overflow: 'hidden'
            // minHeight: 600,
            // margin:'5vh auto'
          }}
        >
          <Row
            style={{
              height: '50%',
              maxHeight: 450
            }}
          >
            <Col
              offset={1}
              span={11}
            >
              <Flex>
                {/* <Image
                  src={!!detail.img ? '/../' + detail.img : '#'}
                  alt={detail.name}
                /> */}
                <Avatar
                  src={
                    !!detail.img
                      ? '/../' + detail.img
                      : 'https://gaosachsonghau.com/upload/images/gao-dai-loan.jpg'
                  }
                  alt={detail.name}
                  shape='square'
                  size={400}
                />
              </Flex>
            </Col>
            <Col
              offset={1}
              span={10}
            >
              <Flex
                vertical
                // align=''
                justify='space-around'
                gap={10}
                style={{
                  height: '100%',
                  paddingTop: 40
                }}
              >
                <Flex>
                  <Descriptions title={'Tên sản phẩm'}>
                    <Typography.Text>
                      {detail.name}
                      {/* Gạo Đài Loan */}
                    </Typography.Text>
                  </Descriptions>
                </Flex>
                <Flex>
                  <Descriptions title={'Lưu giữ'}>
                    <Typography.Text>
                      {detail.quantity}
                      {` (${detail.unit})`}
                    </Typography.Text>
                  </Descriptions>
                </Flex>
                <Descriptions title={'Giống tham chiếu'} />
                {seed && SeedInfoSection(seed)}
              </Flex>
            </Col>
          </Row>
          {seed && (
            <Flex
              vertical
              style={{
                width: '90%',
                height: '40%',
                minHeight: 300,
                margin: '0 auto'
              }}
            >
              <Descriptions title={'Mô tả'} />
              <Typography.Text>
                {/* {seed.description} */}
                Gạo Đài Loan là loại gạo rất quen thuộc với chúng ta. Khi nấu gạo có mùi
                vị rất thơm, dẻo ít và phù hợp với mọi lứa tuổi. Gạo Đài Loan có nguồn gốc
                từ một giống lúa của Đài Loan, gạo được du nhập vào nước ta từ nhiều năm
                trước. Hiện nay, gạo được trồng nhiều ở những tỉnh Nam Bộ ở nước ta, nhưng
                nếu các bạn muốn tìm loại gạo đúng chuẩn thì các bạn đến Gò Công thuộc
                tỉnh Tiền Giang.
              </Typography.Text>
            </Flex>
          )}
        </Flex>
        <Flex
          vertical
          justify='space-between'
          align='center'
          style={{
            width: '100%',
            minWidth: 600,
            height: '40vh',
            minHeight: 400,
            padding: 20,
            border: '1px solid',
            borderRadius: 10
          }}
        >
          <Descriptions title={'Tình trạng sản xuất'} />
          <div
            style={{
              width: '100%',
              height: '80%'
            }}
          >
            <ProductionDetailList
              productId={detail.id}
              productions={prox.filter(e=>e.product.name === 'Gạo Đài Loan')}
              //productName='Gạo Đài Loan'
            />
          </div>
        </Flex>
        <Flex
          align='center'
          justify='end'
          style={{ height: 80 }}
        >
          <Space>
            <Button
              onClick={() => farmRouter.push('/products')}
              type='primary'
            >
              Quay lại
            </Button>
            {/* <Button></Button> */}
          </Space>
        </Flex>
      </Flex>
    </>
  );
}
