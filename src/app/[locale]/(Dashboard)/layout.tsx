'use client';
import { ROLES } from '@/constants/roles';
import { useSession } from 'next-auth/react';
import { ReactNode } from 'react';
import LayoutSuperAdmin from './(SuperAdmin)/layoutSuperAdmin';
import LayoutAdmin from './(Admin)/layoutAdmin';
import Loader from '@/components/Loader/Loader';

type Props = {
  children: React.ReactNode;
};

export default function DashBoardLayout({ children }: Props) {
  const { data: session, status } = useSession();
  const userRole = session?.user?.userInfo?.role as ROLES;

  if (status === 'loading') {
    return (
      <Loader
        fullScreen
        spinning
      />
    );
  }
  // Choose the layout based on the user's role
  const getLayout = () => {
    switch (userRole) {
      case ROLES.SUPER_ADMIN:
        return <LayoutSuperAdmin>{children}</LayoutSuperAdmin>;
      case ROLES.ADMIN:
        return <LayoutAdmin>{children}</LayoutAdmin>;
      default:
        // Default layout for other roles
        return <div>Lỗi rồi fix đi</div>;
    }
  };

  return <>{getLayout()}</>;
}
