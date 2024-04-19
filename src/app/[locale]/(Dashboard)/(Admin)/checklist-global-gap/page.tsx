'use client';
import {
  Breadcrumb,
  Button,
  ConfigProvider,
  Divider,
  Dropdown,
  MenuProps,
  Space,
  Table,
  TableColumnsType,
  TablePaginationConfig,
  TableProps,
  Tag,
  message
} from 'antd';
import { Content } from 'antd/es/layout/layout';
import { AppstoreAddOutlined, CheckCircleOutlined, CloseCircleOutlined, EditOutlined, EllipsisOutlined, ExclamationCircleOutlined, HomeOutlined, PlusOutlined, SyncOutlined } from '@ant-design/icons';
import styles from '../adminStyle.module.scss';
import checklistStyle from './checklistStyle.module.scss';
import classNames from 'classnames/bind';
import FilterSection from './component/FilterSection/filterSection';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ChecklistMappingDef, SearchConditionDef } from './models';
import { AxiosInstance } from 'axios';
import UseAxiosAuth from '@/utils/axiosClient';
import checklistApi from '@/services/Checklist/checklistApi';
import { useRouter } from "next/navigation";
import { usePathname } from "@/navigation";
import { useSession } from 'next-auth/react';
import getLatestVersionApi from '@/services/Checklist/getLatestVersionApi';
import addNewChecklistApi from '@/services/Checklist/addNewChecklistApi';
import { CHECKLIST_IMPLEMENT } from '@/constants/routes';

