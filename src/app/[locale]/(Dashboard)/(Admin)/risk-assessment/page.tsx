'use client'
import { Content } from "antd/es/layout/layout";
import styles from "./components/risk-assessment-style.module.scss";
import classNames from 'classnames/bind';
import { useTranslations } from "next-intl";
import { App, Breadcrumb, Button, ConfigProvider, Dropdown, Form, Input, MenuProps, Modal, Radio, RadioChangeEvent, Space, Tag, message } from "antd";
import { useEffect, useState } from "react";
import UseAxiosAuth from "@/utils/axiosClient";
import { AxiosInstance } from "axios";
import { RiskMasterListDef, SearchConditionDef } from "./interface";
import riskAssessmentListMasterApi from "@/services/RiskAssessment/riskAssessmentListMasterApi";
import Table, { ColumnsType, TablePaginationConfig, TableProps } from "antd/es/table";
import {
  DeleteOutlined,
  EllipsisOutlined,
  ExclamationCircleOutlined,
  EditOutlined,
  WarningOutlined,
  PushpinTwoTone,
  DeleteTwoTone,
  PlusOutlined,
  HomeOutlined
} from '@ant-design/icons';
import { useRouter } from "next/navigation";
import riskAssessmentDeleteApi from "@/services/RiskAssessment/riskAssessmentDeleteApi";
import { STATUS_OK } from "@/constants/https";
import { Link, usePathname } from "@/navigation";
import { useSession } from "next-auth/react";

interface ColoredLineProps {
    text: string;
}

interface TableParams {
    pagination?: TablePaginationConfig;
}

