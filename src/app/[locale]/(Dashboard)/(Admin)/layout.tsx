'use client';
import { ROLES } from '@/constants/roles';
import { useSession } from 'next-auth/react';
import { ReactNode } from 'react';

import Loader from '@/components/Loader/Loader';
import DashBoardLayout from '../layoutMiddleware';
import DeniedPage from '../../(Result)/denied/page';

type Props = {
  children: React.ReactNode;
};

export default function LayoutRoleAdmin({ children }: Props) {
  const { data: session, status } = useSession();
  const userRole = session?.user?.userInfo?.role as ROLES;

  if (
    userRole !== ROLES.ADMIN &&
    userRole !== ROLES.MANAGER &&
    status === 'authenticated'
  ) {
    return (
      <>
        <DeniedPage />
      </>
    );
  }

  return (
    <>
      <DashBoardLayout>{children}</DashBoardLayout>
    </>
  );
}
