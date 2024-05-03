import React from 'react';
import { Col, Row, Select } from 'antd';
import { useTranslations } from 'next-intl';
import classNames from 'classnames/bind';
import styles from '../../../../disease.module.scss';

interface TableComponentProps {
    data: any;
    handleSel: (value: string) => void;
}
const DetailComponent: React.FC<TableComponentProps> = ({ data , handleSel}) => {
    const cx = classNames.bind(styles);
    const t = useTranslations('Disease');
    const fbStatus = [
        {value: 'stt_0' , label: t('pending')},
        {value: 'stt_1' , label: t('approve')},
        {value: 'stt_2' , label: t('reject')}
    ];
    return (
        <>
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
                <Row>
                    <Col span={4}>
                        <label className={cx('dd__label')}>{t('lbl_feedback')}</label>
                    </Col>
                    <Col span={12}>
                        <Row className={cx('dd__row')} style={{margin: 0}}>
                            <Col span={6}>{t('lbl_feedback_status')}</Col>
                            <Col span={12}><Select onChange={handleSel} defaultValue={`stt_${data.feedbackStatus}`} options={fbStatus} style={{width: "50%"}}/></Col>
                        </Row>
                        <Row className={cx('dd__row')} style={{margin: 0}}>
                            <Col span={6}>{t('lbl_feedback_content')}</Col>
                            <Col span={12}><p className={cx('dd__content')}>{data.feedback}</p></Col>
                        </Row>
                    </Col>
                    <Col span={8}></Col>
                </Row>
                <Row className={cx('dd__row')}>
                    <Col span={4}>
                        <label className={cx('dd__label')}>{t('lbl_user')}</label>
                    </Col>
                    <Col span={12}>
                        <p className={cx('dd__content')}>{`${data.createBy}(${data.email})`}</p>
                    </Col>
                    <Col span={8}></Col>
                </Row>
            </div>
        </>
    );
};

export default DetailComponent;
