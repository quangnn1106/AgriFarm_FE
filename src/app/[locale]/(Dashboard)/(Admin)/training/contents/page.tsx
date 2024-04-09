'use client';
import TrainingContentList from '@/components/(TrainingItems)/contents/TrainingContentList/trainingContentList';
import { TrainingContent } from '@/services/Admin/Training/response/training.response';
import { getTrainingContentsService } from '@/services/Admin/Training/trainingContentService';
import UseAxiosAuth from '@/utils/axiosClient';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { AxiosInstance } from 'axios';
import { useEffect, useState } from 'react';

export default function TrainingContentsPage() {
  return (
    <>
      <TrainingContentList />
    </>
  );
}
