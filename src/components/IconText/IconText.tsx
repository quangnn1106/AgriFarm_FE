import { Space } from "antd";
import React from "react";
import { ReactNode } from "react";

const IconText = ({
    icon,
    label,
    value
  }: {
    icon: React.FC;
    label: ReactNode;
    value: ReactNode;
  }) =>  {
    return (
        <Space style={{ width: '100%' }}>
          {React.createElement(icon)}
          <div style={{ fontSize: '0.8rem', fontWeight: 'normal', textWrap: 'nowrap' }}>
            {label}
          </div>
          <div style={{ fontSize: '1rem', fontWeight: 'bold', textWrap: 'nowrap' }}>
            {value}
          </div>
        </Space>
      );
  }
  
  export default IconText;