'use client'
import { Content } from 'antd/es/layout/layout';
import classNames from 'classnames/bind';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import styles from '../../disease.module.scss';
import { Breadcrumb, Button, Col, ConfigProvider, Flex, Row } from 'antd';
import Link from 'next/link';
import DetailComponent from './component/detail/detail';
import { useRouter, useSearchParams } from 'next/navigation';
import MapComponent from './component/map/map';
import ModalComponent from './component/modal/modal';
import { STATUS_OK } from '@/constants/https';
import fetchDiseaseDetailData from '@/services/Disease/diseaseDiagnosesDetailApi';
import diseaseDiagnosesUpdateFeedback from '@/services/Disease/diseaseDiagnosesUpdateApi';
import UseAxiosAuth from '@/utils/axiosClient';
import { AxiosInstance } from 'axios';
import { HomeOutlined } from '@ant-design/icons';
import { useSession } from 'next-auth/react';

const DiseaseDiagnosticDetail = ({ params }: { params: { id: string } }) => {
    const router = useRouter();
    const [msgUpdate, setMsgUpdate] = useState("");
    const [fbStatusVal, setFbStatusVal] = useState(1);
    const cx = classNames.bind(styles);
    const t = useTranslations('Disease');
    const tCom = useTranslations('Common');
    const id = params.id;
    const [dataDetail, setDataDetail] = useState();
    const [displayModalUpdate, setDisplayModalUpdate] = useState(false);
    const http = UseAxiosAuth();

    useEffect(()=> {
        diseaseDetail(http, id);
    },[http,id]);
    
    const handleChangeSel = (value: string) => {
        console.log(value);
        setFbStatusVal(parseInt(value.split("_")[1]));
    };

    const diseaseDetail = async (http : AxiosInstance | null, id : any) => {
        try {
            const responseData = await fetchDiseaseDetailData(http, id);
            setFbStatusVal(responseData.data.feedbackStatus);
            setDataDetail(responseData.data);
        } catch (error) {
            console.error('Error calling API:', error);
        }
    };

    const saveAction = async () => {
        console.log("Save action.....");
        try {
            const res = await diseaseDiagnosesUpdateFeedback(http, id, fbStatusVal);
            if (res.statusCode == STATUS_OK) {
                setMsgUpdate(t('message_update_ok'));
            } else {
                setMsgUpdate(t('message_update_fail'));
            }
            console.log(res);
        } catch (error) {
            console.log(error);
            setMsgUpdate(t('message_update_fail'));
        } finally {
            setDisplayModalUpdate(true);
        }
    };

    const handleClose = () => {
        setDisplayModalUpdate(false);
    };

    const backAction = () => {
        router.push(`/sa/diagnostic`);
    };
    const breadCrumb = [
        {
            title: <Link href={`/`}>{tCom('home')}</Link>
        },
        {
            title: <Link href={`/sa/diagnostic`}>{t('diagnostic')}</Link>
        },
        {
            title: t('detail')
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
            {tCom('home')}
        </Button>
        </ConfigProvider>
            <Content style={{ padding: '20px 48px' }}>
                <h3 className={cx('disease__title')}>{t('diagnostic')}</h3>
                <Breadcrumb style={{ margin: '0px 24px' }} items={breadCrumb}>
                </Breadcrumb>
                {dataDetail && (
                    <>
                        <DetailComponent handleSel={handleChangeSel} data={dataDetail}/>
                        {/* <MapComponent/> */}
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            className={`${cx('disease__btn')} ${cx('disease__btn--back')}`}
                            onClick={backAction}
                        >   
                        {t('back_btn')}
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            className={`${cx('disease__btn')} ${cx('disease__btn--save')}`}
                            onClick={saveAction}
                        >   
                        {t('save_btn')}
                        </Button>
                    </>
                )}
            </Content>
            {displayModalUpdate && msgUpdate && (
                <ModalComponent title={t('update_feedback_status')} body={msgUpdate} open={displayModalUpdate} handleClose={handleClose}/>
            )}
        </>
    );
};
export default DiseaseDiagnosticDetail;
