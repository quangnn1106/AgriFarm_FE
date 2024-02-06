import { Modal } from 'antd';
import { ModalFooterRender } from 'antd/es/modal/interface';
import React from 'react';

type Props = {
  title?: string;
  width?: number | string; // An optional width prop of type number or string
  open: boolean; // A required boolean prop for controlling the modal's open state
  onOk?: () => void; // An optional function prop for handling the OK action
  onCancel?: () => void; // An optional function prop for handling the Cancel action
  footer?: React.ReactNode | ModalFooterRender; // An optional React node prop for customizing the modal's footer
  children?: React.ReactNode;
  keyboard?: boolean;
  style?: React.CSSProperties;
  className?: string;
  closeIcon?: boolean | React.ReactNode;
  closable?: boolean;
};

const ModalCustom = ({
  title,
  width,
  open,
  onCancel,
  onOk,
  footer,
  children,
  keyboard = true,
  style,
  className,
  closeIcon,
  closable
}: Props) => {
  return (
    <Modal
      open={open}
      title={title}
      width={width}
      onOk={onOk}
      onCancel={onCancel}
      footer={footer}
      keyboard={keyboard}
      style={style}
      className={className}
      closeIcon={closeIcon}
      closable={closable}
    >
      {children}
    </Modal>
  );
};

export default React.memo(ModalCustom);
