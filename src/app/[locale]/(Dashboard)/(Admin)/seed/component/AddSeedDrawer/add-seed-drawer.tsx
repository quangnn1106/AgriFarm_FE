import UseAxiosAuth from '@/utils/axiosClient';
import {
  Form,
  FormInstance,
  Input,
  InputNumber,
  Spin,
  Space,
  Button,
  Typography,
  notification
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { constants } from 'buffer';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { CreateSeedDto } from '../../models/seed-models';
import { createSeedApi } from '@/services/Admin/Seed/createSeedApi';
import { useSession } from 'next-auth/react';
import { NotificationPlacement } from 'antd/es/notification/interface';

const AddSeedFormDrawer = () => {
  const t = useTranslations('Common');

  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
  const [form] = Form.useForm();
  const http = UseAxiosAuth();
  const { data: session } = useSession();
  const siteId = session?.user.userInfo.siteId;

  //notification
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (
    placement: NotificationPlacement,
    status: string,
    type: 'success' | 'error'
  ) => {
    api[type]({
      message: `${status}`,
      placement,
      duration: 2
    });
  };

  const onSubmit = async (value: CreateSeedDto) => {
    try {
      const res = await createSeedApi(siteId, http, value);
      if (res.data) {
        openNotification('top', t('Create_successfully'), 'success');
        console.log('create staff success', res.status);
      } else {
        openNotification('top', t('Create_fail'), 'error');
        console.log('create staff fail', res.status);
      }
    } catch (error) {
      console.error('Error occurred while updating season:', error);
    }
  };

  // const InputUnit = (
  //   <Form.Item
  //     name='measureUnit'
  //     style={{
  //       maxWidth: '100%',
  //       margin: '0px 0px 8px 0px',
  //       padding: '0px 0px'
  //     }}
  //     label='Unit'
  //   >
  //     <Input />
  //   </Form.Item>
  // );

  return (
    <>
      {contextHolder}

      <Form
        disabled={!componentDisabled}
        form={form}
        colon={false}
        layout='vertical'
        onFinish={onSubmit}
      >
        <Form.Item
          name='name'
          style={{
            maxWidth: '100%',
            margin: '0px 0px 8px 0px',
            padding: '0px 0px'
          }}
          label='Name'
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='description'
          style={{
            maxWidth: '100%',
            margin: '0px 0px 8px 0px',
            padding: '0px 0px'
          }}
          label={t('Description')}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          name='notes'
          style={{
            maxWidth: '100%',
            margin: '0px 0px 8px 0px',
            padding: '0px 0px'
          }}
          label='Notes'
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          name='defaultUnit'
          style={{
            maxWidth: '100%',
            margin: '0px 0px 8px 0px',
            padding: '0px 0px'
          }}
          label='Unit'
        >
          <Input />
        </Form.Item>
        {/* <Form.Item
          name='stock'
          style={{
            maxWidth: '100%',
            margin: '0px 0px 8px 0px',
            padding: '0px 0px'
          }}
          label='Stock'
        >
          <InputNumber addonAfter={InputUnit}></InputNumber>
        </Form.Item>
        <Form.Item
          name='unitPrice'
          style={{
            maxWidth: '100%',
            margin: '0px 0px 8px 0px',
            padding: '0px 0px'
          }}
          label='Unit Price'
        >
          <InputNumber addonAfter='VND'></InputNumber>
        </Form.Item> */}
        <label>Properties</label>
        <Form.List name='properties'>
          {(fields, { add, remove }) => (
            <div>
              {fields.map(field => (
                <Space
                  key={field.key}
                  style={{ display: 'flex', marginBottom: '4px' }}
                  align='baseline'
                >
                  <Form.Item
                    name={[field.name, 'name']}
                    rules={[{ required: true, message: 'Missing name' }]}
                  >
                    <Input placeholder='Name' />
                  </Form.Item>
                  <Form.Item
                    name={[field.name, 'value']}
                    rules={[{ required: true, message: 'Missing value' }]}
                  >
                    <InputNumber placeholder='Value' />
                  </Form.Item>
                  <Form.Item
                    name={[field.name, 'unit']}
                    rules={[{ required: true, message: 'Missing unit' }]}
                  >
                    <Input placeholder='Unit' />
                  </Form.Item>
                  <CloseOutlined
                    onClick={() => {
                      remove(field.name);
                    }}
                  />
                </Space>
              ))}
              <Button
                type='dashed'
                onClick={() => add()}
                block
              >
                + Add new property
              </Button>
            </div>
          )}
        </Form.List>

        <Form.Item
          noStyle
          shouldUpdate
        >
          {() => (
            <Typography>
              <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
            </Typography>
          )}
        </Form.Item>
        <Button
          htmlType='submit'
          type='primary'
          loading={isFetching}
        >
          Save
        </Button>
      </Form>
    </>
  );
};
export default AddSeedFormDrawer;
