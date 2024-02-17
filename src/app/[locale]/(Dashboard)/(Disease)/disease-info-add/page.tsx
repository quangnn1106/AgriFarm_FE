'use client'
import { Content } from 'antd/es/layout/layout';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import styles from '../disease.module.scss';
import classNames from 'classnames/bind';
import { Breadcrumb } from 'antd';
import Link from 'next/link';

const DiseaseInfoAdd = () => {
    const cx = classNames.bind(styles);
    const t = useTranslations('Disease');
    
    const DiseaseInfoForm = dynamic(() => import("./component/DiseaseInfoForm/diseaseInfoForm"), { ssr: false });
    
    const breadCrumb = [
        {
            title: <Link href={`/disease-info`}>{t('disease_info')}</Link>
        },
        {
            title: t('disease_info_add')
        }
    ];

    return (
    <Content style={{ padding: '30px 48px' }}>
        <h1 className={cx('disease__title')}>{t('disease_info_add')}</h1>
        <Breadcrumb style={{ margin: '0px 24px 24px 24px' }} items={breadCrumb}>
        </Breadcrumb>
        <DiseaseInfoForm />
    </Content>
    );
};

export default DiseaseInfoAdd;
