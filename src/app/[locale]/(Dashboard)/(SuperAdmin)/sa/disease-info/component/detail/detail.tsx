import React from 'react';
import { Col, Row, Select, Table } from 'antd';
import { useTranslations } from 'next-intl';
import classNames from 'classnames/bind';
import styles from '../../disease.module.scss';
import "./content-styles.css";

interface DiseaseInfo {
    id: string;
    diseaseName: string;
    symptoms: string;
    cause: string;
    preventiveMeasures: string;
    suggest: string;
}

interface TableComponentProps {
    data: DiseaseInfo;
}
const DetailComponent: React.FC<TableComponentProps> = ({ data }) => {
    const cx = classNames.bind(styles);
    const t = useTranslations('Disease');
    return (
        <div className={cx('dd')}>
            <Row className={cx('dd__row')}>
                <Col span={4}>
                    <label className={cx('dd__label' , 'disease__text--format')}>{t('disease_name')}</label>
                </Col>
                <Col span={12}>
                    <p className={cx('dd__content')}>{data.diseaseName}</p>
                </Col>
                <Col span={8}></Col>
            </Row>
            <Row className={cx('dd__row')}>
                <Col span={4}>
                    <label className={cx('dd__label')}>{t('disease_symptoms')}</label>
                </Col>
            </Row>
            <Row className={cx('dd__row')}>
                <Col span={1}></Col>
                <Col span={23}>
                    <div className="ck-content" dangerouslySetInnerHTML={{__html: data.symptoms}}></div>
                </Col>
            </Row>
            <Row className={cx('dd__row')}>
                <Col span={4}>
                    <label className={cx('dd__label')}>{t('disease_cause')}</label>
                </Col>
            </Row>
            <Row className={cx('dd__row')}>
                <Col span={1}></Col>
                <Col span={23}>
                    <div className="ck-content" dangerouslySetInnerHTML={{__html: data.cause}}></div>
                </Col>
            </Row>
            <Row className={cx('dd__row')}>
                <Col span={4}>
                    <label className={cx('dd__label')}>{t('disease_preventive_measures')}</label>
                </Col>
            </Row>
            <Row className={cx('dd__row')}>
                <Col span={1}></Col>
                <Col span={23}>
                    <div className="ck-content" dangerouslySetInnerHTML={{__html: data.preventiveMeasures}}></div>
                </Col>
            </Row>
            <Row className={cx('dd__row')}>
                <Col span={4}>
                    <label className={cx('dd__label')}>{t('disease_suggest')}</label>
                </Col>
            </Row>
            <Row className={cx('dd__row')}>
                <Col span={1}></Col>
                <Col span={23}>
                    <div className="ck-content" dangerouslySetInnerHTML={{__html: data.suggest}}></div>
                </Col>
            </Row>
        </div>
    );
};

export default DetailComponent;
