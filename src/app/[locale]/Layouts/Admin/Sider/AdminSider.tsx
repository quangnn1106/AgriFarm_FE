import React from 'react';
import MenuSider from '../../MainLayout/MenuSider/MenuSider';
import {
  FaPlantWilt,
  FaWater,
  FaClipboardList,
  FaClipboardCheck,
  FaMapLocationDot,
  FaUser,
  FaClipboardUser,
  FaHandshakeAngle,
  FaUserTie,
  FaFileLines,
  FaCircleUser,
  FaClipboard
} from 'react-icons/fa6';
import { MdInventory } from 'react-icons/md';
import { GiHighGrass, GiPlantRoots } from 'react-icons/gi';
import iconRice from '@/assets/Images/emojione-monotone_sheaf-of-rice.png';
import styles from './AdminSider.module.scss';
import {
  HomeFilled,
  WarningOutlined,
  DeleteFilled,
  SafetyCertificateFilled
} from '@ant-design/icons';
import { type MenuProps } from 'antd';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import classNames from 'classnames/bind';

import {
  GetUserInfoGroup,
  getItem
} from '../../MainLayout/MenuSider/Models/menuItemsUser';
const cx = classNames.bind(styles);

type Props = { path: string };

const AdminSider = ({ path }: Props) => {
  const t = useTranslations('Nav');
  const items: MenuProps['items'] = [
    GetUserInfoGroup(),
    { type: 'divider' },

    getItem(`${t('gr_dash')}`, 'dashboard', <HomeFilled />, [
      getItem(
        <Link href={`/statistic`}>{t('dashboard')}</Link>,
        `/dashboard`,
        <HomeFilled />
      ),
      getItem(
        <Link href={`/siteprofile`}>{t('site_pro')}</Link>,
        `/siteprofile`,
        <FaCircleUser />
      ),
      getItem(
        <Link href={`/subscription`}>{t('subscription')}</Link>,
        `/subscription`,
        <FaClipboard />
      )
    ]),
    { type: 'divider' },

    getItem(`${t('map')}`, 'map', <FaMapLocationDot />, [
      getItem(<Link href={`/map`}>{t('map')}</Link>, `/map`, <FaMapLocationDot />)
    ]),
    getItem(`${t('natural_feature')}`, 'natural feature', <FaPlantWilt />, [
      getItem(<Link href={`/land`}>{t('land')}</Link>, `/land`, <FaPlantWilt />),
      getItem(<Link href={`/water`}>{t('water')}</Link>, `/water`, <FaWater />)
    ]),
    { type: 'divider' },

    getItem(`${t('farm_resource')}`, 'farm resources', <FaClipboardUser />, [
      getItem(<Link href={`/staff`}>{t('user')}</Link>, `/staff`, <FaUser />),
      getItem(<Link href={`/role`}>{t('user_role')}</Link>, `/role`, <FaClipboardUser />),
      getItem(
        <Link href={`/certificate`}>{t('user_cer')}</Link>,
        `/certificate`,
        <SafetyCertificateFilled />
      )
    ]),
    { type: 'divider' },

    getItem(`${t('activities')}`, 'activities', <FaClipboardList />, [
      getItem(<Link href={`/risk`}>{t('risk')}</Link>, `/risk`, <WarningOutlined />),
      getItem(
        <Link href={`/activity`}>{t('activity')}</Link>,
        `/activity`,
        <FaClipboardList />
      ),
      getItem(
        <Link href={`/cultivation`}>{t('culti')}</Link>,
        `/cultivation`,
        <GiHighGrass />
      ),
      getItem(
        <Link href={`/production`}>{t('pro')}</Link>,
        `/production`,
        <GiPlantRoots />
      ),
      getItem(<Link href={`/wastes`}>{t('wastes')}</Link>, `/wastes`, <DeleteFilled />)
    ]),
    getItem(`${t('inven')}`, 'inventory', <MdInventory />, [
      getItem(<Link href={`/pesticide`}>{t('pesti')}</Link>, `/pesticide`),
      getItem(<Link href={`/fertilizer`}>{t('fer')}</Link>, `/fertilizer`),
      getItem(<Link href={`/rice_variety`}>{t('rice_va')}</Link>, `/rice_variety`),
      getItem(<Link href={`/product`}>{t('prod')}</Link>, `/product`)
    ]),

    { type: 'divider' },

    getItem(`${t('external')}`, 'external', <FaHandshakeAngle />, [
      getItem(
        <Link href={`/subcontractor`}>{t('subcontract')}</Link>,
        `/subcontractor`,
        <FaHandshakeAngle />
      ),
      getItem(<Link href={`/expert`}>{t('expert')}</Link>, `/expert`, <FaUserTie />)
    ]),
    { type: 'divider' },

    getItem(`${t('GBG')}`, 'GBG', <FaClipboardCheck />, [
      getItem(<Link href={`/document`}>{t('doc')}</Link>, `/document`, <FaFileLines />),
      getItem(
        <Link href={`/rice_cultivation`}>{t('rice_culti')}</Link>,
        `/rice_cultivation`,
        <Image
          src={iconRice}
          alt='icon_rice'
          width={18}
          height={20}
        />
      ),
      getItem(
        <Link href={`/globalcheck`}>{t('GBG_checklist')}</Link>,
        `/globalcheck`,
        <FaClipboardCheck />
      )
    ])
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

export default AdminSider;
