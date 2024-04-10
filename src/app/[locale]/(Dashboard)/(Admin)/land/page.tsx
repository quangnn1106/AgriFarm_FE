'use client';

import React, { useEffect, useState } from 'react';
import {
  Breadcrumb,
  Button,
  ConfigProvider,
  Divider,
  Drawer,
  Flex,
  Layout,
  Modal,
  Space,
  Table,
  TableProps,
  Tooltip,
  theme
} from 'antd';
import { Content } from 'antd/es/layout/layout';
import {
  HomeOutlined,
  PlusOutlined,
  MinusOutlined,
  WarningOutlined
} from '@ant-design/icons';
import FilterSection from './components/FilterSection/filterSection';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import styles from '../adminStyle.module.scss';

import classNames from 'classnames/bind';
import fetchListLandData from '@/services/Admin/Land/getLandsApi';
import { AxiosInstance } from 'axios';
import { Land } from './models/land-model';
import { LandTableColumn } from './components/Table/column-type';
import { useSession } from 'next-auth/react';
import UseAxiosAuth from '@/utils/axiosClient';

import AddLand from './components/ModalAdd/modal';
import UpdateLandModal from './components/update/updateModal';
import { deleteLandApi } from '@/services/Admin/Land/deleteLand';
import { Marker } from 'react-map-gl';
import Pin from '@/components/MapBox/pin';

const cx = classNames.bind(styles);

type Props = {};

const LandPage = (props: Props) => {
  const [createState, setCreateState] = useState<boolean>(false);
  const [updateState, setUpdateState] = useState<boolean>(false);

  const [formModal, setFormModal] = useState<Land>();

  // handle loading data
  const [loading, setLoading] = useState<boolean>(true);
  const [land, setLand] = useState<Land[] | undefined>([]);
  const { data: session } = useSession();
  const siteId = session?.user.userInfo.siteId;
  const http = UseAxiosAuth();
  const siteName = session?.user.userInfo.siteName;
  const getListLLandApi = async (http: AxiosInstance, siteId: string | undefined) => {
    try {
      const responseData = await fetchListLandData(siteId, http);
      setLand(responseData.data as Land[]);
      setLoading(false);
    } catch (error) {
      console.error('Error calling API get list land:', error);
    }
  };
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken();

  const t = useTranslations('Common');
  const breadCrumb = [
    {
      title: <Link href={`/`}>{t('home')}</Link>
    },
    {
      title: <Link href={`/land`}>Land</Link>
    }
  ];

  //handle delete
  const [deleteState, setDeleteState] = useState<boolean>(false);
  const [deleteBtnState, setDeleteBtnState] = useState<boolean>(true);

  const [deletedLands, setDeleteLands] = useState<React.Key[]>([]);
  const checkRowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: Land[]) => {
      if (selectedRowKeys.length > 0) {
        setDeleteBtnState(false);
        setDeleteLands(selectedRowKeys);
      } else {
        setDeleteBtnState(true);
      }
    }
  };
  const deleteLand = async (http: AxiosInstance, landId?: string) => {
    try {
      await deleteLandApi(http, landId);
      getListLLandApi(http, siteId);
    } catch (error) {
      console.error('Error calling API Delete Season:', error);
    }
  };

  const handleDelete = (id: string) => {
    deleteLand(http, id);
  };
  const deleteMultiple = () => {
    deletedLands.map(function (item) {
      deleteLand(http, item.toString());
    });
    setDeleteState(false);
    setDeleteBtnState(true);
  };
  const onChange: TableProps<Land>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  const handleDetails = async (record: Land) => {
    setFormModal(record);
    setUpdateState(true);
  };
  const pinsPositions = React.useMemo(() => {
    return land?.map((city, index) =>
      city.positions.length > 0 ? (
        <Marker
          key={index}
          longitude={city?.positions[0]?.long || 0}
          latitude={city?.positions[0]?.lat || 0}
          anchor='bottom'
          // onClick={e => {
          //   // If we let the click event propagates to the map, it will immediately close the popup
          //   // with `closeOnClick: true`
          //   e.originalEvent.stopPropagation();
          //   setPopupInfo(city);
          // }}
        >
          <>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Pin /> <span className='red'>{city?.name ? city?.name : ''}</span>
            </div>
          </>
        </Marker>
      ) : (
        ''
      )
    );
  }, [land]);
  useEffect(() => {
    getListLLandApi(http, siteId);
  }, [http, siteId, createState, formModal, updateState]);
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
            className='home-btn'
            href='/'
            size={'large'}
          >
            <HomeOutlined />
            Hạt Ngọc Cửu Long
            {/* {siteName} */}
          </Button>
        </ConfigProvider>
        <Breadcrumb
          style={{ margin: '0px 24px' }}
          items={breadCrumb}
        ></Breadcrumb>
        <Divider
          orientation='left'
          plain
          style={{ margin: '0px' }}
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
              onClick={() => {
                setDeleteState(true);
              }}
            />
            <Modal
              title={
                <div>
                  <WarningOutlined style={{ color: 'red', paddingRight: '4px' }} />
                  <span>Do you want to delete this Lands?</span>
                </div>
              }
              open={deleteState}
              onOk={deleteMultiple}
              onCancel={() => {
                setDeleteState(false);
              }}
              centered={true}
              cancelText={t('Cancel')}
              okText={t('Yes')}
              okButtonProps={{ type: 'primary', danger: true }}
            ></Modal>
          </Tooltip>
          <Tooltip title={t('Add_new')}>
            <Button
              className={cx('bg-btn')}
              icon={<PlusOutlined />}
              onClick={() => setCreateState(true)}
            />
            <AddLand
              params={{
                siteId: siteId,
                visible: createState,
                onCancel: () => setCreateState(false),
                pinsPositions: pinsPositions
              }}
            />
            <UpdateLandModal
              params={{
                visible: updateState,
                onCancel: () => setUpdateState(false),
                dataRow: formModal,
                pinsPositions: pinsPositions
              }}
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
                  onRow={(record, rowIndex) => {
                    return {
                      onClick: event => {
                        //    console.log('record row onCLick: ', record);
                        //console.log('event row onCLick: ', event);
                        const target = event.target as HTMLElement;
                        const isWithinLink =
                          target.tagName === 'A' || target.closest('a');

                        const isWithinAction =
                          target.closest('td')?.classList.contains('ant-table-cell') &&
                          !target
                            .closest('td')
                            ?.classList.contains('ant-table-selection-column') &&
                          !target
                            .closest('td')
                            ?.classList.contains('ant-table-cell-fix-right');

                        if (isWithinAction && !isWithinLink) {
                          console.log('record land: ', record);

                          handleDetails(record);
                        }
                      } // click row
                    };
                  }}
                  columns={LandTableColumn()}
                  dataSource={land?.map(lands => ({
                    ...lands,
                    // onDetails: () => handleDetails(fertilizer.id!),
                    onDelete: () => handleDelete(lands.id!)
                    // onUpdate: () => handleUpdate(fertilizer.id!)
                  }))}
                  onChange={onChange}
                  pagination={{
                    showTotal: total => `Total ${total} Items`,
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '20', '30'],
                    total: land?.length
                  }}
                  scroll={{ x: 'max-content' }}
                  className='table_style'
                />
              </Content>
            </Layout>
          </Content>
        </ConfigProvider>
      </Content>
    </>
  );
};

export default LandPage;
