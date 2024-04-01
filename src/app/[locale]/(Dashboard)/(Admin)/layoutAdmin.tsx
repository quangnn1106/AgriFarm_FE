'use client';
import React, { Suspense, useState } from 'react';

import { Layout, Badge, Button } from 'antd';

const { Content, Sider } = Layout;

import themeConfig from '@/lib/theme/themeConfig';

import { useSession } from 'next-auth/react';

import Loader from '@/components/Loader/Loader';
import AdminSider from '../../Layouts/Admin/Sider/AdminSider';
import { usePathname } from '@/navigation';
import MenuHeaderLocale from '../../Layouts/MainLayout/MenuSider/MenuLocale';

export default function LayoutAdmin({ children }: { children: any }) {
  const [collapsed, setCollapsed] = useState(false);
  const { data: session, status } = useSession();
  const pathName = usePathname();
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
          breakpoint='lg'
          collapsedWidth='100'
          collapsible
          // collapsed={collapsed}
          // onCollapse={value => setCollapsed(value)}
        >
          <AdminSider path={pathName} />
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
            <MenuHeaderLocale path={pathName} />

            {children}
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
}
