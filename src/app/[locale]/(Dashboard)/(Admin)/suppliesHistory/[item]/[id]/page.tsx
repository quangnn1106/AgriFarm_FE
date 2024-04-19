/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { HomeOutlined, DollarOutlined, FileTextOutlined } from '@ant-design/icons';
import {
  Breadcrumb,
  Button,
  Card,
  Checkbox,
  ConfigProvider,
  Image,
  Flex,
  Space,
  DescriptionsProps,
  Descriptions,
  Table,
  Drawer
} from 'antd';
import { Content } from 'antd/es/layout/layout';
import styles from '../../../adminStyle.module.scss';
import classNames from 'classnames/bind';
import { useSession } from 'next-auth/react';
import UseAxiosAuth from '@/utils/axiosClient';
import { AxiosInstance } from 'axios';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ReactNode, useEffect, useState } from 'react';
import TitleHeader from '../../../season/component/TitleHeader/tiltle-header';
import getSeedDetailApi from '@/services/Admin/Seed/getSeedDetailApi';
import getFertilizerDetailApi from '@/services/Admin/Fertilizer/getFertilizerDetailApi';
import getPesticideDetailApi from '@/services/Admin/Pesticide/getPesticideDetailApi';
import { Seed } from '../../../seed/models/seed-models';
import { Item, Property, Supply } from '../../../supply/models/supplier-models';
import { STATUS_OK } from '@/constants/https';
import IconContext from '@ant-design/icons/lib/components/Context';
import React from 'react';
import { SupplyTableColumns } from '../../component/Table/column-type';
import getSuppliesItemApi from '@/services/Admin/Supply/getSupplysItem';
import IconText from '@/components/IconText/IconText';
import SupplyDetailsDrawer from '../../component/DetailSupplyItem/detail-supply-item';

// const IconText = ({
//   icon,
//   label,
//   value
// }: {
//   icon: React.FC;
//   label: ReactNode;
//   value: ReactNode;
// }) => (
//   <Space style={{ width: '100%' }}>
//     {React.createElement(icon)}
//     <div style={{ fontSize: '0.8rem', fontWeight: 'normal', textWrap: 'nowrap' }}>
//       {label}
//     </div>
//     <div style={{ fontSize: '1rem', fontWeight: 'bold', textWrap: 'nowrap' }}>
//       {value}
//     </div>
//   </Space>
// );

