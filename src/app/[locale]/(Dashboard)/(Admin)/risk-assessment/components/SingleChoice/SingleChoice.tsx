'use client'
import { Button, Col, Flex, Form, Input, Radio, Row, Space } from "antd";
import styles from "../risk-assessment-style.module.scss";
import classNames from 'classnames/bind';
import { useTranslations } from "next-intl";
import { ReactElement, ReactNode, useState } from "react";

interface Rows {
  [key: number] : string;
}
interface ItemSingleChoice {
  idxItem: number;
  handleEnterContent: (indexItem: number, index: number, value: string) => void;
}
// Single choice
const SingleChoice: React.FC<ItemSingleChoice> = ({
    idxItem,
    handleEnterContent
  }: ItemSingleChoice): ReactElement => {
  const cx = classNames.bind(styles);
  const tCom = useTranslations('common');
  const tLbl = useTranslations('Services.RiskAsm.label');
  const tMsg = useTranslations('Services.RiskAsm.message');
  const [rows, setRows] = useState<Rows[]>(["New Row"]);

  const handleAddRow = () => {
    if (rows.length > 5) {
      return;
    }
    const newRows = [...rows];
    newRows.push("New Row");
    setRows(newRows);
  };

  const handleRemoveRow = (indexToRemove: number) => {
    const newRows = rows.filter((_, index) => index !== indexToRemove);
    setRows(newRows);
  }

  const handleOnchange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    handleEnterContent(idxItem, index, e.target.value);
  }
  return (
    <>
      <div className={cx('single-choice__wrap')}>
        {rows.map((_, index) => {
          return (
          <Row className={cx('row')} key={index}>
            <Col span={12}>
              <Form.Item
                name={`risk_item_title_single_${index}_${idxItem}`}
                rules={[{ required: true, message: ""}]}
                hasFeedback
              >
                <Input maxLength={150} placeholder={`${tLbl('text_placeholder')}${index}`} onChange={(e) => {handleOnchange(index, e)}}></Input>
              </Form.Item>
              </Col>
            <Col span={12}>
                <Flex gap="small">
                  <Button type="primary" onClick={handleAddRow}>{tCom('btn_add')}</Button>
                  <Button 
                      type="primary"
                      onClick={() => handleRemoveRow(index)}
                      className={index != 0 ? cx('single-choice-btn__addrec') : ""}
                      disabled={index == 0 ? true : false}
                    >
                      {tCom('btn_delete')}
                  </Button>
              </Flex>
            </Col>
          </Row>
          )
        })}
      </div>
    </>
  );
};

export default SingleChoice;
