'use client';
import ProductList from '@/components/(ProductionItems)/ProductList/productList';
import { HomeOutlined } from '@ant-design/icons';
import { ConfigProvider, Button, Breadcrumb } from 'antd';
import { Content } from 'antd/es/layout/layout';

export default function ProductPage() {
  return (
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
            Hoa Mai
          </Button>
        </ConfigProvider>
        <Breadcrumb style={{ margin: '0px 24px' }}>
          <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
          <Breadcrumb.Item>Danh sách sản phẩm</Breadcrumb.Item>
        </Breadcrumb>
        <ProductList />
      </Content>
    </>
  );
}
