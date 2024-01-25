'use client';
import React, { useState } from 'react';

import { Layout, Badge, Button } from 'antd';
import { BellOutlined, SearchOutlined } from '@ant-design/icons';
const { Header, Content, Sider } = Layout;

import MenuSider from '../Layouts/MainLayout/MenuSider/MenuSider';
import AdminSider from '../Layouts/Admin/Sider/AdminSider';
import LocaleSwitcher from '@/components/Locale/LocaleSwitcher';
import themeConfig from '@/lib/theme/themeConfig';

export default function DashBoardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return themeConfig(
    <section>
      <Layout className='layout'>
        <Layout
          className='site_layout m_h'
          hasSider
        >
          <Sider
            width={255}
            theme='light'
            className='sidebar'
            // collapsible
            // collapsed={collapsed}
            // onCollapse={value => setCollapsed(value)}
          >
            {/* <MenuSider /> */}
            <AdminSider />
          </Sider>
          <Content className='site_layout_background'>{children}</Content>
        </Layout>
      </Layout>
    </section>
  );
}