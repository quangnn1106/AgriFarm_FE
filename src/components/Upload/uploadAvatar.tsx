import React, { useState } from 'react';
import type { UploadRequestOption as RcCustomRequestOptions } from 'rc-upload/lib/interface';
import { Button, Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';
import { UploadOutlined } from '@ant-design/icons';
import { RcFile, UploadChangeParam } from 'antd/es/upload/interface';
type BeforeUploadValueType = void | boolean | string | Blob | File;
export type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

type Props = {
  fileList?: Array<UploadFile<any>>;
  onChange?: (info: UploadChangeParam<UploadFile<unknown>>) => void;
  customRequest?: (options: RcCustomRequestOptions) => void;
  onPreview?: (file: UploadFile<unknown>) => void;
  beforeUpload?: (
    file: RcFile,
    FileList: RcFile[]
  ) => BeforeUploadValueType | Promise<BeforeUploadValueType>;
  action?: string;
};

const UploadImgAgri = ({
  fileList,
  action,
  onPreview,
  onChange,
  customRequest,
  beforeUpload
}: Props) => {
  // const [fileList, setFileList] = useState<UploadFile[]>([
  //   {
  //     uid: '-1',
  //     name: 'image.png',
  //     status: 'done',
  //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
  //   }
  // ]);

  // const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
  //   setFileList(newFileList);
  // };

  // const onPreview = async (file: UploadFile) => {
  //   let src = file.url as string;
  //   if (!src) {
  //     src = await new Promise(resolve => {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(file.originFileObj as FileType);
  //       reader.onload = () => resolve(reader.result as string);
  //     });
  //   }
  //   const image = new Image();
  //   image.src = src;
  //   const imgWindow = window.open(src);
  //   imgWindow?.document.write(image.outerHTML);
  // };

  return (
    <ImgCrop rotationSlider>
      <Upload
        action={action}
        listType='picture'
        //   maxCount={1}
        
        onChange={onChange}
        onPreview={onPreview}
        customRequest={customRequest}
        beforeUpload={beforeUpload}
      >
        {/* {fileList.length < 5 && '+ Upload'} */}
        <Button icon={<UploadOutlined />}>Upload your Image</Button>
      </Upload>
    </ImgCrop>
  );
};

export default UploadImgAgri;
