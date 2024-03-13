/* eslint-disable react-hooks/rules-of-hooks */

'use client';
import { TableColumnsType, Tag } from 'antd';
import { Land, Product, RiceVariety } from '../../models/season-model';
// import fetchRiceVarietyDetails from '@/services/Admin/RiceVariety/getRiceVarietyDetailApi';
import React, { useEffect, useState } from 'react';


  export const LandAndRiceVarietyColumns: TableColumnsType<Product> = [
    {
      title: 'Land Name',
      dataIndex: 'id',
      hidden:true
    },
    {
      title: 'Land Name',
      dataIndex: 'land',
      width: 'max-content',
      render: (_, productItem) => `${productItem.land.name}`,
      
    },
    {
      title: 'Rice Variety',
      dataIndex: 'riceVarietyID',
      width: 'max-content',
      render: (_, productItem) => `${productItem.seed.name}`,
    },
  ];



  // async (_, { riceVarietyID }) => {
  //   // eslint-disable-next-line react-hooks/rules-of-hooks
  //   const [riceVarietyName, setRiceVarietyName] = useState<string | undefined>("Chua chon");  
  //   const [loading, setLoading] = useState<boolean>(true);
  //   try {
  //      await fetchRiceVarietyDetails(riceVarietyID)
  //     .then(res => setRiceVarietyName(res.name))
  //     .finally(()=> {
  //       setLoading(false); 
  //     });
  //     if (!loading) {
  //       return (
  //         <Tag>
  //            {riceVarietyName}
  //         </Tag>
  //       );
  //     }  
      
  //   } catch (error) {
  //     console.error('Error calling API Subscription:', error);
  //   }
  //   console.log(riceVarietyName);
  //   return (
  //     <Tag>
  //        Chua chon
  //     </Tag>
  //   );
  // }