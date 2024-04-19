import { Image } from 'antd';

interface IProps {
  path: string;
  width: number;
  height: number;
  className?: string;
  alt?: string
}

export default function AgriImage(props: IProps) {
  const { path, width, height, className, alt } = props;

  return (
    
    <Image
      height={height}
      width={width}
      className={className}

      src={`${process.env.NEXT_PUBLIC_BASE_FILE_PATH}${path}`}
      alt={alt}
    />
  );
}
