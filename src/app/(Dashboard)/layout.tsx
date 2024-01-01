'use client';
import { Layout, Badge, Button } from 'antd';
import { BellOutlined, SearchOutlined } from '@ant-design/icons';
const { Header, Content, Sider } = Layout;
import classNames from 'classnames/bind';
import styles from '@/app/page.module.scss';
import MenuHeader from '../Layouts/MainLayout/MenuHeader/MenuHeader';
import MenuSider from '../Layouts/MainLayout/MenuSider/MenuSider';
import React, { Suspense, useState } from 'react';
import LoadingSkeleton from './loading';
import { useAppSelector } from '@/redux/hooks';
import { ACCESS_TOKEN, settings } from '@/utils/config';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

const cx = classNames.bind(styles);
export default function DashBoardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const { userLogin } = useAppSelector(state => state.authReducer);
  return (
    <section>
      <Suspense fallback={<LoadingSkeleton />}>
        <Layout className={cx('layout')}>
          <Header>
            <div className={cx('logo')}>
              <span>Logo</span>
            </div>

            <div className={cx('right_menu')}>
              <div className={cx('ul_right')}>
                <SearchOutlined className={cx('iconButton')} />
                <Badge
                  count={1}
                  dot
                  offset={[-10, 10]}
                  className={cx('iconButton')}
                >
                  <BellOutlined />
                </Badge>
              </div>
              <Button
                onClick={() => {
                  settings.clearStorage(ACCESS_TOKEN);
                  settings.eraseCookie(ACCESS_TOKEN);
                  signOut();
                  router.refresh();
                }}
              >
                Sign Out
              </Button>

              <MenuHeader />
            </div>
          </Header>

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
      </Suspense>
    </section>
  );
}
