import { Flex } from 'antd';
import React from 'react';
import {
  FaCloudSunRain,
  FaDroplet,
  FaTemperatureLow,
  FaWind,
  FaFan,
  FaCloudShowersHeavy
} from 'react-icons/fa6';
import IconText from '../IconText/IconText';

type Props = {};

const WeatherComponent = (props: Props) => {
  return (
    <>
      <Flex
        gap={10}
        style={{ width: '100%', marginTop: '20px' }}
        wrap='wrap'
        vertical={false}
        justify='center'
      >
        <div style={{ width: '30%' }}>
          <IconText
            icon={<FaCloudSunRain />}
            label='Thời tiết'
            value='rain'
          ></IconText>
        </div>
        <div style={{ width: '30%' }}>
          <IconText
            icon={<FaDroplet />}
            label='Độ ẩm'
            value='rain'
          ></IconText>
        </div>
        <div style={{ width: '30%' }}>
          <IconText
            icon={<FaTemperatureLow />}
            label='Nhiệt độ'
            value='rain'
          ></IconText>
        </div>
        <div style={{ width: '30%' }}>
          <IconText
            icon={<FaWind />}
            label='Tốc độ gió'
            value='rain'
          ></IconText>
        </div>
        <div style={{ width: '30%' }}>
          <IconText
            icon={<FaFan />}
            label='Weather'
            value='rain'
          ></IconText>
        </div>
        <div style={{ width: '30%' }}>
          <IconText
            icon={<FaCloudShowersHeavy />}
            label='Weather'
            value='rain'
          ></IconText>
        </div>
      </Flex>
    </>
  );
};

export default WeatherComponent;
