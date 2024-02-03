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
import fetchDiseaseDetailData from '../disease-diagnotic/api/diseaseDiagnosesDetailApi';
import { diagnosticDetailModel } from './model/diagnosticDetailModel';

const cx = classNames.bind(styles);
const DiseaseDiagnoticDetail = () => {
    const t = useTranslations('Disease');
    const id = useSearchParams().get("id");
    const [dataDetail, setDataDetail] = useState();
    useEffect(()=> {
        diseaseDetail(id);
    },[id]);

    const diseaseDetail = async (id : any) => {
        try {
            const responseData = await fetchDiseaseDetailData(id);
            console.log(responseData);
            setDataDetail(responseData.data);
        } catch (error) {
            console.error('Error calling API:', error);
        }
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
        <Content style={{ padding: '30px 48px' }}>
            <h1 className={cx('disease__title')}>{t('diagnostic')}</h1>
            <Breadcrumb style={{ margin: '0px 24px' }} items={breadCrumb}>
            </Breadcrumb>
            {dataDetail && (
                <DetailComponent data={dataDetail}/>
            )}
        </Content>
    );
};
export default DiseaseDiagnoticDetail;
