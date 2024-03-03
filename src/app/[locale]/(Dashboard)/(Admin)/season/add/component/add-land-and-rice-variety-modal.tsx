/* eslint-disable react-hooks/rules-of-hooks */
import ModalCustom from '@/components/ModalCustom/ModalCustom';
import { LandColumns } from './land-table-column';
import { Land, RiceVariety } from '../../models/season-model';
import React, { useEffect, useState } from 'react';
import fetchListLandData from '@/services/Admin/Land/getLandsApi';
import { ConfigProvider, Form, Input, Modal, Table, notification } from 'antd';
import fetchListRiceVarietyData from '@/services/Admin/RiceVariety/getRiceVarietyApi';
import { RiceVarietyColumns } from './rice-variety-table-column';
import classNames from 'classnames';
import styles from '../../../../(SuperAdmin)/management-page.module.scss';
import { SearchProps } from 'antd/es/input/Search';

const AddSeason = ({
  params
}: {
  params: { visible: boolean; onCancel: () => void };
}) => {
  // Get land list data
  const [landData, setLandData] = useState<Land[]>([]);
  const [loadingLandData, setLoadingLandData] = useState(true);
  useEffect(() => {
    getLandData();
  }, []);

  const getLandData = async () => {
    try {
      const res = await fetchListLandData();
      setLandData(res);
      setLoadingLandData(false);
    } catch (error) {
      console.log(error);
    }
  };
  // Done get land list data

  // Get rice variety list data
  const [riceVarietyData, setRiceVarietyData] = useState<RiceVariety[]>([]);
  const [loadingRiceVarietyData, setLoadingRiceVarietyData] = useState(true);
  useEffect(() => {
    getRiceVarietyData();
  }, []);

  const getRiceVarietyData = async () => {
    try {
      const res = await fetchListRiceVarietyData();
      setRiceVarietyData(res);
      setLoadingRiceVarietyData(false);
    } catch (error) {
      console.log(error);
    }
  };
  // Done get rice variety list data

  //handle modal
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCancel = () => {
    params.visible = false;
  };
  const handleOk = () => {
    params.visible = false;
  };

  //  handle search
  const cx = classNames.bind(styles);
  const { Search } = Input;
  const onSearchLand: SearchProps['onSearch'] = (value, _e, info) =>
    console.log(info?.source, value);

  const onSearchRiceVariety: SearchProps['onSearch'] = (value, _e, info) =>
    console.log(info?.source, value);

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              cellPaddingBlock: 8,
              headerSortHoverBg: '#F2F3F5',
              borderColor: '#F2F3F5',
              headerBg: '#F2F3F5',
              rowHoverBg: '#F2F3F5'
            }
          }
        }}
      >
        <Modal
          title='Add new season'
          open={params.visible}
          onCancel={params.onCancel}
          onOk={params.onCancel}
          okText='Add'
          cancelText='Cancel'
          centered={true}
        >
          <Search
            placeholder='Input search text'
            onSearch={onSearchRiceVariety}
            style={{ width: '50%', marginBottom:'1rem' }}
            enterButton
            className={cx('search-btn-box')}
          />
          <Table
            dataSource={riceVarietyData}
            columns={RiceVarietyColumns}
            loading={loadingRiceVarietyData}
            rowSelection={{
              type: 'radio'
            }}
            pagination={{
              defaultPageSize: 5,
              pageSize: 5
            }}
            rowKey='id'
          ></Table>
          <br />
          <Search
            placeholder='Input search text'
            onSearch={onSearchRiceVariety}
            style={{ width: '50%', marginBottom:'1rem' }}
            enterButton
            className={cx('search-btn-box')}
          />
          <Table
            dataSource={landData}
            columns={LandColumns}
            loading={loadingLandData}
            rowSelection={{
              type: 'checkbox'
            }}
            pagination={{
              defaultPageSize: 5,
              pageSize: 5
            }}
            rowKey='id'
          ></Table>
        </Modal>
      </ConfigProvider>
    </>
  );
};
export default AddSeason;
