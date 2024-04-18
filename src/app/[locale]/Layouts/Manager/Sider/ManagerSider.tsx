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
  FaClipboard,
  FaRightFromBracket
} from 'react-icons/fa6';
import { MdInventory } from 'react-icons/md';
import { GiHighGrass, GiPlantRoots } from 'react-icons/gi';
import iconRice from '@/assets/Images/emojione-monotone_sheaf-of-rice.png';
import styles from './ManagerSider.module.scss';
import {
  HomeFilled,
  WarningOutlined,
  DeleteFilled,
  SafetyCertificateFilled
} from '@ant-design/icons';
import { Button, Flex, type MenuProps } from 'antd';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import classNames from 'classnames/bind';

import {
  GetUserInfoGroup,
  getItem
} from '../../MainLayout/MenuSider/Models/menuItemsUser';
import { signOut, useSession } from 'next-auth/react';
import { ROLES } from '@/constants/roles';
import { LOGIN_PATH, SALOGIN_PATH } from '@/constants/routes';
const cx = classNames.bind(styles);

type Props = { path: string; visible: boolean };

const ManagerSider = ({ path, visible }: Props) => {
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
        <Link href={`/activities`}>{t('activity')}</Link>,
        `/activities`,
        <FaClipboardList />
      ),
      getItem(`${t('training')}`, 'training', <FaClipboardList />, [
        getItem(
          <Link href={`/training/contents`}>{t('t_content')}</Link>,
          `/training/contents`,
          <FaClipboardList />
        ),
        getItem(
          <Link href={`/training/experts`}>{t('expert')}</Link>,
          `/training/experts`,
          <FaClipboardList />
        )
        // getItem(
        //   <Link href={`/training/details`}>{t('detail')}</Link>,
        //   `/training/details`,
        //   <FaClipboardList />
        // ),
      ]),
      getItem(<Link href={`/season`}>{t('culti')}</Link>, `/season`, <GiHighGrass />),
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
        <Link href={`/supplier`}>{t('subcontract')}</Link>,
        `/supplier`,
        <FaHandshakeAngle />
      ),
      getItem(<Link href={`/expert`}>{t('expert')}</Link>, `/expert`, <FaUserTie />)
    ]),
    { type: 'divider' },

    // getItem(`${t('GBG')}`, 'GBG', <FaClipboardCheck />, [
    //   getItem(<Link href={`/document`}>{t('doc')}</Link>, `/document`, <FaFileLines />),
    //   getItem(
    //     <Link href={`/rice_cultivation`}>{t('rice_culti')}</Link>,
    //     `/rice_cultivation`,
    //     <Image
    //       src={iconRice}
    //       alt='icon_rice'
    //       width={18}
    //       height={20}
    //     />
    //   ),
    //   getItem(
    //     <Link href={`/globalcheck`}>{t('GBG_checklist')}</Link>,
    //     `/globalcheck`,
    //     <FaClipboardCheck />
    //   ),
    //   { type: 'divider' }
    // ]),
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

export default ManagerSider;
