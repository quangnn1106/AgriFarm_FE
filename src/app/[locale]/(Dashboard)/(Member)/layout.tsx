'use client';
import { ROLES } from '@/constants/roles';
import { useSession } from 'next-auth/react';
import { ReactNode } from 'react';

import Loader from '@/components/Loader/Loader';

import DeniedPage from '../../(Result)/denied/page';
import { useRouter } from '@/navigation';
import { DENIED_PATH } from '@/constants/routes';
import DashBoardLayout from '../layoutMiddleware';

type Props = {
  children: React.ReactNode;
};

export default function LayoutRoleMember({ children }: Props) {
  const { data: session, status } = useSession();
  const userRole = session?.user?.userInfo?.role as ROLES;
  const router = useRouter();
  if (
    userRole !== ROLES.ADMIN &&
    userRole !== ROLES.MANAGER &&
    userRole !== ROLES.MEMBER
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
