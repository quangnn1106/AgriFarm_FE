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
import sampleAva from '@/assets/Images/avatar.jpg';
import iconRice from '@/assets/Images/emojione-monotone_sheaf-of-rice.png';
import logoutIcon from '@/assets/Images/logout.png';
import styles from './AdminSider.module.scss';
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
import { signOut } from 'next-auth/react';
const cx = classNames.bind(styles);

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
          <div className={cx(' d-flex flex-col', 'text_sidebar')}>
            <p className={cx('p_role')}>Admin</p>
            <p className={cx('p_name')}>Nguyen Van A</p>
          </div>
        </div>
        <Flex justify='center'>
          <Button
            style={{ width: '154px' }}
            className=''
            type='link'
            onClick={() => {
              signOut();
            }}
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
    ),

    { type: 'divider' },

    getItem(
      `${t('gr_dash')}`,
      'dashboard',
      null,
      [
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
      ],
      'group'
    ),
    { type: 'divider' },

    getItem(
      `${t('map')}`,
      'map',
      null,
      [getItem(<Link href={`/map`}>{t('map')}</Link>, `/map`, <FaMapLocationDot />)],
      'group'
    ),
    getItem(
      `${t('natural_feature')}`,
      'natural feature',

      null,
      [
        getItem(<Link href={`/land`}>{t('land')}</Link>, `/land`, <FaPlantWilt />),
        getItem(<Link href={`/water`}>{t('water')}</Link>, `/water`, <FaWater />)
      ],
      'group'
    ),
    { type: 'divider' },

    getItem(
      `${t('farm_resource')}`,
      'farm resources',
      null,
      [
        getItem(<Link href={`/user`}>{t('user')}</Link>, `/user`, <FaUser />),
        getItem(
          <Link href={`/role`}>{t('user_role')}</Link>,
          `/role`,
          <FaClipboardUser />
        ),
        getItem(
          <Link href={`/certificate`}>{t('user_cer')}</Link>,
          `/certificate`,
          <SafetyCertificateFilled />
        )
      ],
      'group'
    ),
    { type: 'divider' },

    getItem(
      `${t('activities')}`,
      'activities',
      null,
      [
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
      ],
      'group'
    ),
    getItem(`${t('inven')}`, 'inventory', <MdInventory />, [
      getItem(<Link href={`/pesticide`}>{t('pesti')}</Link>, `/pesticide`),
      getItem(<Link href={`/fertilizer`}>{t('fer')}</Link>, `/fertilizer`),
      getItem(<Link href={`/rice_variety`}>{t('rice_va')}</Link>, `/rice_variety`),
      getItem(<Link href={`/product`}>{t('prod')}</Link>, `/product`)
    ]),

    { type: 'divider' },

    getItem(
      `${t('external')}`,
      'external',
      null,
      [
        getItem(
          <Link href={`/subcontractor`}>{t('subcontract')}</Link>,
          `/subcontractor`,
          <FaHandshakeAngle />
        ),
        getItem(<Link href={`/expert`}>{t('expert')}</Link>, `/expert`, <FaUserTie />)
      ],
      'group'
    ),
    { type: 'divider' },

    getItem(
      `${t('GBG')}`,
      'GBG',
      null,
      [
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
      ],
      'group'
    )
  ];
  return (
    <>
      {/* <Image
        src={sampleAva}
        width={30}
        height={30}
        priority={true}
        placeholder='empty'
        alt='123'
        style={{ position: 'absolute' }}
      /> */}
      <MenuSider items={items} />
    </>
  );
};

export default AdminSider;