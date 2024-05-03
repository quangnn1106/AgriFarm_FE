'use client';
import React from 'react';

import { Breadcrumb, Button, Cascader, ConfigProvider } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

import { DASH_BOARD_PATH } from '@/constants/routes';

import { capitalizeFirstLetter } from '@/utils/upercaseFirstLetter';

type Props = {
  subPath?: string;
  subPath2?: string;
};

const BreadcrumbArgiFarm = ({ subPath, subPath2 }: Props) => {
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
          className='home-btn'
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
            title: capitalizeFirstLetter(subPath || '')
          },
          {
            title: capitalizeFirstLetter(subPath2 || '')
          }
        ]}
      />
    </>
  );
};

export default BreadcrumbArgiFarm;
