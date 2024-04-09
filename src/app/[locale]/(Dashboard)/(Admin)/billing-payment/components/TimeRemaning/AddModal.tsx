import ModalCustom from '@/components/ModalCustom/ModalCustom';
import React from 'react';
import PricingSectionBillPay from '../PriceModal/priceModal';
import LogoImage from '@/components/Logo/LogoImage';

type Props = {};

const AddModal = ({ params }: { params: { visible: boolean; onCancel: () => void } }) => {
  return (
    <ModalCustom
      open={params.visible}
      title={
        <>
          <LogoImage style={{ position: 'absolute', left: '35px', top: '9px' }} />
        </>
      }
      width='90%'
      style={{ top: 40, maxWidth: 1660 }}
      keyboard
      // onOk={form.submit}
      onCancel={() => {
        params.onCancel();
        //openNotification('top', 'create process have been cancel!', 'error');
      }}
    >
      <PricingSectionBillPay />
    </ModalCustom>
  );
};

export default AddModal;
