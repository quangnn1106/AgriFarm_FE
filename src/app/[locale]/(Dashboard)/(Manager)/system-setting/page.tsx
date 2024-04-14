'use client'
import { ExclamationCircleOutlined, HomeOutlined, InfoCircleOutlined, WarningOutlined } from "@ant-design/icons";
import { Avatar, Breadcrumb, Button, Card, ConfigProvider, Empty, Form, Input, InputNumber, List, Modal, Space, Spin, Tag, message } from "antd";
import { Content } from "antd/es/layout/layout";
import { useTranslations } from "next-intl";
import Link from "next/link";
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
    const breadCrumb = [
        {
            title: <Link href={`/`}>{tCom('home')}</Link>
        },
        {
            title: tLbl('system_setting')
        }
    ];
    const [open, setOpen] = useState(false);
    const data = [
        {
          title: 'Cảnh báo bệnh đạo ôn',
          description: 'Bệnh đạo ôn đang ở cánh đồng cách cánh đồng bạn khoảng 3km'
        },
        {
          title: 'Cảnh báo bệnh vàng lá',
          description: 'Bệnh vàng lá đang ở cánh đồng cách cánh đồng bạn khoảng 1km'
        },
        {
          title: 'Cảnh báo bệnh đốm nâu',
          description: 'Bệnh đốm nâu đang ở cánh đồng cách cánh đồng bạn khoảng 5km'
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
            className="home-btn"
            href='#'
            size={'large'}
        >
            <HomeOutlined />
            {tCom('home')}
        </Button>
        </ConfigProvider>
            {contextHolder}
            <Content style={{ padding: '30px 48px' }}>
                <h3>{tLbl('system_setting')}</h3>
                <Breadcrumb style={{ margin: '0px 24px 24px 24px' }} items={breadCrumb} />
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
                                        <Tag icon={<InfoCircleOutlined />} color="processing">{`${tMsg('msg_distance_des')}${distance ?? 1}km`}</Tag>
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
                <Button onClick={() => setOpen(true)}></Button>
                <Modal
                    title="Thông báo"
                    centered
                    open={open}
                    onCancel={() => setOpen(false)}
                    footer={[
                      <Button key="back" onClick={() => setOpen(false)}>
                        {tCom('btn_close')}
                      </Button>,
                    ]}
                    width={1000}
                >
                    <List
                        itemLayout="horizontal"
                        dataSource={data}
                        style={{height: '500px', overflowY: 'auto'}}
                        renderItem={(item, index) => (
                            <List.Item>
                            <List.Item.Meta
                                avatar={<Tag color="warning">{tCom('warning')}</Tag>}
                                title={<a href="#">{item.title}</a>}
                                description={item.description}
                            />
                            </List.Item>
                        )}
                    />
                </Modal>
            </Content>
        </>
    );
}

export default SystemSetting;
