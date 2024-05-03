'use client'
import { Content } from 'antd/es/layout/layout';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import styles from '../../disease.module.scss';
import classNames from 'classnames/bind';
import { Breadcrumb, Button, ConfigProvider } from 'antd';
import Link from 'next/link';
import { HomeOutlined } from '@ant-design/icons';
import { DASH_BOARD_PATH } from '@/constants/routes';

const DiseaseInfo = ({ params }: { params: { id: string } }) => {
    const cx = classNames.bind(styles);
    const t = useTranslations('Disease');
    const tCom = useTranslations('common');
    
    const DiseaseInfoForm = dynamic(() => import("./component/DiseaseInfoForm/diseaseInfoForm"), { ssr: false });
    
    const breadCrumb = [
        {
            title: <Link href={`/`}>{tCom('home')}</Link>
        },
        {
            title: <Link href={`/sa/disease-info`}>{t('disease_info')}</Link>
        },
        {
            title: t('disease_info_edit')
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
                href={DASH_BOARD_PATH}
                size={'large'}
            >
                <HomeOutlined />
                {tCom('home')}
            </Button>
            </ConfigProvider>
            <Content style={{ padding: '20px 48px' }}></Content>
        <Content style={{ padding: '20px 48px' }}>
            <h3 className={cx('disease__title')}>{t('disease_info_edit')}</h3>
            <Breadcrumb style={{ margin: '0px 24px 24px 24px' }} items={breadCrumb}>
            </Breadcrumb>
            <DiseaseInfoForm params={params}/>
        </Content>
        </>
    );
};

export default DiseaseInfo;
