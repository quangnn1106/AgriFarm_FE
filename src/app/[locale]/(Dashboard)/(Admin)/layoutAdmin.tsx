'use client';
import React, { Suspense, useState } from 'react';

import { Layout, Badge, Button } from 'antd';

const { Content, Sider } = Layout;

import themeConfig from '@/lib/theme/themeConfig';

import { useSession } from 'next-auth/react';
import RenderSideBar from '../../Layouts/MainLayout/MenuSider/RenderSideBar';
import { ROLES } from '@/constants/roles';
import Loader from '@/components/Loader/Loader';
import AdminSider from '../../Layouts/Admin/Sider/AdminSider';

export default function LayoutAdmin({ children }: { children: any }) {
  const [collapsed, setCollapsed] = useState(false);
  const { data: session, status } = useSession();
  console.log('Admin Layout');

  // if (status === 'loading') {
  //   return (
  //     <Loader
  //       fullScreen
  //       spinning
  //     />
  //   );
  // }
  return themeConfig(
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
          <AdminSider />
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
  );
}