interface TableParams {
  pagination?: TablePaginationConfig;
}
const CheckListInspection = () => {
  const cx = classNames.bind(styles);
  const pageStyle = classNames.bind(checklistStyle);
  const [checkListData, setChecklistData] = useState<ChecklistMappingDef[]>([]);
  const http = UseAxiosAuth();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const tCom = useTranslations('common');
  const tLbl = useTranslations('Services.Checklist.label');
  const tMsg = useTranslations('Services.Checklist.message');
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const pathName = usePathname();
  const [searchCodition, setSearchCondition] = useState<SearchConditionDef>();
  const { data: session, status } = useSession();
  const roles = session?.user?.userInfo.role;
  const [latestVersion, setLatestVersion] = useState();

  useEffect(() => {
    const getData = async (http: AxiosInstance | null) => {
        try {
            setLoading(true);
            let searchCondition: SearchConditionDef = {
              perPage: 10,
              pageId: 1
            };
            const responseData = await checklistApi(http, searchCondition);
            const normalizedData: ChecklistMappingDef[] = responseData['data'].map(
                (item: ChecklistMappingDef, index: number) => ({
                    key : item.id,
                    no: index + 1,
                    checklistName: item.checklistMaster.name,
                    checklistMasterId: item.checklistMaster.id,
                    startDate: item.startDate,
                    endDate: item.endDate,
                    status: item.status,
                    createdDate: item.createdDate
                })
            );
            setChecklistData(normalizedData);
            const pagination: TablePaginationConfig = {
                pageSize: 10,
                current: 1
            }
            setTableParams({
                ...pagination,
                pagination: {
                  ...pagination,
                  total: responseData.pagination.totalRecord,
                },
              });
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
    const getLatestVersion = async (http: AxiosInstance | null) => {
      try {
        const latestVersion = await getLatestVersionApi(http);
        setLatestVersion(latestVersion.data);
      } catch (error) {
        console.log(error);
      }
    };
    getLatestVersion(http);
    getData(http);
  }, [http, session?.user?.userInfo.id]);
  const searchAction = async (saerchCondition: SearchConditionDef | undefined, pagination: TablePaginationConfig) => {
    const searchCondition: SearchConditionDef = {
        keyword: saerchCondition?.keyword,
        searchByDate: saerchCondition?.searchByDate,
        status: saerchCondition?.status,
        perPage: pagination?.pageSize,
        pageId: pagination?.current
    };
    try {
        setLoading(true);
        const responseData = await checklistApi(http, searchCondition);
        const normalizedData: ChecklistMappingDef[] = responseData['data'].map(
            (item: ChecklistMappingDef, index: number) => ({
              key : item.id,
              no: index + 1,
              checklistName: item.checklistMaster.name,
              checklistMasterId: item.checklistMaster.id,
              startDate: item.startDate,
              endDate: item.endDate,
              status: item.status,
              createdDate: item.createdDate
            })
        );
        setChecklistData(normalizedData);
        setTableParams({
            ...pagination,
            pagination: {
              ...pagination,
              total: responseData.pagination.totalRecord,
            },
          });
    } catch (error) {
        console.error('Error calling API:', error);
    } finally {
        setLoading(false);
    }
  }
  const handleTableChange: TableProps['onChange'] = (pagination) => {
      setTableParams({
        pagination
      });
      console.log(searchCodition);
      searchAction(searchCodition, pagination);
      // `dataSource` is useless since `pageSize` changed
      if (pagination.pageSize !== tableParams.pagination?.pageSize) {
        setChecklistData([]);
      }
    };
  const breadCrumb = [
    {
        title: <Link href={`/`}>{tCom('home')}</Link>
    },
    {
        title: tLbl('screen_name_checklist')
    }
  ];
  const addNew = async () => {
    try {
      const id = latestVersion &&  await addNewChecklistApi(http, session?.user?.userInfo.id as string, latestVersion);
      router.push(`${CHECKLIST_IMPLEMENT}/${id}`);
    } catch (error) {
      console.log(error);
    }
  }
  const addNewChecklist = async (checklistMasterId: string) => {
    try {
      const id = await addNewChecklistApi(http, session?.user?.userInfo.id as string, checklistMasterId);
      router.push(`${CHECKLIST_IMPLEMENT}/${id}`);
    } catch (error) {
      console.log(error);
    }
  }
  const CheckListInspectionTableColumn: TableColumnsType<ChecklistMappingDef> = [
    {
        title: '#',
        dataIndex: 'no',
        width: '5%',
    },
    {
        title: tLbl('checklist_name'),
        render: (_,checklist) => (
          checklist.checklistName
        )
    },
    {
        title: tLbl('checklist_start_date'),
        // dataIndex: 'startDate',
        width: '15%',
        render: (_, item) => {
          if (item.startDate) {
            const date = new Date(item.startDate);
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            return `${year}-${month}-${day}`;
          }
      }
    },
    {
        title: tLbl('checklist_end_date'),
        // dataIndex: 'endDate',
        width: '15%',
        render: (_, item) => {
          if (item.endDate) {
            const date = new Date(item.endDate);
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            return `${year}-${month}-${day}`;
          }
      }
    },
    {
        title: tLbl('checklist_status'),
        width: '15%',
        render: (_,checklist) => {
            if (checklist.status == 1) {
                return (<Tag icon={<SyncOutlined spin={false}/>} color="processing">{tLbl('in_progress')}</Tag>)
            } else if (checklist.status == 2) {
                return (<Tag icon={<CheckCircleOutlined />} color="success">{tLbl('done')}</Tag>)
            } else {
              return (<Tag icon={<CloseCircleOutlined />} color="error">{tLbl('not_yet')}</Tag>)
            }
        }
    },
    {
        title: tLbl('checklist_create_date'),
        // dataIndex: 'createdDate',
        width: '15%',
        render: (_, item) => {
          const date = new Date(item.createdDate);
          const year = date.getFullYear();
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const day = date.getDate().toString().padStart(2, '0');
          return `${year}-${month}-${day}`;
      }
    },
    {
        title: '',
        width: '5%',
        render: (_,item) => {
            const renderItems = (
                id: string
            ): MenuProps['items'] => {
                return [
                    {
                        label: (
                            <a
                                onClick={() => {
                                    router.push(`${CHECKLIST_IMPLEMENT}/${id}`);
                                }}
                            >
                                <Space>
                                <ExclamationCircleOutlined /> {tCom('btn_implement')}
                                </Space>
                            </a>
                        ),
                        key: '0'
                    },
                    {
                        type: 'divider'
                    },
                    {
                        label: (
                            <a
                            onClick={() => {
                                router.push(`${CHECKLIST_IMPLEMENT}/${id}`);
                            }}
                            >
                            <Space>
                                <EditOutlined /> {tCom('btn_result')}
                            </Space>
                            </a>
                        ),
                        key: '1'
                    },
                    {
                        type: 'divider'
                    },
                    {
                        label: (
                            <a
                            onClick={() => {
                              addNewChecklist(item.checklistMasterId)
                            }}
                            >
                            <Space>
                                <AppstoreAddOutlined /> {tLbl('btn_add_new')}
                            </Space>
                            </a>
                        ),
                        key: '2'
                    }
                ];
            };
            return (
                <Dropdown
                    menu={{
                    items: renderItems(
                        item.key!
                    )
                    }}
                    key={item.id}
                >
                    <a onClick={e => e.preventDefault()} key={item.id}>
                        <Space>
                        <Button
                            type='text'
                            icon={<EllipsisOutlined />}
                        ></Button>
                        </Space>
                    </a>
                </Dropdown>
            )
        }
    }
  ]
  const handleDetails = async (id: string) => {
  };
  const handleDelete = (id: string) => {};
  const handleUpdate = async (id: string) => {
  };

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
      <Content style={{ padding: '20px 48px' }}>
        <h3>{tLbl('screen_name_checklist')}</h3>
        <Breadcrumb style={{ margin: '0px 24px 24px 24px' }} items={breadCrumb} />
        <Divider orientation='left' plain >{tLbl('search_condition')}</Divider>
        <FilterSection searchAction={searchAction} setSearchCondition={setSearchCondition}></FilterSection>
        <Divider orientation='left' plain >{tLbl('search_result')}</Divider>
        <ConfigProvider
          theme={{
            components: {
              Table: {
                cellPaddingBlock: 8,
                headerSortHoverBg: '#F2F3F5',
                borderColor: '#F2F3F5',
                rowHoverBg: '#F2F3F5'
              }
            }
          }}
        >
          <Button
              type="primary"
              style={{marginTop: '20px', marginBottom: '10px'}}
              // onClick={() => console.log(form.getFieldsValue())}
              icon={<PlusOutlined />}
              disabled= {latestVersion ? false : true}
              onClick={addNew}
          >
              {tCom('btn_add')}
          </Button>
          <Table
              rowKey={(record) => record.key}
              dataSource={checkListData}
              columns={CheckListInspectionTableColumn}
              pagination={
                  {
                    ...tableParams.pagination,
                    showTotal: total => `Total ${total} Items`,
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '20', '30']
                  }
              }
              loading={loading}
              scroll={{ x: 'max-content' }}
              className={cx('table_style')}
              onChange={handleTableChange}
            />
        </ConfigProvider>
      </Content>
    </>
  );
};
export default CheckListInspection;
