'use client';
import * as React from 'react';
import './price.scss';
import classes from './title.module.scss';
import { Col, Row } from 'antd';
// import { useRouter } from '@/navigation';
import { REGISTER_PATH } from '@/constants/routes';
import { SolutionPackage } from '@/services/Common/payload/response/solutionResponse';
import { useEffect, useState } from 'react';
import UseAxiosAuth from '@/utils/axiosClient';
import { AxiosInstance } from 'axios';
import getSolutionApi from '@/services/Common/getSolutionService';
import { useRouter } from 'next/navigation';
interface PricingCardProps {
  duration: number;
  price: number;
}

const PricingCard: React.FC<SolutionPackage> = ({ durationInMonth, price, id, name }) => {
  const router = useRouter();
  return (
    <div className='pricing-card'>
      <div className='pricing-card-content'>
        <h3 className='pricing-card-duration'>{durationInMonth} tháng</h3>
        <p className='pricing-card-description'>Sử dụng giải pháp AgriFarm</p>
        <div className='pricing-card-price'>
          <span className='pricing-card-currency'>VNĐ</span>
          <span className='pricing-card-amount'>{price?.toLocaleString()}</span>
          <span className='pricing-card-frequency'>/tháng</span>
        </div>
        <button
          onClick={() => {
            router.push(`${REGISTER_PATH}?id=${id}&name=${name}&price=${price}`);
          }}
          className='pricing-card-button'
        >
          Mua ngay
        </button>
        <p className='pricing-card-info'>Xem thông tin chi tiết-&gt;</p>
      </div>
    </div>
  );
};

const pricingData = [
  { duration: '1 năm', price: 990000 },
  { duration: '2 năm', price: 950000 },
  { duration: '3 năm', price: 870000 }
];

const PricingSection: React.FC = () => {
  const [solution, setSolution] = useState<SolutionPackage[] | []>();
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
    <Row id='pricing'>
      <div className='pricing-section'>
        <Col>
          <div className={classes.sectionHeading}>
            <div className={classes.sectionTitle}>Gói giải pháp</div>
            <div className={classes.description}>Giải pháp phù hợp cho bạn</div>
          </div>
        </Col>
        <Row
          gutter={[40, 16]}
          style={{ margin: ' 0 0' }}
          justify='center'
          className='pricing-cards'
        >
          {solution?.map((card, index) => (
            <Col
              xl={6}
              key={index}
            >
              <PricingCard
                key={index}
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
  );
};

export default PricingSection;
