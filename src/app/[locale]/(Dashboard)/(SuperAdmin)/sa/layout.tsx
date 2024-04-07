'use client';
import { ROLES } from '@/constants/roles';
import { useSession } from 'next-auth/react';

//import Loader from '@/components/Loader/Loader';
//import DashBoardLayout from '../layoutTe';
import LayoutSuperAdmin from './layoutSuperAdmin';
import DashBoardLayout from '../../layoutMiddleware';
import DeniedPage from '@/app/[locale]/(Result)/denied/page';

type Props = {
  children?: React.ReactNode;
};

export default function LayoutRoleSA({ children }: Props) {
  const { data: session, status } = useSession();
  const userRole = session?.user?.userInfo?.role as ROLES;

  if (userRole !== ROLES.SUPER_ADMIN) {
    return (
      <>
        <DeniedPage/>
      </>
    );
  }

  return (
    <>
      <DashBoardLayout>{children}</DashBoardLayout>
    </>
  );
}
