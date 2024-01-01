'use client';
import React, { useEffect } from 'react';
import { Spin } from 'antd';

const LoadingAll: React.FC = () => {
  const [spinning, setSpinning] = React.useState<boolean>(true);

  //   const showLoader = () => {
  //     setTimeout(() => {
  //       setSpinning(false);
  //     }, 3000);
  //   };
  //   useEffect(() => {
  //     setTimeout(() => {
  //       setSpinning(false);
  //     }, 5000);
  //   }, []);

  return (
    <>
      <Spin
        spinning={spinning}
        fullscreen
      />
    </>
  );
};

export default LoadingAll;
