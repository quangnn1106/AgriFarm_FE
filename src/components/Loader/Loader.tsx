'use client';
import React from 'react';

import classNames from 'classnames';
import styles from './Loader.module.scss';
import { Spin } from 'antd';
import loaderTheme from '@/lib/theme/loaderTheme';

type Props = {
  spinning: boolean;
  fullScreen: boolean;
  style?: React.CSSProperties | undefined;
  className?: string;
};

const Loader = (props: Props) => {
  const { spinning, fullScreen, style, className } = props;
  console.log('render loader');

  return loaderTheme(
    <Spin
      className={className}
      style={style}
      spinning={spinning}
      fullscreen={fullScreen}
    />
  );
};

export default React.memo(Loader);
