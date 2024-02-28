import React, { useState, useEffect, useRef } from 'react';
import { MenuProps, Menu, ConfigProvider } from 'antd';
import {
  LikeOutlined,
  HomeOutlined,
  NotificationOutlined,
  UserOutlined,
  MessageOutlined,
  PhoneOutlined,
  TeamOutlined,
  DollarOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import styles from './menuSider.module.scss';
const cx = classNames.bind(styles);
import classNames from 'classnames/bind';
import { usePathname } from 'next/navigation';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
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


type Props = {
  items: MenuItem[];
  path : string
};
const MenuSider = ({ items, path }: Props) => {


  const [current, setCurrent] = useState(`${path}`);
  console.log(path);

  const onClick: MenuProps['onClick'] = e => {
    console.log('click ', e);

    setCurrent(e.key);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            // itemSelectedBg: 'none',
            itemSelectedColor: 'black',
            iconSize: 15,
            itemHeight: 40,
            itemColor: '#5F5F5F',
            groupTitleColor: '757575'
          }
        }
      }}
    >
      <Menu
        onClick={onClick}
        className={cx('text')}
        selectedKeys={[current]}
        mode='inline'
        selectable={true}
        items={items}
      />
    </ConfigProvider>
  );
};

export default MenuSider;
