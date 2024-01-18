'use client';
import React, { useState } from 'react';

import { Layout, Badge, Button } from 'antd';
import { BellOutlined, SearchOutlined } from '@ant-design/icons';
const { Header, Content, Sider } = Layout;

import MenuSider from '../Layouts/MainLayout/MenuSider/MenuSider';

export default function DashBoardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <section>
      <Layout className='layout'>
        <Layout
          className='site_layout m_h'
          hasSider
        >
          <Sider
            width={250}
            theme='light'
            className='sidebar'
            collapsible
            collapsed={collapsed}
            onCollapse={value => setCollapsed(value)}
          >
            <MenuSider />
          </Sider>
          <Content className='site_layout_background'>{children}</Content>
        </Layout>
      </Layout>
    </section>
  );
}
