import { uploadFileService } from '@/services/Common/FileUpload/uploadFileService';
import UseAxiosAuth from '@/utils/axiosClient';
import { LoadingOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Flex, GetProp, Image, message, Upload, UploadFile, UploadProps } from 'antd';
import path from 'path';
import { useRef, useState } from 'react';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

interface IProps {
  width?: number | string;
  height?: number | string;
  alt?: string;
  prefix?: string;
  setPath: (path: string) => void;
}

export default function FarmAvatarUpload(props: IProps) {
  const { width, height, alt, prefix, setPath } = props;
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>();
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<UploadFile | null>(null);
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);

  const http = UseAxiosAuth();

  const beforeUpload = (file: FileType) => {
    setFile(file);
    const reader = new FileReader();
    console.log('image up');
    reader.onload = e => {
      setImage(reader.result);
    };
    setUploaded(true);
    reader.readAsDataURL(file);
    return false;
  };
  
  const handleUpload = () => {
    //console.log('Click to upload');
    if (file) {
      setUploading(true);
      
      uploadFileService(http, file, prefix)
        .then(res => {
          console.log('your data here, ', res.data);
          if (res.data) {
            setPath(res?.data as string);
          }
        })
        .then(() => {
          setFile(null);
          message.success('upload successfully.');
        })
        .catch(() => {
          message.error('upload failed.');
        })
        .finally(() => {
          setUploading(false);
        });
    }
  };

  const uploadButton = (
    <Button
      style={{ 
        //border: 0, 
        //background: 'none', 
        width: 60, height: 30 }}
      type='primary'
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Click here to upload</div>
    </Button>
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
        {uploaded && image && (
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
            src={image.toString()}
          />
          )}
      </Flex>
    </>
  );
}
