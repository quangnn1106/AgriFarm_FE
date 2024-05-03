import React from 'react';
import { Badge, Button, Flex, Popover, type MenuProps } from 'antd';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import classNames from 'classnames/bind';
import sampleAva from '@/assets/Images/avatar.jpg';
//import sampleAva from '~/meo.jpg';
import logoutIcon from '@/assets/Images/logout.png';

import styles from '../menuSider.module.scss';
import { signOut, useSession } from 'next-auth/react';

import { FaBell } from 'react-icons/fa6';

import {
  AD_MA_PROFILE_PATH,
  DENIED_PATH,
  LOGIN_PATH,
  MEM_PROFILE_PATH,
  SALOGIN_PATH,
  SA_PROFILE_PATH
} from '@/constants/routes';
import { ROLES } from '@/constants/roles';
import { Link } from '@/navigation';
import NotificationBell from '@/components/(NotificationItems)/NotificationBell/notificationBell';
import { NotificationContextProvider } from '@/components/context/notification/SignalRNotifyContext';
import NotifyBellResponsive from '@/components/(NotificationItems)/NotificationBell/notifyBellResponsive';

const cx = classNames.bind(styles);

type Props = {};

type MenuItem = Required<MenuProps>['items'][number];

export function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem;
}

export const renderMemPro: (role: string) => string = (role: string): string => {
  if (role === ROLES.SUPER_ADMIN) {
    return SA_PROFILE_PATH;
  }
  if (role === ROLES.ADMIN || ROLES.MANAGER) {
    return AD_MA_PROFILE_PATH;
  }
  if (role === ROLES.MEMBER) {
    return MEM_PROFILE_PATH;
  }
  console.log(' return DENIED_PATH');

  // Add a default return value in case the role doesn't match any condition
  return DENIED_PATH; // You need to define DEFAULT_PATH according to your application logic
};
// Function to generate user information group
export function NotifyGroupItem(visible?: boolean): MenuItem {
  const { data: session } = useSession();
  const userRole = session?.user?.userInfo?.role as string;
  const userId = session?.user.userInfo.id;

  const t = useTranslations('Nav');

  return getItem(
    <>
      {!visible ? (
        <div>
          {/* if admin */}
          {/* <Link href={renderMemPro(userRole)}>
            <div
              className='d-flex'
              style={{ padding: '1rem' }}
            >
              <Image
                src={sampleAva}
                width={40}
                height={40}
                priority={true}
                placeholder='empty'
                alt='123'
              />
              <div className={cx('d-flex flex-col', 'text_sidebar')}>
                <p className={cx('p_role')}>{session?.user?.userInfo?.role}</p>
                <p className={cx('p_name')}>{session?.user?.userInfo?.fullName}</p>
              </div>
            </div>
          </Link> */}

          <NotificationBell />
        </div>
      ) : (
        <div
          className='d-flex jus-center'
          // style={{ padding: '24px 6px 12px 8px' }}
          style={{ margin: '3px' }}
        >
          {/* <Badge>
            <FaBell size={21} />
            
          </Badge> */}

          <NotifyBellResponsive />
        </div>
      )}
    </>,
    'notify',
    null,
    [],
    'group'
  );
}
