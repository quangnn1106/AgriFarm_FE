'use client'
import { Content } from 'antd/es/layout/layout';
import { App, Breadcrumb, Button, Checkbox, Form, Input, Radio, RadioChangeEvent, message } from 'antd';
import React, { useState } from 'react';
import RiskItem from '../../components/RiskItem';
import { RiskItemDef } from '../../interface';
import { useTranslations } from 'next-intl';
import TextArea from 'antd/es/input/TextArea';
import styles from "../../components/risk-assessment-style.module.scss";
import classNames from 'classnames/bind';
import Link from 'next/link';
import { PlusOutlined } from '@ant-design/icons';
import UseAxiosAuth from '@/utils/axiosClient';
import riskAssessmentAddApi from '@/services/RiskAssessment/riskAssessmentAddApi';

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
    const [riskItems, setRiskItems] = useState<RiskItemDef[]>([]);
    const [risItemContent, setRiskItemContent] = useState<ItemContentDef[]>([]);
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
    const handleOnclickBtn = () => {
      // console.log(riskItems);
      console.log(riskItems);
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
          title: <Link href={`/risk-assessment/list`}>{tLbl('risk_assessment_add')}</Link>
      },
      {
          title: tLbl('risk_assessment_add')
      }
    ];

    const saveAction = async() => {
      try {
          console.log("Save action ...");
          setLoadingBtn(true);
          const res = await riskAssessmentAddApi(http, riskItems);
          message.success(tMsg('msg_add_success'));
      } catch (error) {
          console.log(error);
          setLoadingBtn(false);
      } finally {
        await sleep(3 * 1000);
        setLoadingBtn(false);
      }
    }

    function sleep(ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

  return(
    <>
      <Content style={{ padding: '30px 48px' }}>
        <h2 className={cx('disease__title')}>{tLbl('risk_assessment_add')}</h2>
        <Breadcrumb style={{ margin: '0px 24px 24px 24px' }} items={breadCrumb} />
        <ColoredLine text={tLbl('basic_information')}/> 
        <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
            layout="horizontal"
            >
              <Form.Item 
                label={tLbl('risk_name')}
                name="risk_name"
                rules={[{ required: true, message: tMsg('msg_required').replace('%ITEM', tLbl('risk_name'))}]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={tLbl('risk_description')}
                name="risk_description"
                rules={[{ required: true, message: tMsg('msg_required').replace('%ITEM', tLbl('risk_name'))}]}
              >
                <TextArea rows={5} style={{resize: 'none'}}/>
              </Form.Item>
              <Form.Item label={tLbl('risk_is_draft')}>
                <Radio.Group defaultValue="draft">
                  <Radio value="draft">Draft</Radio>
                  <Radio value="publish">Publish</Radio>
                </Radio.Group>
              </Form.Item>
        </Form>
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
                  htmlType='submit'
                  icon={<PlusOutlined />}
                  size='large'
                  onClick={handleAddItem}
              >
                  {tLbl('btn_add_new_item')}
              </Button>
            {/* <Button onClick={handleOnclickBtn}>TestConsole</Button> */}
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
            htmlType='submit'
            size='large'
            className={`${cx('risk__btn')} ${cx('risk__btn--back')}`}
            // onClick={backAction}
          >
            {tCom('btn_back')}
          </Button>
          <Button
            type='primary'
            htmlType='submit'
            size='large'
            className={`${cx('risk__btn')} ${cx('risk__btn--save')}`}
            onClick={saveAction}
            loading={loadingBtn}
          >
            {tCom('btn_save')}
          </Button>
        </Form.Item>
      </Content>
    </>
  )
}

const AddApp: React.FC = () => (
  <App>
    <Add />
  </App>
);
export default AddApp;
