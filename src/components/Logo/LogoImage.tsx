import Image from 'next/image';
import React from 'react';
import logo from '@/assets/Images/LogoAgri.png';

type Props = {};

const LogoImage = (props: Props) => {
  return (
    <Image
      src={logo}
      width={140}
      height={41}
      alt='logo'
      priority={true}
      style={{ position: 'absolute' }}
    />
  );
};

export default LogoImage;
