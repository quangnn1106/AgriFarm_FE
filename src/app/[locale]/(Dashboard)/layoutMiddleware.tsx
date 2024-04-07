'use client';
import { ROLES } from '@/constants/roles';
import { useSession } from 'next-auth/react';

//import LayoutSuperAdmin from '././sa(SuperAdmin)/layoutSuperAdmin';
import LayoutAdmin from './(Admin)/layoutAdmin';

import LayoutMember from './(Member)/layoutMember';
import LayoutManager from './(Manager)/layoutManager';
import LayoutRoleSA from './(SuperAdmin)/sa/layout';
import LayoutSuperAdmin from './(SuperAdmin)/sa/layoutSuperAdmin';
//import LayoutRoleSA from './(SuperAdmin)/layout';

type Props = {
  children: React.ReactNode;
};

export default function DashBoardLayout({ children }: Props) {
  const { data: session, status } = useSession();
  const userRole = session?.user?.userInfo?.role as ROLES;

  // if (status === 'loading') {
  //   return (
  //     <Loader
  //       fullScreen
  //       spinning
  //     />
  //   );
  // }
  // Choose the layout based on the user's role
  const getLayout = () => {
    switch (userRole) {
      case ROLES.SUPER_ADMIN:
        console.log('return <LayoutRoleSA>{children}</LayoutRoleSA>;');

        return <LayoutSuperAdmin>{children}</LayoutSuperAdmin>;
      case ROLES.ADMIN:
        console.log('return <LayoutAdmin>{children}</LayoutAdmin>;');

        return <LayoutAdmin>{children}</LayoutAdmin>;
      case ROLES.MEMBER:
        return <LayoutMember>{children}</LayoutMember>;
      case ROLES.MANAGER:
        return <LayoutManager>{children}</LayoutManager>;
      default:
        // Default layout for other roles
        console.log('loi roi');
        return <div>Lỗi rồi fix đi</div>;
    }
  };

  return <>{getLayout()}</>;
}
