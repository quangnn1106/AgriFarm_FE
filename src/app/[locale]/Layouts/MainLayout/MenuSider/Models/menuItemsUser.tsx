import React from 'react';
import { Button, Flex, type MenuProps } from 'antd';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import classNames from 'classnames/bind';
import sampleAva from '@/assets/Images/avatar.jpg';
import logoutIcon from '@/assets/Images/logout.png';

import styles from '../menuSider.module.scss';
import { signOut, useSession } from 'next-auth/react';

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
export function GetUserInfoGroup(): MenuItem {
  const handleSignOut = () => {
    signOut();
  };
  const { data: session } = useSession();
  const check = session?.user.userInfo.roles.length === 4;
  const t = useTranslations('Nav');
  return getItem(
    <>
      <div className='d-flex'>
        <Image
          src={sampleAva}
          width={40}
          height={40}
          priority={true}
          placeholder='empty'
          alt='123'
        />
        <div className={cx('d-flex flex-col', 'text_sidebar')}>
          <p className={cx('p_role')}>
            {check ? session?.user.userInfo.roles[2] : session?.user.userInfo.roles[0]}
          </p>
          <p className={cx('p_name')}>{session?.user.userInfo.userName}</p>
        </div>
      </div>
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
