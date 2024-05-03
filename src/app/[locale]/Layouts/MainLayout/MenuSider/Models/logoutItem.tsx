import React from 'react';
import { Button, Flex, type MenuProps } from 'antd';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import classNames from 'classnames/bind';
import sampleAva from '@/assets/Images/avatar.jpg';
import logoutIcon from '@/assets/Images/logout.png';

import styles from '../menuSider.module.scss';
import { signOut, useSession } from 'next-auth/react';

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
export function GetLogoutItem(): MenuItem {
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

  const t = useTranslations('Nav');
  return getItem(
    <>
      <Flex justify='center'>
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
      </Flex>
    </>,
    'user',
    null,
    [],
    'group'
  );
}
