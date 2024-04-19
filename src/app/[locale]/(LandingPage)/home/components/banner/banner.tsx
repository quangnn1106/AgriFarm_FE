'use client';
import { useRouter } from '@/navigation';
import { useSession } from 'next-auth/react';
import * as React from 'react';

import Image from 'next/image';
import { REGISTER_PATH } from '@/constants/routes';

type MyComponentProps = {
  ext2: string;
  ext3: string;
};

// function Banner({ ext2, ext3 }: MyComponentProps) {
//   const { data: session, status } = useSession();
//   const dataInfo = session?.user.userInfo.userName || null;
//   const role = session?.user.userInfo.role || '';
//   const router = useRouter();
//   return (
//     <>
//       <div className='div'>
//         <div className='div-2'>
//           <div className='div-3'>
//             <div className='column'>
//               <div className='div-4'>
//                 <div className='div-5'>
//                   AgriFarm <span style={{ color: 'rgba(76,175,79,1)' }}>GlobalG.A.P</span>{' '}
//                   <br />
//                   Management System{' '}
//                 </div>
//                 <div className='div-6'>
//                   Manage rice cultivation process according to GlobalG.A.P standards
//                 </div>
//                 <div className='div-7'>
//                   <div className='div-8'>Get a Demo</div>
//                   <Image
//                     loading='lazy'
//                     src='https://cdn.builder.io/api/v1/image/assets/TEMP/c947a929f68ed59af74a4b86be12cafd9b6ad765a64b7ae9fb56ee3bb1f87cd2?apiKey=a3c86750458a463dbdaef0731e8c4142&'
//                     alt=''
//                     className='img'
//                     width={11}
//                     height={12}
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className='column-2'>
//               <Image
//                 loading='lazy'
//                 src='https://cdn.builder.io/api/v1/image/assets/TEMP/98f5bb3dd9c9ed806bbb1ffff3f9f9a725a95867ba5b726f12013e43862c9c82?apiKey=a3c86750458a463dbdaef0731e8c4142&'
//                 alt=''
//                 className='img-2'
//                 width={590}
//                 height={360}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//       <style jsx>{`
//         .div {
//           align-items: center;
//           align-self: stretch;
//           background-color: var(--Neutral-Silver, #f5f7fa);
//           display: flex;
//           justify-content: center;
//           padding: 67px 60px;
//         }
//         @media (max-width: 991px) {
//           .div {
//             padding: 0 20px;
//           }
//         }
//         .div-2 {
//           width: 100%;
//           max-width: 1140px;
//         }
//         @media (max-width: 991px) {
//           .div-2 {
//             max-width: 100%;
//           }
//         }
//         .div-3 {
//           gap: 20px;
//           display: flex;
//         }
//         @media (max-width: 991px) {
//           .div-3 {
//             flex-direction: column;
//             align-items: stretch;
//             gap: 0px;
//           }
//         }
//         .column {
//           display: flex;
//           flex-direction: column;
//           line-height: normal;
//           width: 55%;
//           margin-left: 0px;
//         }
//         @media (max-width: 991px) {
//           .column {
//             width: 100%;
//           }
//         }
//         .div-4 {
//           display: flex;
//           flex-direction: column;
//           align-self: stretch;
//           margin: auto 0;
//         }
//         @media (max-width: 991px) {
//           .div-4 {
//             max-width: 100%;
//             margin-top: 40px;
//           }
//         }
//         .div-5 {
//           color: #4caf4f;
//           font: 600 45px/53px Inter, -apple-system, Roboto, Helvetica, sans-serif;
//         }
//         @media (max-width: 991px) {
//           .div-5 {
//             max-width: 100%;
//             font-size: 40px;
//             line-height: 52px;
//           }
//         }
//         .div-6 {
//           color: var(--Neutral-Grey, #717171);
//           margin-top: 12px;
//           font: 400 14px/119% Inter, -apple-system, Roboto, Helvetica, sans-serif;
//         }
//         @media (max-width: 991px) {
//           .div-6 {
//             max-width: 100%;
//           }
//         }
//         .div-7 {
//           justify-content: space-between;
//           border-radius: 2.784px;
//           background-color: var(--Brand-Primary, #4caf4f);
//           align-self: start;
//           display: flex;
//           margin-top: 22px;
//           gap: 6px;
//           font-size: 16px;
//           color: var(--Neutral-White, #fff);
//           font-weight: 500;
//           text-align: center;
//           line-height: 150%;
//           padding: 10px 22px;
//         }
//         @media (max-width: 991px) {
//           .div-7 {
//             padding: 0 20px;
//           }
//         }
//         .div-8 {
//           font-family: Inter, sans-serif;
//         }
//         .img {
//           aspect-ratio: 0.92;
//           object-fit: auto;
//           object-position: center;
//           width: 11px;
//           margin: auto 0;
//         }
//         .column-2 {
//           display: flex;
//           flex-direction: column;
//           line-height: normal;
//           width: 45%;
//           margin-left: 20px;
//         }
//         @media (max-width: 991px) {
//           .column-2 {
//             width: 100%;
//           }
//         }
//         .img-2 {
//           aspect-ratio: 1.64;
//           object-fit: auto;
//           object-position: center;
//           width: 100%;
//           flex-grow: 1;
//         }
//         @media (max-width: 991px) {
//           .img-2 {
//             max-width: 100%;
//             margin-top: 40px;
//           }
//         }
//       `}</style>
//     </>
//   );
// }

