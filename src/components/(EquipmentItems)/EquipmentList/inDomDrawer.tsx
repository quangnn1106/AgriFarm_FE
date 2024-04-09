import { theme, Button, Drawer } from 'antd';
import { ReactNode, useState } from 'react';

interface IProps {
  isOpen: boolean;
  height?:number|string;
  width?:number|string;
  onClose: () => void;
  children: ReactNode
}

export default function InDomDrawer(props: IProps) {
  const { isOpen, onClose, height, width, children } = props;
  const { token } = theme.useToken();
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        //bottom:-10,
        marginLeft: 10,
        position: 'relative',
        height: 0,
        width: width??'70vw',
        //padding: 48,
        //overflow: 'hidden',
        //background: 'white'
        //border: `1px solid ${token.colorBorderSecondary}`,
        //borderRadius: token.borderRadiusLG
      }}
    >
      {/* <Flex
      vertical
      justify='center'
      > */}
      <Drawer
        style={{
            //bottom:30,
            
          width: '70vw',
          border: `2px solid ${token.colorBorderSecondary}`,
          borderRadius: token.borderRadiusLG
        }}
        title='Basic Drawer'
        placement='bottom'
        closable={true}
        onClose={onClose}
        open={isOpen}
        getContainer={false}
        height={height?? 300}
        //width={'70vw'}
        
      >
        {/* <div style={{ width: '70%' }}>Some contents...</div> */}
        {children}
      </Drawer>
      {/* </Flex> */}
    </div>
  );
}
