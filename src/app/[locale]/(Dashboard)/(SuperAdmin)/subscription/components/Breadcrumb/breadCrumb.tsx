'use client';
import React from 'react';
import styles from '../../../management-page.module.scss';

import { Breadcrumb, Button, Cascader, ConfigProvider } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import { DASH_BOARD_PATH } from '@/constants/routes';
import { usePathname } from '@/navigation';

const cx = classNames.bind(styles);
type Props = {};

const BreadcrumbComponent = (props: Props) => {
  const path = usePathname();
  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              contentFontSizeLG: 24,
              fontWeight: 700,
              groupBorderColor: 'transparent',
              onlyIconSizeLG: 24,
              paddingBlockLG: 0,
              defaultBorderColor: 'transparent',
              defaultBg: 'transparent',
              defaultShadow: 'none',
              primaryShadow: 'none',
              linkHoverBg: 'transparent',
              paddingInlineLG: 24,
              defaultGhostBorderColor: 'transparent'
            }
          }
        }}
      >
        <Button
          className={cx('home-btn')}
          href='#'
          size={'large'}
        >
          <HomeOutlined />
          Farm Name
        </Button>
      </ConfigProvider>

      {/* <Breadcrumb style={{ margin: '0px 24px' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>User</Breadcrumb.Item>
      </Breadcrumb> */}

      <Breadcrumb
        style={{ margin: '0px 24px' }}
        items={[
          {
            href: DASH_BOARD_PATH,
            title: 'Statistic'
          },
          {
            title: path.substring(1).toLocaleUpperCase()
          }
        ]}
      />
    </>
  );
};

export default BreadcrumbComponent;
