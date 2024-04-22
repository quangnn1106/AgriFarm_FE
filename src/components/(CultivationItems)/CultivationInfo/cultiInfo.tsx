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
import {
  CultivationRecordResponse,
  FarmProductResponse,
  ProductionResponse
} from '@/services/Admin/Productions/Payload/response/production.response';
import dayjs from 'dayjs';
import { CalendarTwoTone, CloudTwoTone, HomeOutlined } from '@ant-design/icons';
import { Content } from 'antd/es/layout/layout';
import classNames from 'classnames';
import CultTimeline from '../TimeLine/timeLine';
import { useSession } from 'next-auth/react';
import { PDFDownloadLink, renderToFile } from '@react-pdf/renderer';
import { MyDocument } from '@/components/(FileExport)/PDF/pdfDraftDoc';
import { useEffect, useState } from 'react';
import PdfTemplate from '@/components/(FileExport)/PDF/pdfCommonTemplate';
import { FakePro } from '../fakeProductions';
import UseAxiosAuth from '@/utils/axiosClient';
import { PaginationResponse } from '@/types/pagination';
import { getFarmCultivationService } from '@/services/Admin/Productions/farmCultivationService';
import { getPaginationResponse } from '@/utils/paginationHelper';
import dynamic from 'next/dynamic';
import { CultDocument } from '@/components/(FileExport)/PDF/cultivationPDFDocument';
// const CultDocument = dynamic(
//   () => import('@/components/(FileExport)/PDF/cultivationPDFDocument').then(mod => mod.CultDocument),
//   {
//     ssr: false,
//     loading: () => <p>Loading...</p>
//   }
// );
const { RangePicker } = DatePicker;
// import styles from '../adminStyle.module.scss';

// const fakeList: ProductionResponse[] = [
//   {
//     output: 10,
//     location: {
//       id: 'adsd-dasda-sdiads',
//       name: 'Mẫu A2'
//     },
//     product: {
//       name: 'Tài Nguyên',
//       id: 'fskksdkj-i4i1929i4-asdnasjdna'
//     },
//     season: {
//       name: 'Đông xuân',
//       id: 'sadadasd.343432',
//       startIn: dayjs('2018-11-25', 'YYYY-MM-DD').toDate(),
//       endIn: dayjs('2019-25-01', 'YYYY-MM-DD').toDate()
//     },
//     unit: 'tấn',
//     harvestDate: dayjs('2020-01-01', 'YYYY-MM-DD').toDate()
//   },

//   {
//     output: 10,
//     location: {
//       id: 'adsd-dasda-sdiads',
//       name: 'Mẫu A2'
//     },
//     product: {
//       name: 'Tài Nguyên',
//       id: 'fskksdkj-i4i1929i4-asdnasjdna'
//     },
//     season: {
//       name: 'Đông xuân',
//       id: 'sadadasd.343432',
//       startIn: dayjs('2019-11-25', 'YYYY-MM-DD').toDate(),
//       endIn: dayjs('2020-25-01', 'YYYY-MM-DD').toDate()
//     },
//     unit: 'tạ',
//     harvestDate: dayjs('2020-01-01', 'YYYY-MM-DD').toDate()
//   },
//   {
//     output: 10,
//     location: {
//       id: 'adsd-dasda-sdiads',
//       name: 'Mẫu A2'
//     },
//     product: {
//       name: 'Tài Nguyên',
//       id: 'fskksdkj-i4i1929i4-asdnasjdna'
//     },
//     season: {
//       name: 'Đông xuân',
//       id: 'sadadasd.343432',
//       startIn: dayjs('2020-11-25', 'YYYY-MM-DD').toDate(),
//       endIn: dayjs('2021-25-01', 'YYYY-MM-DD').toDate()
//     },
//     unit: 'tạ',
//     harvestDate: dayjs('2020-01-01', 'YYYY-MM-DD').toDate()
//   }
// ];

const FakL = FakePro.sort(
  (a, b) => b.season.startIn.getFullYear() - a.season.startIn.getFullYear()
);

