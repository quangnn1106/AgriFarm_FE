import { Spin } from 'antd';
import { useState } from 'react';
type Props = {
  userState: string;
};

const Loading = (props: Props) => {
  const { userState } = props;

  return <Spin spinning={userState ? true : false}></Spin>;
};

export default Loading;
