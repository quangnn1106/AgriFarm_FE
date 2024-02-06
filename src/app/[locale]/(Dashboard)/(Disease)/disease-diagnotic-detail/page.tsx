'use client'
import { Content } from 'antd/es/layout/layout';
import classNames from 'classnames/bind';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import styles from '../disease.module.scss';
import { Breadcrumb, Button, Col, Flex, Row } from 'antd';
import Link from 'next/link';
import DetailComponent from './component/detail/detail';
import { useSearchParams } from 'next/navigation';
import MapComponent from './component/map/map';
import fetchDiseaseDetailData from './api/diseaseDiagnosesDetailApi';
import diseaseDiagnosesUpdateFeedback from './api/diseaseDiagnosesUpdateApi';
import ModalComponent from './component/modal/modal';
import { STATUS_OK } from '@/constants/https';

const DiseaseDiagnoticDetail = () => {
    const [msgUpdate, setMsgUpdate] = useState("");
    const [fbStatusVal, setFbStatusVal] = useState(1);
    const cx = classNames.bind(styles);
    const t = useTranslations('Disease');
    const id = useSearchParams().get("id");
    const [dataDetail, setDataDetail] = useState();
    const [displayModalUpdate, setDisplayModalUpdate] = useState(false);
    useEffect(()=> {
        diseaseDetail(id);
    },[id]);

    const diseaseDetail = async (id : any) => {
        try {
            const responseData = await fetchDiseaseDetailData(id);
            console.log(responseData);
            setFbStatusVal(responseData.data.feedbackStatus);
            setDataDetail(responseData.data);
        } catch (error) {
            console.error('Error calling API:', error);
        }
    };
    
    const handleChangeSel = (value: string) => {
        console.log(value);
        setFbStatusVal(parseInt(value.split("_")[1]));
    };

    const saveAction = async () => {
        console.log("Save action.....");
        try {
            const res = await diseaseDiagnosesUpdateFeedback(id, fbStatusVal);
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
        console.log("Back action.....");
    };
    const breadCrumb = [
        {
            title: <Link href={`/disease-diagnotic`}>{t('diagnostic')}</Link>
        },
        {
            title: t('detail')
        }
    ];
    return (
        <>
            <Content style={{ padding: '30px 48px' }}>
                <h1 className={cx('disease__title')}>{t('diagnostic')}</h1>
                <Breadcrumb style={{ margin: '0px 24px' }} items={breadCrumb}>
                </Breadcrumb>
                {dataDetail && (
                    <>
                        <DetailComponent handleSel={handleChangeSel} data={dataDetail}/>
                        <MapComponent/>
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
export default DiseaseDiagnoticDetail;
