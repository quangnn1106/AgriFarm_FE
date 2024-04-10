'use client';
import { ROLES } from '@/constants/roles';
import { useSession } from 'next-auth/react';

//import Loader from '@/components/Loader/Loader';
//import DashBoardLayout from '../layoutTe';

import { useRouter } from '@/navigation';
import DashBoardLayout from '../layoutMiddleware';

type Props = {
  children?: React.ReactNode;
};

export default function LayoutDisease({ children }: Props) {
  const { data: session, status } = useSession();
  const userRole = session?.user?.userInfo?.role as ROLES;
  const router = useRouter();
  // if (userRole !== ROLES.SUPER_ADMIN) {
  //   router.push(DENIED_PATH);
  // }

  return (
    <>
      <DashBoardLayout>{children}</DashBoardLayout>
    </>
  );
}
