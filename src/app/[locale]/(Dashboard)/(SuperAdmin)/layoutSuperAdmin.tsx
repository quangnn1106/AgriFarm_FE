'use client';
import React, { Suspense, useState } from 'react';

import { Layout, Badge, Button } from 'antd';

const { Content, Sider } = Layout;

import themeConfig from '@/lib/theme/themeConfig';

import Loader from '@/components/Loader/Loader';
import SAdminSider from '../../Layouts/SAdmin/Sider/SASider';
import { usePathname } from '@/navigation';
import BreadcrumbComponent from '../(Admin)/staff/components/Breadcrumb/breadCrumb';
import MenuHeaderLocale from '../../Layouts/MainLayout/MenuSider/MenuLocale';
import classNames from 'classnames/bind';
import styles from '../(Admin)/adminStyle.module.scss';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

export default function LayoutSuperAdmin({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  // if (status === 'loading') {
  //   return (
  //     <Loader
  //       fullScreen
  //       spinning
  //     />
  //   );
  // }
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const cx = classNames.bind(styles);
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
          // collapsedWidth='100'
          // collapsible
          collapsed={collapsed}
          style={{ position: 'relative' }}
          // collapsed={collapsed}
          // onCollapse={value => setCollapsed(value)}
        >
          {/* <RenderSideBar roles={session?.user?.userInfo?.role as ROLES} /> */}
          <SAdminSider
            path={pathName}
            visible={false}
          />
          <Button
            type='primary'
            onClick={toggleCollapsed}
            style={{
              marginBottom: 16,
              position: 'absolute',
              top: '3%',
              left: '90%',
              zIndex: 2
            }}
            className={cx('toggle-btn')}
          >
            {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
          </Button>
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
