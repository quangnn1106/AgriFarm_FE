import React from 'react';
import { Badge, Button, Flex, type MenuProps } from 'antd';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import classNames from 'classnames/bind';
import sampleAva from '@/assets/Images/avatar.jpg';
import logoutIcon from '@/assets/Images/logout.png';

import styles from '../menuSider.module.scss';
import { signOut, useSession } from 'next-auth/react';

import { FaBell } from 'react-icons/fa6';

import { LOGIN_PATH, SALOGIN_PATH } from '@/constants/routes';
import { ROLES } from '@/constants/roles';

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

// Function to generate user information group
export function GetUserInfoGroup(visible: boolean): MenuItem {
  const { data: session } = useSession();
  const userRole = session?.user?.userInfo?.role as ROLES;

  // const handleSignOut = () => {
  //   switch (userRole) {
  //     case ROLES.SUPER_ADMIN:
  //       signOut({ callbackUrl: SALOGIN_PATH });

  //       break;
  //     case ROLES.ADMIN:
  //       signOut({ callbackUrl: LOGIN_PATH });

  //       break;
  //     default:
  //       signOut({ callbackUrl: LOGIN_PATH });

  //       break;
  //   }
  // };

  const t = useTranslations('Nav');
  return getItem(
    <>
      {!visible ? (
        <div>
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
          <Flex style={{padding: '10px 16px'}} justify='space-between'>
            <Flex align='center' gap={10}>
              <FaBell /> 
              <span> Notification</span>
            </Flex>
            <div className={cx('noti-number')}>8</div>
          </Flex>
        </div>
      ) : (
        <div
          className='d-flex'
          style={{ padding: '24px 6px 12px 8px' }}
        >
          <Badge count={5}>
          <Image
            src={sampleAva}
            width={40}
            height={40}
            priority={true}
            placeholder='empty'
            alt='123'
          />
          </Badge>
        </div>
        
      )}
      {/* <div className='d-flex' style={{padding: '1rem'}}>
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
      </div> */}

      {/* <Flex justify='center'>
        <Button
          style={{ width: '154px' }}
          className=''
          type='link'
          onClick={handleSignOut}
          danger
        >
          <Flex
            gap='small'
            align='center'
          >
            <Image
              src={logoutIcon}
              width={17}
              height={17}
              alt='logout icon'
            />
            {t('logout')}
          </Flex>
        </Button>
      </Flex> */}
    </>,
    'user',
    null,
    [],
    'group'
  );
}