const List = () => {
    const tCom = useTranslations('common');
    const tLbl = useTranslations('Services.RiskAsm.label');
    const tMsg = useTranslations('Services.RiskAsm.message');
    const cx = classNames.bind(styles);
    const [keyword, setKeyword] = useState<string>("");
    const [isDraft, setIsDraft] = useState<boolean>();
    const http = UseAxiosAuth();
    const [data, setData] = useState<RiskMasterListDef[]>();
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState<TableParams>({
      pagination: {
        current: 1,
        pageSize: 10,
      },
    });
    const router = useRouter();
    const [messageApi, contextHolder] = message.useMessage();
    const pathName = usePathname();
    const { data: session, status } = useSession();

    useEffect(() => {
        const getData = async (http: AxiosInstance | null) => {
            try {
                setLoading(true);
                const searchCondition: SearchConditionDef = {
                    perPage: 10,
                    pageId: 1
                };
                const responseData = await riskAssessmentListMasterApi(http, searchCondition);
                const normalizedData: RiskMasterListDef[] = responseData['data'].map(
                    (item: RiskMasterListDef, index: number) => ({
                        key : item.id,
                        no: index + 1,
                        riskName: item.riskName,
                        riskDescription: item.riskDescription,
                        isDraft: item.isDraft,
                        createdDate: item.createdDate
                    })
                );
                setData(normalizedData);
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
    }, [http]);

    const ColoredLine: React.FC<ColoredLineProps> = ({ text }) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className={cx('risk__line')} style={{flex: 1}}/>
            <span style={{ marginLeft: 5, marginRight: 5}}>{text}</span>
            <div className={cx('risk__line')} style={{flex: 12}}/>
        </div>
    );

    const buttonItemLayout = {
        wrapperCol: { span: 8, offset: 8 },
    };
    const handleKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    }
    const handleOnchecked = (e: RadioChangeEvent) => {
        // console.log('checked = ', checkedValues);
        if (e.target.value != "all") {
            setIsDraft(e.target.value);
        } else {
            setIsDraft(undefined);
        }
    };
    const searchAction = async (pagination: TablePaginationConfig) => {
        const searchCondition: SearchConditionDef = {
            keyword: keyword,
            isDraft: isDraft,
            perPage: pagination?.pageSize,
            pageId: pagination?.current
        };
        try {
            setLoading(true);
            const responseData = await riskAssessmentListMasterApi(http, searchCondition);
            const normalizedData: RiskMasterListDef[] = responseData['data'].map(
                (item: RiskMasterListDef, index: number) => ({
                    key : item.id,
                    no: index + 1 + (pagination.pageSize ?? 10) * ((pagination.current ?? 1) - 1),
                    riskName: item.riskName,
                    riskDescription: item.riskDescription,
                    isDraft: item.isDraft,
                    createdDate: item.createdDate
                })
            );
            setData(normalizedData);
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
    const handleDeleteAction = async (riskId: string) => {
        console.log("Delete action.....");
        try {
            setLoading(true);
            const responseData = await riskAssessmentDeleteApi(http, riskId);
            if (responseData.statusCode == STATUS_OK) {
                searchAction(tableParams.pagination!);
                messageApi.success(tMsg('msg_delete_success'));
            } else {
                messageApi.error(tMsg('msg_delete_fail'));
            }
        } catch (error) {
            console.error(error);
            messageApi.error(tMsg('msg_delete_fail'));
        } finally {
            setLoading(false);
        }
    }
    const columns: ColumnsType<RiskMasterListDef> = [
        {
            title: '#',
            dataIndex: 'no',
            width: '5%',
        },
        {
            title: tLbl('risk_name'),
            dataIndex: 'riskName',
            width: '20%',
        },
        {
            title: tLbl('risk_description'),
            render: ((_,riskMaster) => (
                <p style={{whiteSpace: 'pre'}}>{riskMaster.riskDescription}</p>
            ))
        },
        {
            title: tLbl('risk_is_draft'),
            dataIndex: 'isDraft',
            width: '10%',
            render: (_,riskMaster) => {
                if (!riskMaster.isDraft) {
                    return (<Tag icon={<PushpinTwoTone />} color="success">{tLbl('publish')}</Tag>)
                } else {
                    return (<Tag icon={<DeleteTwoTone  style={{color: '#E53835'}}/>} color="success">{tLbl('draft')}</Tag>)
                }
            }
        },
        {
            title: tLbl('risk_create_date'),
            // dataIndex: 'createdDate',
            width: '20%',
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
            render: (_,riskMaster) => {
                const renderItems = (
                    id: string,
                    riskName: string
                ): MenuProps['items'] => {
                    return [
                        {
                            label: (
                                <a
                                    onClick={() => {
                                        router.push(`${pathName}/detail/${id}`);
                                    }}
                                >
                                    <Space>
                                    <ExclamationCircleOutlined /> {tCom('btn_detail')}
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
                                    router.push(`${pathName}/update/${id}`);
                                }}
                                >
                                <Space>
                                    <EditOutlined /> {tCom('btn_edit')}
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
                                        Modal.confirm({
                                        title: tMsg('msg_confirm_delete').replace('%ITEM%', riskName),
                                        centered: true,
                                        width: '40%',
                                        icon: <WarningOutlined style={{ color: 'red' }} />,
                                        closable: true,
                                        cancelText: tCom('btn_cancel'),
                                        okText: tCom('btn_yes'),
                                        okButtonProps: { type: 'primary', danger: true },
                                        onOk: () => {
                                            handleDeleteAction(id);
                                        },
                                        footer: (_, { OkBtn, CancelBtn }) => (
                                            <>
                                                <CancelBtn />
                                                <OkBtn />
                                            </>
                                        )
                                        });
                                    } }
                                    >
                                    <Space>
                                        <DeleteOutlined /> {tCom('btn_delete')}
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
                            riskMaster.key!,
                            riskMaster.riskName!
                        )
                        }}
                        key={riskMaster.id}
                    >
                        <a onClick={e => e.preventDefault()} key={riskMaster.id}>
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
    ];
    const handleTableChange: TableProps['onChange'] = (pagination) => {
        setTableParams({
          pagination
        });
        searchAction(pagination);
        // `dataSource` is useless since `pageSize` changed
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
          setData([]);
        }
      };
    const handleCreateNewRisk = () => {
        router.push(`${pathName}/add`);
    }
    
    const breadCrumb = [
        {
            title: <Link href={`/`}>{tCom('home')}</Link>
        },
        {
            title: tLbl('risk_assessment')
        }
    ];
    return (
        <>
            {contextHolder}
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
                <h3>{tLbl('risk_assessment')}</h3>
                <Breadcrumb style={{ margin: '0px 24px 24px 24px' }} items={breadCrumb} />
                <ColoredLine text={tLbl('search_condition')}/>
                    <Form
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 8 }}
                        layout="horizontal"
                    >
                        <Form.Item label={tLbl('search_by_keyword')}>
                            <Input
                            onChange={handleKeyword}
                            placeholder={tLbl('keyword_text_placeholder')}
                            />
                        </Form.Item>
                        <Form.Item label={tLbl('risk_is_draft')}>
                            <Radio.Group onChange={handleOnchecked} defaultValue="all">
                                <Radio value="all">{tCom('all')}</Radio>
                                <Radio value={true}>{tLbl('draft')}</Radio>
                                <Radio value={false}>{tLbl('publish')}</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item {...buttonItemLayout}>
                            <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            className={cx('disease__searchBtn')}
                            onClick={() => {
                                const page: TablePaginationConfig = {
                                    pageSize: 10,
                                    current: 1
                                }
                                searchAction(page);
                            }}
                            >
                            {tCom('btn_search')}
                            </Button>
                        </Form.Item>
                    </Form>
                <ColoredLine text={tLbl('search_result')}/>
                <Button
                    type='primary'
                    htmlType='submit'
                    icon={<PlusOutlined />} 
                    size='large'
                    className={cx('risk__btn')}
                    onClick={handleCreateNewRisk}
                >
                    {tCom('btn_add')}
                </Button>
                <Table
                    columns={columns}
                    rowKey={(record) => record.key}
                    dataSource={data}
                    pagination={
                        {
                            ...tableParams.pagination,
                            showTotal: total => tCom('result_text').replace('%%ITEM%%', total.toString()),
                            showSizeChanger: true,
                            pageSizeOptions: ['10', '20', '30'],
                            locale: {
                              items_per_page: `/${tCom('page')}`,
                            },
                        }
                    }
                    loading={loading}
                    onChange={handleTableChange}
                />
            </Content>
        </>
    )
};

export default List;
