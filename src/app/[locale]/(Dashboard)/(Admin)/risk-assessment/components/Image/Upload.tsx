import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { App, Button, Col, message, Row, Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import styles from "../risk-assessment-style.module.scss";
import classNames from 'classnames/bind';
import { useTranslations } from 'next-intl';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const UploadImage: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const cx = classNames.bind(styles);
  const tMsg = useTranslations('Services.RiskAsm.message');

//   const handleUpload = () => {
//     const formData = new FormData();
//     fileList.forEach((file) => {
//       formData.append('files[]', file as FileType);
//     });
//     setUploading(true);
//     // You can use any AJAX library you like
//     fetch('https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188', {
//       method: 'POST',
//       body: formData,
//     })
//       .then((res) => res.json())
//       .then(() => {
//         setFileList([]);
//           "msg_upload_img": "You can only upload JPG/PNG file!",
//         message.success(t(''));
//       })
//       .catch(() => {
//         message.error('upload failed.');
//       })
//       .finally(() => {
//         setUploading(false);
//       });
//   };

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file: FileType) => {
        console.log(file);
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error(tMsg('msg_upload_img'));
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error(tMsg('msg_max_size_img'));
        }
        const maxUploadImg = fileList.length < 3;
        if (!maxUploadImg) {
            message.error(tMsg('msg_max_upload_img'));
        }
        if (isJpgOrPng && isLt2M && maxUploadImg) {
            setFileList([...fileList, file]);
        }

      return false;
    },
    fileList,
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  return (
    <>
      <div className={cx('item-upload__wrap')}>
        <Row className={cx('row')}>
            <Col span={12}>
                <Upload {...props} listType="picture-card">
                    {uploadButton}
                </Upload>
            </Col>
            <Col span={12}></Col>
        </Row>
      </div>
      {/* <Button
        type="primary"
        // onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{ marginTop: 16 }}
      >
        {uploading ? 'Uploading' : 'Start Upload'}
      </Button> */}
    </>
  );
};

const UploadImageApp: React.FC = () => (
    <App>
      <UploadImage />
    </App>
);
export default UploadImageApp;
