'use client';
import { ROLES } from '@/constants/roles';
import { useSession } from 'next-auth/react';

//import LayoutSuperAdmin from '././sa(SuperAdmin)/layoutSuperAdmin';
import LayoutAdmin from './(Admin)/layoutAdmin';

import LayoutMember from './(Member)/layoutMember';
import LayoutManager from './(Manager)/layoutManager';

import LayoutSuperAdmin from './(SuperAdmin)/sa/layoutSuperAdmin';
import Loader from '@/components/Loader/Loader';
import { NotificationContextProvider } from '@/components/context/notification/SignalRNotifyContext';
import NotificationBell from '@/components/(NotificationItems)/NotificationBell/notificationBell';
//import LayoutRoleSA from './(SuperAdmin)/layout';

type Props = {
  children: React.ReactNode;
};

export default function DashBoardLayout({ children }: Props) {
  const { data: session, status } = useSession();
  const userRole = session?.user?.userInfo?.role as ROLES;

  // Choose the layout based on the user's role
  const getLayout = () => {
    switch (userRole) {
      case ROLES.SUPER_ADMIN:
        console.log('return <LayoutRoleSA>{children}</LayoutRoleSA>;');
        if (status === 'loading') {
          return (
            <Loader
              fullScreen
              spinning
            />
          );
        }
        return <LayoutSuperAdmin>{children}</LayoutSuperAdmin>;
      case ROLES.ADMIN:
        console.log('return <LayoutAdmin>{children}</LayoutAdmin>;');
        if (status === 'loading') {
          return (
            <Loader
              fullScreen
              spinning
            />
          );
        }
        return <LayoutAdmin>{children}</LayoutAdmin>;
      case ROLES.MEMBER:
        return <LayoutMember>{children}</LayoutMember>;
      case ROLES.MANAGER:
        return <LayoutManager>{children}</LayoutManager>;
      // default:
      //   // Default layout for other roles
      //   console.log('loi roi');
      //   return <div>Lỗi rồi fix đi</div>;
    }
  };
  if (status === 'loading') {
    return (
      <Loader
        fullScreen
        spinning
      />
    );
  }
  return (
    <>
      <NotificationContextProvider>
        <NotificationBell />
        {getLayout()}
      </NotificationContextProvider>
    </>
  );
}
