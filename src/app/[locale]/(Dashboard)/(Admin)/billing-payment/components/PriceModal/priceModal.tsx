'use client';
import * as React from 'react';
import classed from './price.module.scss';
import classes from './title.module.scss';

import classNames from 'classnames/bind';
import { Col, Layout, Row } from 'antd';
import { useEffect } from 'react';
import getSolutionApi from '@/services/Common/getSolutionService';
import { SolutionPackage } from '@/services/Common/payload/response/solutionResponse';
import UseAxiosAuth from '@/utils/axiosClient';
import { AxiosInstance } from 'axios';
interface PricingCardProps {
  duration: string;
  price: number;
}
const cx = classNames.bind(classed);

const PricingCard: React.FC<SolutionPackage> = ({ durationInMonth, price, id, name }) => {
  return (
    <div className={cx('pricing-card')}>
      <div className={cx('pricing-card-content')}>
        <h3 className={cx('pricing-card-duration')}>{durationInMonth} tháng</h3>
        <p className={cx('pricing-card-description')}>Sử dụng giải pháp AgriFarm</p>
        <div className={cx('pricing-card-price')}>
          <span className={cx('pricing-card-currency')}>VNĐ</span>
          <span className={cx('pricing-card-amount')}>{price?.toLocaleString()}</span>
          <span className={cx('pricing-card-frequency')}>/tháng</span>
        </div>
        <button
          onClick={() => {}}
          className={cx('pricing-card-button')}
        >
          Gia hạn
        </button>
        {/* <p className={cx('pricing-card-info')}>Click for more infomation -&gt;</p> */}
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
  const [solution, setSolution] = React.useState<SolutionPackage[] | []>();
  const http = UseAxiosAuth();
  const fetchSolution = async (http: AxiosInstance) => {
    try {
      const responseData = await getSolutionApi(http);
      //console.log(responseData);
      setSolution(responseData?.data as SolutionPackage[]);
      //setIsFetching(false);
    } catch (error) {
      console.error('Error calling API Subscription:', error);
    }
  };

  useEffect(() => {
    fetchSolution(http);
  }, [http]);
  return (
    <Layout style={{ background: 'none' }}>
      <Row
        id='pricing'
        style={{ padding: '0 48px' }}
      >
        <div className={cx('pricing-section')}>
          <Col>
            <div className={classes.sectionHeading}>
              <div className={classes.sectionTitle}>Chọn gói giải pháp gia hạn.</div>
              <div className={classes.description}>
                Hoặc liên hệ <a>AgriFarm</a> để được hướng dẫn.
              </div>
            </div>
          </Col>
          <Row
            //  gutter={[40, 16]}
            style={{ margin: ' 0 0' }}
            justify='space-evenly'
            className={cx('pricing-cards')}
          >
            {solution?.map((card, index) => (
              <Col
                xl={6}
                key={index}
              >
                <PricingCard
                  durationInMonth={card.durationInMonth}
                  price={card.price}
                  id={card.id}
                  name={card.name}
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
