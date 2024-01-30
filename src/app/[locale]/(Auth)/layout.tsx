'use client';
import React, { useEffect, useState } from 'react';

import { Col, Layout, Row } from 'antd';
import loginBanner from '@/assets/Images/loginbanner.png';
import signUpBanner from '@/assets/Images/signup-img.png';
import Image from 'next/image';

import { useSession } from 'next-auth/react';
import Loader from '@/components/Loader/Loader';
import { usePathname } from '@/navigation';
import LogoImage from '@/components/Logo/LogoImage';

const { Sider, Content } = Layout;

const AuthenticateTemplate = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();
  const path = usePathname();

  const isPath = path.startsWith('/login');

  if (status === 'loading') {
    return (
      <Loader
        fullScreen
        spinning={true}
      />
    );
  }

  return (
    <Row className='disable_scroll'>
      <Col
        style={{
          height: '100vh',
          backgroundSize: 'cover'
        }}
        xs={24}
        sm={14}
        md={14}
        lg={14}
      >
        <Image
          src={isPath ? loginBanner : signUpBanner}
          alt='Rice'
          priority
          quality={100}
          sizes='100vw'
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        />
      </Col>
      <div className=''>
        <LogoImage />
      </div>
      <Col
        xs={24}
        sm={10}
        md={10}
        lg={10}
        className='mt_auto'
      >
        <Content>{children}</Content>
      </Col>
    </Row>
  );
};

export default AuthenticateTemplate;
