'use client';

import {
  Breadcrumb,
  Button,
  ConfigProvider,
  Flex,
  Layout,
  Table,
  TableProps,
  Tooltip,
  theme
} from 'antd';
import { Content } from 'antd/es/layout/layout';
import React, { useEffect, useState } from 'react';
import styles from '../mem.module.scss';
import classNames from 'classnames/bind';
import { CerTableColumns } from './components/Table/column-type';
import { CertificationResponse } from '@/services/Admin/Certificates/payload/response/certificate';
import {
  getCertsService,
  getMemCertsService
} from '@/services/Admin/Certificates/getAllCertificates';
import { AxiosInstance } from 'axios';
import UseAxiosAuth from '@/utils/axiosClient';
import { useSession } from 'next-auth/react';
import ActionBox from './components/Actions/actionBox';
import {
  HomeOutlined,
  MinusOutlined,
  PlusOutlined,
  WarningOutlined
} from '@ant-design/icons';
import AddCertificate from './components/AddCertiModal/modalAdd';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import { CERTIFICATE_PATH } from '@/constants/routes';
import { deleteCerApi } from '@/services/Admin/Certificates/deleteCer';
import ModalCustom from '@/components/ModalCustom/ModalCustom';
const cx = classNames.bind(styles);
type Props = {};

const MemCertificate = (props: Props) => {
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken();
  const { data: session } = useSession();
  const siteId = session?.user.userInfo.siteId;
  const siteName = session?.user.userInfo.siteName;
  const t = useTranslations('Common');
  const c = useTranslations('Certificate');
  const breadCrumb = [
    {
      title: <Link href={`/`}>{t('home')}</Link>
    },
    {
      title: <Link href={CERTIFICATE_PATH}>{c('Cer')}</Link>
    }
  ];

  const http = UseAxiosAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [createState, setCreateState] = useState<boolean>(false);
  const [certificate, setCertificate] = useState<CertificationResponse[] | []>([]);

  const getListCertsApi = async (http: AxiosInstance, siteId: string | undefined) => {
    try {
      const responseData = await getMemCertsService(undefined, http);
      setCertificate(responseData.data as CertificationResponse[]);
      setLoading(false);
    } catch (error) {
      console.error('Error calling API getListCerApi:', error);
    }
  };

  useEffect(() => {
    getListCertsApi(http, siteId);
  }, [http, siteId, createState]);

  //handle delete
  const [deleteState, setDeleteState] = useState<boolean>(false);
  const [deleteBtnState, setDeleteBtnState] = useState<boolean>(true);
  const [deletedCertificates, setDeletedCertificates] = useState<React.Key[]>([]);
  const deletedCert = async (http: AxiosInstance, seasonId?: string) => {
    try {
      const res = await deleteCerApi(http, seasonId);
      getListCertsApi(http, siteId);
    } catch (error) {
      console.error('Error calling API Delete Season:', error);
    }
  };
  const checkRowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: CertificationResponse[]) => {
      if (selectedRowKeys.length > 0) {
        setDeleteBtnState(false);
        setDeletedCertificates(selectedRowKeys);
      } else {
        setDeleteBtnState(true);
      }
    }
  };
  const handleDelete = (id: string) => {
    deletedCert(http, id);
  };
  const deleteMultiple = () => {
    deletedCertificates.map(function (item) {
      deletedCert(http, item.toString());
    });
    setDeleteState(false);
    setDeleteBtnState(true);
  };
  const onChange: TableProps<CertificationResponse>['onChange'] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  return (
    <Content style={{ padding: '20px 0px' }}>
      <Flex
        justify={'flex-end'}
        align={'center'}
        className='flex-center'
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
          <ModalCustom
            title={
              <div>
                <WarningOutlined style={{ color: 'red', paddingRight: '4px' }} />
                <span>{c('deleteConfirm')}?</span>
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
          ></ModalCustom>
        </Tooltip>
        <Tooltip title={t('Add_new')}>
          <Button
            className='bg-btn'
            icon={<PlusOutlined />}
            onClick={() => setCreateState(true)}
          />
        </Tooltip>
        <AddCertificate
          params={{
            visible: createState,
            onCancel: () => setCreateState(false)
          }}
        />
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
                columns={CerTableColumns()}
                dataSource={certificate?.map(cer => ({
                  ...cer,
                  // onDetails: () => handleDetails(cer.id!),
                  onDelete: () => handleDelete(cer.id!)
                  // onViewHistory: () => onViewHistory(cer.id!)
                }))}
                onChange={onChange}
                pagination={{
                  showTotal: total => `Total ${total} Items`,
                  showSizeChanger: true,
                  pageSizeOptions: ['10', '20', '30'],
                  total: certificate?.length
                }}
                scroll={{ x: 'max-content' }}
                className='table-style'
              />
            </Content>
          </Layout>
        </Content>
      </ConfigProvider>
    </Content>
  );
};

export default MemCertificate;
