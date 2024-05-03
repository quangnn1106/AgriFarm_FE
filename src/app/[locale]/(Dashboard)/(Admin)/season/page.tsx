/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import { useEffect, useState } from 'react';
import { SeasonModel } from './models/season-model';
import UseAxiosAuth from '@/utils/axiosClient';
import {
  Breadcrumb,
  Button,
  ConfigProvider,
  Divider,
  Flex,
  Layout,
  Modal,
  Table,
  TableProps,
  Tooltip,
  theme
} from 'antd';
import { Content } from 'antd/es/layout/layout';


import { HomeOutlined, PlusOutlined, MinusOutlined,WarningOutlined } from '@ant-design/icons';

import styles from '../adminStyle.module.scss';
import classNames from 'classnames/bind';
import FilterSection from './component/FilterSection/filterSection';
import getListSeasonApi from '@/services/Admin/Season/getSeasonsApi';
import { usePathname, useRouter } from '@/navigation';
import { AxiosInstance } from 'axios';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { deleteSeasonApi } from '@/services/Admin/Season/deleteSeasonApi';

import { useTranslations } from "next-intl";
import { SeasonTableColumns } from './component/Table/column-types';


type Props = {};
const SeasonManagement = (props: Props) => {
//style 
  const cx = classNames.bind(styles);

  const t = useTranslations('Common');
  const tSeason = useTranslations('Season');

// get id user
  const { data: session } = useSession();
  const siteId = session?.user.userInfo.siteId;
  const http = UseAxiosAuth();
  const siteName = session?.user.userInfo.siteName;

// list
  const [loading, setLoading] = useState(true);
  const [seasons, setSeasons] = useState<SeasonModel[]>([]);
//  details
 // const [seasonId, setSeasonId] = useState<string>('');
// action add, update, filter
  // const [updateState, setUpdateState] = useState<boolean>(false);
  // const [filterUsers, setFilterUsers] = useState<SeasonModel[]>([]);
  // const [filterMode, setFilterMode] = useState<string>('updated_at');



// Navigation
  const router = useRouter();
  const pathName = usePathname();

    //breadcrumb
  // const HOMEURL = getURL();
  const breadCrumb = [
    {
        title: <Link href={`/`}>{t('home')}</Link>
    },
    {
        title: <Link href={`/season`}>{tSeason('season')}</Link>
    }
];

// Get list Season Data
  const getDataListSeason = async (http: AxiosInstance, siteId?: string) => {
    try {
      const responseData = await getListSeasonApi(siteId, http);
      setSeasons(responseData.data as SeasonModel[]);
      setLoading(false);
    } catch (error) {
      console.error('Error calling API getListSeasons:', error);
    }
  };



  //handle delete season
  const [deleteState, setDeleteState] = useState<boolean>(false);
  const [deleteBtnState, setDeleteBtnState] = useState<boolean>(true);
  const [deletedSeasons, setDeleteSeasons] = useState<React.Key[]>([]);

  const handleDelete = (id: string) => {
    deleteSeason(http, id);
  };
  const deleteSeason = async (http: AxiosInstance, seasonId?: string) => {
    try {
      const res = await deleteSeasonApi(http, seasonId);
      getDataListSeason(http, siteId);
    } catch (error) {
      console.error('Error calling API Delete Season:', error);
    }
  }
  const checkRowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: SeasonModel[]) => {
      if (selectedRowKeys.length > 0) {
        setDeleteBtnState(false);
        setDeleteSeasons(selectedRowKeys);
      } else {
        setDeleteBtnState(true);
      }
    }
  };

  const deleteMultiple = () => {
    deletedSeasons.map(function (item) {
      deleteSeason(http, item.toString());
    });
    setDeleteState(false);
    setDeleteBtnState(true);
  }

  useEffect(() => {
    getDataListSeason(http, siteId);
  }, [ http, siteId, deleteBtnState]);

  const handleUpdate = async (id: string) => {
    // setSeasonId(id);
    // setUpdateState(true);
    router.push(`${pathName}/details/${id}`);
  };
  const handleDetails = async (id: string) => {
    // setSeasonId(id);
    router.push(`${pathName}/details/${id}`);
  };

  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken();

  const onChange: TableProps<SeasonModel>['onChange'] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log('params', pagination, filters, sorter, extra);
  };


  return (
    <>
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
          <Button
            className={cx('home-btn')}
            href='/'
            size={'large'}
          >
            <HomeOutlined />
            {siteName}
          </Button>
        </ConfigProvider>
        <Breadcrumb style={{ margin: '0px 24px' }} items={breadCrumb}>
        </Breadcrumb>

        <Divider
          orientation='left'
          plain
          style={{margin: '0px'}}
        >
          {t('search_condition')}
        </Divider>
        <FilterSection></FilterSection>
        <Divider
          orientation='left'
          plain
        >
          {t('search_result')}
        </Divider>
        <Flex
          justify={'flex-end'}
          align={'center'}
          className={cx('flex-space')}
          style={{ paddingRight: '24px' }}
        >
          <Tooltip title={t('Delete')}>
            <Button
              type='primary'
              danger
              icon={<MinusOutlined />}
              disabled={deleteBtnState}
              onClick={()=> {setDeleteState(true)}}
            />
            {/* {<WarningOutlined style={{color: 'red'}}/><p>Do you really want to delete this season ?</p>} */}
            <Modal 
            title={<div><WarningOutlined style={{color: 'red', paddingRight: '4px'}}/><span>{tSeason('delete_confirm_sentence')}</span></div>} 
            open={deleteState} onOk={deleteMultiple} 
            onCancel={() => {setDeleteState(false)}} 
            centered={true}
            cancelText={t('Cancel')}
            okText={t('Yes')}
            okButtonProps={{type: 'primary', danger:true}}
            >

            </Modal>
          </Tooltip>
          <Tooltip title={t('Add_new')}>
            <Button
              className={cx('bg-btn')}
              icon={<PlusOutlined/>}
              href='season/add'
            />
          </Tooltip>
        </Flex>
        <ConfigProvider
          theme={{
            components: {
              Table: {
                cellPaddingBlock: 8,
                headerSortHoverBg: '#F2F3F5',
                borderColor: '#F2F3F5',
                headerBg: '#F2F3F5',
                rowHoverBg: '#F2F3F5'
              }
            }
          }}
        >
          <Content style={{ padding: '0px' }}>
            <Layout
              style={{
                padding: '0px 0',
                background: colorBgContainer,
                borderRadius: borderRadiusLG
              }}
            >
              <Content style={{ padding: '0 24px', minHeight: 280 }}>
                <Table
                  loading={loading}
                  rowKey={'id'}
                  bordered
                  rowSelection={{
                    type: 'checkbox',
                    ...checkRowSelection
                  }}
                  columns={SeasonTableColumns()}
                  dataSource={seasons?.map(season => ({
                    ...season,
                    onDetails: () => handleDetails(season.id!),
                    onDelete: () => handleDelete(season.id!),
                    onUpdate: () => handleUpdate(season.id!)
                  }))}
                  onChange={onChange}
                  pagination={{
                    showTotal: total => `Total ${total} Items`,
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '20', '30'],
                    total: seasons.length
                  }}
                  scroll={{ x: 'max-content' }}
                  className={cx('table_style')}
                />
              </Content>
            </Layout>
          </Content>
        </ConfigProvider>
      </Content>
    </>
  );
};
export default SeasonManagement;
