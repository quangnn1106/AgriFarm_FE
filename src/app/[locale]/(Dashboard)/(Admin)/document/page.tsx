'use client';
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
import styles from '../adminStyle.module.scss';
import stylesSupplierManagement from '../(supply)/supplierStyle.module.scss';
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
import UpdateDocumentDrawer from './UpdateSupplierDrawer/update-document-drawer';
import AddDocumentDrawer from './CreateDocumentDrawer/create-document-drawer';


type Props = {};
const DocumentManagement = (props: Props) => {
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken();

  const t = useTranslations('Common');

  //style
  const cx = classNames.bind(styles);
  const styleSupplierManagement = classNames.bind(stylesSupplierManagement);

  const { data: session } = useSession();
  const siteId = session?.user.userInfo.siteId;
  const http = UseAxiosAuth();
  const siteName = session?.user.userInfo.siteName;

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

  const getListDocumentsApi = async (http: AxiosInstance) => {
    // setDocuments([]);
    // try {
    //   const responseData = await getDocumentsApi(http);
    //   setDocuments(responseData.data as DocumentResponse[]);
    //   setLoading(false);
    // } catch (error) {
    //   console.error('Error calling API getListDocumentsApi:', error);
    // }
    setDocuments([
      {
          "id": "A0",
          "name": "Document 1",
          "fileLink": "http://www.example.com/1.png",
          "createdDate": "15/7/2023",
      },
      {
          "id": "A1",
          "name": "Document 2",
          "fileLink": "http://www.example.com/2.png",
          "createdDate": "8/4/2022",
      },
      {
          "id": "A2",
          "name": "Document 3",
          "fileLink": "http://www.example.com/3.png",
          "createdDate": "25/12/2024",
      },
      {
          "id": "A3",
          "name": "Document 4",
          "fileLink": "http://www.example.com/4.png",
          "createdDate": "10/9/2023",
      },
      {
          "id": "A4",
          "name": "Document 5",
          "fileLink": "http://www.example.com/5.png",
          "createdDate": "3/11/2022",
      },
      {
          "id": "A5",
          "name": "Document 6",
          "fileLink": "http://www.example.com/6.png",
          "createdDate": "18/6/2024",
      }
  ]
  );
    // for (let i = 0; i< 10; i++) {
    //     documents?.push({
    //         id: 'A'+i,
    //         name: 'Tài Liệu',
    //         fileLink: 'http://www.baidu.com/yyy.png',
    //         createdDate: '20-10-2024',
    //         type: 'Tài liệu'
    //     })
    // }
    setLoading(false);
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

  const deleteDocument = async (http: AxiosInstance, seasonId?: string) => {
    // try {
    //   const res = await deleteDocumentApi(http, seasonId);
    //   getListDocumentsApi (http);
    // } catch (error) {
    //   console.error('Error calling API Delete Season:', error);
    // }
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

  useEffect(() => {
    getListDocumentsApi(http);
  }, [http, siteId, openAddDocument, openDocumentDetailDrawer, openDocumentUpdateDrawer]);

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
                  <span>Do you want to delete this documents?</span>
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
        title="Details Document"
        placement="right"
        onClose={closeDocumentDetailDrawer}
        open={openDocumentDetailDrawer}
        className={styleSupplierManagement('drawer-width')}
      >
       <UpdateDocumentDrawer params={{
            documentId: documentId
          }}></UpdateDocumentDrawer>
      </Drawer>
      <Drawer
        title="Thêm giống mới"
        placement="right"
        onClose={closeAddDocumentDrawer}
        open={openAddDocument}
        className={styleSupplierManagement('drawer-width')}
      >
        <AddDocumentDrawer></AddDocumentDrawer>
      </Drawer>
      </Content>
    </>
  );
};
export default DocumentManagement;
