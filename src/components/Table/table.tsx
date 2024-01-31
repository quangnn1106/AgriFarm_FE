type Props = {};
import React, { useState } from "react";

import styles from './style-table.module.scss';
import { Button, MenuProps, Table, TableColumnsType } from "antd";

interface User {
    key: React.Key; 
    userId: string;
    fullName: string;
    phoneNum: string;
    address: string;
    email: string;
  }

  interface T {
    
  }
   type Columns = Required<MenuProps>['items'][number];
    

  const columns: TableColumnsType<User> = [
    {
        title: 'User ID', 
        dataIndex: 'userId',
    },
    {
        title: 'FullName',
        dataIndex: 'fullName',
    },
    {
        title: 'Phone',
        dataIndex: 'phoneNum',
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    }
  ];

 

  const data: User[] = []
  for (let i = 0; i < 40; i++) {
    data.push({
        key: i,
        userId: `ADNW0383`,
        fullName: `Tran Tu My`,
        phoneNum: `0796858854`,
        address: `Can Tho`,
        email: `trantumy18112002@gmail.com`,
    })
  }





const TableComponent: React.FC = (props: Props) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [loading, setLoading] = useState(false);
  
    const start = () => {
      setLoading(true);
      // ajax request after empty completing
      setTimeout(() => {
        setSelectedRowKeys([]);
        setLoading(false);
      }, 1000);
    };
  
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
      console.log('selectedRowKeys changed: ', newSelectedRowKeys);
      setSelectedRowKeys(newSelectedRowKeys);
    };
  
    const rowSelection = {
      selectedRowKeys,
      onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
  
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
            Reload
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
        </div>
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
      </div>
    );
}
export default TableComponent;