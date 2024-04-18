'use client';
import {
  Breadcrumb,
  Button,
  ConfigProvider,
  Divider,
  Drawer,
  Flex,
  Form,
  Input,
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
  WarningOutlined,
  SearchOutlined
} from '@ant-design/icons';
import styles from '../adminStyle.module.scss';
import stylesDocumentManagement from './documentStyle.module.scss';
import classNames from 'classnames/bind';
import UseAxiosAuth from '@/utils/axiosClient';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from '@/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { AxiosInstance } from 'axios';
import { DocumentResponse } from './models/document-models';
import FilterSection from './FilterSection/filterSection';
import { DocumentTableColumns } from './Table/colume-types';
import UpdateDocumentDrawer from './UpdateDocumentDrawer/update-document-drawer';
import AddDocumentDrawer from './CreateDocumentDrawer/create-document-drawer';
import getDocumentsApi from '@/services/Admin/Document/getDocumentsApi';
import { deleteDocumentApi } from '@/services/Admin/Document/deleteDocumentApi';

interface SearchForm {
  keyword: string
}

type Props = {};
const DocumentManagement = (props: Props) => {
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken();

  const t = useTranslations('Common');

  //style
  const cx = classNames.bind(styles);
  const styleDocumentManagement = classNames.bind(stylesDocumentManagement);

  const { data: session } = useSession();
  const siteId = session?.user.userInfo.siteId;
  const http = UseAxiosAuth();
  const siteName = session?.user.userInfo.siteName;

  const [form] = Form.useForm<SearchForm>();

  // Navigation
  const router = useRouter();
  const pathName = usePathname();
  const breadCrumb = [
    {
      title: <Link href={`/`}>{t('home')}</Link>
    },
    {
      title: <Link href={`/document`}>Tài liệu</Link>
    }
  ];

  // handle loading data
  const [loading, setLoading] = useState<boolean>(true);
  const [documents, setDocuments] = useState<DocumentResponse[] | undefined>([]);

  const getListDocumentsApi = async (siteId: string | undefined, http: AxiosInstance, keySearch?: string) => {
    // setDocuments([]);
    try {
      let responseData:any;
      if(keySearch=="" || keySearch?.trim()=="" || keySearch==undefined || keySearch==null) { 
        responseData = await getDocumentsApi(siteId, http);
      } else {
        responseData = await getDocumentsApi(siteId, http, keySearch);
      }
      setDocuments(responseData.data as DocumentResponse[]);
      setLoading(false);
      onResetSearchSubmit();
    } catch (error) {
      console.error('Error calling API getListDocumentsApi:', error);
    }
  };


  //handle load details
  const [documentId, setDocumentId] = useState<string>('');
  const [openDocumentDetailDrawer, setOpenDocumentDetailDrawer] = useState<boolean>(false);

 
  const handleDetails = async (id: string) => {
    setDocumentId(id)
    setOpenDocumentDetailDrawer(true);
  };
  const closeDocumentDetailDrawer = () => {
    setOpenDocumentDetailDrawer(false);
  };


  //handle update document
  const [openDocumentUpdateDrawer, setOpenDocumentUpdateDrawer] = useState<boolean>(false);
  const handleUpdate = async (id: string) => {
    setDocumentId(id)
    setOpenDocumentUpdateDrawer(true);
  };
  const closeDocumentUpdateDrawer = () => {
    setOpenDocumentUpdateDrawer(false);
  };


  //handle delete
  const [deleteState, setDeleteState] = useState<boolean>(false);
  const [deleteBtnState, setDeleteBtnState] = useState<boolean>(true);
  const [deletedDocuments, setDeleteDocuments] = useState<React.Key[]>([]);

  const deleteDocument = async (http: AxiosInstance, documentId?: string) => {
    try {
      const res = await deleteDocumentApi(http, documentId);
      getListDocumentsApi(siteId, http);
    } catch (error) {
      console.error('Error calling API Delete Season:', error);
    }
  }

  const checkRowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DocumentResponse[]) => {
      if (selectedRowKeys.length > 0) {
        setDeleteBtnState(false);
        setDeleteDocuments(selectedRowKeys);
      } else {
        setDeleteBtnState(true);
      }
    }
  };
  const handleDelete = (id: string) => {
    deleteDocument(http, id);
  };
  const deleteMultiple = () => {
    deletedDocuments.map(function (item) {
      deleteDocument(http, item.toString());
    });
    setDeleteState(false);
    setDeleteBtnState(true);
  };
  const onChange: TableProps<DocumentResponse>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  //handle add Document
  const [openAddDocument, setOpenAddDocument] = useState(false);

  const showAddDocumentDrawer = () => {
    setOpenAddDocument(true);
  };

  const closeAddDocumentDrawer = () => {
    setOpenAddDocument(false);
  };

      //handle search
      const [searchSubmit, setSearchSubmit] = useState(false);
      const onSearchSubmit = () => {
        setSearchSubmit(true)
      }
      const onResetSearchSubmit = () => {
        setSearchSubmit(false)
      }

  useEffect(() => {
    getListDocumentsApi(siteId, http, form.getFieldValue('keyword'));
  }, [http, siteId, openAddDocument, openDocumentDetailDrawer, openDocumentUpdateDrawer, searchSubmit]);

  return (
    <>
      
      <Content style={{ padding: '20px 20px' }}>
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

        <ConfigProvider
        theme={{
          components: {
            Form: {
              itemMarginBottom: 8
            }
          }
        }}
      >
        <Form
          form={form}
          name='basic'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          autoComplete='off'
          className={styleDocumentManagement('margin-form-item')}
          style={{padding: '0px 24px'}}
        >
          <Form.Item
            label={t('keyword')}
            name='keyword'
          >
            <Input
              placeholder={t('Input_search_text')}
              style={{ width: '50%' }}
            ></Input>
          </Form.Item>
          <Form.Item label=''>
            <Flex
              align='center'
              justify='center'
            >
              <Button
                htmlType='submit'
                className={cx('bg-btn')}
                icon={<SearchOutlined />}
                onClick={onSearchSubmit}
              >
                {t('Search')}
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </ConfigProvider>
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
                  <span>Bạn có muốn xóa những tệp thông tin này?</span>
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
              onClick={showAddDocumentDrawer}
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
                  columns={DocumentTableColumns()}
                  dataSource={documents?.map(document => ({
                    ...document,
                    onDetails: () => handleDetails(document.id!),
                    onDelete: () => handleDelete(document.id!)
                  }))}
                  onChange={onChange}
                  pagination={{
                    showTotal: total => `Total ${total} Items`,
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '20', '30'],
                    total: documents?.length
                  }}
                  scroll={{ x: 'max-content' }}
                  className={cx('table_style')}
                />
              </Content>
            </Layout>
          </Content>
        </ConfigProvider>
        <Drawer
        title="Thông tin chi tiết"
        placement="right"
        onClose={closeDocumentDetailDrawer}
        open={openDocumentDetailDrawer}
        className={styleDocumentManagement('drawer-width')}
      >
       <UpdateDocumentDrawer params={{
            documentId: documentId
          }}></UpdateDocumentDrawer>
      </Drawer>
      <Drawer
        title="Thêm tài liệu mới"
        placement="right"
        onClose={closeAddDocumentDrawer}
        open={openAddDocument}
        className={styleDocumentManagement('drawer-width')}
      >
        <AddDocumentDrawer></AddDocumentDrawer>
      </Drawer>
      </Content>
    </>
  );
};
export default DocumentManagement;
