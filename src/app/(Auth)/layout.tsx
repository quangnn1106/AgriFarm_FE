'use client';
import React, { useEffect, useState } from 'react';

import { Layout } from 'antd';
import loginBanner from '@/assets/Images/loginbanner.png';
import signUpBanner from '@/assets/Images/signup-img.png';
import Image from 'next/image';

import { useSession } from 'next-auth/react';
import Loader from '@/components/Loader/Loader';
import { usePathname } from 'next/navigation';
import { roboto } from '@/styles/base/font';
import '../../styles/base/global.css';
const { Sider, Content } = Layout;

const AuthenticateTemplate = ({ children }: { children: React.ReactNode }) => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? Math.round(window.innerWidth) : 0,
    height: typeof window !== 'undefined' ? Math.round(window.innerHeight) : 0
  });
  const { status } = useSession();
  const path = usePathname();

  const isPath = path.startsWith('/login');

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: Math.round(window.innerWidth),
        height: Math.round(window.innerHeight)
      });
    };

    if (typeof window !== 'undefined') {
      // Check if window is defined (client-side)
      handleResize();

      // Attach the event listener
      window.addEventListener('resize', handleResize);

      // Cleanup the event listener on component unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []); // Empty dependency array to run the effect only once on mount

  if (status === 'loading') {
    return (
      <Loader
        fullScreen
        spinning={true}
      />
    );
  }
  return (
    <Layout>
      <Sider
        width={windowSize.width / 1.8}
        style={{
          height: windowSize.height,
          backgroundSize: 'cover'
        }}
      >
        <Image
          src={isPath ? loginBanner : signUpBanner}
          alt='Rice'
          quality={100}
          sizes='100vw'
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        />
      </Sider>
      <Content style={{ position: 'relative' }}>{children}</Content>
    </Layout>
  );
};

export default AuthenticateTemplate;
