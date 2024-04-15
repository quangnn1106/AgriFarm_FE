import {
  ActivityByMonthResponse,
  ActivityResponse
} from '@/services/Admin/Activities/Payload/response/activityResponse';
import { useEffect, useRef, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import {
  Avatar,
  Badge,
  Button,
  Calendar,
  CalendarProps,
  Card,
  Col,
  Descriptions,
  Divider,
  Flex,
  List,
  message,
  Row,
  Space,
  Tag,
  theme,
  Tooltip,
  Typography
} from 'antd';
import {
  AppstoreOutlined,
  CalendarTwoTone,
  DeleteTwoTone,
  FireTwoTone,
  HourglassTwoTone,
  PlusOutlined,
  PlusSquareTwoTone,
  PushpinTwoTone,
  RightOutlined,
  RightSquareTwoTone
} from '@ant-design/icons';
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction';
import UseAxiosAuth from '@/utils/axiosClient';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { DateClickArg } from '@fullcalendar/interaction/index.js';
import { usePathname } from 'next/navigation';
import multiMonthPlugin from '@fullcalendar/multimonth';
import useColorGenerator from '@/utils/colorGenerator';
import {
  getActivitiesByDateService,
  getActivitiesByMonthService
} from '@/services/Admin/Activities/activityService';
import HttpResponseCommon from '@/types/response';
import { useRouter } from '@/navigation';

interface IProp {}

export default function ActivityListV2(props: IProp) {
  const calendarRef = useRef<FullCalendar>(null);
  const { token } = theme.useToken();
  const farmRouter = useRouter();
  const http = UseAxiosAuth();
  const colors = useColorGenerator();
  const [activities, setActivities] = useState<ActivityResponse[]>([]);
  const [monthView, setMonthView] = useState<ActivityByMonthResponse[]>([]);
  const [curMonth, setCurMonth] = useState<{ month: number; year: number }>({
    month: new Date().getMonth(),
    year: new Date().getFullYear()
  });
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs(new Date()));
  const [selectedActivity, setSelectedActivity] = useState<ActivityResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  const path = usePathname();

  const fetchMonth = async (month?: number, year?: number) => {
    setIsLoading(true);
    try {
      const res = await getActivitiesByMonthService(http, month, year);
      //console.log('Data: ', res.data);
      if (res) {
        setMonthView(res.data as ActivityByMonthResponse[]);
      }
    } catch {
      //message.error('Loading Fail');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDate = async (date: Date) => {
    setIsLoading(true);
    try {
      const res = await getActivitiesByDateService(http, date);
      if (res) {
        setActivities(res.data as ActivityResponse[]);
      }
    } catch {
      //message.error('Loading Fail');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initLoading) {
      fetchMonth();
      fetchDate(selectedDate.toDate());
      // calendarRef.current?.render();
    }
    return () => {
      setInitLoading(false);
    };
  }, []);

  useEffect(() => {
    if (!initLoading) {
      fetchMonth(curMonth.month, curMonth.year);
    }
  }, [curMonth]);

  useEffect(() => {
    if (!initLoading) {
      fetchDate(selectedDate.toDate());
    }
  }, [selectedDate]);

  const ActivitiesCalendar = () => {
    const handleDateClick = (info: DateClickArg) => {
      const calApi = calendarRef.current?.getApi();
      if (calApi) {
        const curMonth = calApi?.getDate().getMonth();
        if (curMonth > info.date.getMonth()) {
          calApi.prev();
        } else if (curMonth < info.date.getMonth()) {
          calApi.next();
        }
        calApi.select(info.date);
      }

      //info.dayEl.style.backgroundColor = 'red';
      setSelectedDate(dayjs(info.date).add(1, 'day'));
    };

    return (
      <div
        style={{
          height: '100%',
          minHeight: '40vh',
          width: '100%',
          padding: 20,
          maxHeight: '100%'
        }}
      >
        <FullCalendar
          ref={calendarRef}
          height={'100%'}
          viewHeight={'100%'}
          //eventClick={e => handleDateClick(e as any)}
          datesSet={info => {
            const val = dayjs(info.start).add(14, 'day');
            // console.log("Date set data: ", val.toISOString())
            // console.log("Date set y: ", val.year())
            setCurMonth({
              month: val.month() + 1,
              year: val.year()
            });
          }}
          customButtons={{
            customPrev: {
              text: '<',
              click: function () {
                calendarRef.current?.getApi().prev();
              }
            },
            customNext: {
              text: '>',
              click: function () {
                alert('clicked the custom button!');
              }
            }
          }}
          headerToolbar={{
            left: '',
            center: 'title',
            right: 'today prev,next'
          }}
          expandRows
          //navLinks={true}
          //handleWindowResize={true}
          fixedWeekCount={false}
          events={monthView.map(e => ({
            title: `${e.activityCount} activity`,
            start: e.date,
            allDay: true
          }))}
          //eventBackgroundColor='#1480e0'
          eventInteractive={false}
          eventColor='#1480e0'
          plugins={[dayGridPlugin, interactionPlugin]}
          dateClick={e => handleDateClick(e)}
          unselectAuto={true}
          selectable={false}
          nowIndicator={true}
          //eventDisplay='none'
          contentHeight={10}
          // dayCellContent={e => {
          //   return (
          //     <Flex
          //       wrap='wrap'
          //       vertical
          //       align='end'
          //       justify='center'
          //       style={{
          //         width: '100%',
          //         height: '100%',
          //         overflow: 'hidden'
          //       }}
          //     >
          //       <div>{e.date.getDate()}</div>
          //       {!isLoading && mapData(dayjs(e.date))}
          //     </Flex>
          //   );
          // }}
          initialView='dayGridMonth'
          locale={path.substring(1, 3) === 'en' ? 'en' : 'vi'}
        />
      </div>
    );
  };

  return (
    <>
      <Divider orientation='left'>
        <Typography.Title level={3}>Activities</Typography.Title>
      </Divider>
      <Flex
        align='start'
        gap={20}
        vertical
        style={{ width: '100%', paddingInline: '5vw' }}
      >
        <Row
          style={{
            height: '65vh',
            width: '100%'
            //maxHeight: 500
          }}
        >
          <Col
            span={14}
            style={{
              //width: '50vw',
              height: '100%',
              border: `1px solid `,
              borderRadius: token.borderRadiusLG
            }}
          >
            {ActivitiesCalendar()}
          </Col>
          <Col
            offset={1}
            span={6}
          >
            <Flex
              vertical
              align='center'
              justify='center'
              style={{
                width: '100%',
                height: '25%',
                overflow: 'hidden',
                marginBlockEnd: 20,
                border: '1px solid',
                borderRadius: 10
              }}
            >
              <Flex
                gap={10}
                align='center'
                justify='start'
                style={{
                  width: '90%',
                  border: `1px solid ${token.colorBorderSecondary}`,
                  borderRadius: 10,
                  padding: 10,
                  backgroundColor: `${token.colorBorderSecondary}`
                }}
              >
                <Button
                  type='primary'
                  block
                  onClick={() => farmRouter.push('/activities/add')}
                >
                  <Space align='center'>
                    <PlusOutlined
                      style={{ fontSize: '150%' }}
                      twoToneColor={'#60c136'}
                    />{' '}
                    New Activity
                  </Space>
                </Button>
                {/* <Button>
                  <DeleteTwoTone
                    style={{ fontSize: '150%' }}
                    twoToneColor={'#e74040'}
                  />
                </Button> */}
                {/* <Button>
                  <AppstoreOutlined style={{ fontSize: '150%' }} />
                </Button> */}
              </Flex>
              <Space align='baseline'>
                <CalendarTwoTone style={{ fontSize: '150%' }} />
                <Typography.Title
                  level={4}
                  underline
                >
                  {dayjs(selectedDate).add(-1, 'day').format('DD/MM/YYYY')}
                </Typography.Title>
              </Space>
            </Flex>

            <Flex
              vertical
              align='center'
              justify='start'
              style={{
                height: '40vh',
                overflow: 'auto',
                border: '1px solid',
                borderRadius: 10,
                padding: 10
              }}
            >
              <Divider></Divider>

              <Flex
                vertical
                align='center'
                justify='start'
                style={{
                  height: '100%',
                  width: '100%',
                  overflow: 'auto'
                }}
              >
                <List
                  style={{
                    width: '100%'
                  }}
                  loading={isLoading}
                  dataSource={activities}
                  renderItem={item => {
                    return (
                      <Flex
                        //vertical
                        align='center'
                        justify='space-between'
                        key={item.id}
                        //gap={10}
                        style={{
                          width: '100%',
                          height: '10vh',
                          marginBlock: 10,
                          border: '1px solid',
                          borderRadius: 20,
                          padding: 10,
                          minHeight: 80,
                          overflow: 'auto'
                          //backgroundColor: `${colors.get()}`
                        }}
                      >
                        <Col
                          offset={1}
                          span={5}
                        >
                          <Typography.Text strong>
                            {dayjs(item.start).format('HH:mm')}
                          </Typography.Text>
                        </Col>
                        <Col span={10}>
                          <Typography.Text strong>{item.title}</Typography.Text>
                        </Col>
                        <Col span={6}>
                          <Button
                            onClick={() => {
                              //setSelectedActivity(item);
                              farmRouter.push(`/activities/${item.id}`);
                            }}
                          >
                            View
                          </Button>
                        </Col>
                      </Flex>
                    );
                  }}
                ></List>
                {!isLoading && activities.length === 0 && (
                  <Typography.Text type='secondary'>
                    There no activity, add more.
                  </Typography.Text>
                )}
              </Flex>
              <Divider></Divider>
            </Flex>
          </Col>
        </Row>
      </Flex>
    </>
  );
}
