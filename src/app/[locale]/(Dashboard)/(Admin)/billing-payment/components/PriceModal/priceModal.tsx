'use client';
import * as React from 'react';
import classed from './price.module.scss';
import classes from './title.module.scss';

import classNames from 'classnames/bind';
import { Col, Layout, Row } from 'antd';
interface PricingCardProps {
  duration: string;
  price: number;
}
const cx = classNames.bind(classed);

const PricingCard: React.FC<PricingCardProps> = ({ duration, price }) => {
  return (
    <div className={cx('pricing-card')}>
      <div className={cx('pricing-card-content')}>
        <h3 className={cx('pricing-card-duration')}>{duration}</h3>
        <p className={cx('pricing-card-description')}>use AgriFarm solution</p>
        <div className={cx('pricing-card-price')}>
          <span className={cx('pricing-card-currency')}>$</span>
          <span className={cx('pricing-card-amount')}>{price}</span>
          <span className={cx('pricing-card-frequency')}>/month</span>
        </div>
        <button className={cx('pricing-card-button')}>Try it now</button>
        <p className={cx('pricing-card-info')}>Click for more infomation -&gt;</p>
      </div>
    </div>
  );
};

const pricingData = [
  { duration: '1-year', price: 99 },
  { duration: '2-year', price: 95 },
  { duration: '3-year', price: 87 }
];

const PricingSectionBillPay: React.FC = () => {
  return (
    <Layout style={{ background: 'none' }}>
      <Row
        id='pricing'
        style={{ padding: '0 48px' }}
      >
        <div className={cx('pricing-section')}>
          <Col>
            <div className={classes.sectionHeading}>
              <div className={classes.sectionTitle}>Choose Your AgriFarm Plan.</div>
              <div className={classes.description}>
                Please contact <a>AgriFarm</a> for more information.
              </div>
            </div>
          </Col>
          <Row
            //  gutter={[40, 16]}
            style={{ margin: ' 0 0' }}
            justify='space-evenly'
            className={cx('pricing-cards')}
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
    </Layout>
  );
};

export default PricingSectionBillPay;
