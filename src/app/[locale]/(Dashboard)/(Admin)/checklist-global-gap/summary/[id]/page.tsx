'use client'
import { Breadcrumb, Button, Card, Cascader, Col, ConfigProvider, Divider, Empty, Flex, Row, Space, Spin, Table, TableColumnsType, Tag } from 'antd';
import { Content } from 'antd/es/layout/layout';
import styles from '../../../adminStyle.module.scss';
import checklistStyle from '../../checklistStyle.module.scss';
import classNames from 'classnames/bind';
import {
  HomeOutlined,
  PlusOutlined,
  DownOutlined,
  LinkOutlined,
  ExportOutlined
} from '@ant-design/icons';
import { AxiosInstance } from 'axios';
import { getSitesService } from '@/services/SuperAdmin/Site/getSiteService';
import { useEffect, useState } from 'react';
import getDataChecklistApi from '@/services/Checklist/getDataChecklistApi';
import { ChecklistDataDef } from '../../models';
import UseAxiosAuth from '@/utils/axiosClient';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

type StatisticsResponseDef = {
    key: string;
    type: string;
    yes: number;
    no: number;
    na: number;
    percent: number;
}
const CheckListSummary = ({ params }: { params: { id: string } }) => {
  const tCom = useTranslations('common');
  const tLbl = useTranslations('Services.Checklist.label');
  const tMsg = useTranslations('Services.Checklist.message');
  const cx = classNames.bind(styles);
  const pageStyle = classNames.bind(checklistStyle);
  const [loading, setLoading] = useState(false);
  const [checklistData, setChecklistData] = useState<ChecklistDataDef>();
  const http = UseAxiosAuth();
  const { data: session, status } = useSession();
  const [dataStatistic, setDataStatistic] = useState<StatisticsResponseDef[]>();
  const [isGlobalGAP, setIsGlobalGAP] = useState<boolean>(false);

  const calculatePercentage = (responseData: StatisticsResponseDef[]) => {
    responseData.forEach((item: StatisticsResponseDef, index: number) => {
      const totalResponses = item.yes + item.no + item.na;
      if (totalResponses != 0) {
        responseData[index].percent = item.yes / totalResponses * 100
      }
    });
    if (responseData[0].percent == 100 && responseData[1].percent >= 90) {
      setIsGlobalGAP(true);
    }
    setDataStatistic(responseData);
  }
  useEffect(() => {
      const getData = async (http: AxiosInstance | null, checklistId : string) => {
          try {
              setLoading(true);
              const responseData = await getDataChecklistApi(http, checklistId);
              setChecklistData(responseData.data.checklistMaster);
              let checklistItemResponses: StatisticsResponseDef[] = [
                {
                  key: '1',
                  type: tLbl('major_must'),
                  yes: 0,
                  no: 0,
                  na: 0,
                  percent: 0
                },
                {
                  key: '2',
                  type: tLbl('minor_must'),
                  yes: 0,
                  no: 0,
                  na: 0,
                  percent: 0
                },
                {
                  key: '3',
                  type: tLbl('recommandation'),
                  yes: 0,
                  no: 0,
                  na: 0,
                  percent: 0
                }
              ];
              responseData.data.checklistMaster.checklistItems.forEach((item: any) => {
                if (item.isResponse) {
                  switch (item.checklistItemResponses[0].result) {
                    case 1:
                      checklistItemResponses[item.checklistItemResponses[0].level - 1].yes += 1;
                      break;
                    case 2:
                      checklistItemResponses[item.checklistItemResponses[0].level - 1].no += 1;
                      break;
                    case 3:
                      checklistItemResponses[item.checklistItemResponses[0].level - 1].na += 1;
                      break;
                    default:
                      break;
                  }
                }
              });
              calculatePercentage(checklistItemResponses);
          } catch (error: unknown) {
              // Assert the type of error to be an instance of Error
              if (error instanceof Error) {
                  throw new Error(`Error calling API: ${error.message}`);
              } else {
                  throw new Error(`Unknown error occurred: ${error}`);
              }
          } finally {
              setLoading(false);
          }
      };
      getData(http, params.id);
  },[http, params.id, tLbl]);

  const columns: TableColumnsType<StatisticsResponseDef> = [
    {
      title: tLbl('type'),
      dataIndex: 'type'
    },
    {
      title: tLbl('yes'),
      dataIndex: 'yes'
    },
    {
      title: tLbl('no'),
      dataIndex: 'no'
    },
    {
      title: 'N/A',
      dataIndex: 'na'
    },
    {
      title: tLbl('satisfy_condition'),
      // dataIndex: 'percent'
      render: (_, item) => (`${item.percent}%`)
    },
  ];
  const breadCrumb = [
    {
        title: <Link href={`/`}>{tCom('home')}</Link>
    },
    {
        title: <Link href={`/checklist-global-gap`}>{tLbl('screen_name_checklist')}</Link>
    },
    {
        title: tLbl('screen_name_summary')
    }
  ];
  return (
    <>
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
        className={cx('home-btn')}
        href='#'
        size={'large'}
    >
        <HomeOutlined />
        {session?.user?.userInfo.siteName}
    </Button>
    </ConfigProvider>
      <Content style={{ padding: '20px 24px' }}>
          <h3>{tLbl('screen_name_summary')}</h3>
          <Breadcrumb style={{ margin: '0px 24px 24px 24px' }} items={breadCrumb} />
          <Spin spinning={loading}>
            {checklistData ? (
              <>
                <Space>
                  <span className={cx('h2-info')}>{checklistData.name}</span>
                  <Button
                      type='primary'
                      htmlType='button'
                      size='small'
                      icon={<ExportOutlined />}
                  >
                      {tLbl('btn_export_pdf')}
                  </Button>
                </Space>
                <Divider />
                <h3>{tLbl('integrated')}</h3>
                <Row>
                  <Col span={6}>
                    <Card size="small" title={tLbl('requirements_achieved')} style={{marginRight: '10px'}}>
                      <p>{`Major must: 100%`}</p>
                      <p>{`Minor must: >= 90%`}</p>
                      <p>{`Recommendation: ${tLbl('encourage_implementation')}`}</p>
                    </Card>
                  </Col>
                  <Col span={14}>
                    {dataStatistic && (
                      <>
                      <Table
                        columns={columns}
                        dataSource={dataStatistic}
                        pagination={false}
                        bordered
                      />
                      </>
                    )}
                  </Col>
                </Row>
                <Row style={{marginTop:'20px'}}>
                  {dataStatistic && isGlobalGAP && (
                    <>
                      <span style={{color: "green", fontWeight:'bold'}}>{tLbl('evaluate')}:&nbsp;</span>
                      <span>{tMsg('msg_evaluate')}</span>
                    </>
                  )}
                </Row>
              </>
            ) : (
              <>
                  <Empty />
              </>
          )}
          </Spin>
      </Content>
    </>
  );
};
export default CheckListSummary;