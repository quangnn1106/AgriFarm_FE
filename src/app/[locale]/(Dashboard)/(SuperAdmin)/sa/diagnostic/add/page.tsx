'use client'
import { Content } from "antd/es/layout/layout";
import classNames from "classnames/bind";
import styles from '../disease.module.scss';
import { useTranslations } from "next-intl";
import { diseaseDiagnosticDef, landDef, plantDiseaseDef } from "./model/diseaseDiagnosticModel";
import { useEffect, useState } from "react";
import getListLandApi from "@/services/Disease/getListLandApi";
import { Breadcrumb, Button, Col, ConfigProvider, Row, Select, Spin, Tabs, TabsProps } from "antd";
import { Input } from 'antd';
import diseaseDiagnosesAddApi from "@/services/Disease/diseaseDiagnosesAddApi";
import ModalComponent from "./component/modal/modal";
import { STATUS_OK } from "@/constants/https";
import plantDiseaseInfoApi from "@/services/Disease/plantDiseaseInfoApi";
import diseaseDiagnosesUpdateFbApi from "@/services/Disease/diseaseDiagnosesUpdateFbApi";
import UseAxiosAuth from '@/utils/axiosClient';
import { AxiosInstance } from 'axios';
import { useSession } from "next-auth/react";
import axios from 'axios';
import { HomeOutlined } from "@ant-design/icons";
import Link from "next/link";

