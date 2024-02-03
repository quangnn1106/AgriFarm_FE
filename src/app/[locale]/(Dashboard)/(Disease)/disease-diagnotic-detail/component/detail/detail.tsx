import React from 'react';
import { Col, Row, Table } from 'antd';
import { useTranslations } from 'next-intl';
import classNames from 'classnames/bind';
import styles from '../../../disease.module.scss';
import { diagnosticDetailModel } from '../../model/diagnosticDetailModel';

interface TableComponentProps {
    data: any;
}
const cx = classNames.bind(styles);
const DetailComponent: React.FC<TableComponentProps> = ({ data }) => {
    const t = useTranslations('Disease');
    return (
        <div className={cx('dd')}>
            <Row className={cx('dd__row')}>
                <Col span={4}>
                    <label className={cx('dd__label' , 'disease__text--format')}>{t('lbl_predict_result')}</label>
                </Col>
                <Col span={12}>
                    <p className={cx('dd__content')}>{data.plantDisease.diseaseName}</p>
                </Col>
                <Col span={8}></Col>
            </Row>
            <Row className={cx('dd__row')}>
                <Col span={4}>
                    <label className={cx('dd__label')}>{t('lbl_location')}</label>
                </Col>
                <Col span={12}>
                    <p className={cx('dd__content')}>{data.location}</p>
                </Col>
                <Col span={8}></Col>
            </Row>
            <Row className={cx('dd__row')}>
                <Col span={4}>
                    <label className={cx('dd__label')}>{t('lbl_description')}</label>
                </Col>
                <Col span={12}>
                    <p className={cx('dd__content')}>{data.description}</p>
                </Col>
                <Col span={8}></Col>
            </Row>
            <Row className={cx('dd__row')}>
                <Col span={4}>
                    <label className={cx('dd__label')}>{t('lbl_feedback')}</label>
                </Col>
                <Col span={12}>
                    <p className={cx('dd__content')}>{data.feedback}</p>
                </Col>
                <Col span={8}></Col>
            </Row>
            <Row className={cx('dd__row')}>
                <Col span={4}>
                    <label className={cx('dd__label')}>{t('lbl_feedback_status')}</label>
                </Col>
                <Col span={12}>
                    <p className={cx('dd__content')}>{data.feedbackStatus}</p>
                </Col>
                <Col span={8}></Col>
            </Row>
            <Row className={cx('dd__row')}>
                <Col span={4}>
                    <label className={cx('dd__label')}>{t('lbl_feedback_content')}</label>
                </Col>
                <Col span={12}>
                    <p className={cx('dd__content')}>{data.feedback}</p>
                </Col>
                <Col span={8}></Col>
            </Row>
            <Row className={cx('dd__row')}>
                <Col span={4}>
                    <label className={cx('dd__label')}>{t('lbl_user')}</label>
                </Col>
                <Col span={12}>
                    <p className={cx('dd__content')}>{`Ten (${data.createBy})`}</p>
                </Col>
                <Col span={8}></Col>
            </Row>
        </div>
    );
};

export default DetailComponent;
