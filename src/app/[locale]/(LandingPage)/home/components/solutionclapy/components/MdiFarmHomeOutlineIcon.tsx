import { memo, SVGProps } from 'react';

const MdiFarmHomeOutlineIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 30 31' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M25 26.75H21.25V24.25H25V26.75ZM25 21.75H21.25V19.25H25V21.75ZM25 16.75H21.25V14.25H25V16.75ZM30 10.25C29.5 6.125 26 3 21.875 3C19.75 3 17.625 3.875 16.125 5.375C15.25 6.25 14.625 7.125 14.25 8.25L19.5 11.75H27.5V28H30V10.25ZM16.625 9.25C17.375 7 19.5 5.5 21.875 5.5C24.25 5.5 26.375 7 27.125 9.25H16.625ZM9.375 8L0 14.25V28H18.75V14.25L9.375 8ZM16.25 25.5H12.5V18H6.25V25.5H2.5V15.5L9.375 11.125L16.25 15.5V25.5Z'
      fill='#4CAF4F'
    />
  </svg>
);

const Memo = memo(MdiFarmHomeOutlineIcon);
export { Memo as MdiFarmHomeOutlineIcon };
