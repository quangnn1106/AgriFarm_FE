import { Link } from '@/navigation';
import { getEquipmentSupplyDetailsService } from '@/services/Admin/Equipments/equipmentsService';
import {
  EquipmentResponse,
  SupplyDetailResponse
} from '@/services/Admin/Equipments/Payload/response/equipmentResponses';
import { PaginationResponse } from '@/types/pagination';
import UseAxiosAuth from '@/utils/axiosClient';
import { getPaginationResponse } from '@/utils/paginationHelper';
import { Avatar, Button, Col, Drawer, Flex, List, Row, Skeleton } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import EquipSupplyDetailList from './equipmentSupplyDetailList';

interface IProps {
  item: EquipmentResponse;
  isOpen: boolean
  onClose: () => void;
}

export default function EquipSupplyDetailDrawer(props: IProps) {
  const { item, onClose, isOpen} = props;
  
  return (
    <Drawer
      placement='bottom'
      style={{
        position: 'absolute',
        //paddingInline:'200',
        marginInline:'13vw',
        //left: '10vw',
        width: '60vw'
      }}
      closable={false}
      open={isOpen}
      title={`${item.name} Supply Detail`}
      onClose={() => onClose()}
      getContainer={false}
      //width={'80vw'}
    >
      <EquipSupplyDetailList
        item={item}
      />
      
    </Drawer>
  );
}
