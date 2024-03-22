import { Breadcrumb, Button, ConfigProvider } from "antd";
import { Content } from "antd/es/layout/layout";
import { HomeOutlined, PlusOutlined, MinusOutlined,WarningOutlined } from '@ant-design/icons';
import styles from '../adminStyle.module.scss';
import classNames from 'classnames/bind';
import UseAxiosAuth from "@/utils/axiosClient";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from '@/navigation';
import Link from 'next/link';
import FilterSection from "./component/FilterSection/filterSection";

type Props = {};
const SeedManagement = (props: Props) => {
    //style 
    const cx = classNames.bind(styles);
    const { data: session } = useSession();
    const sideId = session?.user.userInfo.siteId;
    const http = UseAxiosAuth();
    const siteName = session?.user.userInfo.siteName;
    
    // Navigation
    const router = useRouter();
    const pathName = usePathname();
    const breadCrumb = [
        {
            title: <Link href={`/`}>Home</Link>
        },
        {
            title: <Link href={`/seed`}>Seed</Link>
        }
    ];
    
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
            <Button
            className={cx('home-btn')}
            href='/'
            size={'large'}
          >
            <HomeOutlined />
            {siteName}
          </Button>
        </ConfigProvider>
        <Breadcrumb style={{ margin: '0px 24px' }} items={breadCrumb}>
        </Breadcrumb>
        <FilterSection></FilterSection>
        </Content>
        </>
    )
}