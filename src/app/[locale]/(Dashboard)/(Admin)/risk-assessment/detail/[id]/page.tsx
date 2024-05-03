'use client'
import { App, Breadcrumb, Button, Card, Checkbox, Collapse, ConfigProvider, Divider, Empty, Radio, Space, Spin, Tag, Upload, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { HomeOutlined, PlusOutlined } from '@ant-design/icons';
import UseAxiosAuth from "@/utils/axiosClient";
import { useRouter, useSearchParams } from "next/navigation";
import { AxiosInstance } from "axios";
import riskAssessementDetailApi from "@/services/RiskAssessment/riskAssessementDetailApi";
import Link from "next/link";
import { Content } from "antd/es/layout/layout";
import styles from "../../components/risk-assessment-style.module.scss";
import classNames from 'classnames/bind';
import { RiskMasterResponseDef } from "../../interface";
import { DeleteTwoTone , PushpinTwoTone } from '@ant-design/icons';
import { ItemModeValue } from "../../enum";
import { usePathname } from "@/navigation";
import { useSession } from "next-auth/react";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const Detail = ({ params }: { params: { id: string } }) => {
    const tCom = useTranslations('common');
    const tLbl = useTranslations('Services.RiskAsm.label');
    const tMsg = useTranslations('Services.RiskAsm.message');
    const cx = classNames.bind(styles);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [messageApi, contextHolder] = message.useMessage();
    const http = UseAxiosAuth();
    const riskId = params.id;
    const [riskData, setRiskData] = useState<RiskMasterResponseDef>();
    const router = useRouter();
    const [loadings, setLoadings] = useState(false);
    const pathName = usePathname();
    const { data: session } = useSession();
    
    useEffect(() => {
        getData(http, riskId);
    },[http, riskId]);
    const getData = async (http : AxiosInstance | null, riskId : string | null) => {
        try {
            setLoadings(true);
            const responseData = await riskAssessementDetailApi(http, riskId);
            setRiskData(responseData.data);
        } catch (error) {
            console.error('Error calling API:', error);
        } finally {
            setLoadings(false);
        }
    }
    const props: UploadProps = {
        onRemove: (file) => {
        const index = fileList.indexOf(file);
        const newFileList = fileList.slice();
        newFileList.splice(index, 1);
        setFileList(newFileList);
        },
        beforeUpload: (file: FileType) => {
            console.log(file);
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
                messageApi.error(tMsg('msg_upload_img'));
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                messageApi.error(tMsg('msg_max_size_img'));
            }
            const maxUploadImg = fileList.length < 3;
            if (!maxUploadImg) {
                messageApi.error(tMsg('msg_max_upload_img'));
            }
            if (isJpgOrPng && isLt2M && maxUploadImg) {
                setFileList([...fileList, file]);
            }

        return false;
        },
        fileList,
    };
    const uploadButton = (
      <button style={{ border: 0, background: 'none' }} type="button">
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </button>
    );
    
    const breadCrumb = [
        {
            title: <Link href={`/`}>{tCom('home')}</Link>
        },
        {
            title: <Link href={`/risk-assessment`}>{tLbl('risk_assessment')}</Link>
        },
        {
            title: tLbl('risk_assessment_detail')
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
            {session?.user?.userInfo.siteName}
        </Button>
        </ConfigProvider>
        {contextHolder}
        <Content style={{ padding: '20px 48px' }}>
            <h3>{tLbl('risk_assessment_detail')}</h3>
            <Breadcrumb style={{ margin: '0px 24px 24px 24px' }} items={breadCrumb} />
            {/* Item */}
            <Spin spinning={loadings}>
            {riskData ? (
                <div style={{backgroundColor:'#F4F6F8', borderRadius: '30px', padding: '20px 80px'}}>
                    {/* Risk name */}
                    <div style={{minHeight: '75px', borderLeft: '2px solid #AFA793'}}>
                        <div style={{marginLeft:'10px'}}>
                            <span style={{color:'#A9976B', fontSize: '35px'}}>{riskData.riskName}</span>
                            <p style={{whiteSpace: 'pre'}}>{riskData.riskDescription}</p>
                            {riskData.isDraft == true ? (
                                <Tag icon={<DeleteTwoTone  style={{color: '#E53835'}}/>} color="success">{tLbl('draft')}</Tag>
                            ) : (
                                <Tag icon={<PushpinTwoTone />} color="success">{tLbl('publish')}</Tag>
                            )}
                        </div>
                    </div>
                    <div>
                        {/* Risk description */}
                        <Divider orientation="left" style={{fontSize: '15px'}}>{tLbl('item_list')}</Divider>
                        <Space direction="vertical" size={22} style={{width: '100%'}}>
                            {riskData.riskItems.length > 0 ? (
                                riskData.riskItems.map((item, index) => {
                                    if (item.riskItemType == ItemModeValue.SINGLE_CHOICE) {
                                        const riskCtn = JSON.parse(item.riskItemContent);
                                        const radio = () => (
                                            Object.keys(riskCtn).map((index) => (
                                                <Radio key={index} value={index}>{riskCtn[index]}</Radio>
                                            ))
                                        );
                                        return (
                                                <Collapse
                                                    style={{whiteSpace:'pre'}}
                                                    key={index}
                                                    items={
                                                        [
                                                            { 
                                                                key: index,
                                                                label: item.riskItemTitle,
                                                                children:
                                                                    <Radio.Group>
                                                                        <Space direction="vertical">
                                                                            {radio()}
                                                                        </Space>
                                                                    </Radio.Group>
                                                                    ,
                                                                extra:  item.must == 1 ? <Tag color="#f50">{tLbl('required')}</Tag> : ""
                                                            }
                                                        ]
                                                    }
                                                />
                                        )
                                    } else if (item.riskItemType == ItemModeValue.MULTI_CHOICE) {
                                        const riskCtn = JSON.parse(item.riskItemContent);
                                        const checkBox = () => (
                                            Object.keys(riskCtn).map((index) => (
                                                <Checkbox key={index} value={riskCtn[index]}>{riskCtn[index]}</Checkbox>
                                            ))
                                        );
                                        return (
                                                <Collapse
                                                    style={{whiteSpace:'pre'}}
                                                    key={index}
                                                    items={
                                                        [
                                                            { 
                                                                key: index,
                                                                label: item.riskItemTitle,
                                                                children:
                                                                <Checkbox.Group>
                                                                    <Space direction="vertical">
                                                                        {checkBox()}
                                                                    </Space>
                                                                </Checkbox.Group>
                                                                    ,
                                                                extra:  item.must == 1 ? <Tag color="#f50">{tLbl('required')}</Tag> : ""
                                                            }
                                                        ]
                                                    }
                                                />
                                        )
                                    } else if (item.riskItemType == ItemModeValue.TEXT) {
                                        return (
                                                <Collapse
                                                    style={{whiteSpace:'pre'}}
                                                    key={index}
                                                    items={
                                                        [
                                                            { 
                                                                key: index,
                                                                label: item.riskItemTitle,
                                                                children:<TextArea cols={45} rows={3} className={cx('text-content')}></TextArea>,
                                                                extra:  item.must == 1 ? <Tag color="#f50">{tLbl('required')}</Tag> : ""
                                                            }
                                                        ]
                                                    }
                                                />
                                        )
                                    } else if (item.riskItemType == ItemModeValue.PHOTOS) {
                                        return (
                                                <Collapse
                                                    style={{whiteSpace:'pre'}}
                                                    key={index}
                                                    items={
                                                        [
                                                            { 
                                                                key: index,
                                                                label: item.riskItemTitle,
                                                                children:
                                                                <Upload {...props} listType="picture-card">
                                                                    {uploadButton}
                                                                </Upload>,
                                                                extra:  item.must == 1 ? <Tag color="#f50">{tLbl('required')}</Tag> : ""
                                                            }
                                                        ]
                                                    }
                                                />
                                        )
                                    }
                                })
                            ) : (
                                <></>
                            )}
                        </Space>
                    </div>
                </div>
            ) : (
                <>
                    <Empty>
                        <Button type="primary" onClick={() => {router.push(`${pathName}/add`)}}>{tCom('btn_add')}</Button>
                    </Empty>
                </>
            )}
            </Spin>
        </Content>
        </>
    )
}

export default Detail;
