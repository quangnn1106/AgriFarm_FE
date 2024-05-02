'use client'

import AgriImage from '@/components/(ImageItem)/AgriImage/agriImage';
import FarmAvatarUpload from '@/components/(ImageItem)/AvatarUpload/v1/farmAvatar';
import { Col, Row } from 'antd';

export default function ImagePage() {
  return (
    <>
      <Row>
        <Col span={12}>
          <AgriImage
            height={400}
            path={'avt/253766bf-c105_638484710857121239.png'}
            width={400}
          />
        </Col>
        <Col span={12}>

            <FarmAvatarUpload 
                setPath={(path)=>console.log("Path ne: ", path)}
                
            />
        </Col>
      </Row>
    </>
  );
}
