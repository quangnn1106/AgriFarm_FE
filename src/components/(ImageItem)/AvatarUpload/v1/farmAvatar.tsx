import { LoadingOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Flex, GetProp, Image, Upload, UploadProps } from 'antd';
import path from 'path';
import { useRef, useState } from 'react';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

interface IProps {
  width?: number | string;
  height?: number | string;
  alt?: string;
}

export default function FarmAvatarUpload(props: IProps) {
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const { width, height, alt } = props;
  const imgRef = useRef<HTMLImageElement>();
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);

  const beforeUpload = (file: FileType) => {
    const reader = new FileReader();
    console.log('imgae up');
    reader.onload = e => {
      setImage(reader.result);
    };
    setUploaded(true);
    reader.readAsDataURL(file);
    return false;
  };

  const uploadButton = (
    <button
      style={{ border: 0, background: 'none', width: '100%', height: '100%' }}
      type='button'
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Click here to upload</div>
    </button>
  );

  return (
    <>
      <Flex
        //vertical
        style={{
          width: 100,
          height: 100,
          border: '1px solid black'
        }}
      >
        <Upload
          name='avatar'
          listType='picture'
          beforeUpload={beforeUpload}
          maxCount={1}
          //onPreview={handlePreview}
          //onChange={handleChange}
          // style={{
          //   width: 500,
          //   height: 500,

          // }}

          showUploadList={false}
        >
          <Flex
            vertical
            align='center'
            justify='center'
            style={{
              width: width ?? 500,
              height: height ?? 500
            }}
          >
            {uploadButton}
          </Flex>
        </Upload>
        {/* {uploaded && image && ( */}
          <Image
            
            title='ssss'
            preview={{
              title: 'ok'
            }}
            style={{
              border: '1px solid black'
            }}
            height={height ?? 500}
            width={width ?? 500}
            alt={alt}
            //src={image.toString()}
          />
        {/* )} */}
      </Flex>
    </>
  );
}
