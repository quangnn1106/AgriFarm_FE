'use client';
/* eslint-disable react-hooks/rules-of-hooks */
import { Button, Drawer } from 'antd';
import { useState } from 'react';

const DetailSeedDrawer = ({
  params
}: {
  params: {
    seedId: string;
    openDrawer: boolean;
    onCancel: () => void;
  };
}) => {
  const [open, setOpen] = useState<boolean>(false);
  setOpen(params.openDrawer);

  const onClose = () => {
    setOpen(false);
    params.openDrawer = true;
  };
  
  return (
    <>
      <Drawer
        title='Basic Drawer'
        onClose={params.onCancel}
        open={params.openDrawer}
        
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};
export default DetailSeedDrawer;
