import { memo, SVGProps } from 'react';

const CovidPersonalHygieneHandSaniti = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <g clipPath='url(#clip0_912_4676)'>
      <path
        d='M1.40125 24.735L5.0325 27.64C6.18283 28.5611 7.61261 29.0628 9.08625 29.0625H16.545C17.1189 29.0625 17.6692 28.8345 18.075 28.4288C18.4808 28.023 18.7087 27.4726 18.7087 26.8987C18.7087 26.3249 18.4808 25.7745 18.075 25.3687C17.6692 24.963 17.1189 24.735 16.545 24.735H10.9563'
        stroke='#4CAF4F'
        strokeWidth={1.875}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M1.5975 18.25H5.925C7.2075 18.25 8.46125 18.63 9.5275 19.3412L12 20.985C12.2343 21.1255 12.4377 21.3122 12.5978 21.5336C12.7578 21.7551 12.8713 22.0067 12.9312 22.2733C12.9912 22.5399 12.9964 22.8159 12.9466 23.0845C12.8967 23.3532 12.7928 23.6089 12.6413 23.8363C12.3686 24.2459 11.9555 24.5418 11.4799 24.6682C11.0043 24.7946 10.4988 24.7428 10.0588 24.5225L6.80875 22.5725M19.945 12.0638H24.89M22.4175 9.59125V14.5362M28.5987 13.3C28.5987 14.9394 27.9475 16.5116 26.7883 17.6708C25.6291 18.83 24.0569 19.4813 22.4175 19.4813C20.7781 19.4813 19.2059 18.83 18.0467 17.6708C16.8875 16.5116 16.2363 14.9394 16.2363 13.3C16.2363 8.66375 22.4175 0.9375 22.4175 0.9375C22.4175 0.9375 28.5987 8.66375 28.5987 13.3Z'
        stroke='#4CAF4F'
        strokeWidth={1.875}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </g>
    <defs>
      <clipPath id='clip0_912_4676'>
        <rect width={30} height={30} fill='white' />
      </clipPath>
    </defs>
  </svg>
);

const Memo = memo(CovidPersonalHygieneHandSaniti);
export { Memo as CovidPersonalHygieneHandSaniti };
