'use client'

import TableComponent from "@/components/Table/table";
import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Content } from "antd/es/layout/layout";


const UserList: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();
    return (
        <Content style={{ padding: '0 48px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>User</Breadcrumb.Item>
            </Breadcrumb>
            <Layout
                style={{ padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG }}
            >
                {/* <Sider style={{ background: colorBgContainer }} width={200}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%' }}
                        items={items2} />
                </Sider> */}
                <Content style={{ padding: '0 24px', minHeight: 280 }}>
                <><div> User Management</div>
                <TableComponent /></>
                </Content>
            </Layout>
        </Content>
    )
}

export default UserList;