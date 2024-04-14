'use client';

import {
  Breadcrumb,
  Button,
  ConfigProvider,
  Divider,
  Flex,
  Layout,
  Table,
  TableColumnsType,
  TablePaginationConfig,
  TableProps,
  Tag,
  Tooltip,
  message,
  theme
} from 'antd';
import { Content } from 'antd/es/layout/layout';
import { HomeOutlined, PlusOutlined } from '@ant-design/icons';
import styles from '../adminStyle.module.scss';
import checklistStyle from './checklistStyle.module.scss';
import classNames from 'classnames/bind';
import FilterSection from './component/FilterSection/filterSection';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import CheckListInspectionTableColumn from './component/Table/CheckListInspection/column-type';
import { ChecklistMappingDef, SearchConditionDef } from './models';
import { AxiosInstance } from 'axios';
import UseAxiosAuth from '@/utils/axiosClient';
import checklistApi from '@/services/Checklist/checklistApi';
import { useRouter } from "next/navigation";
import { usePathname } from "@/navigation";
import { useSession } from 'next-auth/react';
import { ROLES } from '@/constants/roles';

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

  useEffect(() => {
    const getData = async (http: AxiosInstance | null) => {
        try {
            setLoading(true);
            let searchCondition: SearchConditionDef = {
              perPage: 10,
              pageId: 1
            };
            if (roles != ROLES.SUPER_ADMIN) {
              const userId = session?.user?.userInfo.id;
              searchCondition = {
                userId: userId
              }
            }
            const responseData = await checklistApi(http, searchCondition);
            const normalizedData: ChecklistMappingDef[] = responseData['data'].map(
                (item: ChecklistMappingDef, index: number) => ({
                    key : item.id,
                    no: index + 1,
                    checklistName: item.checklistMaster.name,
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
    getData(http);
  }, [http, roles, session?.user?.userInfo.id]);
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
          <Table
              rowKey={(record) => record.key}
              dataSource={checkListData}
              columns={CheckListInspectionTableColumn()}
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
