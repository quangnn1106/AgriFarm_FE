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
import ItemText from "./Text/Text";
import UploadImage from "./Image/Upload";
import type { CheckboxProps } from 'antd';

interface RiskItem {
    onRadioChange: (indexItem: number, value: number) => void;
    handleRiskItems: (indexItem: number, index: number, value: string) => void;
    handleDeleteItem: (index: number) => void;
    itemMode: number;
    indexItem: number;
    handleRiskItemsTitle: (indexItem: number, value: string) => void;
    onCheckboxChange: (indexItem: number, value: number) => void;
}
// Single choice
const RiskItem: React.FC<RiskItem> = ({
        onRadioChange,
        handleRiskItems,
        itemMode,
        handleDeleteItem,
        indexItem,
        handleRiskItemsTitle,
        onCheckboxChange
    }: RiskItem): ReactElement => {
  const cx = classNames.bind(styles);
  const tCom = useTranslations('common');
  const tLbl = useTranslations('Services.RiskAsm.label');
  const tMsg = useTranslations('Services.RiskAsm.message');
  const [readioSel, setReadioSel] = useState(itemMode);
  const handleOnchangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleRiskItemsTitle(indexItem, e.target.value);
  }

  const handleOnchangeRadio = (e: RadioChangeEvent) => {
    setReadioSel(e.target.value);
    onRadioChange(indexItem, e.target.value);
  }
  const handleOnchangeMust: CheckboxProps['onChange'] = (e) => {
    onCheckboxChange(indexItem, e.target.checked ? 1 : 0);
  };
  return (
    <>
      <div className={cx('risk-item')}>
        <fieldset className={cx('risk-item__wrap')}>
          <legend>
            <TextArea
              defaultValue={tLbl('title_default_text').replace('%ITEM%', indexItem.toString())}
              maxLength={300}
              cols={70}
              rows={4}
              className={cx('title')}
              onChange={handleOnchangeTitle}
              style={{resize: 'none'}}
              placeholder={tLbl('risk_title_placeholder')}
            />
          </legend>
            <Radio.Group onChange={handleOnchangeRadio} value={readioSel} className={cx('risk-item-radio__mg')}>
                <Radio value={1}>{tLbl('single')}</Radio>
                <Radio value={2}>{tLbl('multi')}</Radio>
                <Radio value={3}>{tLbl('text')}</Radio>
                <Radio value={4}>{tLbl('photo')}</Radio>
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
              <ItemText handleEnterContent={handleRiskItems} idxItem={indexItem}/>
              </>
            ) : readioSel == ItemModeValue.PHOTOS ? (
              <>
                <UploadImage></UploadImage>
              </>
            ) : (
              <></>
            )}
            <div className={cx('must')}>
              <span>{tLbl('must')}:</span><br/>
              <Checkbox className={cx('must-checkbox')} onChange={handleOnchangeMust}>{tLbl('required')}</Checkbox>
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
