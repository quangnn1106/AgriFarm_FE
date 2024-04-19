'use client'
import { useTranslations } from "next-intl";
import classNames from 'classnames/bind';
import styles from './checklist.module.scss';
import Link from "next/link";
import { Breadcrumb, Button, Card, Checkbox, Col, ConfigProvider, Form, Input, Radio, Spin, message } from "antd";
import { CloseOutlined, HomeOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import UseAxiosAuth from "@/utils/axiosClient";
import { ChecklistDef, createChecklistApi } from "@/services/Checklist/createChecklistApi";
import { STATUS_OK } from "@/constants/https";

const Checklist = () => {
    const tCom = useTranslations('common');
    const tLbl = useTranslations('Services.Checklist.label');
    const tMsg = useTranslations('Services.Checklist.message');
    const cx = classNames.bind(styles);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const http = UseAxiosAuth();
    const [messageApi, contextHolder] = message.useMessage();
    const [componentStates, setComponentStates] = useState<{ [key: string]: boolean }>({});

    const handleCheckboxChange = (fieldName: any, e: any) => {
        const { checked } = e.target;
        setComponentStates(prevState => ({
            ...prevState,
            [fieldName]: checked
        }));
    };

    const onFinish = async (values: ChecklistDef) => {
        console.log('Received values of form:', values);
        try {
            setLoading(true);
            const res = await createChecklistApi(http, values);

            if (res.statusCode != STATUS_OK) {
                messageApi.error(tMsg('msg_add_fail'));
            } else {
                form.resetFields();
            }
            setLoading(false);
            messageApi.success(tMsg('msg_add_success'));
        } catch (error) {
            console.error(error);
            messageApi.error(tMsg('msg_add_fail'));
            setLoading(false);
        }
    };

    const breadCrumb = [
        {
            title: <Link href={`/`}>{tCom('home')}</Link>
        },
        {
            title: tLbl('checklist_create')
        }
    ];
    return (
        <>
            {contextHolder}
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
            <Content style={{ padding: '20px 48px' }}>
                <h3>{tLbl('checklist_create')}</h3>
                <Breadcrumb style={{ margin: '0px 24px 24px 24px' }} items={breadCrumb} />
                <Spin spinning={loading}>
                    <Form
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 18 }}
                        form={form}
                        name="dynamic_form_complex"
                        autoComplete="off"
                        initialValues={{ items: [{}] }}
                        onFinish={onFinish}
                    >
                        <Card
                            size="small"
                            title={tLbl('checklist_name')}
                            style={{marginBottom: '10px'}}
                        >
                            <Form.Item
                                label={tLbl('name')}
                                name='name'
                                rules={[{ required: true, message: tMsg('msg_required').replace('%%ITEM%%', tLbl('name'))}]}
                            >
                                <Input placeholder={tLbl('palaceholder').replace('%%ITEM%%',tLbl('name'))}/>
                            </Form.Item>
                        </Card>
                        <Form.List name="checklistItems">
                            {(fields, { add, remove }) => (
                            <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
                                {fields.map((field) => (
                                    <Card
                                        size="small"
                                        title={`AF ${field.name + 1}`}
                                        key={field.key}
                                        extra={
                                        <CloseOutlined
                                            onClick={() => {
                                            remove(field.name);
                                            }}
                                        />
                                        }
                                    >
                                        <Form.Item
                                            label={tLbl('order_no')}
                                            name={[field.name, 'orderNo']}
                                            initialValue={field.name + 1}
                                            rules={[{ required: true, message: tMsg('msg_required').replace('%%ITEM%%', tLbl('order_no'))}]}
                                            hidden
                                        >
                                            <Input style={{border:'none', background: 'none', color: '#000'}} disabled={true}/>
                                        </Form.Item>
                                        <Form.Item
                                            label={tLbl('af_num')}
                                            name={[field.name, 'afNum']}
                                            rules={[{ required: true, message: tMsg('msg_required').replace('%%ITEM%%', tLbl('af_num'))}]}
                                        >
                                            <Input placeholder={tLbl('palaceholder').replace('%%ITEM%%',tLbl('af_num'))}/>
                                        </Form.Item>
                                        <Form.Item
                                            label={tLbl('item_title')}
                                            name={[field.name, 'title']}
                                        >
                                            <Input placeholder={tLbl('palaceholder').replace('%%ITEM%%',tLbl('item_title'))}/>
                                        </Form.Item>
                                        <Form.Item
                                            label={tLbl('item_type')}
                                            name={[field.name, 'type']}
                                            rules={[{ required: true, message: tMsg('msg_required').replace('%%ITEM%%', tLbl('item_type'))}]}
                                            initialValue="1"
                                            hidden
                                        >
                                            <Radio.Group>
                                                <Radio value="1">{tLbl('type_yes_no')}</Radio>
                                                <Radio value="2">{tLbl('type_text')} </Radio>
                                            </Radio.Group>
                                        </Form.Item>
                                        <Form.Item
                                            label={tLbl('item_content')}
                                            name={[field.name, 'content']}
                                        >
                                            <TextArea 
                                                rows={4} style={{resize:'none'}}
                                                placeholder={tLbl('palaceholder').replace('%%ITEM%%',tLbl('item_content'))}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            label={tLbl('item_is_response')}
                                            name={[field.name, 'isResponse']}
                                            valuePropName="checked"
                                            rules={[{ required: true, message: tMsg('msg_required').replace('%%ITEM%%', tLbl('item_is_response'))}]}
                                            initialValue={false}
                                        >
                                            <Checkbox 
                                                onChange={(e) => handleCheckboxChange(field.name, e)}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            label={tLbl('item_level')}
                                            name={[field.name, 'level']}
                                            rules={[{ required: true, message: tMsg('msg_required').replace('%%ITEM%%', tLbl('item_level'))}]}
                                            initialValue="1"
                                            
                                        >
                                            <Radio.Group disabled={!componentStates[field.name]}>
                                                <Radio value="1">{tLbl('major_must')}</Radio>
                                                <Radio value="2">{tLbl('minor_must')} </Radio>
                                                <Radio value="3">{tLbl('recommandation')}</Radio>
                                            </Radio.Group>
                                        </Form.Item>
                                    </Card>
                                ))}

                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    block
                                >
                                    + {tCom('btn_add')}
                                </Button>
                            </div>
                            )}
                        </Form.List>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{marginTop: '20px'}}
                                onClick={() => console.log(form.getFieldsValue())}
                            >
                                {tCom('btn_submit')}
                            </Button>
                        </Form.Item>
                    </Form>
                </Spin>
            </Content>
        </>
    );
}

export default Checklist;
