'use client'
import { Breadcrumb, Button, Card, Col, Divider, Empty, Radio, RadioChangeEvent, Row, Space, Spin, Tag, Upload } from "antd";
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

const CheklistDetail = ({ params }: { params: { id: string } }) => {
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

    useEffect(() => {
        getSiteName(http, siteId);
        getData(http, params.id);
    },[http, siteId, params.id]);

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
            <Content style={{ padding: '30px 48px' }}>
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
                            </Space>
                            <Divider />
                            <Space size={22} direction="vertical" style={{width: '100%'}}>
                                {checklistData.checklistItems.map((item, index) =>{
                                    if (!item.isResponse) {
                                        return (
                                            <Row className={cxPage('row-item-text')} key={index}>
                                                <Col span={2} className={cxPage('col-left')}>
                                                    {item.afNum ?? "AF"}
                                                </Col>
                                                <Col span={22} className={cxPage('col-right')}>{item.content}</Col>
                                            </Row>
                                        )
                                    } else {
                                        return (
                                            <Row className={cxPage('row-item-text--response')} key={index}>
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
                                                            {item.checklistItemResponses[0].level == 1 ? (
                                                                <Tag color="red">{tLbl('major_must')}</Tag>
                                                            ) : item.checklistItemResponses[0].level == 2 ? (
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
                                                    {item.checklistItemResponses[0].result == 1 ? (
                                                        <Radio.Group name="radiogroup" defaultValue={3}>
                                                            <Radio value={1}>Yes</Radio>
                                                            <Radio value={2}>No</Radio>
                                                            <Radio value={3}>N/A</Radio>
                                                        </Radio.Group>
                                                    ) : item.checklistItemResponses[0].result == 2 ? (
                                                        <TextArea
                                                            // value={value}
                                                            // onChange={(e) => setValue(e.target.value)}
                                                            // placeholder="Controlled autosize"
                                                            autoSize={{ minRows: 3, maxRows: 5 }}
                                                        />
                                                    ) : item.checklistItemResponses[0].result == 3 ? (
                                                        <Upload listType="picture-card" />
                                                    ) : (
                                                        <></>
                                                    )}
                                                </Col>
                                            </Row>
                                        );
                                    }
                                })}
                            </Space>
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

export default CheklistDetail;
