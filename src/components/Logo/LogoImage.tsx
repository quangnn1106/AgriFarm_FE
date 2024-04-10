import Image from 'next/image';
import React from 'react';
import logo from '@/assets/Images/Logo.png';

type Props = {
  style?: React.CSSProperties | undefined;
};

const LogoImage = ({ style }: Props) => {
  return (
    <Image
      src={logo}
      width={140}
      height={41}
      alt='logo'
      priority={true}
      style={style ? style : { position: 'absolute', left: '0' }}
    />
  );
};

export default LogoImage;
