/* eslint-disable react-hooks/rules-of-hooks */

'use client';
import { CreateProductDto } from '@/services/Admin/Product/postProductApi';
import { TableColumnsType } from 'antd';



  export const ProductsColumns: TableColumnsType<CreateProductDto> = [
    
    {
      title: 'Land Name',
      dataIndex: 'land',
      width: 'max-content',
      render: (_, productItem) => `${productItem.land?.name}`,
      
    },
    {
      title: 'Rice Variety',
      dataIndex: 'riceVarietyID',
      width: 'max-content',
      render: (_, productItem) => `${productItem.seed?.name}`,
    },
  ];