import { memo, SVGProps } from 'react';

const GroupIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 23 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M11.25 23.25C14.2337 23.25 17.0952 22.0647 19.205 19.955C21.3147 17.8452 22.5 14.9837 22.5 12C22.5 9.01631 21.3147 6.15483 19.205 4.04505C17.0952 1.93526 14.2337 0.75 11.25 0.75C8.26631 0.75 5.40483 1.93526 3.29505 4.04505C1.18526 6.15483 0 9.01631 0 12C0 14.9837 1.18526 17.8452 3.29505 19.955C5.40483 22.0647 8.26631 23.25 11.25 23.25Z'
      stroke='#4CAF4F'
      strokeWidth={2.5}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M15 17L11.25 7L7.5 17M13.75 14.5H8.75'
      stroke='#4CAF4F'
      strokeWidth={2.5}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const Memo = memo(GroupIcon);
export { Memo as GroupIcon };
