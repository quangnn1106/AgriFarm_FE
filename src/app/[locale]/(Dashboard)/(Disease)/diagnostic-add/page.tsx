'use client'
import { Content } from "antd/es/layout/layout";
import classNames from "classnames/bind";
import styles from '../disease.module.scss';
import { useTranslations } from "next-intl";
import { diseaseDiagnosticDef, landDef, plantDiseaseDef } from "./model/diseaseDiagnosticModel";
import { useEffect, useState } from "react";
import getListLandApi from "@/services/Disease/getListLandApi";
import { Button, Col, Row, Select } from "antd";
import { Input } from 'antd';
import diseaseDiagnosesAddApi from "@/services/Disease/diseaseDiagnosesAddApi";
import ModalComponent from "./component/modal/modal";
import { STATUS_OK } from "@/constants/https";
import plantDiseaseInfoApi from "@/services/Disease/plantDiseaseInfoApi";
import diseaseDiagnosesUpdateFbApi from "@/services/Disease/diseaseDiagnosesUpdateFbApi";

const DiseaseDiagnosticAdd = () => {
    const { TextArea } = Input;
    const cx = classNames.bind(styles);
    const t = useTranslations('Disease');
    const [listLand, setListLand] = useState<Array<landDef>>([]);
    const [loadings, setLoadings] = useState<boolean>(false);
    const [selLand, setSelLand] = useState("");
    const [description, setDescription] = useState("");
    const [displayModalAdd, setDisplayModalAdd] = useState(false);
    const [msgAdd, setMsgAdd] = useState("");
    const [diagnosticRs, setDiagnosticRs] = useState(false);
    const [plantDiseaseId, setPlantDiseaseId] = useState("");
    const [diagnoeseId, setDiagnoeseId] = useState("");
    const [plantDisease, setPlantDisease] = useState<plantDiseaseDef>();
    const [feedback, setFeedback] = useState("");
    useEffect(() => {
        getListLand();
    },[]);
    // get list land
    const getListLand = async () => {
        try {
            const res = await getListLandApi();
            setListLand(res);
        } catch (error) {
            console.log(error)
        }
    }
    // Call api AI disease
    const submitAction = async () => {
        try {
            setLoadings(true);
            console.log("Call api ....");
            // Api response
            // const resFromAI = ...
            const diseaseId = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
            setPlantDiseaseId(diseaseId);
            const diseaseDiagnostic : diseaseDiagnosticDef = {
                plantDiseaseId: diseaseId,
                description: description,
                feedback: "",
                location: "10.0123469,105.7331374",
                createBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                landId: selLand,
            };

            const res = await diseaseDiagnosesAddApi(diseaseDiagnostic);
            if (res.statusCode != STATUS_OK) {
                setMsgAdd(t('disease_diagnostic_fail'));
                setDisplayModalAdd(true);
            } else {
                setDiagnoeseId(res.data.id);
                const responseData = await plantDiseaseInfoApi(diseaseId);
                if (responseData.statusCode == STATUS_OK) {
                    setPlantDisease(responseData.data);
                }
                setMsgAdd("");
                setDiagnosticRs(true);
            }
        } catch (error) {
            console.log(error);
            setMsgAdd(t('disease_diagnostic_fail'));
            setDisplayModalAdd(true);
        } finally {
            setLoadings(false);
        }
    }
    const resetComponent = () => {
        setDisplayModalAdd(false);
        setMsgAdd("");
        setLoadings(false);
        setDiagnosticRs(false);
    }
    const sendFeedback = async () => {
        try {
            setLoadings(true);
            const res = await diseaseDiagnosesUpdateFbApi(diagnoeseId, feedback);
            console.log(res);
        } catch (error) {
            console.log(error);
        } finally {
            resetComponent();
        }
    }
    const handleInputDescription = (e : any) => {
        setDescription(e.target.value);
    }
    const handleSelectLand = (value: string) => {
        setSelLand(value);
    }
    const handleClose = () => {
        setDisplayModalAdd(false);
    };
    const handleFeedback = (e : any) => {
        setFeedback(e.target.value);
    }
    const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    return (
        <>
            <Content style={{ padding: '30px 48px' }}>
                <h1 className={cx('disease__title')}>{t('disease_diagnostic')}</h1>
                {diagnosticRs == true && msgAdd == "" && plantDisease ? (
                    <>
                        <div className={cx('dd')}>
                            <Row>
                                <label className={cx('dd__label')}>{t('lbl_description')}</label>
                            </Row>
                            <Row className={cx('dd__row')}>
                                <p className={cx('dd__content')}>{description}</p>
                            </Row>
                            <div className={cx('dd__result')}>
                                <h3 className={cx('dd__result--label')}>{t('diagnostic_result')}</h3>
                                <Row className={cx('dd__row')}>
                                    <Col span={2}>
                                        <label className={cx('dd__label')}>{t('lbl_disease_name')}</label>
                                    </Col>
                                    <Col span={12}>
                                        <p className={cx('dd__content')}>{plantDisease.diseaseName}</p>
                                    </Col>
                                    <Col span={8}></Col>
                                </Row>
                                <Row className={cx('dd__row')}>
                                    <label className={cx('dd__label')}>{t('lbl_symptoms')}</label>
                                </Row>
                                <Row className={cx('dd__row')}>
                                    <p className={cx('dd__content')}>{plantDisease.symptoms}</p>
                                </Row>
                                <Row className={cx('dd__row')}>
                                    <label className={cx('dd__label')}>{t('lbl_cause')}</label>
                                </Row>
                                <Row className={cx('dd__row')}>
                                    <p className={cx('dd__content')}>{plantDisease.cause}</p>
                                </Row>
                                <Row className={cx('dd__row')}>
                                    <label className={cx('dd__label')}>{t('lbl_preventive_measures')}</label>
                                </Row>
                                <Row className={cx('dd__row')}>
                                    <p className={cx('dd__content')}>{plantDisease.preventiveMeasures}</p>
                                </Row>
                                <Row className={cx('dd__row')}>
                                    <label className={cx('dd__label')}>{t('lbl_suggest')}</label>
                                </Row>
                                <Row className={cx('dd__row')}>
                                    <p className={cx('dd__content')}>{plantDisease.suggest}</p>
                                </Row>
                                <Row className={cx('dd__row')}>
                                    <label className={cx('dd__label')}>{t('lbl_feedback')}</label>
                                </Row>
                                <Row className={cx('dd__row')}>
                                    <TextArea onChange={handleFeedback} className={cx('dd__content')} rows={3} placeholder={t('lbl_feedback')} style={{width: "100%"}}/>
                                </Row>
                                <Row className={cx('dd__row')} style={{flexDirection: "row-reverse"}}>
                                    <Button
                                            type="primary"
                                            htmlType="submit"
                                            size="large"
                                            className={`${cx('disease__btn')} ${cx('disease__btn--save')}`}
                                            onClick={sendFeedback}
                                            loading={loadings}
                                        >   
                                        {t('send_feedback')}
                                    </Button>
                                </Row>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={cx('dd')}>
                            <Row className={cx('dd__row')}>
                                <label className={cx('dd__label')}>{t('land_name')}</label>
                            </Row>
                            <Row>
                                <Select 
                                    disabled={loadings}
                                    showSearch
                                    placeholder={t('select_land')}
                                    filterOption={filterOption}
                                    options={listLand}
                                    optionFilterProp="children"
                                    style={{width: "20%"}}
                                    onChange={handleSelectLand}
                                />
                            </Row>
                            <Row className={cx('dd__row')}>
                                <label className={cx('dd__label')}>{t('enter_description_disease')}</label>
                            </Row>
                            <Row>
                                <TextArea onChange={handleInputDescription} disabled={loadings} rows={6} cols={7} placeholder={t('enter_description_disease')} style={{width: "40%"}}/>
                            </Row>
                            <Button
                                type="primary"
                                htmlType="submit"
                                size="large"
                                className={`${cx('disease__btn')} ${cx('disease__btn--save')}`}
                                onClick={submitAction}
                                loading={loadings}
                            >   
                            {t('save_btn')}
                            </Button>
                        </div>
                    </>
                )}
            </Content>
            {displayModalAdd && msgAdd && (
                <ModalComponent title={t('disease_diagnostic')} body={msgAdd} open={displayModalAdd} handleClose={handleClose}/>
            )}
        </>
    );
}

export default DiseaseDiagnosticAdd;