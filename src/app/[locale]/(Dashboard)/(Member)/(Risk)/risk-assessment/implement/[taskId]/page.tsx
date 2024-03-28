'use client'
import { Breadcrumb, Button, Card, Checkbox, Collapse, Divider, Empty, Form, Radio, Space, Spin, Tag, Upload, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import type { FormProps, GetProp, RadioChangeEvent, UploadFile, UploadProps } from 'antd';
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { PlusOutlined } from '@ant-design/icons';
import UseAxiosAuth from "@/utils/axiosClient";
import { AxiosInstance } from "axios";
import riskAssessementDetailApi from "@/services/RiskAssessment/riskAssessementDetailApi";
import Link from "next/link";
import { Content } from "antd/es/layout/layout";
import styles from "../../risk-assessment-style.module.scss";
import classNames from 'classnames/bind';
import riskAssessmentMappingApi from "@/services/RiskAssessment/riskAssessmentMappingApi";
import { RiskMasterResponseDef } from "@/app/[locale]/(Dashboard)/(Admin)/risk-assessment/interface";
import { ItemModeValue } from "@/app/[locale]/(Dashboard)/(Admin)/risk-assessment/enum";
import riskAssessmentImplApi from "@/services/RiskAssessment/riskAssessmentImplApi";
import { STATUS_NO_CONTENT, STATUS_OK } from "@/constants/https";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
type CheckboxValueType = GetProp<typeof Checkbox.Group, 'value'>[number];
interface ItemResponseDef {
    riskItemId: string;
    riskMappingId: string;
    answer: string;
}
interface FileListWithItem {
    [key: number]: UploadFile[];
}
const Implement = ({ params }: { params: { taskId: string } }) => {
    const tCom = useTranslations('common');
    const tLbl = useTranslations('Services.RiskAsm.label');
    const tMsg = useTranslations('Services.RiskAsm.message');
    const cx = classNames.bind(styles);
    const [fileList, setFileList] = useState<FileListWithItem>([]);
    const [messageApi, contextHolder] = message.useMessage();
    const http = UseAxiosAuth();
    const taskId = params.taskId;
    const [riskData, setRiskData] = useState<RiskMasterResponseDef>();
    const [riskMasterId, setRiskMasterId] = useState("");
    const [riskMappingId, setRiskMappingId] = useState("");
    const [itemResponse, setItemResponse] = useState<ItemResponseDef[]>([]);
    const [loadings, setLoadings] = useState(false);
    useEffect(() => {
        getRiskMapping(http, taskId);
        if (riskMasterId != "" && riskMappingId != "") {
            getData(http, riskMasterId, riskMappingId);
        }
    },[http, taskId, riskMasterId, riskMappingId]);

    const getRiskMapping = async (http : AxiosInstance | null, taskId : string | null) => {
        try {
            setLoadings(true);
            const responseData = await riskAssessmentMappingApi(http, taskId);
            if (responseData.data[0]) {
                setRiskMasterId(responseData.data[0].riskMasterId);
                setRiskMappingId(responseData.data[0].id);
            }
        } catch (error) {
            console.error('Error calling API:', error);
        } finally {
            setLoadings(false);
        }
    }
    const getData = async (http : AxiosInstance | null, riskId : string | null, riskMapId: string) => {
        try {
            setLoadings(true);
            const responseData = await riskAssessementDetailApi(http, riskId);
            if (responseData.statusCode != STATUS_NO_CONTENT) {
                let files: FileListWithItem = [];
                const response: ItemResponseDef[] = responseData.data.riskItems.map((item: any,indx: number) => {
                    let answer = item.riskItemContents[0]?.anwser ?? "";
                    if (item.riskItemType == ItemModeValue.MULTI_CHOICE && answer == "") {
                        answer = "[]";
                    }
                    if (item.riskItemType == ItemModeValue.PHOTOS) {
                        files[indx] = JSON.parse(answer != "" ? answer : "[]");
                    }
                    const tmp: ItemResponseDef = {
                        riskItemId: item.id,
                        riskMappingId: riskMapId,
                        answer: answer
                    }
                    return tmp;
                });
                setFileList(files);
                setItemResponse(response);
                setRiskData(responseData.data);
            }
        } catch (error) {
            console.error('Error calling API:', error);
        } finally {
            setLoadings(false);
        }
    }
    const onRemoveImg = (file: any, indexItem: number) => {
        const index = fileList[indexItem].indexOf(file);
        const newFileList = fileList[indexItem].slice();
        newFileList.splice(index, 1);

        fileList[indexItem] = newFileList;
        setFileList(fileList);
        itemResponse[indexItem].answer = JSON.stringify(newFileList);
        setItemResponse(itemResponse);
    }
    const onBeforeUploadImg = (file: FileType, indexItem: number) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            messageApi.error(tMsg('msg_upload_img'));
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            messageApi.error(tMsg('msg_max_size_img'));
        }
        const maxUploadImg = fileList[indexItem].length < 3;
        if (!maxUploadImg) {
            messageApi.error(tMsg('msg_max_upload_img'));
        }
        if (isJpgOrPng && isLt2M && maxUploadImg) {
            const info: UploadFile[] = [...fileList[indexItem],
                {
                    uid: file.uid,
                    name: file.name,
                    url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                }
            ]
            fileList[indexItem] = info;
            setFileList(fileList);

            itemResponse[indexItem].answer = JSON.stringify(info);
            setItemResponse(itemResponse);
        }
    }
    const uploadButton = (
      <button style={{ border: 0, background: 'none' }} type="button">
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </button>
    );
    
    const breadCrumb = [
        {
            title: <Link href={`/risk-assessment`}>{tLbl('risk_assessment')}</Link>
        },
        {
            title: tLbl('risk_assessment_impl')
        }
      ];
    const submitAction = async () => {
        console.log("Submit action ...");
        try {
            setLoadings(true);
            const res = await riskAssessmentImplApi(http, itemResponse);
            if (res.statusCode != STATUS_OK) {
              messageApi.error(tMsg('msg_update_fail'));
            } else {
              messageApi.success(tMsg('msg_add_success'));
            }
        } catch (error) {
            console.log(error);
            messageApi.error(tMsg('msg_update_fail'));
        } finally {
            setLoadings(false);
        }
    }
    const onFinishFailed: FormProps<any>["onFinishFailed"] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const singleChoice = (e: RadioChangeEvent, index: number) => {
        itemResponse[index].answer = e.target.value;
        setItemResponse(itemResponse);
    }
    const multiChoice = (list: CheckboxValueType[], index: number) => {
        itemResponse[index].answer = JSON.stringify(list);
        setItemResponse(itemResponse);
    }
    const inputText = (e: React.ChangeEvent<HTMLTextAreaElement>, index: number)  => {
        itemResponse[index].answer = e.target.value;
        setItemResponse(itemResponse);
    }
    const handleUpload = (file: any, index: number) => {
        // const formData = new FormData();
        // fileList.forEach((file) => {
        //   formData.append('files[]', file as FileType);
        // });
        // console.log(file);
        // setUploading(true);
        // You can use any AJAX library you like
        // fetch('https://weatherapi-com.p.rapidapi.com/current.json?q=53.1,-0.13', {
        //   method: 'GET',
        //   headers: {
        //     'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
        //     'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        //   }
        // })
        //   .then((res) => res.json())
        //   .then(() => {
        //     message.success('upload successfully.');
        //   })
        //   .catch(() => {
        //     message.error('upload failed.');
        //   })
        //   .finally(() => {
        //     // setUploading(false);
        //   });
        // url= {"rc-upload-1711477172303-5": "path_to_image0" }
        // itemResponse[index].answer = JSON.stringify(fileList);
        // setItemResponse(itemResponse);
    };
    return (
        <>
        {contextHolder}
        <Content style={{ padding: '30px 48px' }}>
            <h2>{tLbl('risk_assessment_impl')}</h2>
            <Breadcrumb style={{ margin: '0px 24px 24px 24px' }} items={breadCrumb} />
            {/* Item */}
            <Spin spinning={loadings}>
            <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 8 }}
                layout="horizontal"
                onFinish={submitAction}
                // form={form}
                onFinishFailed={onFinishFailed}
            >
            {riskData ? (
                <>
                <div style={{backgroundColor:'#F4F6F8', borderRadius: '30px', padding: '20px 80px'}}>
                    {/* Risk name */}
                    <div style={{minHeight: '75px', borderLeft: '2px solid #AFA793'}}>
                        <div style={{marginLeft:'10px'}}>
                            <span style={{color:'#A9976B', fontSize: '35px'}}>{riskData.riskName}</span>
                            <p style={{whiteSpace: 'pre'}}>{riskData.riskDescription}</p>
                        </div>
                    </div>
                    <div>
                            {/* Risk description */}
                            <Divider orientation="left" style={{fontSize: '15px'}}>{tLbl('item_list')}</Divider>
                            <Space direction="vertical" size={22} style={{width: '100%'}}>
                                {riskData.riskItems?.length > 0 && riskData.isDraft == false ? (
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
                                                        activeKey={item.must == 1 ? index : undefined}
                                                        items={
                                                            [
                                                                { 
                                                                    key: index,
                                                                    label: item.riskItemTitle,
                                                                    children:
                                                                        <Form.Item
                                                                            rules={
                                                                                [
                                                                                    { required: item.must == 1, message: tMsg('msg_item_required')}
                                                                                ]
                                                                            }
                                                                            name={`item_${index}`}
                                                                            initialValue={itemResponse[index].answer}
                                                                        >
                                                                            <Radio.Group onChange={(e) => {singleChoice(e, index)}}>
                                                                                <Space direction="vertical">
                                                                                    {radio()}
                                                                                </Space>
                                                                            </Radio.Group>
                                                                        </Form.Item>
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
                                                    <Checkbox key={index} value={index}>{riskCtn[index]}</Checkbox>
                                                ))
                                            );
                                            return (
                                                    <Collapse
                                                        style={{whiteSpace:'pre'}}
                                                        key={index}
                                                        activeKey={item.must == 1 ? index : undefined}
                                                        items={
                                                            [
                                                                { 
                                                                    key: index,
                                                                    label: item.riskItemTitle,
                                                                    children:
                                                                    <Form.Item
                                                                        rules={
                                                                            [
                                                                                { required: item.must == 1, message: tMsg('msg_item_required')}
                                                                            ]
                                                                        }
                                                                        name={`item_${index}`}
                                                                        initialValue={JSON.parse(itemResponse[index].answer)}
                                                                    >
                                                                        <Checkbox.Group onChange={(e) => {multiChoice(e, index)}}>
                                                                            <Space direction="vertical">
                                                                                {checkBox()}
                                                                            </Space>
                                                                        </Checkbox.Group>
                                                                    </Form.Item>
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
                                                        activeKey={item.must == 1 ? index : undefined}
                                                        items={
                                                            [
                                                                { 
                                                                    key: index,
                                                                    label: item.riskItemTitle,
                                                                    children:
                                                                    <Form.Item
                                                                        rules={
                                                                            [
                                                                                { required: item.must == 1, message: tMsg('msg_item_required')}
                                                                            ]
                                                                        }
                                                                        name={`item_${index}`}
                                                                        initialValue={itemResponse[index].answer}
                                                                    >
                                                                        <TextArea onChange={(e) => {inputText(e, index)}} cols={45} rows={3} className={cx('text-content')}></TextArea>
                                                                    </Form.Item>
                                                                        ,
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
                                                        activeKey={item.must == 1 ? index : undefined}
                                                        items={
                                                            [
                                                                { 
                                                                    key: index,
                                                                    label: item.riskItemTitle,
                                                                    children:
                                                                    <Upload 
                                                                        listType="picture-card"
                                                                        // onChange={(e) => {handleUpload(e, index)}}
                                                                        onRemove={(e) => {onRemoveImg(e, index)}}
                                                                        beforeUpload={(e) => {onBeforeUploadImg(e, index); return false;}}
                                                                        defaultFileList={fileList[index]}
                                                                        maxCount={3}
                                                                    >
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
                <Button
                    type='primary'
                    size='large'
                    className={`${cx('risk__btn')} ${cx('risk__btn--back')}`}
                    // onClick={backAction}
                >
                    {tCom('btn_back')}
                </Button>
                <Button
                    type='primary'
                    htmlType='submit'
                    size='large'
                    className={`${cx('risk__btn')} ${cx('risk__btn--save')}`}
                >
                    {tCom('btn_submit')}
                </Button>
                </>
            ) : (
                <Empty />
            )}
            </Form>
            </Spin>
        </Content>
        </>
    )
}

export default Implement;
