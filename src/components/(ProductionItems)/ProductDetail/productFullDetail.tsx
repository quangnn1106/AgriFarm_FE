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

interface IProps {
  detail: FarmProductResponse;
}

export default function FullProductDetail(props: IProps) {
  const { detail } = props;
  const [productions, setProductions] = useState<ProductionResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const farmRouter = useRouter();

  const [seed, setSeed] = useState<ProductSeedResponse | null>(null);

  useEffect(() => {
    setSeed({
      id: '4994-asdasd043-32432-sadas',
      name: 'ABC',
      description: 'asdasd jdjadjasjdajd kakjdkajdajsdj'
    });
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
            //vertical
            align='center'
            justify='flex-start'
            //gap={20}
            style={{ height: 100, width: '100%', border: '1px solid', borderRadius: 10 }}
          >
            <Col
              offset={4}
              span={7}
            >
              <Avatar
                src={item.img ? '/../' + item.img : '#'}
                shape='square'
                size={80}
              />
            </Col>
            <Col
              offset={3}
              span={7}
            >
              <Typography.Text strong>{item.name}</Typography.Text>
            </Col>
          </Flex>
          <Flex
            style={{ width: '100' }}
            justify='end'
          >
            <Button
              type='link'
              onClick={() => farmRouter.push('')}
            >
              {'Go to seed detail page'}
            </Button>
          </Flex>
        </Flex>
      </>
    );
  };

  return (
    <>
      <Divider orientation='left'>
        <Typography.Title level={3}>{'Product detail'}</Typography.Title>
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
                  src={!!detail.img ? '/../' + detail.img : '#'}
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
                  <Descriptions title={'Product name'}>
                    <Typography.Text>{detail.name}</Typography.Text>
                  </Descriptions>
                </Flex>
                <Flex>
                  <Descriptions title={'Stock'}>
                    <Typography.Text>
                      {detail.quantity}
                      {detail.unit}
                    </Typography.Text>
                  </Descriptions>
                </Flex>
                <Descriptions title={'Rice seed'} />
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
              <Descriptions title={'Description'} />
              <Typography.Text>
                {seed.description}
                Rice is a cereal grain, and in its domesticated form is the staple food
                for over half of the worlds human population, particularly in Asia and
                Africa, due to the vast amount of soil that is able to grow rice. Rice is
                the seed of the grass species Oryza sativa (Asian rice) or, much less
                commonly, O. glaberrima (African rice). Asian rice was domesticated in
                China some 13,500 to 8,200 years ago, while African rice was domesticated
                in Africa some 3,000 years ago. Rice has become commonplace in many
                cultures worldwide; in 2021, 787 million tons were produced, placing it
                fourth after sugarcane, maize, and wheat. Only some 8% of rice is traded
                internationally.
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
          <Descriptions title={'Production Status'} />
          <div
            style={{
              width: '100%',
              height: '80%'
            }}
          >
            <ProductionDetailList productId='sasd' />
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
              Back to list
            </Button>
            {/* <Button></Button> */}
          </Space>
        </Flex>
      </Flex>
    </>
  );
}
