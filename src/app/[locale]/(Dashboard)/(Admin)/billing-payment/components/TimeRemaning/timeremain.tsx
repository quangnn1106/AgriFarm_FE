import { Flex, Image, Progress } from 'antd';
import * as React from 'react';
import './timeremain.scss';
import { Content } from 'antd/es/layout/layout';
import ModalCustom from '@/components/ModalCustom/ModalCustom';
interface SubscriptionInfoProps {
  daysRemaining: number;
  subscriptionPlan: string;
  price: number;
  buttonProps: React.ReactNode;
}

const SubscriptionInfo: React.FC<SubscriptionInfoProps> = ({
  daysRemaining,
  subscriptionPlan,
  price,
  buttonProps
}) => {
  const handleOnClick = () => {
    console.log('123123');
  };
  return (
    <div className='subscription-info'>
      <div className='subscription-info__item'>
        <div className='subscription-info__label'>Ngày hết hạn</div>
        <div className='subscription-info__progress-bar'>
          <div className='subscription-info__progress'>
            {/* <Progress
              percent={50}
              showInfo={false}
            /> */}
          </div>
        </div>

        <div className='subscription-info__days-remaining'>
          Còn lại {daysRemaining} ngày
        </div>
      </div>
      <div className='subscription-info__item'>
        <div className='subscription-info__label text-a-center'>Gói dịch vụ của bạn</div>
        <div className='subscription-info__plan'>{subscriptionPlan}</div>
      </div>
      <div className='subscription-info__item'>
        <div className='subscription-info__price'>
          <div className='subscription-info__price-symbol'>vnd</div>
          <div className='subscription-info__price-value'>
            {price.toLocaleString()}
            <span className='subscription-info__price-period'>/month</span>
          </div>
        </div>
        {/* <div className='subscription-info__price-period'>/month</div> */}
        {/* <button
          onClick={handleOnClick}
          className='subscription-info__renew-button'
        >
          Gia hạn gói
        </button> */}
        {buttonProps}
      </div>
    </div>
  );
};

const TimeRemainingComponent = ({
  params
}: {
  params: { buttonProps: React.ReactNode };
}) => {
  return (
    <Content style={{ padding: '0 24px' }}>
      <div className='subscription-card'>
        <div className='subscription-card__header'>
          <Image
            src='https://cdn.builder.io/api/v1/image/assets/TEMP/2b9521bf97593df57a1c9e8806354c79867f332bb26832222b961a85e1e79a0f?apiKey=a3c86750458a463dbdaef0731e8c4142&'
            alt='Subscription icon'
            className='subscription-card__icon'
          />
          <div className='subscription-card__next-invoice'>
            Hạn thanh toán của bạn sẽ hết hạn vào 22/04/2024
          </div>
        </div>
        <div className='subscription-card__content'>
          <SubscriptionInfo
            daysRemaining={10}
            subscriptionPlan='Cơ bản'
            price={790000}
            buttonProps={params.buttonProps}
          />
        </div>
      </div>
    </Content>
  );
};

export default TimeRemainingComponent;
