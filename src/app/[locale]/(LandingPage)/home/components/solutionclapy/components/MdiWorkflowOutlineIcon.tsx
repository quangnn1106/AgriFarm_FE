import { memo, SVGProps } from 'react';

const MdiWorkflowOutlineIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 30 31' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M26.25 20.5V16.75C26.25 15.3625 25.1375 14.25 23.75 14.25H16.25V10.5H18.75V3H11.25V10.5H13.75V14.25H6.25C4.8625 14.25 3.75 15.3625 3.75 16.75V20.5H1.25V28H8.75V20.5H6.25V16.75H13.75V20.5H11.25V28H18.75V20.5H16.25V16.75H23.75V20.5H21.25V28H28.75V20.5H26.25ZM13.75 5.5H16.25V8H13.75V5.5ZM6.25 25.5H3.75V23H6.25V25.5ZM16.25 25.5H13.75V23H16.25V25.5ZM26.25 25.5H23.75V23H26.25V25.5Z'
      fill='#4CAF4F'
    />
  </svg>
);

const Memo = memo(MdiWorkflowOutlineIcon);
export { Memo as MdiWorkflowOutlineIcon };
