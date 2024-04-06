"use client"
import ExpertList from '@/components/(TrainingItems)/experts/ExpertList/expertList';
import TrainingContentList from '@/components/(TrainingItems)/experts/ExpertList/expertList';
import { getExpertsService } from '@/services/Admin/Training/expertService';
import { Expert, TrainingContent } from '@/services/Admin/Training/response/training.response';
import UseAxiosAuth from '@/utils/axiosClient';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { AxiosInstance } from 'axios';
import { useEffect, useState } from 'react';

export default function ExpertsPage() {
  

  


  return (
    <>
      <ExpertList/>
    </>
  );
}
