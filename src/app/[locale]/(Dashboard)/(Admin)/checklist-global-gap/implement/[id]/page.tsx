'use client'
import { Breadcrumb, Button, Card, Col, ConfigProvider, Divider, Empty, Form, Input, Radio, RadioChangeEvent, Row, Space, Spin, Tag, Upload, message } from "antd";
import { Content } from "antd/es/layout/layout";
import { useTranslations } from "next-intl";
import Link from "next/link";
import styles from '../../../../(Admin)/adminStyle.module.scss';
import pageStyles from '../../checklistStyle.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from "react";
import UseAxiosAuth from '@/utils/axiosClient';
import { AxiosInstance } from 'axios';
import { useSession } from 'next-auth/react';
import { getSitesService } from "@/services/SuperAdmin/Site/getSiteService";
import { ChecklistDataDef } from "../../models";
import getDataChecklistApi from "@/services/Checklist/getDataChecklistApi";
import TextArea from "antd/es/input/TextArea";
import { CHECKLIST } from "@/constants/routes";
import { useRouter } from "next/navigation";
import { ExportOutlined, HomeOutlined } from "@ant-design/icons";
import { STATUS_OK } from "@/constants/https";
import { createResponseApi , ChecklistResponseDef } from "@/services/Checklist/createResponseApi";