const DiseaseDiagnosticAdd = () => {
    const { TextArea } = Input;
    const cx = classNames.bind(styles);
    const t = useTranslations('Disease');
    const tCom = useTranslations('Common');
    const [listLand, setListLand] = useState<Array<landDef>>([]);
    const [loadings, setLoadings] = useState<boolean>(false);
    const [selLand, setSelLand] = useState("");
    const [description, setDescription] = useState("");
    const [displayModalAdd, setDisplayModalAdd] = useState(false);
    const [msgAdd, setMsgAdd] = useState("");
    const [diagnosticRs, setDiagnosticRs] = useState(false);
    const [diagnoeseId, setDiagnoeseId] = useState("");
    const [plantDisease, setPlantDisease] = useState<plantDiseaseDef | null>(null);
    const [feedback, setFeedback] = useState("");
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const http = UseAxiosAuth();
    const { data: session, status } = useSession();
    const [itemsDisease, setItemsDisease] = useState<TabsProps["items"]>();
    const [defaultActiveKey, setDefaultActiveKey] = useState<string>("");

    useEffect(() => {
        getListLand(http, session?.user?.userInfo.siteId as string);
        getLocation();
    },[http, session?.user?.userInfo.siteId]);
    // get list land
    const getListLand = async (http: AxiosInstance | null, siteId : string) => {
        try {
            const res = await getListLandApi(http, siteId);
            setListLand(res);
        } catch (error) {
            console.log(error)
        }
    }
    
    // location
    const getLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            position => {
              setLatitude(position.coords.latitude);
              setLongitude(position.coords.longitude);
            },
            error => {
              console.error('Error getting geolocation:', error);
            }
          );
        } else {
          console.error('Geolocation is not supported by this browser.');
        }
    };
    // Call api AI disease
    const submitAction = async () => {
        try {
            if (description.length < 50) {
                setMsgAdd(t('min_length'));
                setDisplayModalAdd(true);
                return;
            }
            setLoadings(true);
            const url = `${process.env.NEXT_PUBLIC_AI_API}/get_disease`;
            axios.post(url, {
                Description: description
            })
                .then(async (response : any) => {
                    console.log(response.data);
                    const diseaseId = response.data.result;
                    if (diseaseId.length == 0) {
                        setMsgAdd(t('disease_diagnostic_fail'));
                        setDisplayModalAdd(true);
                    } else {
                        let isForEachComplete = false; // Khởi tạo biến cờ
                        let listDisease: TabsProps['items'] = [];
                        diseaseId.forEach(async (element: string, index: number) => {
                            const diseaseDiagnostic : diseaseDiagnosticDef = {
                                plantDiseaseId: element,
                                description: description,
                                feedback: "",
                                location: `${latitude},${longitude}`,
                                createBy: session?.user?.userInfo.id as string,
                                landId: selLand,
                            };
                            const res = await diseaseDiagnosesAddApi(http, diseaseDiagnostic);
                            if (res.statusCode != STATUS_OK) {
                                setMsgAdd(t('disease_diagnostic_fail'));
                                setDisplayModalAdd(true);
                                return;
                            } else {
                                setDiagnoeseId(res.data.id);
                                const responseData = await plantDiseaseInfoApi(http, element);
                                if (responseData.statusCode == STATUS_OK) {
                                    if (element == "b23294ba-d83a-4a96-8697-edb5dad34c03" &&
                                        (description.includes("chín") ||
                                        description.includes("chính") ||
                                        description.includes("chin") ||
                                        description.includes("chinh"))
                                    ) {
                                    } else {
                                        const items = {
                                            key: element,
                                            label: responseData.data.diseaseName
                                        };
                                        if (index == 0) {
                                            setDefaultActiveKey(element);
                                            setPlantDisease(responseData.data);
                                        }
                                        listDisease?.push(items);
                                    }
                                }
                                setMsgAdd("");
                                setDiagnosticRs(true);
                            }
                            // Kiểm tra xem đã chạy hết vòng lặp chưa
                            if (index === diseaseId.length - 1) {
                                isForEachComplete = true;
                            }
                        });
                        // Sau khi vòng lặp kết thúc, kiểm tra và thực hiện đoạn mã
                        const checkCompletionInterval = setInterval(() => {
                            if (isForEachComplete) {
                                clearInterval(checkCompletionInterval); // Dừng interval
                                if (listDisease == undefined || listDisease.length == 0) {
                                    setMsgAdd(t('disease_diagnostic_fail'));
                                    setDisplayModalAdd(true);
                                    setPlantDisease(null);
                                }
                            }
                        }, 100); // Kiểm tra mỗi 100ms
                        setItemsDisease(listDisease);
                    }
                    
                })
                .catch((error : any) => {
                    console.error(error);
            });
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
            const res = await diseaseDiagnosesUpdateFbApi(http, diagnoeseId, feedback);
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

    const onChange = async (key: string) => {
        try {
            setLoadings(true);
            const responseData = await plantDiseaseInfoApi(http, key);
            if (responseData.statusCode == STATUS_OK) {
                setPlantDisease(responseData.data);
            }
            setMsgAdd("");
            setDiagnosticRs(true);
        } catch (error) {
            console.log(error);
            setMsgAdd("Error!!!!!");
            setDisplayModalAdd(true);
        } finally {
            setLoadings(false);
        }
    };

    const breadCrumb = [
        {
            title: <Link href={`/`}>{tCom('home')}</Link>
        },
        {
            title: t('disease_diagnostic')
        }
    ];
    const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
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
            <Content style={{ padding: '30px 48px' }}>
                <h3 className={cx('disease__title')}>{t('disease_diagnostic')}</h3>
                <Breadcrumb style={{ margin: '0px 24px 24px 24px' }} items={breadCrumb} />
                {diagnosticRs == true && msgAdd == "" && plantDisease ? (
                    <>
                        <div className={cx('dd')}>
                            <Row>
                                <label className={cx('dd__label')}>{t('lbl_description')}</label>
                            </Row>
                            <Row className={cx('dd__row')}>
                                <p className={cx('dd__content')}>{description}</p>
                            </Row>
                            <Spin spinning={loadings}>
                            <div className={cx('dd__result')}>
                                <h3 className={cx('dd__result--label')}>{t('diagnostic_result')}</h3>
                                
                                <Row className={cx('dd__row')}>
                                    <Tabs defaultActiveKey={defaultActiveKey} items={itemsDisease} onChange={onChange} />
                                </Row>
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
                                    <div className="ck-content" dangerouslySetInnerHTML={{__html: plantDisease.symptoms}}></div>
                                </Row>
                                <Row className={cx('dd__row')}>
                                    <label className={cx('dd__label')}>{t('lbl_cause')}</label>
                                </Row>
                                <Row className={cx('dd__row')}>
                                    <div className="ck-content" dangerouslySetInnerHTML={{__html: plantDisease.cause}}></div>
                                </Row>
                                <Row className={cx('dd__row')}>
                                    <label className={cx('dd__label')}>{t('lbl_preventive_measures')}</label>
                                </Row>
                                <Row className={cx('dd__row')}>
                                    <div className="ck-content" dangerouslySetInnerHTML={{__html: plantDisease.preventiveMeasures}}></div>
                                </Row>
                                <Row className={cx('dd__row')}>
                                    <label className={cx('dd__label')}>{t('lbl_suggest')}</label>
                                </Row>
                                <Row className={cx('dd__row')}>
                                    <div className="ck-content" dangerouslySetInnerHTML={{__html: plantDisease.suggest}}></div>
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
                            </Spin>
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