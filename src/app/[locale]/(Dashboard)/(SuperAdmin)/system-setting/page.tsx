'use client'
import { ExclamationCircleOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Button, Card, Empty, Form, Input, InputNumber, Space, Spin, Tag, message } from "antd";
import { Content } from "antd/es/layout/layout";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface SystemSettingDef {
    serviceDisease : {
        [key: string] : string | number
    }
}

const SystemSetting = () => {
    const tCom = useTranslations('common');
    const tLbl = useTranslations('Services.SystemSetting.label');
    const tMsg = useTranslations('Services.SystemSetting.message');
    const [loading, setLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    // Service disease ----
    // Distance warning (km)
    const [distance, setDistance] = useState<number | null>();
    // Current setting
    const [systemSettings, setSystemSettings] = useState<SystemSettingDef>();
    useEffect(() => {
        // Load current system setting
        const data: SystemSettingDef = {
            serviceDisease: {
                distance: 1
            }
        }
        setSystemSettings(data);
    }, [])
    const saveSetting = async () => {
        try {
            setLoading(true);
            await sleep(3 * 1000);
            messageApi.success(tMsg('msg_update_success'));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    function sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const handleDistanceInput = (value: number | null) => {
        setDistance(value ?? 1);
        console.log(value);
    }
    return (
        <>
            {contextHolder}
            <Content style={{ padding: '30px 48px' }}>
                <h2>{tLbl('system_setting')}</h2>
                <Spin spinning={(systemSettings == undefined || loading)}>
                    {systemSettings ? (
                        <Form
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 8 }}
                            layout="vertical"
                            onFinish={saveSetting}
                        >
                            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                                <Card title={tLbl('setting_disease')} style={{background: '#E6F6EB'}}>
                                    <Card 
                                        type="inner"
                                        title={tLbl('distance_receive_warnings')}
                                    >
                                        <Form.Item
                                            name="distance_input"
                                            label={tLbl('distance_input')}
                                            rules={[{ required: true, message: tMsg('msg_distance_input')}]}
                                            initialValue={systemSettings?.serviceDisease.distance}
                                        >
                                            <InputNumber
                                                onChange={handleDistanceInput}
                                                min={1}
                                                max={10}
                                            />
                                        </Form.Item>
                                        <Tag icon={<InfoCircleOutlined />} color="processing">{`${tMsg('msg_distance_des')}${distance}km`}</Tag>
                                    </Card>
                                </Card>
                                <Card title="Service 2" style={{background: '#E6F6EB'}}>
                                    <Card 
                                        type="inner"
                                        title="Setting 1"
                                    >
                                        <Form.Item
                                            name="setting_1"
                                            label="Setting 1"
                                            rules={[{ required: true, message: "msg1"}]}
                                        >
                                            <Input/>
                                        </Form.Item>
                                    </Card>
                                </Card>
                            </Space>
                            <Button
                                type='primary'
                                htmlType='submit'
                                size='large'
                                style={{marginTop: '20px'}}
                            >
                                {tCom('btn_save')}
                            </Button>
                        </Form>
                    ) : (
                        <Empty />
                    )}
                </Spin>
            </Content>
        </>
    );
}

export default SystemSetting;