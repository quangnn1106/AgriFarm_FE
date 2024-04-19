"use client"
import { Link } from '@/navigation';
import { UsingDetail } from '@/services/Admin/Activities/Payload/response/activityAdditionResponse';
import { getUsingDetailService } from '@/services/Admin/Activities/additionService';
import UseAxiosAuth from '@/utils/axiosClient';
import { Button, Col, Form, Input, Row } from 'antd';
import { AxiosInstance } from 'axios';
import { useEffect, useState } from 'react';

interface IProps {
  activityId: string;
  isFetching?: boolean;
  setIsFetching: any;
}

const UsingAddition = (props: IProps) => {
  const { activityId, isFetching, setIsFetching } = props;
  const [detail, setDetail] = useState<UsingDetail|null>();
  const http = UseAxiosAuth()

  const fetchAddition = async (http: AxiosInstance, activityId: string) => {
    try {
      console.log('Fetching data..');
      const responseData = await getUsingDetailService(activityId, http);
      console.log('Data here: ', responseData);
      setDetail(responseData?.data as UsingDetail);
      setIsFetching(false);
    } catch (error) {
      console.error('Error calling API activities:', error);
    }
  };

  useEffect(() => {
    fetchAddition(http, activityId)
  }, [activityId]);

  return (
    
    <>
      {detail && 
        <div>
          
          <p>Item: <Link href={`/${detail.item.type}/${detail.item.id}`}>{detail.item.name}</Link></p>
          <p>Use quantity: {detail.useValue}</p>
        </div>
      }
      
    </>
  )
};

export default UsingAddition;
