import React from 'react';
import AdminSider from '../../Admin/Sider/AdminSider';
import SAdminSider from '../../SAdmin/Sider/SASider';
import { ROLES } from '@/constants/roles';
import { useSession } from 'next-auth/react';

type Props = { roles: ROLES };

const RenderSideBar = ({ roles }: Props) => {
  const { data: session } = useSession();
  const roleLength = session?.user.userInfo.roles.length;
  const renderSidebarContent = () => {
    switch (roles && roleLength) {
      case 4 || ROLES.SUPER_ADMIN:
        return <SAdminSider />;

      case 1 || ROLES.ADMIN:
        return <AdminSider />;

      case 1 || ROLES.MANAGER:
        return <AdminSider />;

      case 1 || ROLES.MEMBER:
        return (
          <div>
            {/* Member Sidebar Content */}
            <h2>Member Sidebar</h2>
            {/* Add additional Member specific components or links here */}
          </div>
        );

      default:
        return <SAdminSider />;
    }
  };
  return <>{renderSidebarContent()}</>;
};

export default RenderSideBar;