const SuppliesHistoryDetails = ({ params }: { params: { item: string; id: string } }) => {
  const t = useTranslations('Common');
  const cx = classNames.bind(styles);
  const { data: session } = useSession();
  const siteId = session?.user.userInfo.siteId;
  const http = UseAxiosAuth();
  const siteName = session?.user.userInfo.siteName;

  const [itemLabel, setItemLabel] = useState<ReactNode>();

  //load supply
  const [loading, setLoading] = useState<boolean>(true);
  const [supplies, setSupplies] = useState<Supply[]>([]);

  const getListSupplies = async (http: AxiosInstance, itemId?: string) => {
    try {
      await getSuppliesItemApi(itemId as string, http).then(resData => {
        setSupplies(resData.data as Supply[]);
        setLoading(false);
      });
    } catch (error) {
      console.log('Error: :  ', error);
    }
  };

 

  // open Details drawer
  const [selectedSupply, setSelectedSupply] = useState<Supply>();
  const [openSupplyDetail, setOpenSupplyDetail] = useState<boolean>(false);

  const showSupplyDetailDrawer = () => {
    setOpenSupplyDetail(true);
  };
  const handleDetails = async (itemDetails: Supply) => {
    setSelectedSupply(itemDetails);
    setOpenSupplyDetail(true);
  };

  const closeSupplyDetailDrawer = () => {
    setOpenSupplyDetail(false);
  };

  const setLabelBreadcrumb = () => {
    switch (params.item) {
      case 'seed':
        setItemLabel(<div>Hạt giống</div>);
        break;
      case 'pesticide':
        setItemLabel(<div>Thuốc bảo vệ thực vật</div>);
        break;
      case 'fertilizer':
        setItemLabel(<div>Phân bón</div>);
        break;
      case 'equipment':
        setItemLabel(<div>Thiết bị</div>);
        break;
      default:
        setItemLabel(<div>Chưa có</div>);
        break;
    }
  };

  const [itemDetails, setItemDetails] = useState<Item>();

  const getItemDetailData = async (http: AxiosInstance, itemId?: string) => {
    try {
      switch (params.item) {
        case 'seed':
          await getSeedDetailApi(itemId, http).then(seedData => {
            if (seedData?.status === STATUS_OK) {
              setItemDetails(seedData.data as Item);
              const dataProps = seedData?.data as Item;
              setDataItemProps(dataProps.properties);
            }
          });

          break;
        case 'pesticide':
          const pesticideData = await getPesticideDetailApi(itemId, http);
          if (pesticideData?.status === STATUS_OK) {
            setItemDetails(pesticideData.data as Item);
            const dataProps = pesticideData?.data as Item;
            setDataItemProps(dataProps.properties);
          }
          break;
        case 'fertilizer':
          const fertilizerData = await getFertilizerDetailApi(itemId, http);
          if (fertilizerData?.status === STATUS_OK) {
            setItemDetails(fertilizerData.data as Item);
            const dataProps = fertilizerData?.data as Item;
            setDataItemProps(dataProps.properties);
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.log('Error: :  ', error);
    }
  };

  let items: DescriptionsProps['items'] = [];
  const [itemsProps, setItemsProps] = useState<DescriptionsProps['items']>([]);

  const setDataItemProps = (properties: Property[]) => {
    items = [];
    properties.map((item, idx) => {
      items?.push({
        key: idx + 1,
        label: item.name,
        children: (
          <div>
            {item.value} {item.unit}
          </div>
        )
      });
    });
    setItemsProps(items);
  };

  useEffect(() => {
    getItemDetailData(http, params.id);
    setLabelBreadcrumb();
  }, [http, params.id, params.item]);

  const breadCrumb = [
    {
      title: <Link href={`/`}>{t('home')}</Link>
    },
    {
      title: <Link href={`/${params.item}`}>{itemLabel}</Link>
    },
    {
      title: 'Lịch sử'
    }
  ];

  useEffect(() => {
    getListSupplies(http, params.id);
  }, [http, params.id, openSupplyDetail]);

  return (
    <>
      <Content style={{ padding: '20px 24px' }}>
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
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  contentFontSizeLG: 24,
                  fontWeight: 700,
                  groupBorderColor: 'transparent',
                  onlyIconSizeLG: 24,
                  paddingBlockLG: 0,
                  defaultBorderColor: 'transparent',
                  defaultBg: 'transparent',
                  defaultShadow: 'none',
                  primaryShadow: 'none',
                  linkHoverBg: 'transparent',
                  paddingInlineLG: 0,
                  defaultGhostBorderColor: 'transparent'
                }
              }
            }}
          >
            <Button
              className={cx('home-btn')}
              href='#'
              size={'large'}
            >
              <HomeOutlined />
              {siteName}
            </Button>
          </ConfigProvider>

          <Breadcrumb
            style={{ margin: '0rem 1.5rem' }}
            items={breadCrumb}
          ></Breadcrumb>
          <Flex
            align='center'
            justify='center'
            gap={20}
            vertical={true}
          >
            <Card
              style={{ width: '90%', borderRadius: '1.5rem', marginTop: '1.5rem' }}
              bordered
            >
              <Flex
                vertical={false}
                gap={16}
                align='center'
              >
                <Flex style={{ width: '15%' }}>
                  <Image
                    width={'110px'}
                    style={{ borderRadius: '1.5rem' }}
                    src={itemDetails?.notes ? 'http://ec2-3-109-154-96.ap-south-1.compute.amazonaws.com/api/v1/files/get?path='+itemDetails?.notes : 'http://ec2-3-109-154-96.ap-south-1.compute.amazonaws.com/api/v1/files/get?path=drafts/d1f1b219-6aa1_638488953544034389.png'}
                  />
                </Flex>
                <Flex
                  style={{ width: '85%' }}
                  vertical={true}
                  align='center'
                >
                  <Flex
                    vertical={false}
                    justify='space-between'
                    align='center'
                    style={{ width: '100%' }}
                    gap={20}
                  >
                    <IconText
                      icon={<FileTextOutlined></FileTextOutlined>}
                      label='Tên vật phẩm: '
                      value={itemDetails?.name as string}
                    />
                    <IconText
                      icon={<HomeOutlined></HomeOutlined>}
                      label='Số lượng còn lại trong kho: '
                      value={
                        <p>
                          {itemDetails?.stock.toString() as string}{' '}
                          {itemDetails?.measureUnit.toString() as string}
                        </p>
                      }
                    />
                    <IconText
                      icon={<DollarOutlined></DollarOutlined>}
                      label= {t('Unit_Price:') }
                      value={<p>{itemDetails?.unitPrice.toLocaleString().toString() as string} VND</p>}
                    />
                  </Flex>
                  <Flex>
                    <Descriptions items={itemsProps} />
                  </Flex>
                </Flex>
              </Flex>
            </Card>
            <Table
              style={{ width: '100%' }}
              loading={loading}
              rowKey={'id'}
              bordered
              columns={SupplyTableColumns()}
              dataSource={supplies?.map(supply => ({
                ...supply,
                onDetails: () => handleDetails(supply)
              }))}
              pagination={{
                showTotal: total => `Total ${total} Items`,
                showSizeChanger: true,
                pageSizeOptions: ['10', '20', '30'],
                total: supplies.length
              }}
              scroll={{ x: 'max-content' }}
              className={cx('table_style')}
            ></Table>
          </Flex>
        </ConfigProvider>
        <Drawer
          title='Chi tiết '
          placement='right'
          onClose={closeSupplyDetailDrawer}
          open={openSupplyDetail}
        >
          <SupplyDetailsDrawer
            params={{
              item: selectedSupply as Supply
            }}
          ></SupplyDetailsDrawer>
        </Drawer>
      </Content>
    </>
  );
};
export default SuppliesHistoryDetails;
