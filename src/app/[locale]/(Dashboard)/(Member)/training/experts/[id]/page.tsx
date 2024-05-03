'use client';
import { renderPath } from '@/app/[locale]/(Auth)/login/loginform';
import ExpertInfo from '@/components/(TrainingItems)/experts/ExpertDetail/expertInfo';
import { useRouter } from '@/navigation';
import { getExpertByIdService } from '@/services/Admin/Training/expertService';
import { Expert } from '@/services/Admin/Training/response/training.response';
import UseAxiosAuth from '@/utils/axiosClient';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, ConfigProvider, Flex, Result } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function ExpertInfoPage(props: any) {
  const http = UseAxiosAuth();
  const { data: session } = useSession();
  const siteId = session?.user.userInfo.siteId;
  const siteName = session?.user.userInfo.siteName;
  const [expert, setExpert] = useState<Expert | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  const farmRouter = useRouter();
  const detailId = props.params.id;
  const role = session?.user.userInfo.role as string;

  const fetchExpert = async (id: string) => {
    setIsLoading(true);
    try {
      getExpertByIdService(http, id).then(rs => {
        console.log('Res: ', rs);
        if (rs.data) {
          setExpert(rs.data as Expert);
        }
      });
    } catch (e) {}
    setIsLoading(false);
  };

  useEffect(() => {
    if (initLoading) {
      // console.log('start fetching...');
      fetchExpert(detailId);
    }
    return () => {
      setInitLoading(false);
    };
  }, []);

  const contentSection = (
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
        <Breadcrumb.Item>Thông tin chuyên gia</Breadcrumb.Item>
        <Breadcrumb.Item>Chi tiết</Breadcrumb.Item>
      </Breadcrumb>
      <Flex
        style={{
          marginLeft: '10vw'
        }}
      >
        <ExpertInfo
          expert={
            expert!
            //   {
            //   id: 'sdasdads-q243-asd412-dasd' + 1,
            //   fullName: `Expert ${1}`,
            //   description: 'very good technical',
            //   expertField: 'Math'
            // }
          }
        />
      </Flex>
    </Content>
  );
  return (
    <>
      {!isLoading && expert && <>{contentSection}</>}

      {!isLoading && !expert && (
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
