'use client';
import { Layout } from 'antd';
import MyHeader from './components/header/header';
import Banner from './components/banner/banner';

import CultivationProcess from './components/cultivation/cultivation';
import { ClapySolution } from './components/solutionclapy/components/ClapySolution';

import PricingSection from './components/price/price';
import MyFooter from './components/footer/footer';

import Loader from '@/components/Loader/Loader';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session, status } = useSession();
  if (status === 'loading') {
    return (
      <Loader
        fullScreen
        spinning={true}
      />
    );
  }
  return (
    <Layout>
      <MyHeader />
      <Banner />
      <CultivationProcess />

      <ClapySolution />
      <PricingSection />
      <MyFooter />
    </Layout>
  );
}
