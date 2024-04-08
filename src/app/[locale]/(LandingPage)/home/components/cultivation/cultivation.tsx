'use client';
import * as React from 'react';

export default function CultivationProcess() {
  return (
    <>
      <div className='div'>
        <div className='div-2'>
          <div className='div-3'>
            <div className='column'>
              <img
                loading='lazy'
                src='https://cdn.builder.io/api/v1/image/assets/TEMP/c9f4f6cb8cfe743b51a9b096cb76e5a5758be0c3321476db99e0e2ad57c2791b?apiKey=a3c86750458a463dbdaef0731e8c4142&'
                className='img'
              />
            </div>
            <div className='column-2'>
              <div className='div-4'>
                <div className='div-5'>The Digital Rice Cultivation Process</div>
                <div className='div-6'>
                  AgriFarm has emerged in rice cultivation process management, since the
                  agriculture industry started seeing a sea change with adoption of
                  technologies.{' '}
                </div>
                <div className='div-7'>
                  The increasing demand for safe and sustainable agricultural practices
                  has prompted the need for a comprehensive solution in the form of a Rice
                  Cultivation Process Management System. This system is designed to adhere
                  to the Global Good Agricultural Practices (Global G.A.P) standards,
                  ensuring the production of high-quality rice while prioritizing
                  environmental sustainability and social responsibility.{' '}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .div {
          z-index: 0;
          align-items: center;
          display: flex;
          justify-content: center;
          padding: 0 60px;
        }
        @media (max-width: 991px) {
          .div {
            padding: 0 20px;
          }
        }
        .div-2 {
          z-index: 10;
          margin-top: -10px;
          width: 918px;
          max-width: 100%;
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
          width: 44%;
          margin-left: 0px;
        }
        @media (max-width: 991px) {
          .column {
            width: 100%;
          }
        }
        .img {
          aspect-ratio: 1.02;
          object-fit: auto;
          object-position: center;
          width: 100%;
          flex-grow: 1;
        }
        @media (max-width: 991px) {
          .img {
            margin-top: 40px;
          }
        }
        .column-2 {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 56%;
          margin-left: 20px;
        }
        @media (max-width: 991px) {
          .column-2 {
            width: 100%;
          }
        }
        .div-4 {
          display: flex;
          flex-direction: column;
          align-self: stretch;
          font-size: 11px;
          color: var(--Neutral-Grey, #717171);
          font-weight: 400;
          line-height: 14px;
          margin: auto 0;
          padding: 0 101px;
        }
        @media (max-width: 991px) {
          .div-4 {
            max-width: 100%;
            margin-top: 40px;
          }
        }
        .div-5 {
          color: var(--Neutral-D_Grey, #4d4d4d);
          font: 600 25px/122% Inter, -apple-system, Roboto, Helvetica, sans-serif;
        }
        @media (max-width: 991px) {
          .div-5 {
            max-width: 100%;
          }
        }
        .div-6 {
          text-align: justify;
          font-family: Inter, sans-serif;
          margin-top: 11px;
        }
        @media (max-width: 991px) {
          .div-6 {
            max-width: 100%;
          }
        }
        .div-7 {
          text-align: justify;
          font-family: Inter, sans-serif;
          margin-top: 11px;
        }
        @media (max-width: 991px) {
          .div-7 {
            max-width: 100%;
          }
        }
      `}</style>
    </>
  );
}
