'use client';
import { renderPath } from '@/app/[locale]/(Auth)/login/loginform';
import FullProductDetail from '@/components/(ProductionItems)/ProductDetail/productFullDetail';
import { useRouter } from '@/navigation';
import {
  getFarmProductByIdService,
  getFarmProductsService
} from '@/services/Admin/Productions/farmProductsService';
import { FarmProductResponse } from '@/services/Admin/Productions/Payload/response/production.response';
import { Expert } from '@/services/Admin/Training/response/training.response';
import UseAxiosAuth from '@/utils/axiosClient';
import { HomeOutlined } from '@ant-design/icons';
import { ConfigProvider, Button, Breadcrumb, Result } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function ProductDetailPage(props: any) {
  const http = UseAxiosAuth();
  const farmRouter = useRouter();
  const { data: session } = useSession();
  const siteId = session?.user.userInfo.siteId;
  const siteName = session?.user.userInfo.siteName;
  const detailId = props.params.id;
  const [product, setProduct] = useState<FarmProductResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  const role = session?.user.userInfo.role as string;

  const fetchProduct = async (id: string) => {
    setIsLoading(true);
    try {
      getFarmProductByIdService(http, id).then(rs => {
        console.log('Data: ', rs.data);
        if (rs.data) {
          setProduct(rs.data as FarmProductResponse);
        }
      });
    } catch (e) {}
    setIsLoading(false);
  };

  useEffect(() => {
    if (initLoading) {
      // console.log('start fetching...');
      fetchProduct(detailId);
    }
    return () => {
      setInitLoading(false);
    };
  }, []);

  const contentSection = (
    <>
      <Content style={{ padding: '20px 0px' }}>
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
                paddingInlineLG: 24,
                defaultGhostBorderColor: 'transparent'
              }
            }
          }}
        >
          {' '}
          <Button
            //className={cx('home-btn')}
            href='#'
            size={'large'}
          >
            <HomeOutlined style={{ color: 'green' }} />
            {siteName}
          </Button>
        </ConfigProvider>
        <Breadcrumb style={{ margin: '0px 24px' }}>
          <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
          <Breadcrumb.Item>Danh sách sản phẩm</Breadcrumb.Item>
          <Breadcrumb.Item>Chi tiết</Breadcrumb.Item>
        </Breadcrumb>
        {product && (
          <FullProductDetail
            detail={
              product
              
            }
          />
        )}
      </Content>
    </>
  );

  return (
    <>
      {!isLoading && product && <>{contentSection}</>}
      {!isLoading && !product && (
        <Result
          status='404'
          title='404'
          subTitle='Trang không tồn tại'
          extra={
            <Button
              type='primary'
              onClick={() => {
                farmRouter.push(renderPath(role));
              }}
            >
              Màn hình chính
            </Button>
          }
        />
      )}
    </>
  );
}
