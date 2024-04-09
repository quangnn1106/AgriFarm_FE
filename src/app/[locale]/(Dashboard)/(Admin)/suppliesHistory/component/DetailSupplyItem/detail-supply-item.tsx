import IconText from '@/components/IconText/IconText';
import { SupplierResponse, Supply } from '../../../supply/models/supplier-models';
import { HomeOutlined, DollarOutlined, FileTextOutlined, PhoneOutlined, NumberOutlined, MailOutlined, ShopOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { Divider } from 'antd';
import { AxiosInstance } from 'axios';
import { useState, useEffect } from 'react';
import getSupplierDetailApi from '@/services/Admin/Supply/getSupplierDetails';
import UseAxiosAuth from '@/utils/axiosClient';

const SupplyDetailsDrawer = ({
  params
}: {
  params: {
    item: Supply;
  };
}) => {

    const dateFormat = 'DD/MM/YYYY';
    const http = UseAxiosAuth();
  //get Supplier details
  const [supplier, serSupplier] = useState<SupplierResponse>();
  const getSupplierDetail = async (http: AxiosInstance, id: string) => {
    try {
        const resData = await getSupplierDetailApi(id, http);
        serSupplier(resData.data as SupplierResponse);
    } catch (error) {
        console.log('Error: :  ', error);
      }
  }
  useEffect(() => {
    getSupplierDetail(http, params.item?.supplier.id);
  }, [http, params.item?.supplier.id])

  return (
    <>
    
      <IconText
        icon={<FileTextOutlined />}
        label='Ngày nhập/Ngày xuất: '
        value={dayjs(params.item?.createdDate).format(dateFormat) as string}
      />
      <IconText
        icon={<NumberOutlined />}
        label='Số lượng: '
        value={
            <p>
                {(params.item?.quantity)?.toString()}{' '}
                {params.item?.unit.toString()}
            </p>
        }
      />
      <IconText
        icon={<DollarOutlined />}
        label='Đơn giá: '
        value={
            <p>
                <p>{params.item?.unitPrice.toString() as string} VND</p>
            </p>
        }
      />
      <IconText
        icon={<DollarOutlined />}
        label='Tổng chi phí: '
        value={
            <p>
                <p>{(params.item?.unitPrice * params.item?.quantity).toString() as string} VND</p>
            </p>
        }
      />
      <Divider
          orientation='left'
          plain
        >
          Nhà cung cấp
     </Divider>
     <IconText
        icon={<ShopOutlined />}
        label='Tên: '
        value={
            <p>
                <p>{supplier?.name as string}</p>
            </p>
        }
      />
      <IconText
        icon={<HomeOutlined/>}
        label='Địa chỉ '
        value={
            <p>
                <p>{supplier?.address as string}</p>
            </p>
        }
      />
      <IconText
        icon={<PhoneOutlined/>}
        label='Số điện thoại: '
        value={
            <p>
                <p>{supplier?.phone as string}</p>
            </p>
        }
      />
      <IconText
        icon={<MailOutlined/>}
        label='Email: '
        value={
            <p>
                <p>{supplier?.email as string}</p>
            </p>
        }
      />
    </>
  );
};
export default SupplyDetailsDrawer;
