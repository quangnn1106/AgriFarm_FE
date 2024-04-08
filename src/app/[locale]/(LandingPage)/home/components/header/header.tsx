'use client';
import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { useSession } from 'next-auth/react';
import { LOGIN_PATH } from '@/constants/routes';

import { userInfo } from 'os';
import { useRouter } from '@/navigation';
import { renderPath } from '@/app/[locale]/(Auth)/login/loginform';

function MyHeader() {
  const { data: session, status } = useSession();
  const dataInfo = session?.user.userInfo.userName || null;
  const role = session?.user.userInfo.role || '';
  const router = useRouter();
  return (
    <>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 4,
          width: '100%',
          backgroundColor: 'var(--Neutral-White, #fff)',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0px 2.784px 5.569px 0px rgba(171, 190, 209, 0.4)',
          display: 'flex',
          padding: '11px 60px',
          fontSize: '18px',
          fontWeight: '400',
          whiteSpace: 'nowrap'
        }}
        className='div'
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '1240px',
            maxWidth: '100%',
            gap: '20px',
            alignItems: 'center'
          }}
          className='div-2'
        >
          <Image
            loading='lazy'
            src='https://cdn.builder.io/api/v1/image/assets/TEMP/0e625a89146a45fd2f91b94235b5938df08d01d2cedbb34c32036add91d502e7?apiKey=a3c86750458a463dbdaef0731e8c4142&'
            className='img'
            width={128}
            height={38}
            alt=''
          />
          <div className='div-3'>
            <div className='div-4'>
              <a
                href='#'
                className='div-5'
              >
                Home
              </a>
              <a
                href='#clapy_solution'
                className='div-6'
              >
                Solution
              </a>
              <a
                href='#pricing'
                className='div-7'
              >
                Pricing
              </a>
            </div>
            <div className='div-8'>
              {session?.user ? (
                // <Button
                //   type='primary'
                //   className='div-9'
                //   style={{ background: '#009A29' }}
                //   onClick={() => {
                //     router.push(LOGIN_PATH);
                //   }}
                // >
                //   {dataInfo}
                //   <Image
                //     loading='lazy'
                //     src='https://cdn.builder.io/api/v1/image/assets/TEMP/6dba9be5567d18b88e65863726b4c31310d3eca1206f601a79ec8106b38253ab?apiKey=a3c86750458a463dbdaef0731e8c4142&'
                //     className='img-2'
                //     width={11}
                //     height={11}
                //     alt=''
                //   />
                // </Button>

                <a
                  // href='#pricing'
                  className='div-7'
                  onClick={() => {
                    router.push(renderPath(role));
                  }}
                >
                  Hi {dataInfo}
                </a>
              ) : (
                <Button
                  type='primary'
                  className='div-9'
                  style={{ background: '#009A29' }}
                  onClick={() => {
                    router.push(LOGIN_PATH);
                  }}
                >
                  Login{' '}
                  <Image
                    loading='lazy'
                    src='https://cdn.builder.io/api/v1/image/assets/TEMP/6dba9be5567d18b88e65863726b4c31310d3eca1206f601a79ec8106b38253ab?apiKey=a3c86750458a463dbdaef0731e8c4142&'
                    className='img-2'
                    width={11}
                    height={11}
                    alt=''
                  />
                </Button>
              )}
            </div>
          </div>
        </div>
      </Header>
      <style jsx>{`
        a {
          color: var(--Neutral-D_Grey, #4d4d4d);
        }
        .div {
          justify-content: center;
          align-items: center;
          box-shadow: 0px 2.784px 5.569px 0px rgba(171, 190, 209, 0.4);
          background-color: var(--Neutral-White, #fff);
          display: flex;
          font-size: 18px;
          font-weight: 400;
          white-space: nowrap;
          padding: 11px 60px;
        }
        @media (max-width: 991px) {
          .div {
            white-space: initial;
            padding: 0 20px;
          }
        }
        .div-2 {
          justify-content: space-between;
          display: flex;
          width: 1240px;
          max-width: 100%;
          gap: 20px;
        }
        @media (max-width: 991px) {
          .div-2 {
            flex-wrap: wrap;
            white-space: initial;
          }
        }
        .img {
          object-fit: auto;
          object-position: center;
          align-self: start;
          max-width: 100%;
        }
        .div-3 {
          display: flex;
          gap: 20px;
          justify-content: space-between;
          align-items: center;
        }
        @media (max-width: 991px) {
          .div-3 {
            white-space: initial;
          }
        }
        .div-4 {
          display: flex;
          gap: 16px;
          color: var(--Neutral-D_Grey, #4d4d4d);
          justify-content: space-between;
          margin: auto 0;
        }
        @media (max-width: 991px) {
          .div-4 {
            white-space: initial;
          }
        }
        .div-5 {
          text-align: center;
          font-family: Inter, sans-serif;
        }
        .div-6 {
          text-align: center;
          font-family: Inter, sans-serif;
        }
        .div-7 {
          font-family: Inter, sans-serif;
        }

        @media (max-width: 991px) {
          .div-8 {
            white-space: initial;
            padding: 0 0;
          }
        }
        .div-9 {
          font-family: Inter, sans-serif;
        }
        .img-2 {
          object-fit: auto;
          object-position: center;
          margin: auto 0;
        }
      `}</style>
    </>
  );
}

export default MyHeader;
