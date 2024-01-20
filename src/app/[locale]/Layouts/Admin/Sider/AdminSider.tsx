import React from 'react';
import MenuSider from '../../MainLayout/MenuSider/MenuSider';
import {
  FaPlantWilt,
  FaWater,
  FaClipboardList,
  FaClipboardCheck,
  FaMapLocationDot,
  FaUser,
  FaClipboardUser
} from 'react-icons/fa6';
import { MdInventory } from 'react-icons/md';
import { GiHighGrass, GiPlantRoots } from 'react-icons/gi';

import {
  HomeFilled,
  WarningOutlined,
  DeleteFilled,
  SafetyCertificateFilled
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

type Props = {};
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
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

const AdminSider = (props: Props) => {
  const t = useTranslations('Nav');
  const items: MenuProps['items'] = [
    getItem(
      'DashBoard',
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
    getItem(
      'Map',
      'map',
      null,
      [getItem(<Link href={`/map`}>Map</Link>, `/map`, <FaMapLocationDot />)],
      'group'
    ),
    getItem(
      'Natural Features',
      'natural feature',

      null,
      [
        getItem(<Link href={`/land`}>Land</Link>, `/land`, <FaPlantWilt />),
        getItem(<Link href={`/water`}>Water</Link>, `/water`, <FaWater />)
      ],
      'group'
    ),
    getItem(
      'Farm Resources',
      'farm resources',
      null,
      [
        getItem(<Link href={`/user`}>User</Link>, `/user`, <FaUser />),
        getItem(<Link href={`/role`}>User Role</Link>, `/role`, <FaClipboardUser />),
        getItem(
          <Link href={`/certificate`}>User certification</Link>,
          `/certificate`,
          <SafetyCertificateFilled />
        )
      ],
      'group'
    ),
    { type: 'divider' },

    getItem(
      'Activities',
      'activities',
      null,
      [
        getItem(<Link href={`/risk`}>Risk</Link>, `/risk`, <WarningOutlined />),
        getItem(
          <Link href={`/activity`}>Activity</Link>,
          `/activity`,
          <FaClipboardList />
        ),
        getItem(
          <Link href={`/cultivation`}>Cultivation</Link>,
          `/cultivation`,
          <GiHighGrass />
        ),
        getItem(
          <Link href={`/production`}>Production</Link>,
          `/production`,
          <GiPlantRoots />
        ),
        getItem(<Link href={`/wastes`}>Wastes</Link>, `/wastes`, <DeleteFilled />)
      ],
      'group'
    ),
    getItem('Inventory', 'inventory', <MdInventory />, [
      getItem(<Link href={`/pesticide`}>Pesticide</Link>, `/pesticide`),
      getItem(<Link href={`/fertilizer`}>Fertilizer</Link>, `/fertilizer`),
      getItem(<Link href={`/rice_variety`}>Rice variety </Link>, `/rice_variety`),
      getItem(<Link href={`/product`}>Product</Link>, `/product`)
    ])
  ];
  return <MenuSider items={items} />;
};

export default AdminSider;
