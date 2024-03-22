'use client'
import { Content } from 'antd/es/layout/layout';
import { App, Breadcrumb, Button, Form, Input, Radio, RadioChangeEvent, message } from 'antd';
import React, { useState } from 'react';
import RiskItem from '../../components/RiskItem';
import { RiskItemDef, RiskMasterInputDef } from '../../interface';
import { useTranslations } from 'next-intl';
import TextArea from 'antd/es/input/TextArea';
import styles from "../../components/risk-assessment-style.module.scss";
import classNames from 'classnames/bind';
import Link from 'next/link';
import { PlusOutlined } from '@ant-design/icons';
import UseAxiosAuth from '@/utils/axiosClient';
import riskAssessmentAddApi from '@/services/RiskAssessment/riskAssessmentAddApi';
import { useSession } from 'next-auth/react';

interface ItemContentDef {
  [key: number] : string;
}
interface ColoredLineProps {
  text: string;
}
const Add = () => {
    const tCom = useTranslations('common');
    const tLbl = useTranslations('Services.RiskAsm.label');
    const tMsg = useTranslations('Services.RiskAsm.message');
    const cx = classNames.bind(styles);
    const [loadingBtn, setLoadingBtn] = useState(false);
    const http = UseAxiosAuth();
    const [riskName, setRiskName] = useState("");
    const [riskDescription, setRiskDescription] = useState("");
    const [riskIsDraft, setRiskIsDraft] = useState(true);
    const [riskItems, setRiskItems] = useState<RiskItemDef[]>([]);
    const [risItemContent, setRiskItemContent] = useState<ItemContentDef[]>([]);
    const { data: session } = useSession();
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    const handleInputRiskName = (e: React.ChangeEvent<HTMLInputElement>) => {
      setRiskName(e.target.value);
    }
    const handleInputRiskDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setRiskDescription(e.target.value);
    }

    const handleIsDraft = (e: RadioChangeEvent) => {
      // true: draft, false: publish
      setRiskIsDraft(e.target.value);
    }

    // Riskitem
    const [riskItemsBasic, setRiskItemsBasic] = useState<RiskItemDef[]>([
      {
        riskItemContent: "testtt",
        riskItemDiv: 1,
        riskItemType: 1,
        riskItemTile: "Test",
        must: 1
      },
      {
        riskItemContent: "testtt",
        riskItemDiv: 1,
        riskItemType: 1,
        riskItemTile: "Test",
        must: 1
      },
      {
        riskItemContent: "testtt",
        riskItemDiv: 1,
        riskItemType: 1,
        riskItemTile: "Test",
        must: 1
      }
    ]);
    const onRadioChange = (indexItem: number, value: number) => {
      riskItems[indexItem].riskItemType = value;
      setRiskItems(riskItems);
    };
    const onCheckboxChange = (indexItem: number, value: number) => {
      riskItems[indexItem].must = value;
      setRiskItems(riskItems);
    }
    const handleRiskItems = (
        indexItem: number,
        index: number,
        value: string
      ) => {
      let riskItemContent = JSON.parse(riskItems[indexItem].riskItemContent);
      riskItemContent = {...riskItemContent, [index]: value};
      riskItems[indexItem].riskItemContent = JSON.stringify(riskItemContent);
      setRiskItems(riskItems);
    }
    const handleRiskItemsTitle = (
      indexItem: number,
      value: string
    ) => {
      riskItems[indexItem].riskItemTile = value;
      setRiskItems(riskItems);
    }
    
    const handleAddItem = () => {
      if (riskItems.length > 5) {
        return;
      }
      const newItem = [...riskItems];
      newItem.push({
          riskItemTile: tLbl('title_default_text').replace('%ITEM%', (riskItems.length).toString()),
          riskItemType: 1,
          riskItemContent: JSON.stringify(risItemContent),
          must: 0,
          riskItemDiv: 1
        });
      setRiskItems(newItem);
    };
    const handleDeleteItem = (indexToRemove: number) => {
      const newItem = riskItems.filter((_, index) => index !== indexToRemove);
      setRiskItems(newItem);
    }

    const ColoredLine: React.FC<ColoredLineProps> = ({ text }) => (
      <div style={{ display: 'flex', alignItems: 'center' }}>
          <div className={cx('risk__line')} style={{flex: 1}}/>
          <span style={{ marginLeft: 5, marginRight: 5}}>{text}</span>
          <div className={cx('risk__line')} style={{flex: 12}}/>
      </div>
    );
    
    const breadCrumb = [
      {
          title: <Link href={`/risk-assessment/list`}>{tLbl('risk_assessment')}</Link>
      },
      {
          title: tLbl('risk_assessment_add')
      }
    ];

    const saveAction = async() => {
      if (riskItems.length <= 0) {
        messageApi.error(tMsg('msg_required').replace('%ITEM%', tLbl('item_list')));
        return;
      }
      try {
          console.log("Save action ...");
          setLoadingBtn(true);
          const riskMaster: RiskMasterInputDef = {
            riskName: riskName,
            riskDescription: riskDescription,
            isDraft: riskIsDraft,
            createBy: session?.user?.userInfo.id as string
          }
          const res = await riskAssessmentAddApi(http, riskItems, riskMaster);
          messageApi.success(tMsg('msg_add_success'));
          resetForm();
      } catch (error) {
          console.log(error);
          setLoadingBtn(false);
      } finally {
        setLoadingBtn(false);
      }
    }
    const resetForm = () => {
      form.resetFields();
      setRiskItems([]);
      setRiskIsDraft(true);
    }
    const backAction = () => {
      console.log("backAction ...");
    }
  return(
    <>
      {contextHolder}
      <Content style={{ padding: '30px 48px' }}>
        <h2 className={cx('disease__title')}>{tLbl('risk_assessment_add')}</h2>
        <Breadcrumb style={{ margin: '0px 24px 24px 24px' }} items={breadCrumb} />
        <ColoredLine text={tLbl('basic_information')}/> 
        <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
            layout="horizontal"
            onFinish={saveAction}
            form={form}
            >
              <Form.Item 
                label={tLbl('risk_name')}
                name="risk_name"
                rules={[{ required: true, message: tMsg('msg_required').replace('%ITEM%', tLbl('risk_name'))}]}
              >
                <Input onChange={handleInputRiskName}/>
              </Form.Item>
              <Form.Item
                label={tLbl('risk_description')}
                name="risk_description"
                rules={[{ required: true, message: tMsg('msg_required').replace('%ITEM%', tLbl('risk_description'))}]}
              >
                <TextArea rows={5} style={{resize: 'none'}} onChange={handleInputRiskDescription}/>
              </Form.Item>
              <Form.Item label={tLbl('risk_is_draft')}>
                <Radio.Group onChange={handleIsDraft} value={riskIsDraft}>
                  <Radio value={true}>{tLbl('draft')}</Radio>
                  <Radio value={false}>{tLbl('publish')}</Radio>
                </Radio.Group>
              </Form.Item>
        <ColoredLine text={tLbl('item_list')}/>
        {/* Item list basic*/}
        {/* <div className={cx('risk-div')}>
            <h4 className={cx('label')}>{tLbl('basic')}</h4>
        </div>
        <div className={cx('item-list__wrap')}>
          {riskItemsBasic.map((_, index) => {
            return (
              <div className={cx('item-list__items')} key={index}>
                <RiskItem 
                  key={index}
                  indexItem={index}
                  onRadioChange={onRadioChange}
                  onCheckboxChange={onCheckboxChange}
                  itemMode={1}
                  handleRiskItems={handleRiskItems}
                  handleDeleteItem={handleDeleteItem}
                  handleRiskItemsTitle={handleRiskItemsTitle}
                />
              </div>
            )
          })}
        </div> */}
        {/* Item list advance*/}
        <div className={cx('risk-div')}>
            <h4 className={cx('label')}>{tLbl('advance')}</h4>
            <Button
                  type='primary'
                  icon={<PlusOutlined />}
                  size='large'
                  onClick={handleAddItem}
              >
                  {tLbl('btn_add_new_item')}
              </Button>
        </div>
        <div className={cx('item-list__wrap')}>
          {riskItems.map((_, index) => {
            return (
              <div className={cx('item-list__items')} key={index}>
                <RiskItem 
                  key={index}
                  indexItem={index}
                  onRadioChange={onRadioChange}
                  onCheckboxChange={onCheckboxChange}
                  itemMode={riskItems[index].riskItemType}
                  handleRiskItems={handleRiskItems}
                  handleDeleteItem={handleDeleteItem}
                  handleRiskItemsTitle={handleRiskItemsTitle}
                />
              </div>
            )
          })}
        </div>
        <Form.Item>
          <Button
            type='primary'
            size='large'
            className={`${cx('risk__btn')} ${cx('risk__btn--back')}`}
            onClick={backAction}
          >
            {tCom('btn_back')}
          </Button>
          <Button
            type='primary'
            htmlType='submit'
            size='large'
            className={`${cx('risk__btn')} ${cx('risk__btn--save')}`}
            loading={loadingBtn}
          >
            {tCom('btn_save')}
          </Button>
        </Form.Item>
        </Form>
      </Content>
    </>
  )
}

const AddApp: React.FC = () => (
  <App>
    <Add />
  </App>
);
export default Add;
