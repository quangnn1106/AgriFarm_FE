'use client';

import React from 'react';
import { ConfigProvider } from 'antd';

const loaderTheme = (node: JSX.Element) => (
  <>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#52c41a'
        }
      }}
    >
      {node}
    </ConfigProvider>
  </>
);

export default loaderTheme;
