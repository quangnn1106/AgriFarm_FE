'use client';
import { MenuProps, Menu, Space, Flex } from 'antd';
import classNames from 'classnames/bind';
import { Link } from '@/navigation';
import React, { useEffect, useState } from 'react';
import style from './menuSider.module.scss';
import vi_icon from '@/assets/Images/vietnam.png';
import en_icon from '@/assets/Images/united-states.png';

import Image from 'next/image';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { signOut, useSession } from 'next-auth/react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

const cx = classNames.bind(style);
interface Props {
  path: string;
}

const MenuHeaderLocale = (props: Props) => {
  const { path } = props;
  //const [current, setCurrent] = useState(`${path}`);
  const { data: session, status } = useSession();

  const locale = useLocale();
  const otherLocale = locale === 'en' ? 'vi' : 'en';

  const items: MenuProps['items'] = [
    {
      label: (
        <>
          <Link
            href={path}
            locale={otherLocale}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <Image
              src={locale === 'vi' ? vi_icon : en_icon}
              alt='icon_vi'
              width={28}
              height={28}
            />
          </Link>
        </>
      ),

      key: 'locale'
    }
  ];

  const [current, setCurrent] = useState('locale');

  const onClick: MenuProps['onClick'] = e => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return (
    // <Menu
    //   onClick={onClick}
    //   selectedKeys={[current]}
    //   theme='light'
    //   mode='horizontal'
    //   items={items}
    //   className={cx('menu_locale')}
    // />
    <Link
      href={path}
      locale={otherLocale}
      style={{ position: 'absolute', right: 12, top: 10 }}
    >
      <Image
        src={locale === 'vi' ? vi_icon : en_icon}
        alt='icon_vi'
        width={35}
        height={35}
      />
    </Link>
  );
};

export default MenuHeaderLocale;
