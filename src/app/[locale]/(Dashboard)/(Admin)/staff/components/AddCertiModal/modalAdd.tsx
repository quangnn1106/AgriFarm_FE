'use client';
import { Col, ConfigProvider, Form, Input, Modal, Row, Select, notification } from 'antd';
const { Option } = Select;
import styles from './add.module.scss';

import { NotificationPlacement } from 'antd/es/notification/interface';

import ModalCustom from '@/components/ModalCustom/ModalCustom';

import classNames from 'classnames/bind';

import UseAxiosAuth from '@/utils/axiosClient';
import { useTranslations } from 'next-intl';

import TextArea from 'antd/es/input/TextArea';
import { addNewCertApi } from '@/services/Admin/Certificates/postCertificates';
import { STATUS_CREATED } from '@/constants/https';
import { ICerPayLoadRequest } from '@/services/Admin/Certificates/payload/request/addCert';
import Staffs from '@/services/Admin/Staffs/Payload/response/staffs';

const cx = classNames.bind(styles);
const AddCertificate = ({
  params
}: {
  params: {
    visible: boolean;
    onCancel: () => void;
    userId: string;
    //  listStaff?: Staffs[] | [];
    loading?: boolean | false;
  };
}) => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const t = useTranslations('Common');

  const msg = useTranslations('Message');

  const http = UseAxiosAuth();
  const openNotification = (
    placement: NotificationPlacement,
    status: string,
    type: 'success' | 'error'
  ) => {
    api[type]({
      message: `Chứng chỉ mới ${status}`,
      placement,
      duration: 2
    });
  };

  const handleAddCer = async (data: ICerPayLoadRequest) => {
    //console.log('data register: ', data);

    const res = await addNewCertApi(params.userId, http, data);
    if (res?.data || res?.status === STATUS_CREATED) {
      openNotification('top', `${msg('add_susses')}`, 'success');
      params.onCancel();
      form.resetFields();
      // console.log('update staff success', res?.status);
    } else {
      openNotification('top', `${msg('add_error')}`, 'error');
      params.onCancel();
      form.resetFields();
      //  console.log('update staff fail', res?.status);
    }
  };

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log('search:', value);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  return (
    <>
      {contextHolder}
      <ModalCustom
        open={params.visible}
        title='Thêm chứng chỉ'
        width='50%'
        style={{ top: 40, maxWidth: 1000 }}
        keyboard
        onOk={form.submit}
        onCancel={() => {
          params.onCancel();
          //openNotification('top', 'create process have been cancel!', 'error');
        }}
      >
        <hr style={{ border: '1px solid #eee' }}></hr>

        <ConfigProvider
          theme={{
            components: {
              Form: {
                itemMarginBottom: 10,
                verticalLabelPadding: '0 0 0',
                labelFontSize: 12,
                labelColor: 'rgb(133, 133, 133)'
              }
            }
          }}
        >
          <Form
            layout='vertical'
            autoComplete='off'
            form={form}
            onFinish={handleAddCer}
          >
            <Form.Item
              name='name'
              label='Name'
              rules={[
                { required: true }
                // {
                //   type: 'email',
                //   message: 'Email is not valid'
                // }
              ]}
            >
              <Input size='middle' />
            </Form.Item>

            {/* <Form.Item
              name='userId'
              label='Thêm chứng chỉ cho nhân viên'
              rules={[{ required: true }]}
            >
              <Select
                placeholder='Hãy chọn nhân viên'
                showSearch
                // optionFilterProp='children'
                onChange={onChange}
                onSearch={onSearch}
                loading={params.loading}
                filterOption={filterOption}
                options={params.listStaff?.map(listStaff => {
                  return {
                    value: listStaff.id,
                    label: listStaff.firstName + ' ' + listStaff.lastName
                  };
                })}
              ></Select>
            </Form.Item> */}

            <Form.Item
              name='provider'
              label='Đơn vị cấp'
              rules={[{ required: true }]}
            >
              <Input size='middle' />
            </Form.Item>

            <Form.Item
              name='description'
              label='Mô tả'
              rules={[{ required: true }]}
            >
              <TextArea
                rows={4}
                placeholder={t('Type_data')}
              />
            </Form.Item>

            <Form.Item
              name='url'
              label='Dán đường dẫn chứng chỉ của bạn'
              rules={[{ required: true }]}
            >
              <Input size='middle' />
            </Form.Item>
          </Form>
        </ConfigProvider>
      </ModalCustom>
    </>
  );
};
export default AddCertificate;
