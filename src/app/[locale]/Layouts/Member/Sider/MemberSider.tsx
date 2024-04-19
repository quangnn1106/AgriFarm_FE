import React from 'react';
import MenuSider from '../../MainLayout/MenuSider/MenuSider';
import {
  FaMapLocationDot,
  FaUser,
  FaClipboard,
  FaRightFromBracket
} from 'react-icons/fa6';
import { MdOutlineFeedback } from 'react-icons/md';
import { GiHighGrass } from 'react-icons/gi';

import styles from './MemberSider.module.scss';
import { HomeFilled, ClusterOutlined } from '@ant-design/icons';
import { Button, Flex, type MenuProps } from 'antd';
import { Link } from '@/navigation';

import { useTranslations } from 'next-intl';

import classNames from 'classnames/bind';

import {
  GetUserInfoGroup,
  getItem
} from '../../MainLayout/MenuSider/Models/menuItemsUser';
import { signOut, useSession } from 'next-auth/react';
import { ROLES } from '@/constants/roles';
import { LOGIN_PATH, SALOGIN_PATH } from '@/constants/routes';
const cx = classNames.bind(styles);

type Props = {
  path: string;
  visible: boolean;
};

const MemberSider = ({ path, visible }: Props) => {
  const t = useTranslations('Nav');
  const { data: session } = useSession();
  const userRole = session?.user?.userInfo?.role as ROLES;

  const handleSignOut = () => {
    switch (userRole) {
      case ROLES.SUPER_ADMIN:
        signOut({ callbackUrl: SALOGIN_PATH });

        break;
      case ROLES.ADMIN:
        signOut({ callbackUrl: LOGIN_PATH });

        break;
      default:
        signOut({ callbackUrl: LOGIN_PATH });

        break;
    }
  };
  const items: MenuProps['items'] = [
    GetUserInfoGroup(visible),

    { type: 'divider' },

    // getItem(
    //   `${t('gr_dash')}`,
    //   'dashboard',
    //   null,
    //   [
    //     getItem(
    //       <Link href={`/statistic`}>{t('dashboard')}</Link>,
    //       `/dashboard`,
    //       <HomeFilled />
    //     )
    //   ],
    //   'group'
    // ),
    // { type: 'divider' },

    getItem(
      `${t('management')}`,
      'management',
      null,
      [
        getItem(<Link href={`/site`}>{t('site')}</Link>, `/site`, <FaMapLocationDot />),
        // getItem(<Link href={`/user`}>{t('user')}</Link>, `/user`, <FaUser />),
        // getItem(
        //   <Link href={`/subscription`}>{t('subscription')}</Link>,
        //   `/subscription`,
        //   <FaClipboard />
        // ),
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
    ),
    getItem(
      <Button
        className=''
        type='link'
        onClick={handleSignOut}
        danger
        style={{ margin: 0, padding: '0', color: '#5F5F5F', fontWeight: '600' }}
      >
        <Flex
          gap='small'
          align='center'
          style={{ color: 'red' }}
        >
          {t('logout')}
        </Flex>
      </Button>,
      'logout',
      <Button
        className=''
        type='link'
        onClick={handleSignOut}
        style={{ margin: 0, padding: '0', color: '#5F5F5F', fontWeight: '600' }}
      >
        <FaRightFromBracket color='red' />
      </Button>
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
