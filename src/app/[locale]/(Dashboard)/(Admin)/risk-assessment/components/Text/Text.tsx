'use client'
import { Button, Col, Flex, Input, Radio, Row, Space } from "antd";
import styles from "../risk-assessment-style.module.scss";
import classNames from 'classnames/bind';
import { useTranslations } from "next-intl";
import { ReactElement, ReactNode, useState } from "react";
import TextArea from "antd/es/input/TextArea";

interface Rows {
  [key: number] : string;
}
interface ItemText {
  idxItem: number;
  handleEnterContent: (indexItem: number, index: number, value: string) => void;
}
// Text
const ItemText: React.FC<ItemText> = ({
    idxItem,
    handleEnterContent
  }: ItemText): ReactElement => {
  const cx = classNames.bind(styles);

  const handleOnchange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleEnterContent(idxItem, 0, e.target.value);
  }
  return (
    <>
        <div className={cx('text-item__wrap')}>
            <Row className={cx('row')}>
                <Col span={12}><TextArea cols={45} rows={3} className={cx('text-content')} onChange={handleOnchange}></TextArea></Col>
                <Col span={12}></Col>
            </Row>
        </div>
    </>
  );
};

export default ItemText;
