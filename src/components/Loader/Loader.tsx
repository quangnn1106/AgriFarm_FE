import React from 'react';

import classNames from 'classnames';
import styles from './Loader.module.scss';
import { Spin } from 'antd';

type Props = {
  spinning: boolean;
  fullScreen: boolean;
};

const Loader = (props: Props) => {
  const { spinning, fullScreen } = props;
  return (
    <Spin
      spinning={spinning}
      fullscreen={fullScreen}
    />
  );
};

export default Loader;
