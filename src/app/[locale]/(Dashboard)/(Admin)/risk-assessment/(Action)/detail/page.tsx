'use client'
import { App, Breadcrumb, Card, Checkbox, Collapse, Divider, Radio, Space, Tag, Upload, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { PlusOutlined } from '@ant-design/icons';
import UseAxiosAuth from "@/utils/axiosClient";
import { useSearchParams } from "next/navigation";
import { AxiosInstance } from "axios";
import riskAssessementDetailApi from "@/services/RiskAssessment/riskAssessementDetailApi";
import Link from "next/link";
import { Content } from "antd/es/layout/layout";
import styles from "../../components/risk-assessment-style.module.scss";
import classNames from 'classnames/bind';
import { RiskMasterResponseDef } from "../../interface";
import { DeleteTwoTone , PushpinTwoTone } from '@ant-design/icons';
import { ItemModeValue } from "../../enum";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const Detail = () => {
    const tCom = useTranslations('common');
    const tLbl = useTranslations('Services.RiskAsm.label');
    const tMsg = useTranslations('Services.RiskAsm.message');
    const cx = classNames.bind(styles);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [messageApi, contextHolder] = message.useMessage();
    const http = UseAxiosAuth();
    const riskId = useSearchParams().get("id");
    const [riskData, setRiskData] = useState<RiskMasterResponseDef>();
    useEffect(() => {
        getData(http, riskId)
    },[http, riskId]);
    const getData = async (http : AxiosInstance | null, riskId : string | null) => {
        try {
            const responseData = await riskAssessementDetailApi(http, riskId);
            setRiskData(responseData.data);
            console.log(responseData);
        } catch (error) {
            console.error('Error calling API:', error);
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
            title: <Link href={`/risk-assessment/list`}>{tLbl('risk_assessment')}</Link>
        },
        {
            title: tLbl('risk_assessment_detail')
        }
      ];
    return (
        <>
            {contextHolder}
            {/* Basic */}
        <Content style={{ padding: '30px 48px' }}>
            <h2 className={cx('disease__title')}>{tLbl('risk_assessment_detail')}</h2>
            <Breadcrumb style={{ margin: '0px 24px 24px 24px' }} items={breadCrumb} />
            {/* Item */}
            {riskData && (
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
                        <Divider orientation="left" style={{fontSize: '15px'}}>Default Size</Divider>
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
                                                                extra:  item.must == 1 ? <Tag color="#f50">Required</Tag> : ""
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
                                                                extra:  item.must == 1 ? <Tag color="#f50">Required</Tag> : ""
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
                                                                extra:  item.must == 1 ? <Tag color="#f50">Required</Tag> : ""
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
                                                                extra:  item.must == 1 ? <Tag color="#f50">Required</Tag> : ""
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
                        {/* <Space direction="vertical" size={22} style={{flex: '1', margin: '20px 80px'}}>
                            <Card title="Default size card" extra={<Tag color="#f50">Required</Tag>}>
                                <Radio.Group>
                                    <Space direction="vertical">
                                        <Radio value={1}>Option A</Radio>
                                        <Radio value={2}>Option B</Radio>
                                        <Radio value={3}>Option C</Radio>
                                    </Space>
                                </Radio.Group>
                            </Card>
                            <Card title="Default size card">
                                <Space direction="vertical">
                                    <Checkbox>Checkbox1</Checkbox>
                                    <Checkbox>Checkbox2</Checkbox>
                                    <Checkbox>Checkbox3</Checkbox>
                                </Space>
                            </Card>
                            <Card title="Default size card">
                                <TextArea cols={45} rows={5} style={{resize: 'none'}}></TextArea>
                            </Card>
                            <Card title="Default size card">
                                <Upload {...props} listType="picture-card">
                                    {uploadButton}
                                </Upload>
                            </Card>
                        </Space> */}
                    </div>
                </div>
            )}
        </Content>
        </>
    )
}

const DetailApp: React.FC = () => (
    <App>
      <Detail />
    </App>
  );
  export default DetailApp;
