/* eslint-disable react-hooks/rules-of-hooks */

'use client';
import { TableColumnsType, Tag } from 'antd';
import { Land, Product, RiceVariety } from '../../models/season-model';
// import fetchRiceVarietyDetails from '@/services/Admin/RiceVariety/getRiceVarietyDetailApi';
import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';




  export function LandAndRiceVarietyColumns() {
    const t = useTranslations('Common');
    const tSeason = useTranslations('Season')
    const landAndSeedColumns : TableColumnsType<Product> = [
      {
        title: 'Land Name',
        dataIndex: 'id',
        hidden:true
      },
      {
        title: tSeason('Land_name'),
        dataIndex: 'land',
        width: 'max-content',
        render: (_, productItem) => `${productItem.land?.name}`,
        
      },
      {
        title: tSeason('Seed_name'),
        dataIndex: 'riceVarietyID',
        width: 'max-content',
        render: (_, productItem) => `${productItem.seed?.name}`,
      },
    ];
    return landAndSeedColumns;
  }