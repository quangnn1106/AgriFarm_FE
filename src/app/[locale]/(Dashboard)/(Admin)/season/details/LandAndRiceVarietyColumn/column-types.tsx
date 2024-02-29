'use client'
import { TableColumnsType } from 'antd';
import { Land, RiceVariety } from '../../models/season-model';
import fetchRiceVarietyDetails from '@/services/Admin/RiceVariety/getRiceVarietyDetail';
import { useEffect, useState } from 'react';


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
      render: (_, { riceVarietyID }) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [riceVariety, setRiceVariety] = useState<RiceVariety | null>(null);

        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
          // Fetch rice variety details when riceVarietyID changes
          fetchRiceVarietyDetails(riceVarietyID).then(data => setRiceVariety(data));
        }, [riceVarietyID]);

        return riceVariety ? <p>{riceVariety.name}</p> : null;
      },
    },
  ];



