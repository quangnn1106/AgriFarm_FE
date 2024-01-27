'use client';
import React, { Suspense, useState } from 'react';

import { Layout, Badge, Button } from 'antd';
import { BellOutlined, SearchOutlined } from '@ant-design/icons';
const { Header, Content, Sider } = Layout;

import MenuSider from '../Layouts/MainLayout/MenuSider/MenuSider';
import AdminSider from '../Layouts/Admin/Sider/AdminSider';
import LocaleSwitcher from '@/components/Locale/LocaleSwitcher';
import themeConfig from '@/lib/theme/themeConfig';
import SAdminSider from '../Layouts/SAdmin/Sider/SASider';
import { useSession } from 'next-auth/react';
import RenderSideBar from '../Layouts/MainLayout/MenuSider/RenderSideBar';
import { ROLES } from '@/constants/roles';
import Loader from '@/components/Loader/Loader';

export default function DashBoardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const { data: session, status } = useSession();
  console.log('role: ', session?.user.userInfo?.roles.length);
  if (status === 'loading') {
    return (
      <Loader
        fullScreen
        spinning
      />
    );
  }
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
            <RenderSideBar roles={session?.user.userInfo?.roles[0] as ROLES} />
          </Sider>
          <Content className='site_layout_background'>
            <Suspense
              fallback={
                <Loader
                  fullScreen
                  spinning
                />
              }
            >
              {children}
            </Suspense>
          </Content>
        </Layout>
      </Layout>
    </section>
  );
}
