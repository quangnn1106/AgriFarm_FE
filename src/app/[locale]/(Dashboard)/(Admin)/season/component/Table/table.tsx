'use client';

import UseAxiosAuth from "@/utils/axiosClient";
import React, { useEffect, useState } from 'react';

import { ConfigProvider, TableProps, theme,  Layout, Table } from "antd";
import { Content } from 'antd/es/layout/layout';


import styles from '../../../adminStyle.module.scss';
import classNames from 'classnames/bind';
import { SeasonModel } from "../../models/season-model";
import { seasonTableColumns } from "./column-types";

const cx = classNames.bind(styles);

interface SeasonTableComponentProps {
  loading: boolean;
  data: SeasonModel[];
}

const SeasonTableComponent: React.FC<SeasonTableComponentProps> = ({ data, loading}) => {
  const [createState, setCreateState] = useState<Boolean>(false);
  const [updateState, setUpdateState] = useState<boolean>(false);

  const [seasons, setSeasons] = useState<SeasonModel[]>([]);
  const [userId, setUserId] = useState<string>('');

  const [filterUsers, setFilterUsers] = useState<SeasonModel[]>([]);
  const [filterMode, setFilterMode] = useState<string>('updated_at');
  const http = UseAxiosAuth();
 
//   useEffect(() => {
//     (async () => {
//       const res = await http.get(`/register/registry/get`).then(res => {
//         const registerList = res.data.data;
//         console.log('registerList: ', registerList);

//         setUsers(registerList);
//         setIsFetching(false);
//           setPagination({
//             ...pagination,
//             total: res.data.count
//           });
//       });
//     })();
//   }, [http]);
const handleDelete = (id: string) => {};
const handleUpdate = async (id: string) => {
  setUserId(id);
  setUpdateState(true);
};
const handleDetails = async (id: string) => {
  setUserId(id);
  setUpdateState(true);
};

const {
  token: { colorBgContainer, borderRadiusLG }
} = theme.useToken();

const onChange: TableProps<SeasonModel>['onChange'] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log('params', pagination, filters, sorter, extra);
};

const checkRowSelection = {
  getCheckboxProps: (record: SeasonModel) => ({
    disabled: record.title === 'Disabled',
    name: record.title
  })
};
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
        <Content style={{ padding: '0px' }}>
          <Layout
            style={{
              padding: '0px 0',
              background: colorBgContainer,
              borderRadius: borderRadiusLG
            }}
          >
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <Table
                loading={loading}
                rowKey={'id'}
                rowSelection={{
                  type: 'checkbox',
                  ...checkRowSelection
                }}
                columns={seasonTableColumns}
                dataSource={data?.map(season => ({
                  ...season,
                  onDetails: () => handleDetails(season.id!),
                  onDelete: () => handleDelete(season.id!),
                  onUpdate: () => handleUpdate(season.id!)
                }))}
                onChange={onChange}
                pagination={{
                  showTotal: total => `Total ${total} Items`,
                  showSizeChanger: true,
                  pageSizeOptions: ['10', '20', '30'],
                  total: seasons.length
                }}
                scroll={{ x: 'max-content' }}
                className={cx('table_style')}
              />
            </Content>
          </Layout>
        </Content>
      </ConfigProvider>
    </>
  );
};
export default SeasonTableComponent;