export default function CultivationInfo() {
  // const cx = classNames.bind(styles);
  const { data: session } = useSession();
  const siteId = session?.user.userInfo.siteId;
  const siteName = session?.user.userInfo.siteName;
  const [filter, setFilter] = useState(false);
  const [cult, setCult] = useState<CultivationRecordResponse | null>(null);
  const [list, setList] = useState<ProductionResponse[]>(FakL);
  const [isFetching, setIsFetching] = useState(false);
  const [hasChanged, setHasChanged] = useState(true);
  const http = UseAxiosAuth();
  const [page, setPage] = useState<PaginationResponse>({
    CurrentPage: 1,
    PageSize: 5,
    TotalCount: 0,
    TotalPages: 1
  });

  const [search, setSearch] = useState<{ start?: Date; end?: Date } | null>(null);

  const fetchData = async () => {
    try {
      console.log('Fetching data..');
      const responseData = await getFarmCultivationService(
        http,
        page.CurrentPage,
        page.PageSize,
        search ? search.start : undefined,
        search ? search.end : undefined
      );
      console.log('Data here: ', responseData);
      setPage(getPaginationResponse(responseData));
      const body = responseData?.data.data as CultivationRecordResponse
      console.log('body: ', body);
      setCult(body);
      setIsFetching(false);
    } catch (error) {
      console.error('Error calling API training content:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page.CurrentPage, search]);

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
              <HomeOutlined style={{ color: 'green' }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
              {siteName}
            </Button>
          </ConfigProvider>
          <Breadcrumb style={{ margin: '0px 24px' }}>
            <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
            <Breadcrumb.Item>Ghi chép canh tác</Breadcrumb.Item>
          </Breadcrumb>
          <Divider orientation='left'>
            <Typography.Title level={3}>Ghi chép nhật ký canh tác</Typography.Title>
          </Divider>

          {cult && (
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
                      width: '70%',
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
                      <CalendarTwoTone twoToneColor={'#cfa524'} 
                      onPointerEnterCapture={undefined} 
                      onPointerLeaveCapture={undefined} />
                      {/* {'    '}Đông xuân {`(${2024})`} */}
                      {`${cult?.season.title} (${dayjs(cult?.season.startIn).year()})`}
                    </Typography.Title>
                    <Typography.Text strong>
                      {`${dayjs(cult.season.startIn).format('DD/MM')}-${dayjs(
                        cult.season.endIn
                      ).format('DD/MM')}`}
                    </Typography.Text>
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
                          <Typography.Title level={4}>
                            Đã thu hoạch: 0 (kg)
                          </Typography.Title>
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
                  {/* <Button type='primary' onClick={()=>exportPDF()}>Xuất PDF</Button> */}
                  <PDFDownloadLink
                    document={
                      <CultDocument
                        data={
                          cult.productions.filter(e=>dayjs(e.season.startIn).year() === dayjs(new Date()).year()).map(e => ({
                            id: e.id,
                            harvestDate: e.harvestDate,
                            location: e.land.name,
                            output: e.output,
                            unit: e.unit,
                            productName: e.product.name,
                            season: e.season as any
                          })) as any
                        }
                      />
                    }
                    fileName={`Record-${dayjs(new Date).format("YYYY")}.pdf`}
                  >
                    {({ blob, url, loading, error }) => (
                      <Button type='primary'>
                        {loading ? 'Đang tải...' : 'Xuất PDF'}
                      </Button>
                    )}
                  </PDFDownloadLink>
                </Col>
              </Flex>
              <Col>
                <Descriptions title='Bình quân sản lượng qua các vụ' />
                <Flex
                  gap={30}
                  justify='center'
                  align='center'
                  style={{ height: 40, padding: 20, marginBottom: 30 }}
                >
                  <Typography.Text>Xem theo khoảng thời gian</Typography.Text>
                  {'  '}

                  <RangePicker
                    picker='year'
                    // id={{
                    //   start: 'startInput',
                    //   end: 'endInput'
                    // }}
                    placeholder={['Từ', 'Đến']}
                    // onFocus={(_, info) => {
                    //   console.log('Focus:', info.range);
                    // }}
                    // onBlur={(_, info) => {
                    //   console.log('Blur:', info.range);
                    // }}
                    disabled={!filter}
                    onChange={(e, x) => {
                      // const fl = FakL.filter(d =>
                      //   dayjs(d.season.startIn).year()<2021
                      // );
                      // console.log(fl)
                      // setList(fl)
                      setSearch({
                        start: e?.[0]?.toDate(),
                        end: e?.[1]?.toDate()
                      });
                    }}
                  />
                  <Switch
                    defaultChecked={filter}
                    onChange={e => {
                      setFilter(e);
                      if (!e) {
                        setSearch(null);
                      }
                    }}
                  />
                </Flex>
                <ProductionDetailList
                  //productId='sadsada'
                  productions={list}
                />
              </Col>
              <Flex
                vertical
                align='center'
                justify='center'
                style={{
                  marginTop: 40,
                  width: '100%',
                  minHeight: 400
                }}
              >
                <p></p>
                {/* <Bar/> */}
                <CultTimeline />
              </Flex>
            </Flex>
          )}
        </Content>
      </Flex>
    </>
  );
}
