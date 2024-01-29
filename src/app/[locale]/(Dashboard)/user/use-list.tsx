'use client'
import styles from '../management-page.module.scss';
import TableComponent from "@/components/Table/table";
import React, { useEffect, useState } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps, TableProps } from 'antd';
import { Breadcrumb, ConfigProvider, Layout, Menu, Table, theme } from 'antd';
import { Content } from "antd/es/layout/layout";
import { UserModel } from "./models/user-model";
import { userTableColumns } from "./columnsType";
import { http } from "@/utils/config";
import classNames from "classnames/bind";
import { maxHeaderSize } from 'http';


const UserList: React.FC = () => {

    const cx = classNames.bind(styles);
    const data: UserModel[] = []
    for (let i = 0; i < 40; i++) {
        if (i % 2 == 0 && i != 0) {
            data.push({
                id: "example_id"+i,
                full_name: "John Doe",
                first_name: "John",
                last_name: "Doe",
                email: "john.doe@example.com",
                phone_number: "123456789",
                address: "London",
                created_date: new Date('2022-01-20T12:34:56.789Z'),
                updated_date: new Date('2022-01-20T12:34:56.789Z'),
                site_name: "Example Site",
                role_name: "Admin",
                is_active: true
              })
        } else {
            data.push({
                id: "example_id"+i,
                full_name: "John Doe",
                first_name: "John",
                last_name: "Doe",
                email: "john.doe@example.com",
                phone_number: "123456789",
                address: "New York",
                created_date: new Date('2022-01-20T12:34:56.789Z'),
                updated_date: new Date('2022-01-20T12:34:56.789Z'),
                site_name: "Example Site",
                role_name: "Admin",
                is_active: false
            })
        }
      
    }

    const [createState, setCreateState] = useState<Boolean>(false);
    const [updateState, setUpdateState] = useState<boolean>(false);

    const [users, setUsers] = useState<UserModel[]>([]);
    const [userId, setUserId] = useState<string>('');
    const [isFetching, setIsFetching] = useState<boolean>(true);

    const [filterUsers, setFilterUsers] = useState<UserModel[]>([]);
    const [filterMode, setFilterMode] = useState<string>('updated_at');

    // const userList = data;
    // setUsers(userList);
    // setFilterUsers(userList);
    // setIsFetching(false);

    useEffect(() => {
        setFilterUsers(users);
    }, [users]);

    const handleDelete = (id: string) => {

    }
    const handleUpdate = async (id: string) => {
        setUserId(id);
        setUpdateState(true);
    };
    const handleDetails = async (id: string) => {
        setUserId(id);
        setUpdateState(true);
    };

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const onChange: TableProps<UserModel>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
      };

    const checkRowSelection = {
        getCheckboxProps: (record: UserModel) => ({
          disabled: record.full_name === 'Disabled',
          name: record.full_name
        })
      };
    return (
        <><ConfigProvider
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
        ><Content style={{ padding: '0px' }}>
                <Layout
                    style={{ padding: '0px 0', background: colorBgContainer, borderRadius: borderRadiusLG }}
                >
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>
                        <Table
                            rowKey={'id'}
                            rowSelection={{
                                type: 'checkbox',
                                ...checkRowSelection
                            }}
                            columns={userTableColumns}
                            dataSource={data.map(user => ({
                                ...user,
                                onDetails: () => handleDetails(user.id),
                                onDelete: () => handleDelete(user.id),
                                onUpdate: () => handleUpdate(user.id),
                            }))}
                            onChange={onChange}
                            pagination={{
                                showTotal: total => `Total ${total} Items`,
                                showSizeChanger: true,
                                pageSizeOptions: ['10', '20', '30'],
                                total: users.length,
                            }}
                            scroll={{ x: 'max-content' }}
                            className={cx('table_style')} 
                            
                            />
                    </Content>
                </Layout>
            </Content></ConfigProvider></>
    )
}

export default UserList;