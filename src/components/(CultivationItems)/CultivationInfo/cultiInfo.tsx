import { ProductionDetailList } from '@/components/(ProductionItems)/ProductList/productionDetailList';
import {
  Breadcrumb,
  Button,
  Col,
  ConfigProvider,
  DatePicker,
  Descriptions,
  Divider,
  Flex,
  Row,
  Space,
  Switch,
  Typography
} from 'antd';
// import { Bar } from '../Chart/charts';
import { ProductionResponse } from '@/services/Admin/Productions/Payload/response/production.response';
import dayjs from 'dayjs';
import { CalendarTwoTone, CloudTwoTone, HomeOutlined } from '@ant-design/icons';
import { Content } from 'antd/es/layout/layout';
import classNames from 'classnames';
import CultTimeline from '../TimeLine/timeLine';
const { RangePicker } = DatePicker;
// import styles from '../adminStyle.module.scss';

const fakeList: ProductionResponse[] = [
  {
    output: 10,
    location: {
      id: 'adsd-dasda-sdiads',
      name: 'Mẫu A2'
    },
    product: {
      name: 'Tài Nguyên',
      id: 'fskksdkj-i4i1929i4-asdnasjdna'
    },
    season: {
      name: 'Đông xuân',
      id: 'sadadasd.343432',
      startIn: dayjs('2018-11-25', 'YYYY-MM-DD').toDate(),
      endIn: dayjs('2019-25-01', 'YYYY-MM-DD').toDate()
    },
    unit: 'tấn',
    harvestDate: dayjs('2020-01-01', 'YYYY-MM-DD').toDate()
  },

  {
    output: 10,
    location: {
      id: 'adsd-dasda-sdiads',
      name: 'Mẫu A2'
    },
    product: {
      name: 'Tài Nguyên',
      id: 'fskksdkj-i4i1929i4-asdnasjdna'
    },
    season: {
      name: 'Đông xuân',
      id: 'sadadasd.343432',
      startIn: dayjs('2019-11-25', 'YYYY-MM-DD').toDate(),
      endIn: dayjs('2020-25-01', 'YYYY-MM-DD').toDate()
    },
    unit: 'tạ',
    harvestDate: dayjs('2020-01-01', 'YYYY-MM-DD').toDate()
  },
  {
    output: 10,
    location: {
      id: 'adsd-dasda-sdiads',
      name: 'Mẫu A2'
    },
    product: {
      name: 'Tài Nguyên',
      id: 'fskksdkj-i4i1929i4-asdnasjdna'
    },
    season: {
      name: 'Đông xuân',
      id: 'sadadasd.343432',
      startIn: dayjs('2020-11-25', 'YYYY-MM-DD').toDate(),
      endIn: dayjs('2021-25-01', 'YYYY-MM-DD').toDate()
    },
    unit: 'tạ',
    harvestDate: dayjs('2020-01-01', 'YYYY-MM-DD').toDate()
  }
];

export default function CultivationInfo() {
  // const cx = classNames.bind(styles);

  return (
    <>
      <Flex
        style={{
          marginLeft: 30
        }}
      >
        <Content style={{ padding: '20px 0px' }}>
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  contentFontSizeLG: 24,
                  fontWeight: 700,
                  groupBorderColor: 'transparent',
                  onlyIconSizeLG: 24,
                  paddingBlockLG: 0,
                  defaultBorderColor: 'transparent',
                  defaultBg: 'transparent',
                  defaultShadow: 'none',
                  primaryShadow: 'none',
                  linkHoverBg: 'transparent',
                  paddingInlineLG: 24,
                  defaultGhostBorderColor: 'transparent'
                }
              }
            }}
          >
            {' '}
            <Button
              //className={cx('home-btn')}
              href='#'
              size={'large'}
            >
              <HomeOutlined style={{ color: 'green' }} />
              Hoa Mai
            </Button>
          </ConfigProvider>
          <Breadcrumb style={{ margin: '0px 24px' }}>
            <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
            <Breadcrumb.Item>Ghi chép canh tác</Breadcrumb.Item>
          </Breadcrumb>
          <Divider orientation='left'>
            <Typography.Title level={3}>Ghi chép canh tác trồng trọt</Typography.Title>
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
              style={{
                width: 500,
                height: 300
              }}
            >
              <Row>
                <Descriptions title={'Mùa vụ hiện tại'} />
              </Row>
              <Row
                style={{
                  width: '66vw',
                  justifyContent: 'center'
                }}
              >
                <Flex
                  style={{
                    width: '60%',
                    height: 200,
                    backgroundColor: '#e9f0e6',
                    borderRadius: 20,
                    //paddingLeft: 20
                    paddingTop: 10
                  }}
                  vertical
                  align='center'
                  justify='center'
                >
                  <Typography.Title level={3}>
                    <CalendarTwoTone twoToneColor={'#cfa524'} />
                    {'    '}Đông xuân {`(${2023})`}
                  </Typography.Title>
                  <Typography.Text strong>25/11 - 25/01</Typography.Text>
                  <Row
                    gutter={16}
                    style={{
                      marginTop: 10,
                      width: '100%',
                      height: 100,
                      justifyContent: 'center'
                    }}
                  >
                    <Col
                      //offset={2}
                      span={10}
                    >
                      <Flex
                        style={{
                          height: '80%',
                          backgroundColor: '#b3eaa0',
                          borderRadius: 20
                        }}
                        vertical
                        align='center'
                        justify='center'
                      >
                        <Typography.Title level={4}>Đã thu hoạch: 0</Typography.Title>
                      </Flex>
                    </Col>
                    <Col
                      offset={2}
                      span={10}
                    >
                      <Flex
                        style={{
                          height: '80%',
                          backgroundColor: '#b3eaa0',
                          borderRadius: 20
                        }}
                        vertical
                        align='center'
                        justify='center'
                      >
                        <Typography.Title level={4}>
                          Năng suất: {`${25}(tạ/m2)`}
                        </Typography.Title>
                      </Flex>
                    </Col>
                  </Row>
                </Flex>
              </Row>
            </Flex>
            <Flex
              vertical
              align='end'
              style={{ width: '100%' }}
            >
              <Col span={20}>
                <Button type='primary'>Xuất PDF</Button>
              </Col>
            </Flex>
            <Col>
              <Descriptions title='Bình quân sản lượng qua các vụ' />
              <Flex
                gap={30}
                justify='center'
                align='center'
                style={{ height: 40, padding: 20, marginBottom:30 }}
              >
                <Typography.Text>Xem theo khoảng thời gian</Typography.Text>
                {'  '}
                <RangePicker disabled />
                <Switch defaultChecked={false} />
              </Flex>
              <ProductionDetailList
                productId='sadsada'
                productions={fakeList.sort(
                  (a, b) =>
                    b.season.startIn.getFullYear() - a.season.startIn.getFullYear()
                )}
              />
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
              <CultTimeline/>
            </Flex>
          </Flex>
        </Content>
      </Flex>
    </>
  );
}
