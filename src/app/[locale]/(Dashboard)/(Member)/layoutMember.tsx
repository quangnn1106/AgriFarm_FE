'use client';
import React, { Suspense, useState } from 'react';

import { Layout, Badge, Button } from 'antd';

const { Content, Sider } = Layout;

import themeConfig from '@/lib/theme/themeConfig';

import Loader from '@/components/Loader/Loader';

import { usePathname } from '@/navigation';
import BreadcrumbComponent from '../(Admin)/staff/components/Breadcrumb/breadCrumb';
import MenuHeaderLocale from '../../Layouts/MainLayout/MenuSider/MenuLocale';
import MemberSider from '../../Layouts/Member/Sider/MemberSider';

export default function LayoutMember({ children }: { children: React.ReactNode }) {
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
          {/* <RenderSideBar roles={session?.user?.userInfo?.role as ROLES} /> */}
          <MemberSider path={pathName} />
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
