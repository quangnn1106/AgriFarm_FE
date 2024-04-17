'use client';
import * as React from 'react';
import './price.scss';
import classes from './title.module.scss';
import { Col, Row } from 'antd';
import { useRouter } from '@/navigation';
import { REGISTER_PATH } from '@/constants/routes';
interface PricingCardProps {
  duration: string;
  price: number;
}

const PricingCard: React.FC<PricingCardProps> = ({ duration, price }) => {
  const router = useRouter();
  return (
    <div className='pricing-card'>
      <div className='pricing-card-content'>
        <h3 className='pricing-card-duration'>{duration}</h3>
        <p className='pricing-card-description'>use AgriFarm solution</p>
        <div className='pricing-card-price'>
          <span className='pricing-card-currency'>$</span>
          <span className='pricing-card-amount'>{price}</span>
          <span className='pricing-card-frequency'>/month</span>
        </div>
        <button
          onClick={() => {
            router.push(REGISTER_PATH);
          }}
          className='pricing-card-button'
        >
          Try it now
        </button>
        <p className='pricing-card-info'>Click for more infomation -&gt;</p>
      </div>
    </div>
  );
};

const pricingData = [
  { duration: '1-year', price: 99 },
  { duration: '2-year', price: 95 },
  { duration: '3-year', price: 87 }
];

const PricingSection: React.FC = () => {
  return (
    <Row id='pricing'>
      <div className='pricing-section'>
        <Col>
          <div className={classes.sectionHeading}>
            <div className={classes.sectionTitle}>Pricing</div>
            <div className={classes.description}>Solution that are right for you</div>
          </div>
        </Col>
        <Row
          gutter={[40, 16]}
          style={{ margin: ' 0 0' }}
          justify='center'
          className='pricing-cards'
        >
          {pricingData.map((card, index) => (
            <Col
              xl={6}
              key={index}
            >
              <PricingCard
                key={index}
                duration={card.duration}
                price={card.price}
              />
            </Col>
          ))}
        </Row>
      </div>
    </Row>
  );
};

export default PricingSection;
