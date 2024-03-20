'use client'
import { Button, Checkbox, Input, Radio, RadioChangeEvent } from "antd";
import TextArea from "antd/es/input/TextArea";
import styles from "./risk-assessment-style.module.scss";
import classNames from 'classnames/bind';
import { ReactElement, useState } from "react";
import { useTranslations } from "next-intl";
import { ItemModeValue } from "../enum";
import SingleChoice from "./SingleChoice/SingleChoice";
import MultiChoice from "./MultiChoice/MultiChoice";

interface RiskItem {
    onRadioChange: (indexItem: number, value: number) => void;
    handleRiskItems: (indexItem: number, index: number, value: string) => void;
    handleDeleteItem: (index: number) => void;
    itemMode: number;
    indexItem: number;
    handleRiskItemsTitle: (indexItem: number, value: string) => void;
}
// Single choice
const RiskItem: React.FC<RiskItem> = ({
        onRadioChange,
        handleRiskItems,
        itemMode,
        handleDeleteItem,
        indexItem,
        handleRiskItemsTitle
    }: RiskItem): ReactElement => {
  const cx = classNames.bind(styles);
  const tCom = useTranslations('common');
  const tLbl = useTranslations('Services.RiskAsm.label');
  const tMsg = useTranslations('Services.RiskAsm.message');
  const [readioSel, setReadioSel] = useState(itemMode);
  const handleOnchangeTitle = (e : any) => {
    handleRiskItemsTitle(indexItem, e.target.value);
  }

  const handleOnchangeRadio = (e: RadioChangeEvent) => {
    setReadioSel(e.target.value);
    onRadioChange(indexItem, e.target.value);
  }
  return (
    <>
      <div className={cx('risk-item')}>
        <fieldset className={cx('risk-item__wrap')}>
          <legend><TextArea cols={45} rows={3} className={cx('title')} onChange={handleOnchangeTitle}></TextArea></legend>
            <Radio.Group onChange={handleOnchangeRadio} value={readioSel} className={cx('risk-item-radio__mg')}>
                <Radio value={1}>{tLbl('single')}</Radio>
                <Radio value={2}>{tLbl('multi')}</Radio>
                <Radio value={3}>{tLbl('text')}</Radio>
                <Radio value={4}>{tLbl('photo')}</Radio>
                <Radio value={5}>{tLbl('file')}</Radio>
            </Radio.Group>
            {readioSel == ItemModeValue.SINGLE_CHOICE ? (
              <>
                <SingleChoice handleEnterContent={handleRiskItems} idxItem={indexItem}/>
              </>
            ) : readioSel == ItemModeValue.MULTI_CHOICE ? (
              <>
              <MultiChoice handleEnterContent={handleRiskItems} idxItem={indexItem}/>
              </>
            ) : readioSel == ItemModeValue.TEXT ? (
              <>
                <div>Textttttt</div>
              </>
            ) : readioSel == ItemModeValue.PHOTOS ? (
              <>
                <div>Photossssss</div>
              </>
            ): readioSel == ItemModeValue.FILES ? (
              <>
                <div>Filesssssssssssss</div>
              </>
            ) : (
              <></>
            )}
            <div className={cx('must')}>
              <span>{tLbl('must')}:</span><br/>
              <Checkbox className={cx('must-checkbox')}>{tLbl('required')}</Checkbox>
            </div>
            <div className={cx('delete-item')}>
                  <Button type="primary" className={cx('single-choice-btn__addrec')} onClick={() => handleDeleteItem(indexItem)}>{tCom('btn_delete')}</Button>
            </div>
        </fieldset>
      </div>
    </>
  );
};
export default RiskItem;
