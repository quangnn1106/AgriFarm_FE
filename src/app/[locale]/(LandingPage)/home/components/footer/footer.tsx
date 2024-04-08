import { Row } from 'antd';
import React from 'react';
import Image from 'next/image';
import styles from './footer.module.scss';
type Props = {};
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
const MyFooter = (props: Props) => {
  return (
    <div className={cx('divF')}>
      <div className={cx('div-2F')}>
        <Image
          loading='lazy'
          src='https://cdn.builder.io/api/v1/image/assets/TEMP/c99655a29535e111ab29929f1b916f83dc897cbb5aa67b59f77e645a8df13ec7?apiKey=a3c86750458a463dbdaef0731e8c4142&'
          alt=''
          className={cx('imgF')}
          width={138}
          height={39}
        />
        <div className={cx('div-3F')}>
          Copyright © 2023 AgriGroup. All rights reserved
        </div>
      </div>
    </div>
  );
};

export default MyFooter;
