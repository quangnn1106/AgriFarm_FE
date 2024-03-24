'use client';

import { uploadFileService } from '@/services/Common/FileUpload/uploadFileService';
import HttpResponseCommon from '@/types/response';
import UseAxiosAuth from '@/utils/axiosClient';
import { InboxOutlined } from '@ant-design/icons';
import { Button, message, UploadFile, UploadProps } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import { useState } from 'react';

interface IProps {
  prefix?: string;
  setPath: (path: string) => void;
}

export default function FileUploadDragger(props: IProps) {
  const { prefix, setPath } = props;

  const [file, setFile] = useState<UploadFile | null>(null);
  const [uploading, setUploading] = useState(false);
  const http = UseAxiosAuth();

  const upload: UploadProps = {
    maxCount: 1,
    name: 'data',
    multiple: false,
    onRemove: file => {
      //console.log('File removed ', file.name);
      setFile(null);
      setUploading(false);
    },
    beforeUpload: file => {
      //console.log('File added ', file.name);
      setFile(file);

      return false;
    },
    //action: 'https://localhost:7013/api/files/check' + `${!!prefix && prefix.length>0?"?prefix="+prefix:""}`,
    onChange(info) {
      //console.log('>>this info: ', info);
      // const { status } = info.file;
    },
    onDrop(e) {
      //console.log('Dropped files', e.dataTransfer.files);
    }
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

  return (
    <>
      <Dragger {...upload}>
        <p className='ant-upload-drag-icon'>
          <InboxOutlined />
        </p>
        <p className='ant-upload-text'>Click or drag file to this area to upload</p>
        <p className='ant-upload-hint'>Support for a single upload.</p>
      </Dragger>
      <Button
        type='primary'
        disabled={file === null}
        onClick={handleUpload}
        loading={uploading}
      >
        {uploading ? 'Empty' : 'Upload File'}
      </Button>
    </>
  );
}
