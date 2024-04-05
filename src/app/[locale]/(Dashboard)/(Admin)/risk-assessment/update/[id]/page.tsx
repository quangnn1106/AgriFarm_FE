'use client'
import { Content } from 'antd/es/layout/layout';
import { App, Breadcrumb, Button, Empty, Form, Input, Radio, RadioChangeEvent, Spin, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { RiskItemDef } from '../../interface';
import { useTranslations } from 'next-intl';
import TextArea from 'antd/es/input/TextArea';
import styles from "../../components/risk-assessment-style.module.scss";
import classNames from 'classnames/bind';
import Link from 'next/link';
import { PlusOutlined } from '@ant-design/icons';
import UseAxiosAuth from '@/utils/axiosClient';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { AxiosInstance } from 'axios';
import riskAssessementDetailApi from '@/services/RiskAssessment/riskAssessementDetailApi';
import RiskItemEdit from '../../components/RiskItemEdit';
import { STATUS_NO_CONTENT, STATUS_OK } from '@/constants/https';
import riskAssessmentUpdApi from '@/services/RiskAssessment/riskAssessmentUpdApi';
import { usePathname } from '@/navigation';

interface ItemContentDef {
  [key: number] : {
    [key: number] : string
  };
}
interface ColoredLineProps {
  text: string;
}
const Edit = ({ params }: { params: { id: string } }) => {
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
    const [risItemContent, setRiskItemContent] = useState<ItemContentDef>([]);
    const { data: session } = useSession();
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const riskId = params.id;
    const [loadings, setLoadings] = useState(false);
    const router = useRouter();
    const pathName = usePathname();

    useEffect(() => {
        getData(http, riskId);
    },[http, riskId]);

    const getData = async (http : AxiosInstance | null, riskId : string | null) => {
      try {
          setLoadings(true);
          const responseData = await riskAssessementDetailApi(http, riskId);
          if (responseData.data.statusCode != STATUS_NO_CONTENT) {
            setRiskName(responseData.data.riskName);
            setRiskDescription(responseData.data.riskDescription);
            setRiskIsDraft(responseData.data.isDraft);
            setRiskItems(responseData.data.riskItems);
            console.log(responseData.data.riskItems);
            const ItmCtn: ItemContentDef = responseData.data.riskItems.map((item: RiskItemDef, index: number) => {
              const tmp: ItemContentDef = {
                  [item.riskItemType] : item.riskItemContent
              }
              return tmp;
            });
            setRiskItemContent(ItmCtn);
          }
      } catch (error) {
          console.error('Error calling API:', error);
      } finally {
        setLoadings(false);
      }
  }
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
        riskItemTitle: "Test",
        must: 1
      },
      {
        riskItemContent: "testtt",
        riskItemDiv: 1,
        riskItemType: 1,
        riskItemTitle: "Test",
        must: 1
      },
      {
        riskItemContent: "testtt",
        riskItemDiv: 1,
        riskItemType: 1,
        riskItemTitle: "Test",
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
    // when input
    const handleRiskItems = (
        indexItem: number,
        index: number,
        value: string,
        type?: number
      ) => {
        let rskItmCtn = [];
        if (type == undefined) {
          rskItmCtn = JSON.parse(riskItems[indexItem].riskItemContent);
          rskItmCtn = {...rskItmCtn, [index]: value};
          risItemContent[indexItem][riskItems[indexItem].riskItemType] = JSON.stringify(rskItmCtn);
        } else {
          if (risItemContent[indexItem][type] != undefined) {
            console.log(risItemContent);
            rskItmCtn = JSON.parse(risItemContent[indexItem][type]);
            risItemContent[indexItem][type] = JSON.stringify(rskItmCtn);
          } else {
            risItemContent[indexItem] = {...risItemContent[indexItem], [type]: '[]'};

          }
        }
        riskItems[indexItem].riskItemContent = JSON.stringify(rskItmCtn);
        setRiskItemContent(risItemContent);
        setRiskItems(riskItems);
    }
    const handleRiskItemsTitle = (
      indexItem: number,
      value: string
    ) => {
      riskItems[indexItem].riskItemTitle = value;
      setRiskItems(riskItems);
    }
    
    const handleAddItem = () => {
      if (riskItems.length > 5) {
        return;
      }
      
      const newItem = [...riskItems];
      newItem.push({
          riskItemTitle: tLbl('title_default_text').replace('%ITEM%', (riskItems.length).toString()),
          riskItemType: 1,
          riskItemContent: JSON.stringify([]),
          must: 0,
          riskItemDiv: 1
        });
      setRiskItemContent(Object.values({...risItemContent, [riskItems.length]: {[1] : JSON.stringify([])}}));
      setRiskItems(newItem);
    };
    const handleDeleteItem = (indexToRemove: number) => {
      const newItem = riskItems.filter((_, index) => index !== indexToRemove);
      const newRisItemContent = Object.values(risItemContent).filter((_, index) => index !== indexToRemove);
      setRiskItemContent(newRisItemContent);
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
          title: <Link href={`/risk-assessment`}>{tLbl('risk_assessment')}</Link>
      },
      {
          title: tLbl('risk_assessment_edit')
      }
    ];

    const saveAction = async() => {
      if (riskItems.length <= 0) {
        message.error(tMsg('msg_required').replace('%ITEM%', tLbl('item_list')));
        return;
      }
      try {
          console.log("Save action ...");
          setLoadingBtn(true);
          console.log(riskItems);
          const riskMaster = {
            riskName: riskName,
            riskDescription: riskDescription,
            isDraft: riskIsDraft,
            updateBy: session?.user?.userInfo.id as string
          }
          const res = await riskAssessmentUpdApi(http, riskId ?? "", riskItems, riskMaster);
          if (res.statusCode != STATUS_OK) {
            messageApi.error(tMsg('msg_update_fail'));
          } else {
            messageApi.success(tMsg('msg_update_success'));
          }
      } catch (error) {
          console.log(error);
          setLoadingBtn(false);
          messageApi.error(tMsg('msg_update_fail'));
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
      router.push(`/risk-assessment`);
    }
  return(
    <>
      {contextHolder}
      <Content style={{ padding: '30px 48px' }}>
        <h2>{tLbl('risk_assessment_edit')}</h2>
        <Breadcrumb style={{ margin: '0px 24px 24px 24px' }} items={breadCrumb} />
        <Spin spinning={loadings}>
        {riskName ? (
          <>
          <ColoredLine text={tLbl('basic_information')}/>
          <Form
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              layout="horizontal"
              onFinish={saveAction}
              form={form}
              >
                <Form.Item 
                  wrapperCol={{ span: 8 }}
                  label={tLbl('risk_name')}
                  name="risk_name"
                  rules={[{ required: true, message: tMsg('msg_required').replace('%ITEM%', tLbl('risk_name'))}]}
                  initialValue={riskName}
                >
                  <Input onChange={handleInputRiskName}/>
                </Form.Item>
                <Form.Item
                  wrapperCol={{ span: 8 }}
                  label={tLbl('risk_description')}
                  name="risk_description"
                  rules={[{ required: true, message: tMsg('msg_required').replace('%ITEM%', tLbl('risk_description'))}]}
                  initialValue={riskDescription}
                >
                  <TextArea rows={5} style={{resize: 'none'}} onChange={handleInputRiskDescription}/>
                </Form.Item>
                <Form.Item label={tLbl('risk_is_draft')} initialValue={riskIsDraft}>
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
          {riskItems && (
            <>
            <div className={cx('risk-div')}>
                <h4 className={cx('label')}>{tLbl('advance')}</h4>
            </div>
            <div className={cx('item-list__wrap')}>
              {riskItems.map((item, index) => {
                return (
                  <div className={cx('item-list__items')} key={index}>
                    <RiskItemEdit
                      key={index}
                      riskItem={item}
                      riskItemContent={risItemContent}
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
              <Button
                      type='primary'
                      icon={<PlusOutlined />}
                      size='large'
                      onClick={handleAddItem}
                      style={{marginTop: '20px'}}
                  >
                      {tLbl('btn_add_new_item')}
                  </Button>
            </div>
            </>
          )}
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
          </>
        ) : (
          <>
            <Empty>
              <Button type="primary" onClick={() => {router.push(`/risk-assessment/add`)}}>{tCom('btn_add')}</Button>
            </Empty>
          </>
        )}
        </Spin>
      </Content>
    </>
  )
}

export default Edit;
