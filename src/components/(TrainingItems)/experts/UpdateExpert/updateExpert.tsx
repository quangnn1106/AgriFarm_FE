'use client';
import { updateExpertsService } from '@/services/Admin/Training/expertService';
import { ExpertRequest } from '@/services/Admin/Training/request/training.request';
import { Expert } from '@/services/Admin/Training/response/training.response';
import UseAxiosAuth from '@/utils/axiosClient';
import { Avatar, Col, Descriptions, Flex, Form, Input, Modal, Row } from 'antd';
import { useForm } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';

interface IProps {
  detail: Expert;
  onClose: () => void;
  onSubmit: (data: Expert) => void;
}

export default function UpdateExpert(props: IProps) {
  const { detail, onClose, onSubmit } = props;
  const [form] = useForm();
  const [isFetching, setIsFetching] = useState(false);
  const http = UseAxiosAuth();

  const handleSave = () => {
    setIsFetching(true);
    const data = form.getFieldsValue() as ExpertRequest;
    console.log("send: ",data)
    data.expertField = data.expertField ?? detail.expertField
    data.fullName = data.fullName ?? detail.fullName
    data.description = data.description ?? detail.description

    updateExpertsService(http, detail.id, data)
      .then(rs => {
        if (rs) {
          onSubmit({
            ...detail,
            expertField: data.expertField ?? detail.expertField,
            fullName: data.expertField ?? detail.expertField
          });
        }
      })
      .catch(err => {console.log("Error")});

    onClose();
    setIsFetching(false);
  };

  return (
    <>
      <Modal
        title='Sửa thông tin'
        open={true}
        centered
        onOk={() => handleSave()}
        onCancel={() => onClose()}
        maskClosable={false}
        width={'50vw'}
        okText={'Lưu'}
        cancelText={'Hủy bỏ'}
        okButtonProps={{ loading: isFetching }}
      >
        <Form form={form}>
          <Row
            gutter={[16, 16]}
            style={{
              // marginInline: '5vw',
              width: '100%',
              marginTop: '3vh'
            }}
          >
            <Col
              offset={1}
              span={8}
            >
              {/* <FileUploadDragger
            setPath={path => console.log(path)}
            prefix='123'
          /> */}

              <Flex
                vertical
                align='center'
                justify='center'
              >
                <Avatar
                  shape='square'
                  size={300}
                  src={
                    'https://cdn.vectorstock.com/i/preview-1x/77/22/farmer-avatar-icon-vector-32077722.jpg'
                  }
                />
              </Flex>
            </Col>
            <Col
              offset={1}
              span={14}
              style={
                {
                  // paddingInline: '5vw'
                }
              }
            >
              <Descriptions title='Tên' />
              <Form.Item
                //label='Name'
                name='fullName'
              >
                <Input
                  type='text'
                  placeholder='Tên chuyên gia'
                  defaultValue={detail.fullName}
                />
              </Form.Item>
              <Descriptions title='Lĩnh vực chuyên môn' />
              <Form.Item
                //label='Name'
                name='expertField'
              >
                <Input
                  type='text'
                  placeholder='Hãy nhập lĩnh vực'
                  defaultValue={detail.expertField}
                />
              </Form.Item>
              <Descriptions title='Mô tả' />
              <Form.Item
                //label='Description'
                name='description'
              >
                <TextArea
                  placeholder='Hãy nhập mô tả'
                  //autoSize={{ minRows: 6, maxRows: 8 }}
                  rows={4}
                  style={{ resize: 'none' }}
                  defaultValue={detail.description}
                  showCount
                  maxLength={500}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