// export default Banner;
export default function Banner() {
  const { data: session, status } = useSession();
  const dataInfo = session?.user.userInfo.userName || null;
  const role = session?.user.userInfo.role || '';
  const router = useRouter();
  return (
    <>
      <div className='div'>
        <div className='div-2'>
          <div className='div-3'>
            <div className='column'>
              <div className='div-4'>
                <div className='div-5'>
                  Hệ thống <span style={{ color: 'rgba(76,175,79,1)' }}>quản lý</span>{' '}
                  <br />
                  canh tác lúa theo tiêu chuẩn Global G.A.P{' '}
                </div>
                {/* <div className='div-6'>Canh tác lúa theo tiêu chuẩn Global G.A.P</div> */}
                <button className='div-7'>
                  <div
                    onClick={() => {
                      router.push(REGISTER_PATH);
                    }}
                    className='div-8'
                  >
                    Thử ngay
                  </div>
                  <img
                    loading='lazy'
                    src='https://cdn.builder.io/api/v1/image/assets/TEMP/c947a929f68ed59af74a4b86be12cafd9b6ad765a64b7ae9fb56ee3bb1f87cd2?apiKey=a3c86750458a463dbdaef0731e8c4142&'
                    className='img'
                  />
                </button>
              </div>
            </div>
            <div className='column-2'>
              {/* <Image
                loading='lazy'
                src='https://cdn.builder.io/api/v1/image/assets/TEMP/98f5bb3dd9c9ed806bbb1ffff3f9f9a725a95867ba5b726f12013e43862c9c82?apiKey=a3c86750458a463dbdaef0731e8c4142&'
                alt=''
                className='img-2'
                width={500}
                height={360}
                style={{ width: '100%' }}
              /> */}
              <img
                loading='lazy'
                src='https://cdn.builder.io/api/v1/image/assets/TEMP/98f5bb3dd9c9ed806bbb1ffff3f9f9a725a95867ba5b726f12013e43862c9c82?apiKey=a3c86750458a463dbdaef0731e8c4142&'
                className='img-2'
              />
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .div {
          align-items: center;
          background-color: var(--Neutral-Silver, #f5f7fa);
          display: flex;
          width: 100%;
          justify-content: center;
          padding: 67px 60px;
        }
        @media (max-width: 991px) {
          .div {
            max-width: 100%;
            padding: 0 20px;
          }
        }
        .div-2 {
          width: 100%;
          justify-content: center;
          display: flex;
        }
        @media (max-width: 991px) {
          .div-2 {
            max-width: 100%;
          }
        }
        .div-3 {
          gap: 20px;
          display: flex;
        }
        @media (max-width: 991px) {
          .div-3 {
            flex-direction: column;
            align-items: stretch;
            gap: 0px;
          }
        }
        .column {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 55%;
          margin-left: 0px;
        }
        @media (max-width: 991px) {
          .column {
            width: 100%;
          }
        }
        .div-4 {
          display: flex;
          flex-direction: column;
          align-self: stretch;
          margin: auto 0;
        }
        @media (max-width: 991px) {
          .div-4 {
            max-width: 100%;
            margin-top: 40px;
          }
        }
        .div-5 {
          color: #4caf4f;
          font: 600 45px/53px Inter, -apple-system, Roboto, Helvetica, sans-serif;
        }
        @media (max-width: 991px) {
          .div-5 {
            max-width: 100%;
            font-size: 40px;
            line-height: 52px;
          }
        }
        .div-6 {
          color: var(--Neutral-Grey, #717171);
          margin-top: 12px;
          font: 400 14px/119% Inter, -apple-system, Roboto, Helvetica, sans-serif;
        }
        @media (max-width: 991px) {
          .div-6 {
            max-width: 100%;
          }
        }
        .div-7 {
          justify-content: space-between;
          border-radius: 2.784px;
          background-color: var(--Brand-Primary, #4caf4f);
          align-self: start;
          display: flex;
          margin-top: 22px;
          gap: 6px;
          font-size: 16px;
          color: var(--Neutral-White, #fff);
          font-weight: 500;
          text-align: center;
          line-height: 150%;
          padding: 10px 22px;
        }
        @media (max-width: 991px) {
          .div-7 {
            padding: 0 20px;
          }
        }
        .div-8 {
          font-family: Inter, sans-serif;
        }
        .img {
          aspect-ratio: 0.92;
          object-fit: auto;
          object-position: center;
          width: 11px;
          margin: auto 0;
        }
        .column-2 {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 100%;
          margin-left: 20px;
        }
        @media (max-width: 991px) {
          .column-2 {
            width: 100%;
          }
        }
        .img-2 {
          aspect-ratio: 1.64;
          object-fit: auto;
          object-position: center;
          width: 100%;
          flex-grow: 1;
        }
        @media (max-width: 991px) {
          .img-2 {
            max-width: 100%;
            margin-top: 40px;
          }
        }
      `}</style>
    </>
  );
}
