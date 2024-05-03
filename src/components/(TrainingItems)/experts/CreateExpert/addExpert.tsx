'use client';

import FileUploadDragger from '@/components/(ImageItem)/fileUploadDragger';
import { useRouter } from '@/navigation';
import UseAxiosAuth from '@/utils/axiosClient';
import { HomeOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Avatar,
  Breadcrumb,
  Button,
  Col,
  ConfigProvider,
  Descriptions,
  Divider,
  Flex,
  Form,
  Input,
  message,
  Modal,
  Result,
  Row,
  Space,
  Steps,
  Typography
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';
import AddExpertInformationForm from './addExpertForm';
import AddExpertCertificateForm from './addExpertCertificateForm';
import { addExpertCertificateBatchService, addExpertCertificateService, postExpertService } from '@/services/Admin/Training/expertService';
import { useSession } from 'next-auth/react';
import { Content } from 'antd/es/layout/layout';

interface IProps {
  //onClose?: () => void;
}

const steps = [
  {
    title: 'Thông tin',
    content: 'Đầu tiên hãy điền thông tin hồ sơ mới'
  },
  // {
  //   title: 'Chứng nhận',
  //   content: 'Thêm chứng nhận cho chuyên gia này'
  // },
  {
    title: 'Hoàn thành',
    content: 'Chúc mừng! Bạn đã thêm mới một hồ sơ chuyên gia'
  }
];

export default function AddExpert(props: IProps) {
  //const { onClose } = props;

  const { data: session } = useSession();
  const siteId = session?.user.userInfo.siteId;
  const siteName = session?.user.userInfo.siteName;
  const http = UseAxiosAuth();
  const farmRouter = useRouter();
  const [current, setCurrent] = useState(0);
  const [createForm] = useForm();
  const [certForm] = useForm();
  const [currentId, setCurrentId] = useState<string | null>(null);
  const items = steps.map(item => ({ key: item.title, title: item.title }));

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleInforSubmit = () => {
    const data = createForm.getFieldsValue();
    console.log('Send data: ', data);
    postExpertService(http, data)
      .then(rs => {
        console.log('Cur id: ', (rs.data as any).data.id);
        if (rs.status === 201) {
          message.success('Thêm thành công!');
          setCurrentId((rs.data as any).data.id);
          next();
        } else throw new Error('invalid data');
      })
      .catch(e => {
        console.log('Error: ', e);
        message.error('Có lỗi xảy ra, vui lòng thử lại!');
      });
  };

  const handleCertificateSubmit = () => {
    const data = certForm.getFieldsValue();
    console.log('Send data: ', data);

    addExpertCertificateBatchService(http, currentId, {certificates: data})
    .then(rs => {
      console.log('Cur id: ', (rs.data as any).data.id);
      if (rs.status === 201) {
        message.success('Thêm thành công!');
        setCurrentId((rs.data as any).data.id);
        next();
      } else throw new Error('invalid data');
    })
    .catch(e => {
      console.log('Error: ', e);
      message.error('Có lỗi xảy ra, vui lòng thử lại!');
    });

  };

  const renderFormSection = () => {
    return (
      <>
        {current === 0 && <AddExpertInformationForm form={createForm} />}
        {/* {current === 1 && <AddExpertCertificateForm form={certForm} />} */}
      </>
    );
  };

  return (
    <>
      <Content style={{ padding: '20px 0px' }}>
        <ConfigProvider
          theme={{
            components: {
              Button: {
                contentFontSizeLG: 24,
                fontWeight: 700,
                groupBorderColor: 'transparent',
                onlyIconSizeLG: 24,
                paddingBlockLG: 0,
                defaultBorderColor: 'transparent',
                defaultBg: 'transparent',
                defaultShadow: 'none',
                primaryShadow: 'none',
                linkHoverBg: 'transparent',
                paddingInlineLG: 24,
                defaultGhostBorderColor: 'transparent'
              }
            }
          }}
        >
          {' '}
          <Button
            //className={cx('home-btn')}
            href='#'
            size={'large'}
          >
            <HomeOutlined style={{ color: 'green' }} />
            {siteName}
          </Button>
        </ConfigProvider>
        <Breadcrumb style={{ margin: '0px 24px' }}>
          <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
          <Breadcrumb.Item>Thông tin chuyên gia</Breadcrumb.Item>
          <Breadcrumb.Item>Thêm mới</Breadcrumb.Item>
        </Breadcrumb>
        <Divider orientation='left'>
          <Typography.Title level={3}>Thêm hồ sơ chuyên gia</Typography.Title>
        </Divider>
        <Flex
          vertical
          justify='center'
          align='center'
        >
          <Row>
            <Steps
              style={{ margin: 40, maxWidth: '40vw' }}
              current={current}
              items={items}
            />
          </Row>

          <Divider>
            <Typography.Text style={{ height: 50 }}>
              {steps[current].content}
            </Typography.Text>
          </Divider>
          {current !== 1 ? (
            renderFormSection()
          ) : (
            <Flex
              vertical
              justify='center'
              align='center'
              style={{
                margin: 50,

                padding: 20,
                width: '80%',
                minHeight: 400
              }}
              //justify='center'
            >
              <Result
                status='success'
                title='Thành công!'
                subTitle='Nhấn "Quay lại" để trở lại'
              />
            </Flex>
          )}
          <Divider orientation='right'>
            <Flex
              vertical
              align='center'
              style={{
                width: '100%'
                //marginTop: 24
                //paddingInline:'10vw'
              }}
            >
              <div>
                <Button
                  style={{ margin: '0 8px' }}
                  onClick={() => farmRouter.back()}
                  //disabled={!(current > 0)}
                >
                  Quay lại
                </Button>

                {/* {current === 2 && (
                <Button
                  type='primary'
                  onClick={() => message.success('Processing complete!')}
                >
                  Done
                </Button>
              )} */}
                {current === 2 && (
                  <>
                    <Button
                      type='default'
                      style={{ marginInline: 10 }}
                      onClick={() => next()}
                      disabled={!(current < steps.length - 1)}
                    >
                      Bỏ qua
                    </Button>
                    <Button
                      type='primary'
                      style={{ marginInline: 10 }}
                      onClick={() => handleCertificateSubmit()}
                      disabled={!(current < steps.length - 1)}
                    >
                      Tiếp
                    </Button>
                  </>
                )}
                {current === 0 && (
                  <Button
                    type='primary'
                    onClick={() => handleInforSubmit()}
                    disabled={!(current < steps.length - 1)}
                  >
                    Tiếp
                  </Button>
                )}
              </div>
            </Flex>
          </Divider>
        </Flex>
      </Content>
    </>
  );
}

{
  /* <Flex
        style={{ width: '100%', minHeight: '80vh' }}
        vertical
        justify='space-between'
      >
        <Form
          //layout='vertical'
          style={{
            width: '100%'
            //minHeight:'100vh'
          }}
          form={form}
        >
          {renderInformationSection()}
          {renderCertificationSection()}
          <Form.Item
            noStyle
            shouldUpdate
          >
            {() => (
              <Typography>
                <pre>{JSON.stringify(form.getFieldsValue())}</pre>
              </Typography>
            )}
          </Form.Item>
        </Form>
        <Flex
          justify='end'
          align='center'
          style={{ width: '100%', paddingRight: '20vw', marginTop: 30 }}
        >
          <Row gutter={16}>
            <Col>
              <Button onClick={() => farmRouter.back()}>Back to list</Button>
            </Col>
            <Col>
              <Button
                type='primary'
                onClick={() => handleSubmit()}
              >
                Save
              </Button>
            </Col>
          </Row>
        </Flex>
      </Flex> */
}
