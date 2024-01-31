'use client';

import React from 'react';
import { ConfigProvider } from 'antd';

const themeConfig = (node: JSX.Element) => (
  <>
    <ConfigProvider
      theme={{
        token: {
          fontSize: 16,
          colorPrimary: '#009A29'
        }
      }}
    >
      {node}
    </ConfigProvider>
  </>
);

export default themeConfig;