const CheklistImplement = ({ params }: { params: { id: string } }) => {
    const tCom = useTranslations('common');
    const tLbl = useTranslations('Services.Checklist.label');
    const tMsg = useTranslations('Services.Checklist.message');
    const cx = classNames.bind(styles);
    const cxPage = classNames.bind(pageStyles);
    const http = UseAxiosAuth();
    const [siteName, setSiteName] = useState();
    const { data: session, status } = useSession();
    const siteId = session?.user?.userInfo.siteId as string;
    const [loading, setLoading] = useState(false);
    const [checklistData, setChecklistData] = useState<ChecklistDataDef>();
    const router = useRouter();
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    
    const getSiteName = async (http: AxiosInstance | null, siteId : string) => {
        try {
            setLoading(true);
            if (siteId != 'root') {
                const responseData: any = await getSitesService(http, siteId);
                setSiteName(responseData.data?.name);
            }
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

    useEffect(() => {
        getSiteName(http, siteId);
        const getData = async (http: AxiosInstance | null, checklistId : string) => {
            try {
                setLoading(true);

                const responseData = await getDataChecklistApi(http, checklistId);
                setChecklistData(responseData.data.checklistMaster);
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
        // getData(http, params.id);
    },[http, siteId, params.id]);

    const onSubmit = async () => {
        try {
            setLoading(true);
            const formData: ChecklistResponseDef = {
                checklistMappingId: params.id,
                checklistItemResponses: form.getFieldsValue().checklistItemResponses.filter((item: any) => item !== undefined)
            }
            console.log(formData);
            const res = await createResponseApi(http, formData);

            if (res.statusCode != STATUS_OK) {
                messageApi.error(tMsg('msg_add_fail'));
            } else {
                form.resetFields();
            }
            setLoading(false);
            messageApi.success(tMsg('msg_add_success'));
        } catch (error) {
            console.error(error);
            messageApi.error(tMsg('msg_add_fail'));
            setLoading(false);
        }
    }
    const breadCrumb = [
        {
            title: <Link href={`/`}>{tCom('home')}</Link>
        },
        {
            title: <Link href={`/checklist-global-gap`}>{tLbl('screen_name_checklist')}</Link>
        },
        {
            title: tLbl('screen_name_implement')
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
        {contextHolder}
            <Content style={{ padding: '20px 48px' }}>
                <h3>{tLbl('screen_name_implement')}</h3>
                <Breadcrumb style={{ margin: '0px 24px 24px 24px' }} items={breadCrumb} />
                <Spin spinning={loading}>
                    {checklistData ? (
                        <>
                            <Space>
                                <span className={cx('h2-info')}>IFA V4.2</span>
                                {siteName && (
                                    <Tag color='#4CAF4F'>{siteName}</Tag>
                                )}
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
                            <Form
                                labelCol={{ span: 3 }}
                                wrapperCol={{ span: 18 }}
                                form={form}
                                name="dynamic_form_complex"
                                autoComplete="off"
                                // initialValues={{ items: checklistData }}
                                // onFinish={onFinish}
                            >
                                <Form.List name="checklistItemResponses">
                                    {(_) => (
                                        <>
                                        {checklistData.checklistItems.map((item, index) =>{
                                            if (!item.isResponse) {
                                                return (
                                                    <Row className={cxPage('row-item-text')} key={index} style={{marginTop: '15px'}}>
                                                        <Col span={2} className={cxPage('col-left')}>
                                                            {item.afNum ?? "AF"}
                                                        </Col>
                                                        <Col span={22} className={cxPage('col-right')}>{item.content}</Col>
                                                    </Row>
                                                )
                                            } else {
                                                return (
                                                    <Row className={cxPage('row-item-text--response')} key={index} style={{marginTop: '15px'}}>
                                                        <Col span={16} className={cxPage('col-left')}>
                                                            <Row>
                                                                <Col span={16}>
                                                                    <Row style={{marginBottom: '5px'}}>
                                                                        {item.afNum ?? "AF"}
                                                                    </Row>
                                                                    <Row>
                                                                        <p style={{fontWeight: 'normal'}}>{item.content}</p>
                                                                    </Row>
                                                                </Col>
                                                                <Col span={8} style={{textAlign: 'right'}}>
                                                                    {item.levelRoute.split(",")[0] == "1" ? (
                                                                        <Tag color="red">{tLbl('major_must')}</Tag>
                                                                    ) : item.levelRoute.split(",")[0] == "2" ? (
                                                                        <Tag color="green">{tLbl('minor_must')}</Tag>
                                                                    ) : (
                                                                        <Tag color="blue">{tLbl('recommandation')}</Tag>
                                                                    )}
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col span={1} style={{paddingTop: '15px'}}>
                                                            <Divider type="vertical" style={{height: '100%'}} orientationMargin={90}/>
                                                        </Col>
                                                        <Col span={7} className={cxPage('col-right')}>
                                                            {/* {item.levelRoute.split(",")[1] == "1" ? ( */}
                                                                <>
                                                                    <Form.Item
                                                                        name={[index, 'result']}
                                                                        initialValue={3}
                                                                    >
                                                                        <Radio.Group name="radiogroup">
                                                                            <Radio value={1}>Yes</Radio>
                                                                            <Radio value={2}>No</Radio>
                                                                            <Radio value={3}>N/A</Radio>
                                                                        </Radio.Group>
                                                                    </Form.Item>
                                                                    <Form.Item
                                                                        name={[index, 'checklistItemId']}
                                                                        initialValue={item.id}
                                                                        hidden
                                                                    >
                                                                        <Input hidden />
                                                                    </Form.Item>
                                                                    <Form.Item
                                                                        name={[index, 'level']}
                                                                        initialValue={parseInt(item.levelRoute.split(",")[0])}
                                                                        hidden
                                                                    >
                                                                        <Input hidden />
                                                                    </Form.Item>
                                                                </>
                                                            {/* ) : item.levelRoute.split(",")[1] == "2" ? ( */}
                                                                <Form.Item
                                                                    name={[index, 'note']}
                                                                >
                                                                    <TextArea
                                                                        // value={value}
                                                                        // onChange={(e) => setValue(e.target.value)}
                                                                        // placeholder="Controlled autosize"
                                                                        autoSize={{ minRows: 3, maxRows: 5 }}
                                                                    />
                                                                </Form.Item>
                                                            {/* ) : item.checklistItemResponses[0].result == 3 ? (
                                                                <Upload listType="picture-card" />
                                                            ) : (
                                                                <></>
                                                            )} */}
                                                        </Col>
                                                    </Row>
                                                );
                                            }
                                        })}
                                    </>
                                    )}
                                    
                                </Form.List>
                            </Form>
                            <Button
                                    type='primary'
                                    size='large'
                                    className={`${cxPage('checklist__btn')} ${cxPage('checklist__btn--back')}`}
                                    onClick={() => router.push(CHECKLIST)}
                                >
                                    {tCom('btn_back')}
                            </Button>
                            <Button
                                type='primary'
                                htmlType='submit'
                                size='large'
                                className={`${cxPage('checklist__btn')} ${cxPage('checklist__btn--save')}`}
                                onClick={onSubmit}
                            >
                                {tCom('btn_submit')}
                            </Button>
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
}

export default CheklistImplement;
