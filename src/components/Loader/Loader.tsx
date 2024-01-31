'use client';
import React from 'react';

import classNames from 'classnames';
import styles from './Loader.module.scss';
import { Spin } from 'antd';
import loaderTheme from '@/lib/theme/loaderTheme';

type Props = {
  spinning: boolean;
  fullScreen: boolean;
};

const Loader = (props: Props) => {
  const { spinning, fullScreen } = props;
  return loaderTheme(
    <Spin
      spinning={spinning}
      fullscreen={fullScreen}
    />
  );
};

export default Loader;
