'use client';
import React, { useState } from 'react';

import { Layout, Badge, Button } from 'antd';
import { BellOutlined, SearchOutlined } from '@ant-design/icons';
const { Header, Content, Sider } = Layout;
import classNames from 'classnames/bind';
import styles from '@/app/page.module.scss';

import MenuSider from '../Layouts/MainLayout/MenuSider/MenuSider';

const cx = classNames.bind(styles);
export default function DashBoardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <section>
      <Layout className={cx('layout')}>
        <Layout
          className={cx('site_layout', 'm_h')}
          hasSider
        >
          <Sider
            width={250}
            theme='light'
            className={cx('sidebar')}
            collapsible
            collapsed={collapsed}
            onCollapse={value => setCollapsed(value)}
          >
            <MenuSider />
          </Sider>
          <Content className={cx('site_layout_background')}>{children}</Content>
        </Layout>
      </Layout>
    </section>
  );
}
