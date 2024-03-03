/* eslint-disable react-hooks/rules-of-hooks */

'use client';
import { TableColumnsType, Tag } from 'antd';
import { Land, RiceVariety } from '../../models/season-model';
import fetchRiceVarietyDetails from '@/services/Admin/RiceVariety/getRiceVarietyDetail';
import React, { useEffect, useState } from 'react';


  export const LandAndRiceVarietyColumns: TableColumnsType<Land> = [
    {
      title: 'Land Name',
      dataIndex: 'name',
      width: 'max-content',
    },
    {
      title: 'Rice Variety',
      dataIndex: 'riceVarietyID',
      width: 'max-content',
      render: async (_, { riceVarietyID }) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [riceVarietyName, setRiceVarietyName] = useState<string | undefined>("Chua chon");  
        const [loading, setLoading] = useState<boolean>(true);
        try {
           await fetchRiceVarietyDetails(riceVarietyID)
          .then(res => setRiceVarietyName(res.name))
          .finally(()=> {
            setLoading(false); 
          });
          if (!loading) {
            return (
              <Tag>
                 {riceVarietyName}
              </Tag>
            );
          }  
          
        } catch (error) {
          console.error('Error calling API Subscription:', error);
        }
        console.log(riceVarietyName);
        return (
          <Tag>
             Chua chon
          </Tag>
        );
      }
    },
  ];



