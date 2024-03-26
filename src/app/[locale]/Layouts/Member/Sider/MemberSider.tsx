import React from 'react';
import MenuSider from '../../MainLayout/MenuSider/MenuSider';
import { FaMapLocationDot, FaUser, FaClipboard } from 'react-icons/fa6';
import { MdOutlineFeedback } from 'react-icons/md';
import { GiHighGrass } from 'react-icons/gi';

import styles from './MemberSider.module.scss';
import { HomeFilled, ClusterOutlined } from '@ant-design/icons';
import { type MenuProps } from 'antd';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import classNames from 'classnames/bind';

import {
  GetUserInfoGroup,
  getItem
} from '../../MainLayout/MenuSider/Models/menuItemsUser';
const cx = classNames.bind(styles);

type Props = {
  path: string;
};

const MemberSider = ({ path }: Props) => {
  const t = useTranslations('Nav');
  const items: MenuProps['items'] = [
    GetUserInfoGroup(),

    { type: 'divider' },

    getItem(
      `${t('gr_dash')}`,
      'dashboard',
      null,
      [
        getItem(
          <Link href={`/statistic`}>{t('dashboard')}</Link>,
          `/dashboard`,
          <HomeFilled />
        )
      ],
      'group'
    ),
    { type: 'divider' },

    getItem(
      `${t('management')}`,
      'management',
      null,
      [
        getItem(<Link href={`/site`}>{t('site')}</Link>, `/site`, <FaMapLocationDot />),
        // getItem(<Link href={`/user`}>{t('user')}</Link>, `/user`, <FaUser />),
        getItem(
          <Link href={`/subscription`}>{t('subscription')}</Link>,
          `/subscription`,
          <FaClipboard />
        ),
        getItem(
          <Link href={`/time-table`}>{t('schedule')}</Link>,
          `/time-table`,
          <GiHighGrass />
        ),
        getItem(
          <Link href={`/diagnostic`}>{t('diagnostic')}</Link>,
          `/diagnostic`,
          <ClusterOutlined />
        )
        // getItem(
        //   <Link href={`/feedback`}>{t('feedback')}</Link>,
        //   `/feedback`,
        //   <MdOutlineFeedback />
        // )
      ],
      'group'
    )
  ];
  return (
    <>
      <MenuSider
        path={path}
        items={items}
      />
    </>
  );
};

export default MemberSider;
